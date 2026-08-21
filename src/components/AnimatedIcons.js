'use client'
import { useEffect, useRef, useState } from 'react';

// 공통 Canvas 애니메이션 훅
function useCanvasAnimation(draw) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const size = 36;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    let animationFrameId;
    let startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);
      draw(ctx, time, size);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, draw]);

  return canvasRef;
}

// 1. 해석학 (Analysis): 푸리에 급수 수렴 (Fourier Series Convergence)
export function AnalysisIcon({ color = '#2563eb' }) {
  const draw = (ctx, time, size) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // N goes from 1 to 5 and back, representing the number of harmonics
    const N = Math.floor((Math.sin(time * 2) + 1) * 2.5) + 1; 
    
    ctx.beginPath();
    for (let px = 0; px <= size; px++) {
      const x = (px / size) * Math.PI * 4; // x from 0 to 4pi
      let y = 0;
      // Fourier series for a square wave
      for (let k = 1; k <= N; k++) {
        const n = 2 * k - 1;
        y += Math.sin(n * (x - time)) / n;
      }
      
      const py = size/2 - (y * (size * 0.3));
      
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  };
  const canvasRef = useCanvasAnimation(draw);
  return <canvas ref={canvasRef} className="block" />;
}

// 2. 위상수학 (Topology): 원과 정사각형의 위상동형 변환 (Homeomorphism)
export function TopologyIcon({ color = '#059669' }) {
  const draw = (ctx, time, size) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // t oscillates smoothly between 0 (Circle) and 1 (Square)
    const t = (Math.sin(time * 2) + 1) / 2;
    const radius = size * 0.35;
    const center = size / 2;

    ctx.beginPath();
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * Math.PI * 2;
      
      // Circle coordinates
      const cx = Math.cos(theta);
      const cy = Math.sin(theta);
      
      // Square coordinates (normalized circle)
      const max = Math.max(Math.abs(cx), Math.abs(cy));
      const sx = cx / max;
      const sy = cy / max;
      
      // Interpolate based on t
      const x = center + (cx * (1 - t) + sx * t) * radius;
      const y = center + (cy * (1 - t) + sy * t) * radius;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };
  const canvasRef = useCanvasAnimation(draw);
  return <canvas ref={canvasRef} className="block" />;
}

// 3. 기하학 (Geometry): 쌍곡 포물면 말안장 (Hyperbolic Paraboloid / Saddle Manifold)
export function GeometryIcon({ color = '#e11d48' }) {
  const draw = (ctx, time, size) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8;
    
    const s = size * 0.35;
    const cx = size / 2;
    const cy = size / 2;
    
    // 3D rotation
    const rotate = (x, y, z, angleX, angleY, angleZ) => {
      // Z rot
      let x1 = x * Math.cos(angleZ) - y * Math.sin(angleZ);
      let y1 = x * Math.sin(angleZ) + y * Math.cos(angleZ);
      // Y rot
      let x2 = x1 * Math.cos(angleY) - z * Math.sin(angleY);
      let z1 = x1 * Math.sin(angleY) + z * Math.cos(angleY);
      // X rot
      let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX);
      return { px: cx + x2, py: cy + y2 };
    };

    const angleX = Math.PI/4;
    const angleY = time * 0.8;
    const angleZ = time * 0.2;

    const gridSize = 6;
    const points = [];
    
    for (let i = -gridSize; i <= gridSize; i += 2) {
      const row = [];
      for (let j = -gridSize; j <= gridSize; j += 2) {
        const x = (i / gridSize) * s;
        const y = (j / gridSize) * s;
        // z = x^2 - y^2 (Saddle equation)
        const z = ((i*i - j*j) / (gridSize*gridSize)) * (s * 0.6);
        row.push(rotate(x, y, z, angleX, angleY, angleZ));
      }
      points.push(row);
    }

    ctx.beginPath();
    // Draw grid lines
    const n = points.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (j < n - 1) {
          ctx.moveTo(points[i][j].px, points[i][j].py);
          ctx.lineTo(points[i][j+1].px, points[i][j+1].py);
        }
        if (i < n - 1) {
          ctx.moveTo(points[i][j].px, points[i][j].py);
          ctx.lineTo(points[i+1][j].px, points[i+1][j].py);
        }
      }
    }
    ctx.stroke();
  };
  const canvasRef = useCanvasAnimation(draw);
  return <canvas ref={canvasRef} className="block" />;
}

// 4. 대수학 (Algebra): 대칭군 (Dihedral Group D5 / Pentagram)
export function AlgebraIcon({ color = '#7e22ce' }) {
  const draw = (ctx, time, size) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.save();
    ctx.translate(size/2, size/2);
    
    // Discrete-like smooth rotation
    const rotation = time * 0.6;
    ctx.rotate(rotation);

    const radius = size * 0.35;
    const n = 5;
    
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i * Math.PI * 2) / n - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i * 2 * Math.PI * 2) / n - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    
    ctx.fillStyle = color;
    ctx.globalAlpha = 1.0;
    for (let i = 0; i < n; i++) {
      const angle = (i * Math.PI * 2) / n - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };
  const canvasRef = useCanvasAnimation(draw);
  return <canvas ref={canvasRef} className="block" />;
}

// 5. 기초 & 논리 (Foundations & Logic): 집합론 (Venn Diagram)
export function FoundationsIcon({ color = '#4338ca' }) {
  const draw = (ctx, time, size) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;

    // 두 원의 중심 거리가 서서히 변하는 애니메이션 (집합의 결합과 분리)
    const baseOffset = size * 0.12;
    const animOffset = Math.sin(time * 1.5) * (size * 0.08);
    const offset = baseOffset + animOffset;
    
    const radius = size * 0.28;

    ctx.save();
    ctx.translate(size/2, size/2);

    // 테두리 그리기
    ctx.beginPath();
    ctx.arc(-offset, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(offset, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 내부 채우기 (겹치는 부분, 즉 교집합이 자연스럽게 진해지도록 알파값 사용)
    ctx.globalAlpha = 0.15;
    
    ctx.beginPath();
    ctx.arc(-offset, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(offset, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };
  const canvasRef = useCanvasAnimation(draw);
  return <canvas ref={canvasRef} className="block" />;
}
