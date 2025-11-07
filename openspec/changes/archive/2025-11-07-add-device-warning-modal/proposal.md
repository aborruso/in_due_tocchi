# Change: Add Device Warning Modal

## Why
The app is primarily designed for Android mobile devices with Share Target functionality. Users on desktop or non-Android devices may experience limited functionality and should be informed about the app's intended use case.

## What Changes
- Add informative modal that appears for non-Android/non-mobile users
- Modal warns about limited functionality on desktop devices
- Modal is dismissible and doesn't prevent app usage

## Impact
- Affected specs: ui-layout (new capability)
- Affected code: src/pages/index.astro (add modal component and detection logic)