# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
