const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);
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
    normalized.includes("socket")
  );
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
      await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
    }
  }

  throw lastError;
}
