import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  fetchLightProjectLists,
  fetchProjectStatsById,
  resolveEnrichmentIds,
  type LightProjectLists,
  type ProjectStatsById
} from "./githubProjectFetch";

const IS_DEV = process.env.NODE_ENV === "development";
const LIGHT_TTL_MS = IS_DEV ? 15 * 60 * 1000 : 60 * 1000;
const STATS_TTL_MS = 60 * 1000;
const DISK_CACHE_PATH = path.join(
  process.cwd(),
  ".next",
  "cache",
  "github-light-projects.json"
);

interface TimestampedLightLists extends LightProjectLists {
  fetchedAt: number;
}

let lightMemory: TimestampedLightLists | null = null;
let lightInFlight: Promise<LightProjectLists> | null = null;

let statsMemory:
  | {
      expiresAt: number;
      byId: ProjectStatsById;
    }
  | null = null;
let statsInFlight: Promise<ProjectStatsById> | null = null;

function isFresh(fetchedAt: number, ttlMs: number): boolean {
  return Date.now() - fetchedAt < ttlMs;
}

async function readDiskLightLists(): Promise<TimestampedLightLists | null> {
  if (!IS_DEV) {
    return null;
  }

  try {
    const raw = await readFile(DISK_CACHE_PATH, "utf8");
    const parsed = JSON.parse(raw) as TimestampedLightLists;
    if (
      typeof parsed.fetchedAt !== "number" ||
      !Array.isArray(parsed.pinnedItems) ||
      !Array.isArray(parsed.repositories)
    ) {
      return null;
    }
    if (!isFresh(parsed.fetchedAt, LIGHT_TTL_MS)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeDiskLightLists(lists: TimestampedLightLists): void {
  if (!IS_DEV) {
    return;
  }

  void mkdir(path.dirname(DISK_CACHE_PATH), { recursive: true })
    .then(() => writeFile(DISK_CACHE_PATH, JSON.stringify(lists)))
    .catch(() => {
      // Dev cache is best-effort.
    });
}

export async function getCachedLightProjectLists(): Promise<LightProjectLists> {
  if (lightMemory && isFresh(lightMemory.fetchedAt, LIGHT_TTL_MS)) {
    return {
      pinnedItems: lightMemory.pinnedItems,
      repositories: lightMemory.repositories
    };
  }

  if (lightInFlight) {
    return lightInFlight;
  }

  lightInFlight = (async () => {
    const fromDisk = await readDiskLightLists();
    if (fromDisk) {
      lightMemory = fromDisk;
      return {
        pinnedItems: fromDisk.pinnedItems,
        repositories: fromDisk.repositories
      };
    }

    const lists = await fetchLightProjectLists();
    const stored: TimestampedLightLists = {
      ...lists,
      fetchedAt: Date.now()
    };
    lightMemory = stored;
    writeDiskLightLists(stored);
    return lists;
  })();

  try {
    return await lightInFlight;
  } finally {
    lightInFlight = null;
  }
}

export async function getCachedProjectStats(): Promise<ProjectStatsById> {
  if (statsMemory && statsMemory.expiresAt > Date.now()) {
    return statsMemory.byId;
  }

  if (statsInFlight) {
    return statsInFlight;
  }

  statsInFlight = (async () => {
    const lists = await getCachedLightProjectLists();
    const ids = resolveEnrichmentIds(lists.pinnedItems, lists.repositories);
    const byId = await fetchProjectStatsById(ids);
    statsMemory = {
      expiresAt: Date.now() + STATS_TTL_MS,
      byId
    };
    return byId;
  })();

  try {
    return await statsInFlight;
  } finally {
    statsInFlight = null;
  }
}
