# UI Layout Video Integration

## MODIFIED Requirements

### Requirement: Responsive Media Elements

The UI layout SHALL support responsive video players that adapt to viewport size while maintaining performance and accessibility standards.

#### Scenario: Mobile viewport video rendering

- **WHEN** video element is rendered on mobile (360px-768px)
- **THEN** video width is 100% of container (max-w-2xl mx-auto)
- **AND** aspect ratio is preserved via CSS (aspect-video or explicit padding-bottom)
- **AND** video does not cause horizontal scroll

#### Scenario: Desktop viewport video rendering

- **WHEN** video element is rendered on desktop (>768px)
- **THEN** video width is constrained to max-w-2xl (672px)
- **AND** video is centered horizontally
- **AND** border-radius matches design system (rounded-xl)

#### Scenario: Video player controls styling

- **WHEN** browser renders native video controls
- **THEN** controls overlay video bottom edge
- **AND** controls match system theme (light/dark)
- **AND** play button is centered on poster before playback

## ADDED Requirements

### Requirement: Video Player Component Pattern

The project SHALL use native HTML5 video elements with consistent styling patterns.

#### Scenario: Standard video player markup

- **WHEN** developer adds video to page
- **THEN** markup includes: `<video>` with poster, controls, preload="metadata", loading="lazy"
- **AND** primary `<source>` with WebM VP9 (type="video/webm")
- **AND** fallback `<source>` with H.264 MP4 (type="video/mp4")
- **AND** fallback text message inside `<video>` tag for completely unsupported browsers
- **AND** no autoplay attribute (user-initiated playback only)

#### Scenario: Video container styling

- **WHEN** video is placed in content section
- **THEN** container has rounded-xl border and optional border-2 border-color
- **AND** bg-white or bg-slate-100 background for contrast
- **AND** aspect ratio helper class (aspect-video or custom padding-bottom)
