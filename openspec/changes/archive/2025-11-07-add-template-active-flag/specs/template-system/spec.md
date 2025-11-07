## MODIFIED Requirements
### Requirement: Template Management
The system SHALL support enabling/disabling templates via an `active` boolean field in the template configuration.

#### Scenario: Only active templates displayed
- **WHEN** templates are loaded from YAML
- **THEN** only templates with `active: true` are available for selection
- **AND** inactive templates are filtered out during loading