'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThreeDBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Handle high DPI
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    let width = 0;
    let height = 0;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setSize();
    window.addEventListener('resize', setSize);

    // Mouse tracking with inertia
    let mouse = { x: width / 2, y: height / 2 };
    let smoothMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 3D Wave & Lattice Grid Parameters
    const rows = 28;
    const cols = 36;
    const spacing = 58;
    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Mouse easing (inertia)
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      if (isLight) {
        // Light mode: Crisp authoritative Navy Blue geometric lattice & subtle wave
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height * 0.55;
        const tiltX = ((smoothMouse.y - height / 2) / height) * 0.15;
        const tiltY = ((smoothMouse.x - width / 2) / width) * 0.25;

        const points = [];

        for (let r = 0; r < rows; r++) {
          const z = (r + 1) * spacing;
          const proj = 340 / (z + 220);
          const rowPoints = [];

          for (let c = 0; c < cols; c++) {
            const x3d = (c - cols / 2) * spacing;
            const wave = Math.sin(r * 0.25 + time + c * 0.2) * 16;
            const y3d = 120 + wave;

            const rx = x3d * Math.cos(tiltY) - z * Math.sin(tiltY);
            const rz = z * Math.cos(tiltY) + x3d * Math.sin(tiltY);
            const ry = y3d * Math.cos(tiltX) - rz * Math.sin(tiltX);

            const screenX = cx + rx * proj;
            const screenY = cy + ry * proj;
            const depthRatio = 1 - z / (rows * spacing);

            rowPoints.push({ x: screenX, y: screenY, proj, depth: depthRatio });
          }
          points.push(rowPoints);
        }

        // Draw delicate connecting wireframe lines in navy
        ctx.lineWidth = 1;
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const p = points[r][c];
            const pRight = points[r][c + 1];
            const alpha = Math.max(0, p.depth * 0.09);

            if (alpha > 0.01) {
              ctx.strokeStyle = `rgba(30, 64, 175, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pRight.x, pRight.y);
              ctx.stroke();
            }
          }
        }

        // Draw crisp navy vertices
        for (let r = 0; r < rows; r += 2) {
          for (let c = 0; c < cols; c += 2) {
            const p = points[r][c];
            if (p.x >= -10 && p.x <= width + 10 && p.y >= -10 && p.y <= height + 10) {
              const alpha = Math.max(0, p.depth * 0.45);
              ctx.fillStyle = `rgba(30, 64, 175, ${alpha})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, Math.max(0.75, 2.2 * p.proj), 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      } else {
        // Dark mode: High-tech 3D perspective terrain & royal tech navy particles
        const cx = width / 2;
        const cy = height * 0.58;

        const tiltX = ((smoothMouse.y - height / 2) / height) * 0.35;
        const tiltY = ((smoothMouse.x - width / 2) / width) * 0.45;

        // Calculate 3D points
        const points = [];

        for (let r = 0; r < rows; r++) {
          const z = (r + 1) * spacing;
          const proj = 420 / (z + 240);
          const rowPoints = [];

          for (let c = 0; c < cols; c++) {
            const x3d = (c - cols / 2) * spacing;
            const distFromCenter = Math.hypot((c - cols / 2) / cols, (r - rows / 2) / rows);
            const wave = Math.sin(r * 0.32 - time * 1.2 + c * 0.18) * 22 + Math.cos(distFromCenter * 6 - time * 0.8) * 14;
            const y3d = 140 + wave;

            const rx = x3d * Math.cos(tiltY) - z * Math.sin(tiltY);
            const rz = z * Math.cos(tiltY) + x3d * Math.sin(tiltY);
            const ry = y3d * Math.cos(tiltX) - rz * Math.sin(tiltX);

            const screenX = cx + rx * proj;
            const screenY = cy + ry * proj;
            const depthRatio = 1 - z / (rows * spacing);

            rowPoints.push({ x: screenX, y: screenY, proj, depth: depthRatio, c, r });
          }
          points.push(rowPoints);
        }

        // Draw connecting 3D lattice lines (subtle navy/cyan perspective wireframe)
        ctx.lineWidth = 1;
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const p = points[r][c];
            const pRight = points[r][c + 1];
            const pDown = points[r + 1][c];

            const alpha = Math.max(0, p.depth * 0.15);

            if (alpha > 0.02) {
              ctx.strokeStyle = c % 4 === 0 
                ? `rgba(37, 99, 235, ${alpha * 1.4})` 
                : `rgba(56, 189, 248, ${alpha * 0.8})`;

              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pRight.x, pRight.y);
              ctx.stroke();

              if (r % 2 === 0) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pDown.x, pDown.y);
                ctx.stroke();
              }
            }
          }
        }

        // Draw luminous kinetic vertices
        for (let r = 0; r < rows; r += 2) {
          for (let c = 0; c < cols; c += 2) {
            const p = points[r][c];
            if (p.x >= -10 && p.x <= width + 10 && p.y >= -10 && p.y <= height + 10) {
              const alpha = Math.max(0, p.depth * 0.7);
              const isAccent = (r + c) % 6 === 0;

              if (isAccent) {
                ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
                ctx.shadowColor = '#2563eb';
                ctx.shadowBlur = 8;
              } else {
                ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.6})`;
                ctx.shadowBlur = 0;
              }

              ctx.beginPath();
              ctx.arc(p.x, p.y, Math.max(0.8, 2.4 * p.proj), 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Horizon Vignette & Depth Mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLight
            ? 'radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(248, 250, 252, 0.88) 90%)'
            : 'radial-gradient(ellipse at 50% 35%, transparent 15%, rgba(8, 9, 14, 0.88) 85%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ThreeDBackground;
