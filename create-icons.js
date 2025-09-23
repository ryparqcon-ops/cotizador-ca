const fs = require('fs');
const path = require('path');

// Crear directorio de iconos si no existe
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Función para crear un icono SVG
function createIconSVG(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f8fafc;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#bgGradient)"/>
  
  <g transform="translate(${size/2}, ${size/2})">
    <path d="M-${size*0.15},-${size*0.12} L0,-${size*0.24} L${size*0.15},-${size*0.12} L${size*0.15},${size*0.08} L-${size*0.15},${size*0.08} Z" fill="url(#houseGradient)" stroke="#e5e7eb" stroke-width="${size*0.004}"/>
    <rect x="-${size*0.15}" y="${size*0.08}" width="${size*0.3}" height="${size*0.16}" fill="url(#houseGradient)" stroke="#e5e7eb" stroke-width="${size*0.004}"/>
    <rect x="-${size*0.04}" y="${size*0.12}" width="${size*0.08}" height="${size*0.12}" fill="#667eea" rx="${size*0.008}"/>
    <circle cx="-${size*0.01}" cy="${size*0.18}" r="${size*0.006}" fill="url(#houseGradient)"/>
    <rect x="-${size*0.12}" y="${size*0.1}" width="${size*0.05}" height="${size*0.05}" fill="#667eea" rx="${size*0.004}"/>
    <rect x="${size*0.07}" y="${size*0.1}" width="${size*0.05}" height="${size*0.05}" fill="#667eea" rx="${size*0.004}"/>
    <rect x="-${size*0.12}" y="${size*0.1}" width="${size*0.05}" height="${size*0.05}" fill="none" stroke="url(#houseGradient)" stroke-width="${size*0.002}"/>
    <rect x="${size*0.07}" y="${size*0.1}" width="${size*0.05}" height="${size*0.05}" fill="none" stroke="url(#houseGradient)" stroke-width="${size*0.002}"/>
  </g>
  
  <g transform="translate(0, ${size*0.78})">
    <path d="M0,${size*0.1} Q${size*0.1},${size*0.06} ${size*0.2},${size*0.1} T${size*0.4},${size*0.1} T${size*0.6},${size*0.1} T${size*0.8},${size*0.1} T${size},${size*0.1} L${size},${size*0.22} L0,${size*0.22} Z" fill="rgba(255,255,255,0.3)"/>
  </g>
  
  <circle cx="${size*0.82}" cy="${size*0.2}" r="${size*0.06}" fill="#fbbf24" opacity="0.9"/>
  
  <text x="${size/2}" y="${size*0.7}" font-family="Arial, sans-serif" font-size="${size*0.12}" font-weight="bold" text-anchor="middle" fill="url(#houseGradient)">CA</text>
</svg>`;
}

// Tamaños de iconos necesarios
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 Generando iconos PWA para Casa Austin...');

sizes.forEach(size => {
    const svgContent = createIconSVG(size);
    const filename = `icon-${size}x${size}.svg`;
    const filepath = path.join(iconsDir, filename);
    
    fs.writeFileSync(filepath, svgContent);
    console.log(`✅ Generado: ${filename}`);
});

console.log('🎉 ¡Todos los iconos SVG generados exitosamente!');
console.log('📝 Nota: Para convertir a PNG, usa herramientas como Inkscape o un convertidor online.');
