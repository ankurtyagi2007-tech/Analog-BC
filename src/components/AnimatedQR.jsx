import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function generateQRPattern(seed = 42) {
  const grid = [];
  let s = seed;
  for (let row = 0; row < 21; row++) {
    const rowData = [];
    for (let col = 0; col < 21; col++) {
      // Position detection patterns (corners)
      const isTopLeft = row < 7 && col < 7;
      const isTopRight = row < 7 && col > 13;
      const isBottomLeft = row > 13 && col < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        const r = Math.min(row % 7, 6 - (row % 7));
        const c = Math.min(col % 7, 6 - (col % 7));
        rowData.push(r === 0 || c === 0 || (r >= 2 && c >= 2) ? 1 : 0);
      } else {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        rowData.push(s % 3 !== 0 ? 1 : 0);
      }
    }
    grid.push(rowData);
  }
  return grid;
}

export default function AnimatedQR({ itemName, businessName }) {
  const [time, setTime] = useState(new Date());
  const grid = generateQRPattern(Date.now() % 1000);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Rotating gradient border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-3 rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, #C4713B, #8B9D77, #2C1810, #C4713B)',
            opacity: 0.7,
          }}
        />

        {/* Pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-3 rounded-2xl"
          style={{
            background: 'conic-gradient(from 180deg, #C4713B, #8B9D77, #2C1810, #C4713B)',
            opacity: 0.4,
            filter: 'blur(8px)',
          }}
        />

        {/* QR code container */}
        <div className="relative bg-warm-white rounded-xl p-4 z-10">
          <svg viewBox="0 0 21 21" className="w-48 h-48">
            {grid.map((row, r) =>
              row.map((cell, c) => (
                cell ? (
                  <motion.rect
                    key={`${r}-${c}`}
                    x={c}
                    y={r}
                    width={1}
                    height={1}
                    fill="#2C1810"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: (r + c) * 0.02,
                      ease: 'easeInOut',
                    }}
                  />
                ) : null
              ))
            )}
          </svg>
        </div>
      </div>

      <div className="text-center">
        <p className="font-serif text-xl text-espresso">{itemName}</p>
        <p className="text-warm-gray text-sm mt-1">{businessName}</p>
        <p className="text-espresso/50 text-xs mt-3 font-mono tabular-nums">
          {time.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
