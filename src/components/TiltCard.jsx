'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './TiltCard.module.css';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  onClick,
  ...rest
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.5s var(--ease-out-expo)',
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)',
  });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const tiltX = (0.5 - percentY) * (maxTilt * 2);
    const tiltY = (percentX - 0.5) * (maxTilt * 2);

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    if (glare) {
      setGlareStyle({
        opacity: 0.6,
        background: `radial-gradient(circle at ${(percentX * 100).toFixed(1)}% ${(percentY * 100).toFixed(1)}%, rgba(255,255,255,0.14) 0%, transparent 55%)`,
      });
    }
  }, [isTouch, maxTilt, scale, perspective, glare]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s var(--ease-out-expo)',
    });
    if (glare) {
      setGlareStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));
    }
  }, [isTouch, perspective, glare]);

  return (
    <div
      ref={cardRef}
      className={`${styles.tiltWrapper} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...rest}
    >
      <div className={styles.tiltInner}>
        {children}
      </div>
      {glare && !isTouch && (
        <div
          className={styles.glareLayer}
          style={glareStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
