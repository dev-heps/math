# Agent Notes

This repository is the standalone Math Archive for `https://dwlee.github.io/math-archive/`.

## Purpose

- Keep math writing separate from the main portfolio.
- Use MDX for pages and KaTeX for equations.
- Keep section names consistent across navigation, page titles, and links.

## Current Sections

- `Math Archive`: `src/app/page.mdx`
- `Studies`: `src/app/studies/page.mdx`
- `Formalization`: `src/app/formalization/page.mdx`
- `Models`: `src/app/models/page.mdx`

## Editing Rules

- This is a Next app using the App Router and MDX.
- This project uses a newer Next version than the main portfolio. If unsure, read local Next docs in `node_modules/next/dist/docs/` before changing framework-specific behavior.
- Keep `basePath: '/math-archive'`, `output: 'export'`, and `trailingSlash: true` in `next.config.mjs`.
- Link public pages with the full base path in MDX content when needed, for example `/math-archive/studies/`.
- Keep the header links aligned with actual pages.
- Do not leave placeholder `href="#"` links.

## Checks

Run before commit:

```bash
npm run build
git diff --check
```

After pushing, verify:

- `https://dwlee.github.io/math-archive/`
- `https://dwlee.github.io/math-archive/studies/`
- `https://dwlee.github.io/math-archive/formalization/`
- `https://dwlee.github.io/math-archive/models/`
