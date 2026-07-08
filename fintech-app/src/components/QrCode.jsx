import { buildQrMatrix } from "../lib/qr.js";

export default function QrCode({ value, size = 200 }) {
  const matrix = buildQrMatrix(value);
  const cells = matrix.length;
  const cellSize = size / cells;

  return (
    <svg
      className="qr-code"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="QR Code PIX"
    >
      <rect width={size} height={size} fill="#ffffff" rx="8" />
      {matrix.map((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#000000"
            />
          ) : null
        )
      )}
    </svg>
  );
}
