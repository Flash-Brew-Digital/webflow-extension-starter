import { useEffect, useState } from "react";

import type { SnapshotCacheEntry } from "@/types";

const CACHE_TTL_MS = 60_000; // One Minute
const CACHE_MAX_SIZE = 3; // Max three entries (snapshots) in cache

const snapshotCache = new Map<string, SnapshotCacheEntry>();

/**
 * Returns a valid cached snapshot if available and not expired.
 */
function getValidCachedSnapshot(elementId: string): string | null {
  const cached = snapshotCache.get(elementId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.snapshot;
  }
  return null;
}

/**
 * Removes expired entries from the cache.
 */
function removeExpiredCacheEntries(): void {
  const now = Date.now();
  for (const [key, entry] of snapshotCache) {
    if (now - entry.timestamp >= CACHE_TTL_MS) {
      snapshotCache.delete(key);
    }
  }
}

/**
 * Removes the oldest entry if the cache exceeds max size.
 */
function enforceMaxCacheSize(): void {
  if (snapshotCache.size < CACHE_MAX_SIZE) {
    return;
  }

  let oldestKey: string | null = null;
  let oldestTime = Number.POSITIVE_INFINITY;

  for (const [key, entry] of snapshotCache) {
    if (entry.timestamp < oldestTime) {
      oldestTime = entry.timestamp;
      oldestKey = key;
    }
  }

  if (oldestKey) {
    snapshotCache.delete(oldestKey);
  }
}

/**
 * Adds a snapshot to the cache, cleaning up old entries first.
 */
function addToCache(elementId: string, snapshot: string): void {
  removeExpiredCacheEntries();
  enforceMaxCacheSize();
  snapshotCache.set(elementId, { snapshot, timestamp: Date.now() });
}

/**
 * Fetches and caches a visual snapshot (base64 image) of a Webflow element.
 *
 * This hook uses an LRU-style cache with a configurable TTL to avoid redundant
 * API calls when the same element is selected multiple times.
 *
 * @param element - The Webflow element to capture a snapshot of, or `null` if none is selected.
 * @returns An object containing:
 *   - `snapshot` - The base64-encoded image string, or `null` if unavailable.
 *   - `isLoading` - Whether the snapshot is currently being fetched.
 *   - `error` - Whether an error occurred while fetching the snapshot.
 *
 * @example
 * ```tsx
 * const element = useSelectedElement();
 * const { snapshot, isLoading, error } = useElementSnapshot(element);
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage />;
 * return <img src={snapshot} alt="Element preview" />;
 * ```
 */

export function useElementSnapshot(element: AnyElement | null) {
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const elementId = element?.id.element ?? null;

  useEffect(() => {
    async function fetchSnapshot() {
      if (!(element && elementId)) {
        setSnapshot(null);
        setError(false);
        return;
      }

      const cachedSnapshot = getValidCachedSnapshot(elementId);
      if (cachedSnapshot) {
        setSnapshot(cachedSnapshot);
        setError(false);
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        const img = await webflow.getElementSnapshot(element);

        if (img) {
          addToCache(elementId, img);
        }

        setSnapshot(img ?? null);
        setError(!img);
      } catch {
        setSnapshot(null);
        setError(true);
        await webflow.notify({
          type: "Error",
          message: "Unable to load screenshot",
        });
      } finally {
        setIsLoading(false);
      }
    }

    void fetchSnapshot();
  }, [elementId]); // We only want to re-fetch when the element ID changes, not on object reference changes

  return { snapshot, isLoading, error };
}
