const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);
const MAX_RETRY_AFTER_MS = 8000;
const JITTER_MS = 250;
const RETRYABLE_ERROR_CODES = new Set([
  "UND_ERR_SOCKET",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_BODY_TIMEOUT",
  "ECONNRESET",
  "ETIMEDOUT",
  "ECONNREFUSED",
  "ENOTFOUND",
  "EAI_AGAIN"
]);

function readErrorCode(value: object): string | undefined {
  const code = "code" in value ? value.code : undefined;
  return typeof code === "string" ? code : undefined;
}

function readStatusCode(value: object): number | undefined {
  const statusCode = "statusCode" in value ? value.statusCode : undefined;
  if (typeof statusCode === "number") {
    return statusCode;
  }

  const status = "status" in value ? value.status : undefined;
  return typeof status === "number" ? status : undefined;
}

function isRetryableMessage(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized === "terminated" ||
    normalized.includes("other side closed") ||
    normalized.includes("fetch failed") ||
    normalized.includes("network") ||
    normalized.includes("timeout") ||
    normalized.includes("socket") ||
    normalized.includes("unexpected end of json") ||
    normalized.includes("unexpected token") ||
    normalized.includes("json input")
  );
}

function isEmptyGithubBody(error: object): boolean {
  return "bodyText" in error && error.bodyText === "";
}

export function isRetryableGithubError(error: unknown): boolean {
  const seen = new Set<object>();
  let current: unknown = error;

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);

    const status = readStatusCode(current);
    if (status !== undefined && RETRYABLE_STATUS_CODES.has(status)) {
      return true;
    }

    // GitHub sometimes returns HTTP 200 with an empty/truncated JSON body.
    if (isEmptyGithubBody(current)) {
      return true;
    }

    const name = "name" in current ? current.name : undefined;
    if (name === "ServerParseError") {
      return true;
    }

    const code = readErrorCode(current);
    if (code && RETRYABLE_ERROR_CODES.has(code)) {
      return true;
    }

    if (current instanceof Error && isRetryableMessage(current.message)) {
      return true;
    }

    const nextCause = "cause" in current ? current.cause : undefined;
    const nextNetworkError =
      "networkError" in current ? current.networkError : undefined;
    current = nextCause ?? nextNetworkError;
  }

  return false;
}

function readRetryAfterMs(error: unknown): number | undefined {
  const seen = new Set<object>();
  let current: unknown = error;

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);

    if (readStatusCode(current) === 429) {
      const response = "response" in current ? current.response : undefined;
      const headers =
        response && typeof response === "object" && "headers" in response
          ? response.headers
          : "headers" in current
            ? current.headers
            : undefined;
      const retryAfter = readHeader(headers, "retry-after");
      if (retryAfter) {
        return parseRetryAfterMs(retryAfter);
      }
    }

    const nextCause = "cause" in current ? current.cause : undefined;
    const nextNetworkError =
      "networkError" in current ? current.networkError : undefined;
    current = nextCause ?? nextNetworkError;
  }

  return undefined;
}

function readHeader(headers: unknown, name: string): string | undefined {
  if (!headers || typeof headers !== "object") {
    return undefined;
  }

  if ("get" in headers && typeof headers.get === "function") {
    const value = headers.get(name);
    return typeof value === "string" ? value : undefined;
  }

  const record = headers as Record<string, unknown>;
  const direct = record[name] ?? record[name.toLowerCase()];
  return typeof direct === "string" ? direct : undefined;
}

function parseRetryAfterMs(value: string): number | undefined {
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.min(seconds * 1000, MAX_RETRY_AFTER_MS);
  }

  const dateMs = Date.parse(value);
  if (Number.isNaN(dateMs)) {
    return undefined;
  }

  return Math.min(Math.max(dateMs - Date.now(), 0), MAX_RETRY_AFTER_MS);
}

export async function queryGithubWithRetry<T>(
  query: () => Promise<T>,
  attempts = 4
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await query();
    } catch (error) {
      lastError = error;
      if (!isRetryableGithubError(error) || attempt === attempts) {
        throw error;
      }
      const retryAfterMs = readRetryAfterMs(error);
      const delay =
        (retryAfterMs ?? 1500 * attempt) + Math.floor(Math.random() * JITTER_MS);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

export function chunkIds(ids: string[], size: number): string[][] {
  if (size <= 0) {
    return [ids];
  }
  const chunks: string[][] = [];
  for (let index = 0; index < ids.length; index += size) {
    chunks.push(ids.slice(index, index + size));
  }
  return chunks;
}

/** Run an ID-based GraphQL nodes query in small sequential batches. */
export async function queryGithubNodesInChunks<TNode>(
  ids: string[],
  chunkSize: number,
  queryChunk: (chunkIds: string[]) => Promise<Array<TNode | null>>
): Promise<Array<TNode | null>> {
  if (ids.length === 0) {
    return [];
  }

  const nodes: Array<TNode | null> = [];
  for (const chunk of chunkIds(ids, chunkSize)) {
    const chunkNodes = await queryChunk(chunk);
    nodes.push(...chunkNodes);
  }
  return nodes;
}
