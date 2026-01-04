import { useEffect, useState } from "react";

import type { SiteInfo } from "@/types";

/**
 * Fetches metadata about the current Webflow site.
 *
 * This hook retrieves site information (such as site ID, name, and short name)
 * on mount and provides loading and error states.
 *
 * @returns An object containing:
 *   - `siteInfo` - The site metadata object, or `null` if not yet loaded.
 *   - `isLoading` - Whether the site info is currently being fetched.
 *   - `error` - Whether an error occurred while fetching site info.
 *
 * @example
 * ```tsx
 * const { siteInfo, isLoading, error } = useSiteInfo();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage />;
 * return <p>Site: {siteInfo?.siteName}</p>;
 * ```
 */

export function useSiteInfo() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    webflow
      .getSiteInfo()
      .then(setSiteInfo)
      .catch(async () => {
        setError(true);
        await webflow.notify({
          type: "Error",
          message: "Unable to load site info",
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { siteInfo, isLoading, error };
}
