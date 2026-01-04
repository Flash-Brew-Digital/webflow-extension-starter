# Webflow Extension Starter

A minimal starter template for building Webflow Designer Extensions with React, TypeScript, Ultracite and Rspack.

![Flash Brew Digital OSS](https://img.shields.io/badge/Flash_Brew_Digital-OSS-6F4E37?style=for-the-badge&labelColor=E9E3DD)
![MIT License](https://img.shields.io/badge/License-MIT-6F4E37?style=for-the-badge&labelColor=E9E3DD)
![Webflow Community Resource](https://img.shields.io/badge/Community_Resource-146EF5?style=for-the-badge&logo=webflow&logoColor=white)

## Features

- **React 19** with TypeScript
- **Custom hooks** for common Designer API patterns
  - `useSelectedElement` — Subscribe to element selection changes
  - `useSiteInfo` — Fetch site metadata
  - `useElementSnapshot` — Capture element screenshots with caching
- **Rspack** for fast Rust-based bundling
- **Oxlint** and **Oxfmt** for type-aware linting and formatting (via Ultracite)

## Getting started

### CLI (recommended)

```bash
npx create-webflow-extension@latest
```

> The CLI will handle scaffolding the project for you. This includes cloning the repo, installing dependencies, and initializing a git repository (if desired). For more information, see the [create-webflow-extension](https://github.com/Flash-Brew-Digital/create-webflow-extension) README.

### Clone the template manually

```bash
git clone -b template https://github.com/Flash-Brew-Digital/webflow-extension-starter.git
cd webflow-extension-starter
npm install
```

> The template branch is used by the CLI to scaffold new projects. The default package manager and linter/formatter are removed plus the .github directory. If you prefer to keep those, you can clone the main branch instead.

### Development

```bash
pnpm dev
```

This runs Rspack in watch mode and starts the Webflow extension server at `localhost:1337`.

### Testing in Webflow

1. Open your Webflow workspace settings
2. Navigate to **Apps & Integrations** → **Develop**
3. Click **Create an App** and configure it accordingly
4. Open a project in the Designer
5. Press **E** to open the apps panel and launch your extension

## Project structure

```plaintext
├── src/
│   ├── hooks/
│   │   ├── useElementSnapshot.ts
│   │   ├── useSelectedElement.ts
│   │   └── useSiteInfo.ts
│   ├── app.tsx
│   ├── index.html
│   ├── index.tsx
│   ├── styles.css
│   └── types.ts
├── dist/                 # Build output
├── package.json
├── tsconfig.json
├── rspack.config.js
└── webflow.json          # Extension configuration
```

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `pnpm dev`        | Start development server with hot reload |
| `pnpm build`      | Production build                         |
| `pnpm bundle`     | Build and bundle for deployment          |
| `pnpm type-check` | Run TypeScript type checking             |
| `pnpm check`      | Run linter                               |
| `pnpm fix`        | Auto-fix linting issues                  |

## Configuration

### Extension settings

Edit `webflow.json` to configure your extension:

```json
{
  "name": "Your Extension Name",
  "apiVersion": "2",
  "size": "comfortable",
  "publicDir": "dist"
}
```

Available sizes: `default` (240×360), `comfortable` (320×460), `large` (800×600)

## Resources

- [Designer Extensions documentation](https://developers.webflow.com/designer/docs/designer-extensions)
- [Designer APIs reference](https://developers.webflow.com/designer/reference/introduction)
- [Webflow Apps UI Kit (Figma)](https://www.figma.com/community/file/1291823507081366246/webflow-app-ui-kit-2-0)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](.github/CONTRIBUTING.md) for more information.

## License

[MIT License](LICENSE.md)

## Author

[Ben Sabic](https://bensabic.ca) at [Flash Brew Digital](https://flashbrew.digital)
