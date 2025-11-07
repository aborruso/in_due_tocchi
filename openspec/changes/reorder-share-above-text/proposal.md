# Change: Reorder Share Box Above Generated Text

## Why
The current UI layout places the share buttons below the generated text preview, which may not be the most intuitive flow for users who want to share content immediately after generating it.

## What Changes
- Move the ShareButtons component above the TextPreview component in the main page layout
- This reorders the visual flow: TemplateSelect → ShareButtons → TextPreview

## Impact
- Affected specs: ui-layout (new capability)
- Affected code: src/pages/index.astro (component ordering in main section)