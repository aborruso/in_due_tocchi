# Change: Add video guides to mobile landing page

## Why

Mobile page has placeholder for demo video ("Video demo in arrivo"). Raw MP4 files exist in `video/raw/ita/` but aren't integrated. Users need visual guidance for:
- How to install PWA on Android
- How to use Share Target flow (URL → template → LLM)

Visual demos reduce onboarding friction and increase PWA adoption.

## What Changes

- Optimize raw MP4 videos (6.9MB + 10MB) → WebM + H.264 fallback for web delivery
- Integrate installation video (`installa.mp4`) in PWA Installation Guide section
- Integrate usage video (`uso.mp4`) in Demo Section
- Add poster images for instant preview before video load
- Implement responsive video player with controls, no autoplay

**Technical decisions:**
- Primary: WebM (VP9 codec) for ~50% size reduction vs H.264
- Fallback: H.264 MP4 for Safari/older browser compatibility
- Target 400-500 kbps bitrate for mobile networks
- Native HTML5 `<video>` tag (no external player library)
- Videos stored in `public/video/` (in repo, <5MB each)
- Lazy loading via `loading="lazy"` attribute
- No autoplay (user-initiated playback only)
- No subtitles/captions
- No mobile data warning

## Impact

- **Affected specs:**
  - `mobile-page` (new capability) - video integration requirements
  - `ui-layout` - responsive video player design patterns

- **Affected code:**
  - `src/pages/mobile.astro` (Demo Section + Installation Guide)
  - `public/video/` (new directory with optimized videos)
  - Build scripts (video optimization pipeline)

- **Breaking changes:** None (purely additive)

- **Performance:**
  - Initial page load: unchanged (videos lazy-loaded)
  - Video download: ~4-5MB per video (WebM primary, H.264 fallback)
  - Improved user understanding (reduces support questions)

- **Browser compatibility:**
  - Chrome/Edge: WebM VP9
  - Safari/iOS: H.264 MP4 fallback
  - Older browsers: Fallback message
