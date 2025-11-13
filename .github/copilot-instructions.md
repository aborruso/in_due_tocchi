# ShareForge AI Coding Instructions

## Project Overview

**ShareForge** is an Android-first PWA that transforms shared links into LLM prompts using customizable templates. Core architecture: static-only deployment, offline-first via Service Worker, YAML-driven templates embedded at build time.

**Key constraints:**
- Deployed to GitHub Pages at `/in_due_tocchi/` base path (affects all absolute paths in manifest, SW, config)
- Zero backend—everything is static files
- Android Share Target integration requires HTTPS and PWA installation
- Italian UI/comments (domain-specific), English technical terms

## Essential Commands

```bash
# Development (hot reload at localhost:3000/in_due_tocchi/)
npm run dev

# Production build (auto-increments SW cache version via prebuild hook)
npm run build

# Preview production build (for testing PWA/SW features)
npm run preview

# CI uses npm ci instead of npm install
```

**Critical:** `npm run build` automatically runs `update-cache-version.js` (prebuild hook) to timestamp-version the Service Worker cache. Never manually edit `CACHE_VERSION` in `public/sw.js`.

## Architecture Patterns

### Template System (Build-Time YAML → Runtime JSON)
- Source of truth: `src/data/templates.yaml`
- Parsed at build time via `js-yaml` in `src/pages/index.astro`
- Only `active: true` templates included in build
- Embedded inline as `window.DEFAULT_TEMPLATES` (like pa_mi_senti pattern)
- Template order managed via localStorage (`shareforge-template-order`), defaults to YAML order
- Placeholders: `{title}`, `{text}`, `{url}` replaced at runtime in `src/lib/templates.js`

**Adding templates:**
1. Add entry to `templates.yaml` with `active: true`
2. Run `npm run dev` → auto-reloads with new template
3. Test → commit → push → GitHub Actions deploys

### Service Worker Cache Strategy
- File: `public/sw.js`
- Cache name: `shareforge-v${CACHE_VERSION}` (timestamp format: `YYYYMMDD-HHmm`)
- Strategy: Cache-first with network fallback
- On activation: deletes old caches, notifies clients via `SW_UPDATED` message
- Auto-versioning: `update-cache-version.js` runs before each build

**Debugging offline issues:**
1. DevTools → Application → Service Workers (check registration)
2. Application → Cache Storage → `shareforge-v*` (inspect cached files)
3. Delete cache manually + refresh if stale

### Data Flow: Share Target → Template → Output
1. **Inbound (Android):** URL params `?title=...&text=...&url=...` parsed by `parseSharedData()` in `src/lib/share.js`
   - Android quirk: URLs often in `text` field instead of `url` (regex extraction handles this)
2. **Template application:** User selects template → `applyTemplate()` replaces placeholders
3. **Outbound:** Web Share API (`navigator.share()`) or clipboard fallback (`copyToClipboard()`)

### Component Organization
- **index.astro:** Main app shell with inline scripts (no component interactivity)
- **templates.astro:** Template management page (drag-and-drop reorder, reset button)
- **desktop.astro:** Bookmarklet installation guide for desktop users
- **TemplateSelect.astro, TextPreview.astro, ShareButtons.astro:** Presentational components
- All logic in `<script>` tags in `index.astro`; components are pure Astro (no client JS)
- Styling: Tailwind utility classes only

## Critical Files

- `src/data/templates.yaml` - Template definitions (active: true/false controls build inclusion)
- `src/pages/index.astro` - Main app logic, template loading, inline scripts
- `src/lib/templates.js` - Template application, order management (localStorage)
- `src/lib/share.js` - Share Target parsing, Web Share API, clipboard fallback
- `public/sw.js` - Service Worker (CACHE_VERSION auto-updated, don't edit manually)
- `public/manifest.webmanifest` - PWA config, Share Target registration
- `astro.config.mjs` - Base path `/in_due_tocchi/`, Vite config (disable asset inlining, ignore video files)
- `update-cache-version.js` - Prebuild hook to timestamp SW cache version
- `.github/workflows/deploy.yml` - Auto-deploy on push to main (Node 20, npm ci, build, deploy)

## Change Management (OpenSpec)

**Before making changes:**
1. Check `openspec/AGENTS.md` for proposal workflow
2. Search existing specs: `openspec list --specs`
3. Check active changes: `openspec list`

**When to create proposals:**
- New features/capabilities
- Breaking changes (API, schema, architecture)
- Performance/security changes affecting behavior
- Ambiguous requests (safer to spec first)

**Skip proposals for:**
- Bug fixes (restoring intended behavior)
- Typos, formatting, comments
- Non-breaking dependency updates

**Workflow:**
1. Create `openspec/changes/[change-id]/` (kebab-case, verb-led: `add-`, `update-`, `remove-`)
2. Write `proposal.md`, `tasks.md`, optional `design.md` (if cross-cutting/architectural)
3. Create delta specs in `specs/[capability]/spec.md` using `## ADDED|MODIFIED|REMOVED Requirements`
4. Validate: `openspec validate [change-id] --strict`
5. After deployment: `openspec archive [change-id]` moves to `changes/archive/YYYY-MM-DD-[name]/`

## Testing & Debugging

**Local PWA testing:**
```bash
npm run build && npm run preview
```
Then on Android Chrome: Install app, share link from another app, select "ShareForge"

**DevTools inspection:**
- PWA config: DevTools → Application → Manifest
- Service Worker: Application → Service Workers (check cache, controlled clients)
- Cache contents: Application → Cache Storage → `shareforge-v*`
- localStorage: Application → Local Storage (template order only)

**Common issues:**
- Share Target not appearing → SW not registered (check manifest path includes `/in_due_tocchi/`)
- Old version cached → Run `npm run build` or manually delete cache in DevTools
- Template placeholders not replaced → Check exact syntax `{title}`, `{text}`, `{url}`
- URL in wrong field (Android) → `parseSharedData()` handles via regex fallback

## Code Conventions

- **Language:** Italian for UI strings/comments, English for technical terms
- **Naming:** camelCase JS variables, kebab-case HTML IDs, PascalCase components
- **Functions:** JSDoc comments above all exported functions
- **Error handling:** Try-catch with console.error, graceful fallbacks
- **Formatting:** 2-space indentation, ES6 modules, functional style

**Example:**
```javascript
/**
 * Brief description of what function does
 */
export function functionName(param1, param2) {
  // Implementation
}
```

## Deployment

Push to `main` → GitHub Actions workflow:
1. Checkout, setup Node 20, `npm ci`
2. `npm run build` (auto-increments cache version)
3. Deploy `dist/` to GitHub Pages
4. Live at `https://aborruso.github.io/in_due_tocchi/`

No manual steps needed. Cache version management is automatic.
