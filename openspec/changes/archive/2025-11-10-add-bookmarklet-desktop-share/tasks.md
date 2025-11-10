# Tasks

## 1. Create Desktop Instructions Page

- [x] 1.1 Create `src/pages/desktop.astro` with Tailwind styling consistent with index page
- [x] 1.2 Add heading "Come usare ShareForge da Desktop"
- [x] 1.3 Add explanation section: why native sharing doesn't work on desktop (reference rationale.md)
- [x] 1.4 Add bookmarklet code snippet (JavaScript one-liner with `encodeURIComponent` for title/URL)
- [x] 1.5 Add draggable `<a href="javascript:...">` link labeled "📌 ShareForge" for drag-and-drop installation
- [x] 1.6 Add step-by-step installation instructions (with screenshots or GIFs if feasible)
- [x] 1.7 Add usage instructions: click bookmarklet → select template → copy prompt
- [x] 1.8 Include SiteFooter component for consistency

## 2. Update Desktop Modal

- [x] 2.1 Open `src/pages/index.astro` and locate desktop device modal (around line 95-117)
- [x] 2.2 Add link text "Per istruzioni dettagliate, visita la guida desktop" with `href="/in_due_tocchi/desktop"`
- [x] 2.3 Style link with Tailwind (e.g., `text-blue-600 underline hover:text-blue-800`)
- [x] 2.4 Test modal displays link correctly on desktop browsers

## 3. Update Documentation

- [x] 3.1 Update `README.md` "Features" section to mention bookmarklet for desktop users
- [x] 3.2 Add new section in `README.md` under "How It Works" titled "Desktop Alternative: Bookmarklet"
- [x] 3.3 Explain bookmarklet purpose and link to `/desktop` page in README
- [x] 3.4 Update `docs/rationale.md` "Why Android-First" section to mention bookmarklet as desktop workaround

## 4. Testing & Validation

- [x] 4.1 Build project with `npm run build`
- [x] 4.2 Preview with `npm run preview` and test `/desktop` route loads correctly
- [x] 4.3 Test bookmarklet drag-and-drop installation in Chrome, Firefox, Safari
- [x] 4.4 Test bookmarklet execution: click on random webpage → verify ShareForge opens with pre-filled title/URL
- [x] 4.5 Verify templates apply correctly to bookmarklet-generated content
- [x] 4.6 Test desktop modal link navigates to `/desktop` page
- [x] 4.7 Validate with `openspec validate add-bookmarklet-desktop-share --strict`
