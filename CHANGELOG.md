# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-11-01

### Security

- **deps**: Upgrade `nuxt` from 3.21.11 to ^4.6.3 (#41). Nuxt 3 is end of life and will not patch these; 4.6.2 is still missing the 4.6.3 fixes:
  - GHSA-2fxj-c3j7-rr69 — redirect route rules were not applied to server island pages (fixed in 4.6.3)
  - GHSA-648h-gw55-m2g7 — `@nuxt/vite-builder` dev server could expose private runtime config (fixed in 4.6.3)
  - GHSA-9v7c-q64q-vv33 — dot segments in the request path bypassed server middleware and route rules (fixed in 4.6.3)
  - GHSA-xfq5-w38q-pc2x — `useHeadSafe` input on server islands was not sanitised (fixed in 4.6.2)
  - GHSA-vjh5-4x84-xrqp — route rules skipped for case-variant paths (fixed in 4.6.2)
  - GHSA-jjm6-p2m9-9w4x — `javascript:` URLs with a leading control character on `<NuxtLink>` when `pages` is disabled (fixed in 4.6.0)
- **deps**: Drop the `@nuxt/devtools@3.4.3` override. Nuxt 4.6.3 depends on `@nuxt/devtools@^3.4.4`, which does not depend on `simple-git` (issue #11).
- **deps**: `listhen` now resolves `node-forge@1.4.2` (GHSA-86w9-cpqp-85rv affected `<=1.4.0`; fixed in 1.4.1). `npm audit` no longer reports `node-forge` or `simple-git` (issue #11).

### Changed

- **app**: Move `app.vue`, `pages/`, `components/` and `assets/` into the Nuxt 4 `app/` directory. `server/` and `shared/` stay at the repo root. `~` is `app/`; shared types import from `#shared`.
- **deps**: Align direct dependencies with Nuxt 4.6.3: `vue@^3.5.44`, `vue-router@^5.4.0`. Keep `h3@^1.15.11` — Nitro 2 still uses h3 v1, and hoisting h3 2 breaks `getQuery`.
- **engines**: Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`, matching Nuxt 4.6. CI runs 22.22.3 and 24.
- **server**: Import `defineEventHandler`, `getQuery` and `getRouterParam` from `h3` so route handlers stay on the h3 v1 event (Nuxt 4.6 auto-imports are h3 v1; `nuxt/server` helpers expect a different event).

### Upgrade note

**Breaking for forks of this starter.**

- Node.js 22.13 through 22.22.2, and Node.js 24.0 through 24.14, no longer match Nuxt 4.6. Node 23 and 25 are not supported. Use Node 22.22.3+, Node 24.15+, or Node 26+.
- Vue files live under `app/`. The `~` alias no longer points at the repository root. Import shared types with `#shared/…` (`~~` is the root).
- `vue-router` is now 5, brought in by Nuxt. This starter only uses `NuxtLink` and `useRoute`.

## [1.1.3] - 2026-10-26

### Security

- **deps**: Refresh `package-lock.json` within existing ranges to pick up patched transitive dependencies (#30, refs #11):
  - `vite` 8.3.3 / 7.3.7 — GHSA-rq7h-c2jc-7f22, GHSA-vfpm-58rq-9qcg, GHSA-9jrq-w75r-8gcw
  - `launch-editor` 2.14.2 — GHSA-587h-7wmj-h5pm, GHSA-698v-4r3x-3vcv, GHSA-r825-w8mm-5pxw
  - `serialize-javascript` 7.1.3 — GHSA-m5mm-p8h7-m29v
  - `@modelcontextprotocol/server` 2.3.0 — GHSA-46jr-4wx8-v453, GHSA-jm63-cq47-j5jp, GHSA-rvq5-wwqv-78pq
  - `@modelcontextprotocol/client` 2.3.0 — GHSA-6prh-2h8m-c8cw
  - `zod` 4.6.6 — GHSA-mrhx-c7xc-m3w5

### Known issues

- `nuxt` / `@nuxt/nitro-server` 3.21.11 advisories (GHSA-xfq5-w38q-pc2x, GHSA-vjh5-4x84-xrqp, GHSA-jjm6-p2m9-9w4x) have no fixed 3.x release and require the Nuxt 4 migration (#8).
- `node-forge` 1.4.0 (GHSA-86w9-cpqp-85rv, via `listhen`) has no fixed release yet; tracked in #11.

## [1.1.2] - 2026-10-23

### Changed

- Switch the README brand header (`.github/assets/header-light.svg` / `header-dark.svg`) to Externa mark v3 (#25)

## [1.1.1] - 2026-10-21

### Fixed

- **app.vue**: Replace `<slot />` with `<NuxtPage />` so pages render correctly (#18)
- **deps**: Pin `h3@^1.15.11` to prevent hoisted h3 2.0.1-rc from breaking `getQuery` in server routes (#19)
- **engines**: Tighten Node.js requirement to `>=22.13.0` to match actual toolchain requirements (eslint needs `Object.groupBy`) (#20)

### Changed

- Update CI matrix to test both Node 22.13.0 and 24
- Update README to reflect Node.js 22.13+ requirement
- Add query parameter support (`?page=` and `?locale=`) to `/api/home` route as demonstration of working `getQuery`

### Upgrade note

**Minimum Node.js version is now 22.13.0.** Node.js 20 reached end-of-life in April 2026 and is no longer supported by the toolchain (eslint requires `Object.groupBy` from Node 21+). Users running Node 20 must upgrade to Node 22.13+ or Node 24+ before updating to this version.

## [1.1.0] - 2026-10-21

Initial release with Nuxt 3.19+ support.
