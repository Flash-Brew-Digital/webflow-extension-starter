import { useElementSnapshot } from "@/hooks/use-element-snapshot";
import { useSelectedElement } from "@/hooks/use-selected-element";
import { useSiteInfo } from "@/hooks/use-site-info";

export function App() {
  const selectedElement = useSelectedElement();
  const {
    snapshot,
    isLoading: snapshotLoading,
    error: snapshotError,
  } = useElementSnapshot(selectedElement);
  const {
    siteInfo,
    isLoading: siteInfoLoading,
    error: siteInfoError,
  } = useSiteInfo();

  return (
    <div className="container">
      <header className="header">
        <h1>Webflow Extension Starter</h1>
      </header>

      <section className="card">
        <h2 className="card-heading">Site Info</h2>
        {siteInfoLoading && <div className="loading">Loading site info...</div>}
        {siteInfo && (
          <div className="card-details">
            <div className="card-row">
              <span className="text-muted">Site Name</span>
              <span>{siteInfo.siteName}</span>
            </div>
            <div className="card-row">
              <span className="text-muted">Short Name</span>
              <code className="code" title={siteInfo.shortName}>
                {siteInfo.shortName}
              </code>
            </div>
            {siteInfo.domains.find(
              (d) => d.stage === "staging" && d.lastPublished
            ) && (
              <a
                aria-label={`View staging site for ${siteInfo.siteName}`}
                className="link-action"
                href={`https://${siteInfo.shortName}.webflow.io?utm_source=webflow-designer-extension`}
                rel="external noopener noreferrer"
                target="_blank"
              >
                View Staging Site
              </a>
            )}
          </div>
        )}
        {siteInfoError && (
          <div className="designer-api-error">
            <strong>Unable to load site info</strong>
            <small>Please try reloading the extension.</small>
          </div>
        )}
      </section>

      {selectedElement ? (
        <section className="card">
          <h2 className="card-heading">
            Selected Element
            <span className="badge">{selectedElement.type}</span>
          </h2>
          {snapshotLoading && (
            <div className="loading">Loading screenshot...</div>
          )}
          {!snapshotLoading && snapshot && (
            <img
              alt="Screenshot of the selected element"
              className="screenshot"
              height="auto"
              src={snapshot}
              width="100%"
            />
          )}
          {!snapshotLoading && snapshotError && (
            <div className="designer-api-error">
              <strong>Unable to load screenshot</strong>
              <small>
                Sorry, the selected element may not support screenshots
                currently.
              </small>
            </div>
          )}
        </section>
      ) : (
        <div className="empty-state">
          <strong>No element selected</strong>
          <small>
            Select an element on the canvas to see its type and a screenshot of
            it here.
          </small>
        </div>
      )}
    </div>
  );
}
