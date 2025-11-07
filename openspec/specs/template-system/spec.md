# template-system Specification

## Purpose
TBD - created by archiving change add-telegram-template. Update Purpose after archive.
## Requirements
### Requirement: Template Management
The system SHALL support enabling/disabling templates via an `active` boolean field in the template configuration.

#### Scenario: Only active templates displayed
- **WHEN** templates are loaded from YAML
- **THEN** only templates with `active: true` are available for selection
- **AND** inactive templates are filtered out during loading

### Requirement: Telegram Template
The system SHALL provide a Telegram template that creates Italian summaries optimized for Telegram group sharing.

#### Scenario: Telegram template available
- **WHEN** user selects templates
- **THEN** Telegram template is available with appropriate emoji
- **AND** template generates Italian synthesis with markdown formatting

