# 1o1e

A documentation site built with Docusaurus, React, and MDX for publishing styled articles and essays.

## Features

- 📚 Documentation-focused site (not a blog)
- ⚛️ Built with React and MDX
- 🎨 Clean, professional styling
- 📝 Support for articles and essays
- 🔍 Full-text search
- 🌙 Dark mode support

## Getting Started

### Prerequisites

- Node.js version 22.0 or above

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
npm run deploy
```

This command builds the website and pushes to the `gh-pages` branch for GitHub Pages hosting.

## Project Structure

```
├── docs/                 # Documentation files (MDX)
├── src/
│   ├── components/      # React components
│   ├── css/            # Custom CSS
│   └── pages/          # Custom pages
├── static/             # Static assets
├── docusaurus.config.ts # Docusaurus configuration
└── sidebars.ts         # Sidebar configuration
```

## Writing Content

Add your articles and essays as `.md` or `.mdx` files in the `docs/` directory. The sidebar will be automatically generated based on the folder structure.

For more information, see the [Docusaurus documentation](https://docusaurus.io/).

## License

Copyright © 2025 1o1e. Built with Docusaurus.
