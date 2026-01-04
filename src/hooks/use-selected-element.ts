import { useEffect, useState } from "react";

/**
 * Subscribes to the currently selected element in the Webflow Designer.
 *
 * This hook listens for selection changes and automatically updates
 * the returned element whenever the user selects a different element.
 *
 * @returns The currently selected Webflow element, or `null` if nothing is selected.
 *
 * @example
 * ```tsx
 * const element = useSelectedElement();
 *
 * if (!element) return <p>No element selected</p>;
 * return <p>Selected: {element.type}</p>;
 * ```
 */

export function useSelectedElement() {
  const [element, setElement] = useState<AnyElement | null>(null);

  useEffect(() => {
    const unsubscribe = webflow.subscribe("selectedelement", async () => {
      const el = await webflow.getSelectedElement();
      setElement(el);
    });
    return () => unsubscribe();
  }, []);

  return element;
}
