/**
 * Image Optimization Script
 * 
 * Converts JPG/JPEG images to WEBP format at multiple sizes for responsive loading
 * 
 * Installation:
 *   npm install --save-dev sharp
 * 
 * Usage:
 *   node scripts/convert-images-to-webp.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import for sharp
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.error('\n❌ Error: "sharp" package is not installed.');
  console.error('\nPlease install it first:');
  console.error('  npm install sharp');
  console.error('\nThen run this script again.\n');
  process.exit(1);
}

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/assets/airbnb');
const SIZES = [
  { width: 480, suffix: '-480w' },
  { width: 768, suffix: '-768w' },
  { width: 1200, suffix: '-1200w' }
];
const WEBP_QUALITY = 85; // 85% quality provides good balance between size and quality
const JPG_QUALITY = 90;  // Keep JPG fallbacks slightly higher quality

async function convertImage(inputPath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  
  console.log(`\nProcessing: ${filename}`);
  
  for (const size of SIZES) {
    try {
      // Generate WEBP version
      const webpOutput = path.join(INPUT_DIR, `${basename}${size.suffix}.webp`);
      await sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpOutput);
      
      const webpStats = fs.statSync(webpOutput);
      console.log(`  ✓ Created ${basename}${size.suffix}.webp (${Math.round(webpStats.size / 1024)}KB)`);
      
      // Generate JPG fallback version
      const jpgOutput = path.join(INPUT_DIR, `${basename}${size.suffix}.jpg`);
      await sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: JPG_QUALITY })
        .toFile(jpgOutput);
      
      const jpgStats = fs.statSync(jpgOutput);
      console.log(`  ✓ Created ${basename}${size.suffix}.jpg (${Math.round(jpgStats.size / 1024)}KB)`);
      
    } catch (error) {
      console.error(`  ✗ Error processing ${filename} at ${size.width}px:`, error.message);
    }
  }
}

async function processDirectory() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Target sizes: ${SIZES.map(s => s.width + 'px').join(', ')}`);
  console.log(`WEBP quality: ${WEBP_QUALITY}%`);
  console.log(`JPG quality: ${JPG_QUALITY}%\n`);
  
  try {
    const files = fs.readdirSync(INPUT_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return (ext === '.jpg' || ext === '.jpeg') && !file.includes('-480w') && !file.includes('-768w') && !file.includes('-1200w');
    });
    
    if (imageFiles.length === 0) {
      console.log('No images found to convert.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images to convert:\n`);
    
    for (const filename of imageFiles) {
      const inputPath = path.join(INPUT_DIR, filename);
      await convertImage(inputPath, filename);
    }
    
    console.log('\n✅ All images processed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Original images: ${imageFiles.length}`);
    console.log(`   - Generated files: ${imageFiles.length * SIZES.length * 2} (WEBP + JPG fallbacks)`);
    console.log('\n💡 Next steps:');
    console.log('   1. Test the site to ensure images load correctly');
    console.log('   2. Consider deleting original large images after verifying');
    console.log('   3. Check Lighthouse/PageSpeed for improved scores!\n');
    
  } catch (error) {
    console.error('Error processing directory:', error);
    process.exit(1);
  }
}

// Run the conversion
processDirectory();

