const { Jimp } = require('jimp');
const path = require('node:path');

const TOLERANCE = 28; // hard cutoff distance from white
const FEATHER = 30; // extra distance range for soft edge

async function processImage(inputPath, outputPath) {
  const image = await Jimp.read(inputPath);
  const { width, height, data } = image.bitmap;

  const idx = (x, y) => (y * width + x) * 4;
  const distToWhite = (x, y) => {
    const i = idx(x, y);
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    return 255 - Math.min(r, g, b);
  };

  const visited = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    queue.push([x, height - 1]);
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    queue.push([width - 1, y]);
  }

  const isBg = new Uint8Array(width * height);

  while (queue.length) {
    const [x, y] = queue.pop();
    if (x < 0 || y < 0 || x >= width || y >= height) continue;
    const p = y * width + x;
    if (visited[p]) continue;
    visited[p] = 1;
    if (distToWhite(x, y) > TOLERANCE) continue;
    isBg[p] = 1;
    queue.push([x + 1, y]);
    queue.push([x - 1, y]);
    queue.push([x, y + 1]);
    queue.push([x, y - 1]);
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const i = p * 4;
      if (isBg[p]) {
        data[i + 3] = 0;
        continue;
      }
      let nearBg = false;
      for (let dy = -1; dy <= 1 && !nearBg; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (isBg[ny * width + nx]) {
            nearBg = true;
            break;
          }
        }
      }
      if (nearBg) {
        const d = distToWhite(x, y);
        const alpha = Math.min(255, Math.max(0, ((d - TOLERANCE) / FEATHER) * 255));
        data[i + 3] = Math.min(data[i + 3], Math.round(alpha));
      }
    }
  }

  await image.write(outputPath);
  console.log('wrote', outputPath);
}

const jobs = [
  ['src/assets/cars/player-raw.png', 'src/assets/cars/player.png'],
  ['src/assets/cars/police-raw.png', 'src/assets/cars/police.png'],
  ['src/assets/cars/truck-raw.png', 'src/assets/cars/truck.png'],
  ['src/assets/cars/sedan-raw.jpg', 'src/assets/cars/sedan.png'],
];

(async () => {
  for (const [inFile, outFile] of jobs) {
    await processImage(path.resolve(inFile), path.resolve(outFile));
  }
})();
