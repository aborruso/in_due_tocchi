<!-- OPENSPEC:START -->
# OpenSpec Instructions

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

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ShareForge** is a progressive web app (PWA) that transforms shared links into curated prompts for LLMs. Core design principles: eliminate repetitive prompt writing, work with any LLM client, maintain zero costs through static architecture.

Key constraints:
- **Offline-first**: Works completely offline after first load via Service Worker
- **Static deployment**: Hosted on GitHub Pages (`/in_due_tocchi/` path)
- **Android-first**: Share Target integration on Android; explicit warnings on desktop
- **YAML-driven templates**: Default templates in `src/data/templates.yaml` loaded at build time; custom templates stored in localStorage

## Build & Development Commands

```bash
# Development server with hot reload (localhost:3000)
npm run dev

# Build for production (generates dist/)
npm run build

# Preview production build locally (static server, not hot reload)
npm run preview

# Check Astro CLI
npm run astro -- --help
```

**Key detail**: The `prebuild` hook (`update-cache-version.js`) auto-increments the Service Worker cache version before each build to bust old caches on deployment. This happens automatically when you run `npm run build`.

**For CI/CD**: Use `npm ci` instead of `npm install` (cleaner, deterministic).

## Development Workflow

### Typical dev loop:

1. Run `npm run dev` → opens `http://localhost:3000/in_due_tocchi/`
2. Hot reload on file changes (Astro default)
3. Edit component or JS → auto-reload in browser
4. Edit YAML templates → auto-reload and re-embed in `window.DEFAULT_TEMPLATES`

### When to rebuild:

- **Never during `npm run dev`**: It watches and hot-reloads automatically
- **Before testing PWA/SW features**: Use `npm run build && npm run preview` to test production bundle
- **Before deploying**: Just push to `main`; GitHub Actions handles the build

### Quick template testing:

1. Edit `src/data/templates.yaml`
2. Keep `npm run dev` running → auto-reloads
3. Refresh browser → new templates appear immediately
4. Test in browser; if happy, commit and push

### Debugging tips:

- **Console errors**: Open DevTools (F12) → Console tab → look for red errors
- **Network issues**: DevTools → Network tab → check failed requests
- **Offline testing**: During `npm run dev`, can't test SW (needs HTTPS). Use `npm run preview` instead.
- **localStorage**: DevTools → Application → Local Storage → `https://localhost:3000` to inspect template data

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

- **index.astro**: Main app shell (route `/`), inline scripts, PWA setup, device detection modal
- **templates.astro**: Template management page (route `/templates/`), create/edit/delete custom templates
- **mobile.astro**: Mobile-specific fallback or warnings for non-Android devices
- **TemplateSelect.astro**: Template button grid (no client logic, rendered by JS)
- **TextPreview.astro**: Output textarea, character count, append-URL checkbox
- **ShareButtons.astro**: Share/Copy buttons, feedback message container
- **SiteFooter.astro**: Shared footer component

All component styles: Tailwind CSS utility classes. No Astro component interactivity—all logic in `<script>` tag in `index.astro`.

### Service Worker & Cache Strategy

- **File**: `public/sw.js`
- **Cache key**: `shareforge-v${CACHE_VERSION}` (timestamp-based, e.g., `20251108-0800`)
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

### Template Order Management (Drag-and-Drop)

Users can reorder templates via drag-and-drop in the template grid (index.astro). Order is persisted in `localStorage`:

**Storage functions** (`src/lib/templates.js`):
- `getTemplateOrder(defaultTemplates)`: Returns custom order from localStorage, fallback to YAML order
- `saveTemplateOrder(templateIds)`: Saves reordered template IDs to localStorage
- `resetTemplateOrder()`: Clears custom order, reverts to YAML order

**UI Handler** (in index.astro `<script>`):
- Each template button is `draggable="true"`
- `dragstart`: Set opacity 0.5, store dragged element
- `dragover`: Swap DOM elements on target button
- `dragend`: Save new order via `saveTemplateOrder()`

**Reset Button** (`src/components/TemplateSelect.astro`):
- Button with ↺ symbol, calls `resetTemplateOrder()` + `loadTemplates()`
- Shows feedback "Ordine template ripristinato"

**localStorage key**: `shareforge-template-order` (JSON array of template IDs)

**Persistence**: Survives reload, PWA deactivation, app updates (PWA cache version doesn't affect localStorage)

## Testing & Debugging

### Local Testing

```bash
npm run build
npm run preview
```
Then on Android Chrome:
1. Install the app (Chrome menu → "Install app")
2. Share a link from another app
3. Select "ShareForge" from share target list
4. Verify template applies and output looks correct

**Note**: Service Worker is only active in HTTPS contexts. For local testing, `npm run preview` serves over HTTP. To test PWA/SW locally, consider using `npm run build && serve -l 5000 dist/` with a local HTTPS tunnel, or test directly on Android device against the deployed GitHub Pages URL.

### DevTools Inspection

- **PWA config**: Chrome DevTools → Application tab → Manifest
- **Service Worker**: Application → Service Workers (check cache, controlled clients)
- **Cache contents**: Application → Cache Storage → `shareforge-v*`
- **Console errors**: Check for JS errors on mobile via USB debugging
- **Clear SW cache**: Application → Cache Storage → right-click `shareforge-v*` → Delete; then refresh

**Incognito mode**: Service Workers don't activate in incognito—use normal tab for testing.

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Share Target not appearing | SW not registered or manifest invalid | Check manifest path in `astro.config.mjs` (`base: '/in_due_tocchi'`); ensure HTTPS |
| Old version still cached | Cache version not bumped | Run `npm run build` (auto-increments cache version) or manually delete cache in DevTools |
| Template placeholders not replaced | Wrong placeholder syntax | Use `{title}`, `{text}`, `{url}` exactly |
| Share API fails silently | Not on Android or HTTPS required | Share API only works on secure contexts (HTTPS + Android) |
| URL param detection broken | Android puts URL in `text` field | `parseSharedData()` handles this with regex fallback |
| App loads old version after deploy | Stale SW cache | Press F12 → DevTools → Application → Cache Storage → delete `shareforge-v*`; refresh page |

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

### Automated Deployment

The `.github/workflows/deploy.yml` workflow auto-deploys on every push to `main`:
1. Checks out code
2. Installs Node 20 + dependencies (`npm ci`)
3. Runs `npm run build` (auto-increments cache version via `prebuild` hook)
4. Deploys `dist/` to GitHub Pages
5. Live at `https://aborruso.github.io/in_due_tocchi/`

No manual steps needed. Just push to `main` and the app updates automatically.

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