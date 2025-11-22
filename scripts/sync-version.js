const fs = require('node:fs')

// Читаем package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// Читаем manifest.json
const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'))

// Устанавливаем версию из package.json в manifest.json
manifest.version = pkg.version

// Записываем обновленный manifest.json
fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2))

console.log(`Version updated to ${pkg.version} in manifest.json`)
