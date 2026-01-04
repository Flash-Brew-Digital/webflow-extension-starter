export interface SnapshotCacheEntry {
  snapshot: string;
  timestamp: number;
}

export interface SiteInfo {
  siteId: string;
  siteName: string;
  shortName: string;
  isPasswordProtected: boolean;
  isPrivateStaging: boolean;
  workspaceId: string;
  workspaceSlug: string;
  domains: Array<{
    url: string;
    lastPublished: string | null;
    default: boolean;
    stage: "staging" | "production";
  }>;
}
