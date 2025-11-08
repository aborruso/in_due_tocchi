# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Riformula** is a progressive web app (PWA) that transforms shared links into curated text messages formatted according to user-selected templates. Core design principle: zero copy-paste, maximum automation through Android Share Target and Web Share API.

Key constraints:
- **Offline-first**: Works completely offline after first load via Service Worker
- **Static deployment**: Hosted on GitHub Pages (`/in_due_tocchi/` path)
- **Android-first**: Share Target integration on Android; explicit warnings on desktop
- **YAML-driven templates**: Default templates in `src/data/templates.yaml` loaded at build time; custom templates stored in localStorage

## Build & Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production (generates dist/)
npm run build

# Preview production build locally
npm run preview

# Check Astro CLI
npm run astro -- --help
```

**Key detail**: The `prebuild` hook (`update-cache-version.js`) auto-increments the Service Worker cache version to bust old caches on each deployment.

## Architecture & Critical Flows

### Data Flow: Share Target → Template → Output Share

1. **Inbound Share (Android)**: App receives URL parameters via manifest `share_target` config:
   - Params: `?title=...&text=...&url=...`
   - Parsed by `parseSharedData()` in `src/lib/share.js`
   - Android workaround: URLs often appear in `text` field instead of `url` field (regex extraction in function)

2. **Template Application**:
   - Default templates loaded from YAML at build time into `window.DEFAULT_TEMPLATES`
   - User can select template → `applyTemplate()` replaces placeholders: `{title}`, `{text}`, `{url}`
   - Optional: append URL if not already in template
   - Free-text mode available if no template selected

3. **Outbound Share**:
   - Web Share API (`navigator.share()`) if available
   - Fallback: Clipboard API with browser fallback (`document.execCommand('copy')`)
   - Empty URL detection clears query params via `history.replaceState()` to avoid URL pollution

### Component Organization

- **index.astro**: Main app shell, inline scripts, PWA setup, device detection modal
- **TemplateSelect.astro**: Template button grid (no client logic, rendered by JS)
- **TextPreview.astro**: Output textarea, character count, append-URL checkbox
- **ShareButtons.astro**: Share/Copy buttons, feedback message container

All component styles: Tailwind CSS utility classes. No Astro component interactivity—all logic in `<script>` tag in `index.astro`.

### Service Worker & Cache Strategy

- **File**: `public/sw.js`
- **Cache key**: `riformula-v${CACHE_VERSION}` (timestamp-based, e.g., `20251108-0800`)
- **Strategy**: Cache-first (serve from cache, fallback to network)
- **Update flow**:
  1. On page load, SW registers and checks for updates every 5 minutes
  2. On activation, old caches deleted, clients notified via `SW_UPDATED` message
  3. Banner prompts user to reload

**Critical**: `CACHE_VERSION` in `public/sw.js` must be manually updated or via `update-cache-version.js`. Check this when debugging offline issues.

### Template System (YAML-driven)

**File**: `src/data/templates.yaml`

Structure:
```yaml
- id: unique-id
  name: Display Name
  emoji: "📝"
  active: true/false      # Controls if included in build
  template: |
    {title}
    {text}
    {url}
```

At build time:
- YAML parsed by `js-yaml` in `src/pages/index.astro`
- Only templates with `active: true` included
- Stringified to JSON and embedded inline: `window.DEFAULT_TEMPLATES`

When adding/modifying templates:
1. Edit `src/data/templates.yaml`
2. Set `active: true` to include in build
3. Test locally with `npm run dev`
4. Build and check `dist/` has correct templates

## Testing & Debugging

### Local Testing

```bash
npm run build
npm run preview
```
Then on Android Chrome:
1. Install the app (Chrome menu → "Install app")
2. Share a link from another app
3. Select "Riformula" from share target list
4. Verify template applies and output looks correct

### DevTools Inspection

- **PWA config**: Chrome DevTools → Application tab → Manifest
- **Service Worker**: Application → Service Workers (check cache, controlled clients)
- **Cache contents**: Application → Cache Storage → `riformula-v*`
- **Console errors**: Check for JS errors on mobile via USB debugging

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Share Target not appearing | SW not registered or manifest invalid | Check manifest path in `astro.config.mjs` (`base: '/in_due_tocchi'`) |
| Old version still cached | Cache version not bumped | Update `CACHE_VERSION` in `public/sw.js` or run `npm run build` |
| Template placeholders not replaced | Wrong placeholder syntax | Use `{title}`, `{text}`, `{url}` exactly |
| Share API fails silently | Not on Android or HTTPS required | Share API only works on secure contexts (HTTPS + Android) |
| URL param detection broken | Android puts URL in `text` field | `parseSharedData()` handles this with regex fallback |

## File Paths to Know

- **Templates (YAML)**: `src/data/templates.yaml`
- **Main entry**: `src/pages/index.astro` (all app logic here)
- **Utility libs**: `src/lib/templates.js`, `src/lib/share.js`
- **Service Worker**: `public/sw.js` (cache version **here**)
- **PWA manifest**: `public/manifest.webmanifest` (share_target config)
- **Deployment config**: `astro.config.mjs` (base path, output mode)
- **Cache version script**: `update-cache-version.js` (runs on prebuild)

## Deployment Notes

- App deployed to: `https://aborruso.github.io/in_due_tocchi/`
- Base path: `/in_due_tocchi/` (hardcoded in manifest, SW, astro.config)
- All absolute paths must include base path prefix
- HTTPS required for PWA + Share Target
- Icons must exist in `public/icons/` (referenced in manifest)

## OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.