'use client';

import React from 'react';
import styles from './GlassCard.module.css';

const GlassCard = ({ children, className = "", delay = 0 }) => {
  return (
    <div 
      className={`${styles.card} glass ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
