# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
