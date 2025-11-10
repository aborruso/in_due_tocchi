# desktop-workflow Specification

## Purpose
TBD - created by archiving change add-bookmarklet-desktop-share. Update Purpose after archive.
## Requirements
### Requirement: Bookmarklet Code Generation

The system SHALL provide a bookmarklet that captures the current page's title and URL and opens ShareForge with pre-filled fields.

#### Scenario: User drags bookmarklet to bookmark bar

- **WHEN** user visits `/desktop` page
- **THEN** a draggable link labeled "ShareForge" is displayed
- **AND** dragging the link to the browser's bookmark bar creates a bookmarklet
- **AND** the bookmarklet code uses `javascript:(function(){...})()` format

#### Scenario: Bookmarklet execution from any webpage

- **WHEN** user clicks the bookmarklet while browsing any website
- **THEN** the bookmarklet captures `document.title` and `window.location.href`
- **AND** opens ShareForge in a new tab/window with URL: `https://aborruso.github.io/in_due_tocchi/?title=<encoded_title>&url=<encoded_url>`
- **AND** ShareForge pre-fills the title and URL fields using `parseSharedData()`

### Requirement: Desktop Instructions Page

The system SHALL provide a dedicated page at `/desktop` with clear instructions for desktop users to install and use the bookmarklet.

#### Scenario: Desktop user accesses instructions

- **WHEN** user navigates to `/desktop` route
- **THEN** the page displays:
  - Explanation of why native sharing doesn't work on desktop
  - Step-by-step installation instructions with visual guidance
  - Draggable bookmarklet link
  - Alternative: copyable JavaScript snippet for manual bookmark creation
  - Usage instructions (click bookmarklet → select template → copy prompt)

### Requirement: Desktop Modal Link

The system SHALL update the desktop device modal to include a link to the `/desktop` page for detailed instructions.

#### Scenario: Desktop user sees modal with instructions link

- **WHEN** desktop user opens ShareForge index page
- **AND** the device is not Android/mobile
- **THEN** the modal displays a link "Scopri come usare ShareForge da desktop" (or similar)
- **AND** clicking the link navigates to `/desktop` page

### Requirement: Bookmarklet Compatibility

The bookmarklet-generated URLs SHALL be compatible with the existing `parseSharedData()` function without modifications.

#### Scenario: Bookmarklet uses same URL parameters as Share Target

- **WHEN** bookmarklet opens ShareForge with `?title=...&url=...` parameters
- **THEN** `parseSharedData()` extracts title and URL correctly
- **AND** templates apply placeholders as expected
- **AND** no changes to `src/lib/share.js` are required

