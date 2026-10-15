'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getSmartWordDefinition } from '@/data/dictionaryData';
import { getCodeSuggestionForElement } from '@/data/codeSuggestionsData';
import styles from './RedBoxCursorInspector.module.css';

export default function RedBoxCursorInspector() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetInfo, setTargetInfo] = useState(null);
  const [hoveredWordInfo, setHoveredWordInfo] = useState(null);
  const [codeSuggestion, setCodeSuggestion] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const requestRef = useRef(null);

  // Toggle state via global custom events
  useEffect(() => {
    const handleToggle = (e) => {
      if (typeof e.detail === 'boolean') {
        setEnabled(e.detail);
      } else {
        setEnabled((prev) => !prev);
      }
    };
    window.addEventListener('kingshima-toggle-inspector', handleToggle);
    return () => window.removeEventListener('kingshima-toggle-inspector', handleToggle);
  }, []);

  // Check touch device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true);
      }
    }
  }, []);

  // Mouse movement and hover inspector logic
  const handleMouseMove = useCallback((e) => {
    if (!enabled || isTouch) return;

    const x = e.clientX;
    const y = e.clientY;
    setPos({ x, y });
    setHasMoved(true);

    // Identify hovered element
    const el = document.elementFromPoint(x, y);
    if (!el || el.closest(`.${styles.quickBar}`) || el.closest(`.${styles.tooltipCard}`)) {
      return;
    }

    const tagName = el.tagName;
    const isImage = tagName === 'IMG' || tagName === 'SVG';
    const isCode = tagName === 'CODE' || tagName === 'PRE' || el.closest('code') || el.closest('pre');
    const isHeading = /^H[1-6]$/.test(tagName);
    const isParagraphOrText = tagName === 'P' || tagName === 'SPAN' || tagName === 'A' || tagName === 'BUTTON' || isHeading;

    // Get hovered word or target text
    let targetText = el.innerText || el.alt || el.title || '';
    if (targetText && targetText.length > 120) {
      targetText = targetText.slice(0, 120) + '...';
    }

    // Attempt word selection at cursor position
    let hoveredWord = '';
    if (document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(x, y);
      if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
        const textContent = range.startContainer.textContent;
        const offset = range.startOffset;
        const wordMatch = textContent.slice(Math.max(0, offset - 15), offset + 15).match(/[A-Za-z0-9_-]+/g);
        if (wordMatch && wordMatch.length > 0) {
          hoveredWord = wordMatch[0];
        }
      }
    }

    if (!hoveredWord && targetText) {
      const words = targetText.trim().split(/\s+/);
      hoveredWord = words[0] || '';
    }

    // Set inspection details if we hovered a valid element
    if (hoveredWord || isImage || isCode) {
      const rect = el.getBoundingClientRect();
      setTargetInfo({
        rect,
        tagName,
        isImage,
        isCode,
        text: targetText,
      });

      if (isImage) {
        setImageInfo({
          alt: el.alt || 'Kingshima Visual Asset',
          src: el.src || 'Vector Graphic / Illustration',
          origin: 'Custom Web Asset & Interactive UI Design System',
          purpose: 'Visual engagement and intuitive learning reinforcement.',
        });
        setHoveredWordInfo(null);
      } else if (hoveredWord) {
        const dict = getSmartWordDefinition(hoveredWord);
        setHoveredWordInfo(dict);
        setImageInfo(null);
      }

      // Fetch code structure suggestion for code or text elements
      const sug = getCodeSuggestionForElement(targetText || hoveredWord, tagName);
      setCodeSuggestion(sug);
    } else {
      setTargetInfo(null);
      setHoveredWordInfo(null);
      setCodeSuggestion(null);
      setImageInfo(null);
    }
  }, [enabled, isTouch]);

  useEffect(() => {
    if (!enabled || isTouch) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, isTouch, handleMouseMove]);

  if (!enabled || isTouch || !hasMoved) return null;

  // Calculate card position near mouse but inside viewport
  const cardX = Math.min(pos.x + 24, window.innerWidth - 360);
  const cardY = Math.min(pos.y + 24, window.innerHeight - 450);

  return (
    <div className={styles.inspectorWrapper}>
      
      {/* ── Red Glowing Cursor Follower Box ── */}
      <div 
        className={`${styles.redBox} ${targetInfo ? styles.redBoxActive : ''}`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div className={styles.redBoxDot} />
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
      </div>

      {/* ── Dynamic Directional SVG Arrow ── */}
      {targetInfo && (
        <div className={styles.arrowContainer} style={{ left: 0, top: 0 }}>
          <svg className={styles.svgArrow} width="100vw" height="100vh">
            <defs>
              <marker id="red-arrow-head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
            <path
              d={`M ${pos.x} ${pos.y} Q ${pos.x + 40} ${pos.y - 20}, ${cardX} ${cardY + 30}`}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4 2"
              fill="none"
              markerEnd="url(#red-arrow-head)"
            />
          </svg>
        </div>
      )}

      {/* ── Hovered Element Inspection Card ── */}
      {targetInfo && (hoveredWordInfo || imageInfo || codeSuggestion) && (
        <div 
          className={styles.tooltipCard}
          style={{ left: `${cardX}px`, top: `${cardY}px` }}
        >
          {/* 1. Word Definition & Etymology Mode */}
          {hoveredWordInfo && (
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.badge}>{hoveredWordInfo.category}</span>
                <span className={styles.phonetic}>{hoveredWordInfo.phonetic}</span>
              </div>

              <h4 className={styles.wordTitle}>{hoveredWordInfo.word}</h4>

              <div className={styles.originBox}>
                <span className={styles.originLabel}>Etymology & Origin</span>
                <p className={styles.originText}>{hoveredWordInfo.origin}</p>
              </div>

              <p className={styles.definitionText}>{hoveredWordInfo.definition}</p>
            </div>
          )}

          {/* 2. Image Breakdown Mode */}
          {imageInfo && (
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.badge}>Visual Asset Inspector</span>
              </div>
              <h4 className={styles.wordTitle}>{imageInfo.alt}</h4>
              <div className={styles.originBox}>
                <span className={styles.originLabel}>Asset Origin</span>
                <p className={styles.originText}>{imageInfo.origin}</p>
              </div>
              <p className={styles.definitionText}>{imageInfo.purpose}</p>
            </div>
          )}

          {/* 3. Code Structure Suggestion (Arrow Points Here) */}
          {codeSuggestion && (
            <div className={styles.codeSuggestionBox}>
              <div className={styles.codeHeader}>
                <span>✦ Suggested Better Code Structure</span>
                <span>{codeSuggestion.category}</span>
              </div>
              <pre className={styles.codeBlock}>{codeSuggestion.improvedCode}</pre>
              <p className={styles.codeExplanation}>{codeSuggestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* ── Quick Inspector Floating Status Bar ── */}
      <div className={styles.quickBar}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
          Red Box Inspector Active
        </span>
        <button 
          className={styles.toggleBtn}
          onClick={() => setEnabled(false)}
        >
          Disable Inspector
        </button>
      </div>

    </div>
  );
}
