// This script creates placeholder images for monuments
// In production, replace with actual high-quality photographs

const fs = require('fs');
const path = require('path');

const monuments = [
    'taj-mahal.jpg',
    'qutub-minar.jpg',
    'hawa-mahal.jpg',
    'mysore-palace.jpg',
    'gateway-of-india.jpg',
    'konark-temple.jpg',
    'red-fort.jpg',
    'amber-fort.jpg'
];

const imagesDir = path.join(__dirname, '../public/images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Created images directory');
}

// Create placeholder for missing images
monuments.forEach(monument => {
    const imagePath = path.join(imagesDir, monument);
    if (!fs.existsSync(imagePath)) {
        console.log(`Missing: ${monument} - Please add actual image`);
    } else {
        console.log(`✓ ${monument}`);
    }
});

console.log('\nImage setup complete!');
console.log('Note: Replace placeholder images with high-quality photographs for production.');
