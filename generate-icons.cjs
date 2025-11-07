const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// PNG generator using sharp
// Creates icons with blue background and white "R" letter

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVGIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3b82f6"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${size * 0.6}" fill="white">R</text>
</svg>`;
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PNG icons...\n');

  for (const size of sizes) {
    const svg = generateSVGIcon(size);
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);

    try {
      await sharp(Buffer.from(svg))
        .png()
        .toFile(filepath);

      console.log(`✓ Generated ${filename}`);
    } catch (error) {
      console.error(`✗ Error generating ${filename}:`, error.message);
    }
  }

  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
