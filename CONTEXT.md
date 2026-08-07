# CONTEXT.md

Stable architecture and domain context. Exact commands live in `AGENTS.md`.

<!-- AUTO-GENERATED: ENRICH-CONTEXT -->
## Architecture Summary

Single-page Chrome new-tab extension: `index.html` loads the Vite Vue app, `src/main.ts` installs Pinia, and `App.vue` composes the clock, saved links, settings, and background refresh. There is no router or backend. Shared user preferences are centralized in one Pinia setup store and persisted through browser `localStorage`.

## Repository Map

| Path | Responsibility |
| --- | --- |
| `src/main.ts` | Vue bootstrap, Pinia registration, global styles. |
| `src/App.vue` | New-tab shell and top-level composition. |
| `src/stores/index.ts` | Persisted background/link state, import/export contract, mutation rules. |
| `src/composables/useStorage.ts` | Reactive `localStorage` adapter. |
| `src/composables/useBackground.ts` | Random background retrieval and image preload. |
| `src/composables/useDateTime.ts` | Localized clock and date state. |
| `src/composables/useFileSystem.ts` | Import/export file-picker boundary. |
| `src/components/` | Feature UI; `element/` contains reusable controls and table primitives. |
| `public/manifest.json` | MV3 identity and new-tab override. |
| `scripts/sync-version.js` | Copies package version into the extension manifest. |

## State And Data Boundaries

| State | Owner | Persistence |
| --- | --- | --- |
| Background URL and tags | `useAppStore` | `localStorage` key `background` |
| Saved links | `useAppStore` | `localStorage` key `links` |
| Current date/time | `useDateTime` | In-memory |
| Background fetch status and candidate URL | `useBackground` | In-memory |
| Settings selection | Settings components | In-memory |

## User Flows And Rules

| Flow | Path | Rule |
| --- | --- | --- |
| Time display | `TimeString.vue` → `useDateTime.ts` | Formats time and date for `ru-RU`. |
| Link management | Settings links/forms → `useAppStore` → `LinksList.vue` | Empty URL or title is ignored; deleting a URL removes matching entries. |
| Background tags | Background settings/forms → `useAppStore` → background refresh | Empty and duplicate tags are ignored. |
| Background refresh | `BackgroundRefresh.vue` → `useBackground.ts` → store | A fetched image is preloaded before its URL is persisted. |
| Settings transfer | `SettingsMenu.vue` → `useFileSystem.ts` / store | JSON contains `background` and `links`; supplied sections replace persisted values. |

## Test Strategy And Known Constraints

- Co-located Vitest + Vue Test Utils tests run in jsdom.
- Preserve the public manifest's MV3 new-tab override and the localStorage/import-export contract when making feature changes.
- `public/manifest.json` contains a version synchronized from `package.json` by the release script.
<!-- END AUTO-GENERATED: ENRICH-CONTEXT -->
