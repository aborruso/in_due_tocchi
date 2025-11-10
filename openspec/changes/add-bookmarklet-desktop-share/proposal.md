# Change: Add Bookmarklet for Desktop Sharing

## Why

Desktop users cannot benefit from native Android Share Target integration due to platform limitations (Windows/macOS/Linux lack universal share systems). Currently, desktop users must manually copy-paste URLs and titles, creating friction and reducing the app's value proposition.

A bookmarklet provides a one-click solution to capture the current page's URL and title and open ShareForge with pre-filled fields, enabling desktop users to select templates and copy formatted prompts with minimal effort.

## What Changes

- Create new `/desktop` page with bookmarklet instructions and drag-and-drop installation
- Add bookmarklet code snippet that captures `document.title` and `window.location.href` and opens ShareForge with query parameters `?title=...&url=...`
- Update desktop device modal (in `index.astro`) to include link to `/desktop` page
- Document bookmarklet usage in README.md and docs/rationale.md
- Ensure `parseSharedData()` in `src/lib/share.js` correctly handles bookmarklet-generated URLs (already compatible, no changes needed)

## Impact

- **Affected specs**: `desktop-workflow` (new capability)
- **Affected code**:
  - `src/pages/desktop.astro` (new file)
  - `src/pages/index.astro` (update modal with link to `/desktop`)
  - `README.md` (document bookmarklet)
  - `docs/rationale.md` (explain desktop workaround)
- **No breaking changes**
- **No changes to existing share flow** - bookmarklet uses same URL parameters as Android Share Target
