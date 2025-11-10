# Design: Desktop Bookmarklet

## Context

Desktop users cannot use ShareForge's core value proposition (native Share Target integration) due to platform limitations. Windows, macOS, and Linux lack universal sharing systems, and desktop browsers only support Web Share API outbound (sharing FROM web apps), not inbound (receiving shared content).

The desktop modal currently warns users but offers no actionable solution beyond manual copy-paste. A bookmarklet provides a low-friction workaround that approximates the mobile experience.

## Goals / Non-Goals

**Goals:**

- Provide one-click content capture for desktop users
- Reuse existing URL parameter handling (`parseSharedData()`) without modifications
- Maintain static architecture (no backend, no browser extensions)
- Clear, actionable instructions for non-technical users

**Non-Goals:**

- Browser extension (requires separate installation, maintenance, store listings)
- Desktop app (out of scope for static PWA)
- Automatic bookmarklet installation (browser security prevents this)
- Support for `text` parameter from bookmarklet (most web pages don't expose structured description/excerpt in DOM; URL + title is sufficient)

## Decisions

### Decision: Bookmarklet over Browser Extension

**Rationale:**

- Bookmarklets require zero installation (just drag-and-drop or manual bookmark creation)
- No per-browser packaging (Chrome Web Store, Firefox Add-ons, Safari Extensions)
- No maintenance overhead (extension APIs change, require updates)
- Consistent with project philosophy: static, zero-cost, zero-dependencies

**Trade-off:** Bookmarklets have limited capabilities (no persistent storage, no background tasks) but this is acceptable—we only need to capture URL + title and open ShareForge.

### Decision: Draggable Link + Copyable Snippet

Provide both installation methods:

1. **Draggable link:** User-friendly for non-technical users (drag to bookmark bar)
2. **Copyable snippet:** Fallback for browsers that don't support drag-and-drop or users who prefer manual bookmark creation

**Rationale:** Maximizes compatibility and accommodates different user skill levels.

### Decision: Only Capture `title` and `url`, Not `text`

**Rationale:**

- Most web pages don't expose structured meta descriptions in easily accessible DOM properties
- Extracting `<meta name="description">` or Open Graph tags adds complexity and fragility
- Android Share Target often receives empty or low-quality `text` anyway
- Users can manually add context after selecting a template if needed

**Alternative considered:** Parse `<meta>` tags, but this risks inconsistent results across sites and increases bookmarklet code size.

### Decision: Open ShareForge in New Tab

**Rationale:**

- Preserves user's current browsing context (they might want to reference the original page)
- Standard behavior for bookmarklets that navigate elsewhere
- Uses `window.open()` with fallback to `location.href` if popup blocked

## Implementation Details

### Bookmarklet Code

```javascript
javascript:(function(){
  const title = encodeURIComponent(document.title || '');
  const url = encodeURIComponent(window.location.href || '');
  const shareforgeUrl = `https://aborruso.github.io/in_due_tocchi/?title=${title}&url=${url}`;
  const newWindow = window.open(shareforgeUrl, '_blank');
  if (!newWindow) {
    location.href = shareforgeUrl;
  }
})();
```

**Key details:**

- Minified one-liner for bookmark compatibility
- `encodeURIComponent` prevents URL injection
- Fallback to `location.href` if popup blocked
- Uses production URL (GitHub Pages deployment)

### Desktop Page Structure

`src/pages/desktop.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import SiteFooter from '../components/SiteFooter.astro';
---

<Layout title="ShareForge - Desktop Guide">
  <main class="container mx-auto px-4 py-8">
    <h1>Come usare ShareForge da Desktop</h1>

    <section>
      <h2>Perché il bookmarklet?</h2>
      <p>...</p>
    </section>

    <section>
      <h2>Installazione</h2>
      <p>Trascina questo link nella barra dei segnalibri:</p>
      <a href="javascript:(function(){...})()">📌 ShareForge</a>
      <p>Oppure copia il codice e crea un segnalibro manualmente:</p>
      <code>...</code>
    </section>

    <section>
      <h2>Come usarlo</h2>
      <ol>...</ol>
    </section>
  </main>

  <SiteFooter />
</Layout>
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Users unfamiliar with bookmarklets | Provide step-by-step visual instructions with screenshots/GIFs |
| Popup blockers prevent `window.open()` | Fallback to `location.href` (navigates current tab) |
| Bookmarklet breaks if base URL changes | Use environment variable or config file for base URL; document in CLAUDE.md |
| Mobile users accidentally access `/desktop` | No harm—page is informational only, mobile users can navigate back |

## Migration Plan

No migration required—this is a new feature with no breaking changes. Existing flows (Android Share Target, manual input) remain unchanged.

## Open Questions

- None (decision: draggable link + snippet, no `text` extraction)
