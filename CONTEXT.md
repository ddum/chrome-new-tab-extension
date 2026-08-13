# CONTEXT.md

Stable architecture and domain context. Exact commands live in `AGENTS.md`.

<!-- AUTO-GENERATED: ENRICH-CONTEXT -->
## Architecture Summary

Single-page Chrome new-tab extension without a router or backend. `index.html` loads `src/app/main.ts`, which installs Pinia and mounts `src/app/App.vue`. The shell composes four features: clock, links, background, and settings. Layout is slim feature-sliced: `app` → `features` → `shared`. Features do not import each other statically; settings tabs load via dynamic `import()`.

Persisted preferences are one JSON snapshot `{ background, links }` in `localStorage` key `ChromeNewTab`, exposed through `useAppSnapshot`. Domain Pinia stores (`useBackgroundStore`, `useLinksStore`) mutate slices of that snapshot. Import/export uses the same JSON shape: supplied sections replace, missing sections stay.

## Repository Map

| Path | Responsibility |
| --- | --- |
| `src/app/main.ts` | Vue bootstrap, Pinia registration, global styles. |
| `src/app/App.vue` | New-tab shell: clock, links list, settings, background refresh. |
| `src/app/styles/base.css` | Global tokens and base styles. |
| `src/features/clock/` | Localized clock UI and `useDateTime`. |
| `src/features/links/` | Saved links list, add/delete forms, `useLinksStore`. |
| `src/features/background/` | Tags, refresh button, Unsplash API, `useBackgroundStore`. |
| `src/features/settings/` | Settings panel, import/export (`backup.ts`). |
| `src/shared/ui/` | Reusable controls and table primitives. |
| `src/shared/lib/` | `useStorage`, `useAppSnapshot`, `useFileSystem`, persist types. |
| `src/shared/config/app.ts` | Storage key, Unsplash origin, locale. |
| `src/shared/assets/` | SVG icons used by UI. |
| `public/manifest.json` | MV3 identity and new-tab override. |
| `scripts/sync-version.js` | Copies package version into the extension manifest. |

## State And Data Boundaries

| State | Owner | Persistence |
| --- | --- | --- |
| Background URL and tags | `useBackgroundStore` via `useAppSnapshot` | `localStorage` key `ChromeNewTab`, field `background` |
| Saved links | `useLinksStore` via `useAppSnapshot` | `localStorage` key `ChromeNewTab`, field `links` |
| Current date/time | `useDateTime` | In-memory |
| Background fetch status and candidate URL | `useRandomBackground` | In-memory |
| Settings selection | Settings components | In-memory |

## User Flows And Rules

| Flow | Path | Rule |
| --- | --- | --- |
| Time display | `features/clock/ui/TimeString.vue` → `useDateTime.ts` | Formats time and date for `ru-RU`. |
  | Link management | Settings links/forms → `useLinksStore` → `LinksList.vue` | Empty URL or title and duplicate URLs are ignored; deleting a URL removes matching entries. |
| Background tags | Background settings/forms → `useBackgroundStore` | Empty and duplicate tags are ignored. |
| Background refresh | `BackgroundRefresh.vue` → `useRandomBackground` → `unsplash.ts` → `useBackgroundStore.setUrl` | A fetched image is preloaded before its URL is persisted. |
| Settings transfer | `SettingsMenu.vue` → `useFileSystem` / `useSettingsBackup` | JSON contains `background` and `links`; supplied sections replace persisted values. |

## Test Strategy And Known Constraints

- Co-located Vitest + Vue Test Utils tests run in jsdom (`globals: true`).
- Preserve the public manifest's MV3 new-tab override and the `ChromeNewTab` / `{ background, links }` import-export contract when making feature changes.
- `public/manifest.json` contains a version synchronized from `package.json` by the release script.
<!-- END AUTO-GENERATED: ENRICH-CONTEXT -->
