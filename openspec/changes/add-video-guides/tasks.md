# Implementation Tasks

## 1. Video Optimization

- [ ] 1.1 Install ffmpeg if not present (`which ffmpeg`)
- [ ] 1.2 Convert `installa.mp4` to WebM VP9 (target 400-500 kbps)
- [ ] 1.3 Optimize `installa.mp4` to H.264 MP4 fallback (same bitrate)
- [ ] 1.4 Convert `uso.mp4` to WebM VP9 (target 400-500 kbps)
- [ ] 1.5 Optimize `uso.mp4` to H.264 MP4 fallback (same bitrate)
- [ ] 1.6 Generate poster images (first frame JPG) for both videos
- [ ] 1.7 Move optimized files to `public/video/` with semantic names
- [ ] 1.8 Verify file sizes (<5MB each) and playback quality

## 2. Demo Section Integration

- [ ] 2.1 Replace placeholder in mobile.astro Demo Section (lines 118-133)
- [ ] 2.2 Add responsive video player with `uso.webm` + `uso.mp4` fallback
- [ ] 2.3 Add poster image for instant preview
- [ ] 2.4 Configure controls, no autoplay (user-initiated only)
- [ ] 2.5 Add fallback message for browsers without video support
- [ ] 2.6 Test on mobile viewport (360px-768px)
- [ ] 2.7 Test H.264 fallback on Safari/iOS

## 3. Installation Guide Enhancement

- [ ] 3.1 Add video player to PWA Installation section (after step list, before tip box)
- [ ] 3.2 Integrate `installa.webm` + `installa.mp4` fallback with poster
- [ ] 3.3 Style video player to match blue border-left design pattern
- [ ] 3.4 Add descriptive caption below video
- [ ] 3.5 Test video loading doesn't block page render
- [ ] 3.6 Test H.264 fallback on Safari/iOS

## 4. Performance & Accessibility

- [ ] 4.1 Add `loading="lazy"` to video elements
- [ ] 4.2 Add `preload="metadata"` for faster initial render
- [ ] 4.3 Verify videos don't auto-download on slow connections
- [ ] 4.4 Add descriptive text alternative for screen readers
- [ ] 4.5 Test with DevTools Network throttling (Slow 3G)

## 5. Build & Deploy

- [ ] 5.1 Run `npm run build` and verify videos in `dist/video/`
- [ ] 5.2 Check file paths match base path `/in_due_tocchi/`
- [ ] 5.3 Run `npm run preview` and test video playback locally
- [ ] 5.4 Test both WebM and H.264 formats load correctly
- [ ] 5.5 Deploy to GitHub Pages and verify production playback
- [ ] 5.6 Test on Android Chrome (target device, WebM)
- [ ] 5.7 Test on Safari/iOS (H.264 fallback)

## 6. Documentation

- [ ] 6.1 Update LOG.md with change summary
- [ ] 6.2 Document video optimization commands in README or CLAUDE.md
- [ ] 6.3 Add video file size limits to project conventions
