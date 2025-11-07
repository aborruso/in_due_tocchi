# Change: Add Template Active Flag

## Why
We need the ability to enable/disable templates without removing them from the codebase, allowing for easy management of available templates and future template development.

## What Changes
- Add `active` boolean field to template schema in templates.yaml
- Modify template loading logic to filter only active templates
- Set all existing templates to active by default

## Impact
- Affected specs: template-system (modify existing capability)
- Affected code: src/data/templates.yaml (add active field), src/pages/index.astro (filter active templates)