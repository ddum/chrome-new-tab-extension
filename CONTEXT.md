# CONTEXT.md

Stable architecture and domain context. Exact commands live in `AGENTS.md`.

## Language

**Background**:
The image currently shown on the new tab, identified by a single URL. An empty URL means no image has been chosen.
_Avoid_: Source settings, selected source

**Source**:
A way of choosing the background. Unsplash is a source. A source may keep its own settings; those settings are not the background.
_Avoid_: Form

**Unsplash settings**:
The tags and access key that belong to the Unsplash source. They remain when another source is selected.
_Avoid_: Background

**Selected source**:
The source whose settings are open. It is independent of which image is showing.
_Avoid_: Active source

<!-- AUTO-GENERATED: ENRICH-CONTEXT -->
## Architecture Summary

Single-page Chrome new-tab extension without a router or backend. `index.html` loads `src/app/main.ts`, which installs Pinia and mounts `src/app/App.vue`. The shell composes four features: clock, links, background, and settings. Layout is slim feature-sliced: `app` → `features` → `shared`. Features do not import each other statically. Background and links each export a settings tab; `src/app/settings-tabs.ts` composes that list, and `App.vue` passes it to the panel through `provideSettingsTabs` / `useSettingsTabs`. Each tab is a `defineAsyncComponent` in that feature's `settings-tab.ts`. The panel renders the list and does not import feature UI.

Persisted preferences are one JSON snapshot `{ background, links }` in `localStorage` key `ChromeNewTab`, exposed through `shared/model/app-snapshot`. `shared` keeps `AppValue` empty. Background and links declare their sections via module augmentation in `model/types.ts` and read them with `useSnapshotSection(key, defaults)`, which restores a missing section from that feature's defaults. The `background` section is `{ url, source, sources }`: the current image URL, the selected source id, and per-source settings (`sources.unsplash = { tags, accessKey }`). Domain Pinia stores (`useBackgroundStore`, `useLinksStore`) mutate slices of that snapshot. Import/export uses the same JSON shape: every supplied section replaces its persisted value, and sections missing from the file stay. The Unsplash key is not stored in source; the user enters it in background settings.

A background source is a self-contained UI module in `features/background/sources/<id>/`, registered in `sources/constants.ts` as `BACKGROUND_SOURCES`. Its component receives its own settings via `v-model` and emits `apply(url)`; it does not import the store. `SettingsBackground.vue` renders the selected source and writes `apply` into `useBackgroundStore.setUrl`. Adding a source: the module folder with a component-free `settings.ts` (settings type and defaults), its entry in `BackgroundSourceSettings` (`features/background/model/types.ts`) and in the store defaults, and a registry entry.

## Repository Map

| Path | Responsibility |
| --- | --- |
| `src/app/main.ts` | Vue bootstrap, Pinia registration, global styles. |
| `src/app/App.vue` | New-tab shell: clock, links list, settings button, and the background image. Passes the settings tab list through `provideSettingsTabs`. |
| `src/app/settings-tabs.ts` | Composes feature settings tabs for the settings panel. |
| `src/app/main.css` | Tailwind v4 entry: `@theme` tokens as CSS variables and base styles. |
| `src/features/clock/` | Clock UI and `useDateTime`. |
| `src/features/links/` | Saved links list, add/delete forms, `useLinksStore`. |
| `src/features/background/` | `useBackgroundStore`, `SettingsBackground.vue` shell, source registry. |
| `src/features/background/sources/unsplash/` | Unsplash source: access-key and tags fields, refresh button, Unsplash API. |
| `src/features/settings/` | Settings panel and import/export (`backup.ts`). The panel renders tabs it is given and does not import other features. |
| `src/shared/ui/` | Reusable controls and layout primitives. |
| `src/shared/lib/` | Domain-agnostic helpers: `useStorage`, `useFileSystem`. |
| `src/shared/model/app-snapshot/` | Persisted snapshot store, open `AppValue` interface, `useSnapshotSection`. |
| `src/shared/config/app.ts` | Storage key, Unsplash origin, locale. |
| `public/manifest.json` | MV3 identity and new-tab override. |
| `scripts/sync-version.js` | Copies package version into the extension manifest. |

## State And Data Boundaries

| State | Owner | Persistence |
| --- | --- | --- |
| Background URL, selected source, per-source settings | `useBackgroundStore` via `useSnapshotSection` | `localStorage` key `ChromeNewTab`, field `background` |
| Saved links | `useLinksStore` via `useSnapshotSection` | `localStorage` key `ChromeNewTab`, field `links` |
| Current date/time | `useDateTime` | In-memory |
| Unsplash fetch status and candidate URL | `sources/unsplash/model/useRandomPhoto` | In-memory |
| Settings selection | Settings components | In-memory |

## User Flows And Rules

| Flow | Path | Rule |
| --- | --- | --- |
| Time display | `features/clock/ui/TimeString.vue` → `useDateTime.ts` | Time shows hours and minutes. Time and date are formatted for `ru-RU`. |
| Link management | `SettingsLinks.vue` → `FormAddLink` / delete → `useLinksStore`; `LinksList.vue` reads `items` | Empty URL or title and duplicate URLs are ignored; deleting a URL removes matching entries. |
| Unsplash tags | `SettingsUnsplash` → `UnsplashTagsField` → `v-model` → `useBackgroundStore.setSourceSettings` | Empty and duplicate tags are ignored. |
| Unsplash access key | `SettingsUnsplash` → `UnsplashAccessKeyField` → `v-model` → `useBackgroundStore.setSourceSettings` | The key is persisted in `background.sources.unsplash.accessKey`; an empty value clears it. |
| Unsplash refresh | `RefreshUnsplashButton.vue` → `model/useRandomPhoto` → `api/fetchRandomPhoto.ts` → `apply(url)` → `useBackgroundStore.setUrl` | The access key is passed to Unsplash as `client_id`. A fetch is skipped when the key is empty. A fetched image is preloaded before `apply` is emitted. |
| Settings transfer | `SettingsTransfer.vue` → `useSettingsTransfer` | JSON contains `background` and `links`; supplied sections replace persisted values. |

## Test Strategy And Known Constraints

- Vitest + Vue Test Utils tests live in a `__tests__` directory next to the module and run in jsdom (`globals: true`).
- Preserve the public manifest's MV3 new-tab override and the `ChromeNewTab` / `{ background, links }` import-export contract when making feature changes. The Unsplash access key lives in the user snapshot, not in source, docs, or test fixtures.
- `public/manifest.json` contains a version synchronized from `package.json` by the release script.
<!-- END AUTO-GENERATED: ENRICH-CONTEXT -->
