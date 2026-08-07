# AGENTS.md

Project operating rules and exact validation commands. Architecture and domain context live in `CONTEXT.md`.

<!-- AUTO-GENERATED: ENRICH-AGENTS -->
## Stack

- Vue 3 + TypeScript, Vite, Pinia, and Vitest; npm is the package manager.
- This is a Manifest V3 Chrome new-tab extension. The build output is loaded unpacked from `dist/`.

## Commands

| Task | Command |
| --- | --- |
| Install dependencies | `npm ci` |
| Development server | `npm run dev` |
| Lint | `npm run lint` |
| Type-check | `npm run type-check` |
| Unit tests | `npm run test:run` |
| Build | `npm run build` |
| Preview production build | `npm run preview` |

No integration or smoke/E2E test command is configured.

## Constraints

- Do not edit generated or ignored outputs: `dist/`, `coverage/`, `node_modules/`, or `*.tsbuildinfo`.
- `scripts/sync-version.js` synchronizes the version in `public/manifest.json`; do not manually desynchronize those versions.
- Treat external-service credentials as secrets: do not add, copy, or expose them in source, documentation, test fixtures, or output.
- Release scripts invoke `npm version`, then push commits and tags. Run them only when explicitly requested.
- Preserve the persisted localStorage keys (`background`, `links`) and import/export JSON shape unless a migration is part of the task.

## Relevant Skills

- `vue-deep-dive` for repository onboarding.
- `vue-testing-unit` and `testing-routing` for test work.
- `agentic-infrastructure` for maintaining these project guides.
<!-- END AUTO-GENERATED: ENRICH-AGENTS -->
