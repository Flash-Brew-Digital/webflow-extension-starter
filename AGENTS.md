# AGENTS.md - Webflow Extension Starter

This document provides guidance for AI coding agents working in this repository.

## Project Overview

This is a **Webflow Designer Extension** starter template built with React 19 and TypeScript. Designer Extensions are iframe-based apps that run inside the Webflow Designer and interact with it via the Webflow Designer APIs.

- **Package Manager**: pnpm (v10+)
- **Build Tool**: Rspack (Rust-based bundler)
- **Linting**: Oxlint via Ultracite
- **Formatting**: Oxfmt via Ultracite
- **Framework**: React 19 with TypeScript

## Build/Dev/Lint Commands

```bash
# Development
pnpm dev              # Run Rspack watch and Webflow extension serve concurrently
pnpm watch            # Rspack in watch mode only
pnpm serve            # Start Webflow extension server only

# Build
pnpm build            # Production build via Rspack
pnpm bundle           # Build + bundle for Webflow deployment

# Type Checking
pnpm type-check       # TypeScript type checking (tsc --noEmit)

# Linting & Formatting
pnpm check            # Lint check via Ultracite (type-aware)
pnpm fix              # Auto-fix lint issues via Ultracite
```

## Testing

No testing framework is currently configured. This is a starter template focused on development workflow.

## Code Style Guidelines

### Formatting (Oxfmt)

Configuration in `.oxfmtrc.jsonc`:

- **Print width**: 80 characters
- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Required
- **Quotes**: Double quotes only (including JSX)
- **Trailing commas**: ES5 style
- **Bracket spacing**: Enabled
- **Arrow function parens**: Always required
- **Line endings**: LF
- **Import sorting**: Enabled (ascending, case-insensitive, newlines between groups)

### Import Organization

Imports are automatically sorted by Oxfmt. Follow this pattern:

```typescript
// 1. External packages (React, etc.)
import { useEffect, useState } from "react";

// 2. Internal modules with path alias (newline separator)
import type { SiteInfo } from "@/types";
import { useSelectedElement } from "@/hooks/use-selected-element";

// 3. Relative imports
import { App } from "./app";
import "./styles.css";
```

Use `import type { ... }` for type-only imports.

### TypeScript

- **Strict mode**: Enabled
- **Target**: ES2022
- **Path alias**: `@/*` maps to `./src/*`

#### Types & Interfaces

- Use `interface` for data structures (not type aliases)
- Webflow types are global (e.g., `AnyElement`, `webflow`)
- Define custom types in `src/types.ts`

```typescript
// Good - interface for data structures
export interface SiteInfo {
  siteId: string;
  siteName: string;
}

// Type imports
import type { SiteInfo } from "@/types";
```

### Naming Conventions

| Entity              | Convention                  | Example                         |
| ------------------- | --------------------------- | ------------------------------- |
| Files               | kebab-case                  | `use-selected-element.ts`       |
| Components          | PascalCase                  | `function App()`                |
| Hooks               | camelCase with `use` prefix | `function useSelectedElement()` |
| Interfaces          | PascalCase                  | `interface SiteInfo`            |
| Constants           | SCREAMING_SNAKE_CASE        | `const CACHE_TTL_MS = 60_000`   |
| Variables/Functions | camelCase                   | `const elementId`               |

### React Patterns

#### Components

- Functional components only (no class components)
- Use React 19 with automatic JSX runtime
- Wrap root in `React.StrictMode`

```tsx
export function App() {
  return <div className="container">...</div>;
}
```

#### Custom Hooks

- Place in `src/hooks/` directory
- Return objects with `{ data, isLoading, error }` pattern for async operations
- Include JSDoc with `@example` blocks
- Proper cleanup with subscription unsubscribe

````typescript
/**
 * Description of what the hook does.
 *
 * @returns Description of return value
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useMyHook();
 * ```
 */
export function useMyHook() {
  const [data, setData] = useState<MyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Setup
    const unsubscribe = webflow.subscribe("event", handler);
    return () => unsubscribe(); // Cleanup
  }, []);

  return { data, isLoading, error };
}
````

### Error Handling

- Use boolean `error` state for simple error tracking
- Use `webflow.notify()` for user-facing errors
- Handle async errors with try/catch or `.catch()`

```typescript
try {
  const result = await webflow.someApi();
  // handle success
} catch {
  setError(true);
  await webflow.notify({
    type: "Error",
    message: "User-friendly error message",
  });
}
```

### CSS Guidelines

- Single stylesheet at `src/styles.css`
- Use CSS custom properties for theming
- Leverage Webflow's design tokens (`--font-stack`, `--text1-3`, `--background1-4`, etc.)
- Use `clamp()` for responsive sizing
- Modern CSS nesting syntax is supported
- Class naming: lowercase with hyphens (`.card-heading`, `.btn-primary`)

## Webflow Designer API

The `webflow` global variable is available for interacting with the Designer:

```typescript
// Get selected element
const element = await webflow.getSelectedElement();

// Subscribe to selection changes
const unsubscribe = webflow.subscribe("selectedelement", callback);

// Get site info
const siteInfo = await webflow.getSiteInfo();
```

## File Structure

```
src/
  hooks/           # Custom React hooks for Webflow API
  app.tsx          # Main application component
  index.tsx        # Entry point with React root
  index.html       # HTML template
  styles.css       # Global styles
  types.ts         # TypeScript type definitions
```

## Linting Rules

Oxlint extends `ultracite/oxlint/core` and `ultracite/oxlint/react`. Run `pnpm check` to verify code quality and `pnpm fix` to auto-fix issues.
