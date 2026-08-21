'use client'
import { useEffect, useRef, useState } from 'react';

export default function MathCanvas({ fn, color = '#2563eb', rangeX = [-10, 10], rangeY = [-3, 3], caption = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy loading: only observe and render when within viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 600;
      const height = 300;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Cartesian boundaries
      const [minX, maxX] = rangeX;
      const [minY, maxY] = rangeY;

      // Coordinate mapping utilities
      const toPixelX = (x) => {
        return ((x - minX) / (maxX - minX)) * width;
      };

      const toPixelY = (y) => {
        return height - ((y - minY) / (maxY - minY)) * height;
      };

      const toCartesianX = (px) => {
        return minX + (px / width) * (maxX - minX);
      };

      // Draw background
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid lines
      ctx.strokeStyle = '#e4e4e7';
      ctx.lineWidth = 1;

      // Vertical Grid
      for (let x = Math.ceil(minX); x <= Math.floor(maxX); x++) {
        if (x === 0) continue;
        const px = toPixelX(x);
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();
      }

      // Horizontal Grid
      for (let y = Math.ceil(minY); y <= Math.floor(maxY); y++) {
        if (y === 0) continue;
        const py = toPixelY(y);
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Draw Main Axes
      ctx.strokeStyle = '#71717a';
      ctx.lineWidth = 1.5;

      // X-Axis (y=0)
      const xAxisY = toPixelY(0);
      ctx.beginPath();
      ctx.moveTo(0, xAxisY);
      ctx.lineTo(width, xAxisY);
      ctx.stroke();

      // Y-Axis (x=0)
      const yAxisX = toPixelX(0);
      ctx.beginPath();
      ctx.moveTo(yAxisX, 0);
      ctx.lineTo(yAxisX, height);
      ctx.stroke();

      // Plot Function Curve
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let first = true;
      for (let px = 0; px <= width; px++) {
        const x = toCartesianX(px);
        const y = fn(x);
        const py = toPixelY(y);

        if (!isNaN(y) && isFinite(y) && py >= 0 && py <= height) {
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
    };

    resizeCanvas();

    // Responsive resize listener
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isVisible, fn, color, rangeX, rangeY]);

  return (
    <div ref={containerRef} className="my-4 border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50 p-4">
      <div className="relative w-full min-h-[300px] flex items-center justify-center">
        {isVisible ? (
          <canvas ref={canvasRef} className="block w-full border border-zinc-200 rounded-lg bg-white" />
        ) : (
          <div className="text-xs font-mono text-zinc-400">Loading Canvas...</div>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-center text-xs font-mono text-zinc-400">
          {caption}
        </p>
      )}
    </div>
  );
}

