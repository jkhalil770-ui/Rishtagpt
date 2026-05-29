const fs = require('fs');
const https = require('https');
const path = require('path');

const emojis = {
  traditional: 'https://unpkg.com/emoji-datasource-apple@14.0.0/img/apple/64/1f54c.png',
  modern: 'https://unpkg.com/emoji-datasource-apple@14.0.0/img/apple/64/2728.png',
  poetic: 'https://unpkg.com/emoji-datasource-apple@14.0.0/img/apple/64/1fab6.png',
  professional: 'https://unpkg.com/emoji-datasource-apple@14.0.0/img/apple/64/1f4bc.png',
  detailed: 'https://unpkg.com/emoji-datasource-apple@14.0.0/img/apple/64/1f4dc.png'
};

const destDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

Object.entries(emojis).forEach(([key, url]) => {
  const destPath = path.join(destDir, `emoji-${key}.png`);
  const file = fs.createWriteStream(destPath);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded emoji-${key}.png successfully!`);
    });
  }).on('error', (err) => {
    fs.unlink(destPath, () => {});
    console.error(`Error downloading emoji-${key}.png:`, err.message);
  });
});
