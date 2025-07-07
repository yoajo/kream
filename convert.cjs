const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 변환 대상 디렉터리
const inputDir = path.join(__dirname, 'src/assets/images/products');

fs.readdirSync(inputDir).forEach((file) => {
  if (file.endsWith('.png')) {
    const filePath = path.join(inputDir, file);
    const baseName = path.parse(file).name;

    // WebP 변환
    sharp(filePath)
      .webp({ quality: 80 })
      .toFile(path.join(inputDir, `${baseName}.webp`))
      .then(() => console.log(`${baseName}.webp 변환 완료`))
      .catch((err) => console.error(`WebP 변환 실패: ${file}`, err));

    // AVIF 변환
    sharp(filePath)
      .avif({ quality: 50 })
      .toFile(path.join(inputDir, `${baseName}.avif`))
      .then(() => console.log(`${baseName}.avif 변환 완료`))
      .catch((err) => console.error(`AVIF 변환 실패: ${file}`, err));
  }
});
