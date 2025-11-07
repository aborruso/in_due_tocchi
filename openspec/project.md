# Project Context

## Purpose

**Riformula** is a Progressive Web App (PWA) that enables rapid transformation of shared links from other apps into curated messages using customizable templates.

**Core Goals:**
- Receive shared content from other Android apps via Web Share Target
- Apply customizable templates with placeholders (title, text, url)
- Support offline-first functionality after initial load
- Enable quick sharing via Web Share API or clipboard fallback
- Provide import/export for template backup and sync

## Tech Stack

- **Framework**: Astro 4.x - Static site generation
- **Styling**: Tailwind CSS 3.x
- **Runtime**: Vanilla JavaScript (ES6 modules)
- **PWA**: Service Worker for offline caching
- **Storage**: localStorage (client-side only), YAML for default templates
- **YAML Parser**: js-yaml for loading default templates at build-time
- **Hosting**: GitHub Pages
- **Build Tool**: npm with Astro CLI
- **Node Version**: 18+ (20 in CI/CD)

## Project Conventions

### Code Style

- **Language**: Italian for UI and comments (domain-specific)
- **JavaScript**: ES6 modules, camelCase naming
- **Functions**: JSDoc comments above all exported functions
- **Structure**: Functional programming style, pure functions where possible
- **Imports**: Explicit import/export statements at module level
- **Error Handling**: Try-catch blocks with console.error logging, graceful fallbacks
- **Formatting**: 2-space indentation, consistent quote style
- **HTML/Astro**: Semantic HTML5, BEM-inspired CSS class naming with Tailwind utilities
- **IDs**: kebab-case for HTML IDs, camelCase for JS variables

**Example patterns:**
```javascript
/**
 * Brief description of what function does
 */
export function functionName(param1, param2) {
  // Implementation
}
```

### Architecture Patterns

- **Component-Based**: Astro components for structural UI (TemplateSelect, TextPreview, ShareButtons)
- **Module Separation**: Business logic in `src/lib/` (templates.js, share.js), data in `src/data/`
- **YAML Data Source**: Default templates in `src/data/templates.yaml`, parsed at build-time via js-yaml
- **Two-Tier Template System**: Default templates (YAML, read-only at runtime) + Custom templates (localStorage, user-editable via UI)
- **Astro Hybrid**: Static HTML with inline script blocks for interactivity
- **State Management**: Single page app state in index.astro script block (currentTemplateId, currentData, editorMode)
- **localStorage Strategy**: User-created/modified templates persisted in localStorage, no backend
- **Progressive Enhancement**: Service Worker registers on load, gracefully handles offline
- **API Fallbacks**: Web Share API with clipboard fallback for broader compatibility
- **Lazy Loading**: Service Worker caches on demand

### Testing Strategy

- **Local Testing**: `npm run build` + `npm run preview` for local verification
- **Browser Console**: JavaScript error checking via DevTools console
- **PWA Testing**: Chrome DevTools → Application tab for manifest and service worker validation
- **Android Testing**: Manual testing on Chrome Android with app installation and Share Target
- **Development**: `npm run dev` for hot-reload during development
- **No Automated Tests**: Currently manual/integration testing only (could be future improvement)

### Git Workflow

- **Main Branch**: Primary deployment branch to GitHub Pages
- **Feature Branches**: Created from main for new features/fixes (e.g., `feature/xyz`)
- **Commit Style**: Concise, English or Italian messages describing what changed
- **CI/CD**: GitHub Actions workflow on push to main triggers build and deploy to GitHub Pages
- **Deployment**: Automatic via GitHub Actions (deploy.yml workflow)
- **Node Version**: Pinned to 20 in CI pipeline

## Domain Context

**Key Concepts:**
- **Share Target API**: PWA capability to receive shared content from Android apps
- **Web Share API**: Native sharing to system share sheet (WhatsApp, Telegram, Email, etc.)
- **Template Placeholders**: `{title}`, `{text}`, `{url}` replaced with shared data
- **Offline-First**: App works completely offline after service worker caches assets
- **AndroidFirst**: Primary target is Android devices, secondary support for web browsers
- **localStorage Strategy**: All templates stored in browser localStorage, no sync backend

**User Flows:**
1. User shares link from another app → Riformula receives via Share Target → fills input fields → applies template → shares/copies result
2. User creates/edits custom templates → stored in localStorage → templates persist across sessions
3. User exports templates → downloads JSON → can import on another device

## Important Constraints

- **HTTPS Only**: PWA requires HTTPS for production (GitHub Pages provides this)
- **Android Requirements**: Must be installed as PWA on Android to function as Share Target
- **Storage Limits**: localStorage has ~5-10MB limit per origin (sufficient for templates)
- **No Backend**: Static-only deployment, no server-side processing
- **Browser Support**: Requires modern browser with Service Worker support (Chrome 40+, Firefox 44+)
- **Offline Limitation**: Cannot fetch fresh content offline, only cached assets available
- **Base Path**: Deployed to `/in_due_tocchi/` subpath on GitHub Pages (affects manifest and SW paths)
- **YAML Templates**: Default templates are baked into build, not editable at runtime. User modifications via UI only affect localStorage
- **Build-Time Parsing**: Template YAML must be valid during build, errors will fail the build process

## External Dependencies

- **GitHub Pages**: Hosting platform, requires HTTPS
- **GitHub Actions**: CI/CD pipeline for automated build and deploy
- **npm/Node.js**: Build tooling (Astro, Tailwind, Sharp)
- **Tailwind CSS CDN**: Not used (built-in with @astrojs/tailwind)
- **Web APIs**: Service Worker, localStorage, Web Share API, Clipboard API (all native browser APIs)
