function isFinderModule(x, y, size) {
  const inTopLeft = x < 7 && y < 7;
  const inTopRight = x >= size - 7 && y < 7;
  const inBottomLeft = x < 7 && y >= size - 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

function isFinderCell(x, y, size) {
  const regions = [
    { ox: 0, oy: 0 },
    { ox: size - 7, oy: 0 },
    { ox: 0, oy: size - 7 }
  ];

  for (const { ox, oy } of regions) {
    const lx = x - ox;
    const ly = y - oy;
    if (lx < 0 || ly < 0 || lx > 6 || ly > 6) continue;

    const outer = lx === 0 || lx === 6 || ly === 0 || ly === 6;
    const inner = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
    if (outer || inner) return true;
  }

  return false;
}

function hashCell(value, x, y) {
  let hash = 2166136261;
  const input = `${value}:${x}:${y}`;

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash % 2 === 0;
}

export function buildQrMatrix(value, size = 25) {
  const matrix = [];

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      if (isFinderModule(x, y, size)) {
        row.push(isFinderCell(x, y, size));
      } else {
        row.push(hashCell(value, x, y));
      }
    }
    matrix.push(row);
  }

  return matrix;
}
