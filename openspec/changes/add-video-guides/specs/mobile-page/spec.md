# Mobile Page Video Integration

## ADDED Requirements

### Requirement: Demo Video Display

The mobile landing page SHALL embed the usage demo video in the Demo Section.

#### Scenario: Video loads on page render

- **WHEN** user navigates to mobile.astro
- **THEN** usage video appears in Demo Section with poster image
- **AND** video does not auto-download on slow connections (lazy loading active)

#### Scenario: User plays demo video

- **WHEN** user taps play button
- **THEN** video plays with sound (not muted)
- **AND** video controls are visible (play/pause, seek, fullscreen)
- **AND** video does not autoplay (user-initiated playback only)

### Requirement: Installation Video Display

The mobile landing page SHALL embed the installation guide video in the PWA Installation section.

#### Scenario: Video appears after installation steps

- **WHEN** user scrolls to PWA Installation Guide
- **THEN** installation video appears below step-by-step list
- **AND** video has poster image showing first frame
- **AND** video lazy-loads only when near viewport

#### Scenario: Browser compatibility fallback

- **WHEN** browser does not support WebM VP9 codec
- **THEN** H.264 MP4 version is loaded automatically (Safari/iOS)
- **AND** video plays without user intervention

#### Scenario: Complete video unsupported

- **WHEN** browser does not support HTML5 video at all
- **THEN** fallback message "Il tuo browser non supporta la riproduzione video" is displayed
- **AND** user can still read text instructions

### Requirement: Video Optimization

All videos SHALL be optimized for mobile web delivery.

#### Scenario: File size limits

- **WHEN** videos are processed for deployment
- **THEN** each video file (WebM + MP4) is <5MB
- **AND** WebM uses VP9 codec for primary delivery
- **AND** MP4 uses H.264 codec for fallback (Safari/iOS)
- **AND** bitrate is 400-500 kbps for mobile networks

#### Scenario: Responsive sizing

- **WHEN** page is viewed on mobile (360px-768px)
- **THEN** video player scales to container width
- **AND** aspect ratio (456:1024 portrait) is maintained
- **AND** video does not overflow viewport

### Requirement: Accessibility

Video elements SHALL include accessibility features.

#### Scenario: Screen reader support

- **WHEN** screen reader user encounters video
- **THEN** descriptive text alternative is announced
- **AND** video controls are keyboard-accessible

#### Scenario: Loading performance

- **WHEN** page loads on slow connection (Slow 3G)
- **THEN** videos do not block page render (lazy loading)
- **AND** poster images load first (<50KB each JPG)
- **AND** metadata preloads but not full video
- **AND** no mobile data warning is shown (user assumes video download cost)
