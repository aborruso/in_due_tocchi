# ui-layout Specification

## Purpose
TBD - created by archiving change add-device-warning-modal. Update Purpose after archive.
## Requirements
### Requirement: Device Warning Modal
The system SHALL display an informative modal warning users on non-Android/non-mobile devices about limited functionality.

#### Scenario: Modal appears for desktop users
- **WHEN** user opens the app on desktop or non-Android device
- **THEN** an informative modal appears with warning message
- **AND** user can dismiss the modal and continue using the app

### Requirement: Heading Anchor Links
The system SHALL display a clickable anchor link icon next to headings with IDs in guide pages (desktop.astro, mobile.astro) to enable easy copying of section URLs.

#### Scenario: Icon appears on hover
- **WHEN** user hovers over a heading (h2, h3) that has an ID attribute
- **THEN** a link icon appears next to the heading text
- **AND** the icon is visually distinct and clearly clickable

#### Scenario: Copy URL to clipboard on click
- **WHEN** user clicks the anchor link icon
- **THEN** the full URL with anchor fragment (#heading-id) is copied to the clipboard
- **AND** a temporary visual feedback (e.g., checkmark) confirms the copy action

#### Scenario: Accessible for screen readers
- **WHEN** a screen reader navigates to the heading
- **THEN** the anchor link has an appropriate aria-label
- **AND** keyboard navigation (tab + enter) can activate the copy function

