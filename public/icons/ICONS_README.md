# PWA Icons

This directory should contain PNG icons in the following sizes:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## Generating Icons

You can use any of these methods to generate icons:

### Method 1: Using realfavicongenerator.net
1. Go to https://realfavicongenerator.net/
2. Upload a 512x512 PNG or SVG logo
3. Generate all icon sizes
4. Download and extract to this directory

### Method 2: Using PWA Asset Generator
```bash
npx pwa-asset-generator path/to/logo.svg public/icons --icon-only --padding "10%" --background "#3b82f6"
```

### Method 3: Manual creation
Create a 512x512 PNG with your logo and use an image editor to resize to all required sizes.

## Temporary Placeholder

For development purposes, you can use the favicon.svg from the public directory as a placeholder.
The SVG version will work for testing but proper PNG icons are recommended for production.
