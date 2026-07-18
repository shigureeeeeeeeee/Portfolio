# Repository Guidelines

回答はすべて日本語で行うこと。

## Project Structure & Module Organization
The Next.js App Router lives in `src/app`, where `layout.tsx` wires providers and `page.tsx` composes the landing view. Reusable UI blocks belong in `src/components`, shared context such as `LanguageContext` sits in `src/contexts`, and localized copy and datasets are versioned in `src/data`. Custom hooks (`src/hooks`) and utilities (`src/utils`) keep logic consumable across features. Global Tailwind layers are defined in `src/app/globals.css` and `styles/global.css`, static assets remain in `public/`, and exploratory concepts stay inside `stitch_/` so production bundles stay lean.

## Build, Test, and Development Commands
- `npm install` resolves dependencies; rerun after any `package.json` update.
- `npm run dev` starts the hot-reloading dev server on `http://localhost:3000`.
- `npm run build` compiles the production bundle and surfaces type or lint issues.
- `npm run start` serves the optimized build for final smoke checks.
- `npm run lint` executes ESLint for `src`; keep this clean before opening a PR.
- Vercel deploys the production site automatically when changes reach `main`; keep its `Next.js` framework and output settings at their defaults.

## Coding Style & Naming Conventions
Strict TypeScript is enabled; favor typed props and narrow unions over `any`. Components and files in `src/components` use PascalCase, hooks begin with `use`, and data modules export camelCase constants. JSX attributes use double quotes, indentation is two spaces, and Tailwind utilities should remain grouped from layout → spacing → color for readability. Prefer path aliases like `@/components` over deep relative imports. Always run `npm run lint` before committing to catch accidental style regressions.

## Testing Guidelines
An automated test harness is not yet configured, so lean on `npm run lint`, `npm run build`, and manual cross-browser checks. When adding tests, colocate them with the feature (`Component.test.tsx`) and reach for React Testing Library with Vitest or Playwright for UI flows. Include coverage for both JA and EN locales whenever copy changes. Document any new test commands in this guide once the tooling lands.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commits (e.g., `Add LanguageToggle component`). Keep the subject under 50 characters, add context in the body when behavior changes, and avoid committing generated build artifacts. Pull requests should summarize scope, list verification steps (`npm run lint`, `npm run build`, screenshots for UI), and reference issues with `Closes #ID` where applicable. Call out localization updates so reviewers can validate both languages.

## Localization & Content Updates
Translations live in `src/data/translations.ts` and are consumed through `LanguageProvider`. Whenever you introduce new copy, update both locales and confirm the toggle still switches correctly. Structured content such as skills and projects should be appended to the relevant file in `src/data`, keeping presentation components free of hardcoded strings. Assets shared between locales belong in `public/` with descriptive, locale-agnostic names.
