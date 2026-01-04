import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./styles.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error(
    "The element with id 'root' was not found in your HTML. Please ensure it exists or update the container used in src/index.tsx."
  );
}
