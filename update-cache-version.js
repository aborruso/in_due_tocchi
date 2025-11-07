#!/usr/bin/env node

/**
 * Updates the service worker cache version with current timestamp
 * Run this before each build to ensure cache busting
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SW_PATH = join(__dirname, 'public', 'sw.js');

try {
  // Read service worker file
  let swContent = readFileSync(SW_PATH, 'utf8');

  // Generate new version string (YYYYMMDD-HHmm format)
  const now = new Date();
  const version = now.toISOString()
    .replace(/[-:]/g, '')
    .replace('T', '-')
    .substring(0, 13);

  // Update CACHE_VERSION line
  swContent = swContent.replace(
    /const CACHE_VERSION = '[^']+';/,
    `const CACHE_VERSION = '${version}';`
  );

  // Write back to file
  writeFileSync(SW_PATH, swContent, 'utf8');

  console.log(`✅ Cache version updated to: ${version}`);
} catch (error) {
  console.error('❌ Error updating cache version:', error.message);
  process.exit(1);
}
