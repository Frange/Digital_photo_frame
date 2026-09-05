const fs = require('fs');
const path = require('path');

const baseDir = './announcers';
const folders = [
    { name: 'funny', prefix: 'f' },
    { name: 'food', prefix: 'c' },
    { name: 'night', prefix: 'n' },
    { name: 'characters', prefix: 'p' }
];

let output = 'const ANNOUNCER_INVENTORY = {\n';

folders.forEach(f => {
    const dirPath = path.join(baseDir, f.name);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(file => 
            ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())
        );
        output += `    ${f.name}: { count: ${files.length}, prefix: '${f.prefix}' },\n`;
    }
});

output += '};';

fs.writeFileSync('./js/announcer_inventory.js', output);
console.log('Inventario generado en ./js/announcer_inventory.js');