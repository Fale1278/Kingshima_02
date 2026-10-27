'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  MousePointerClick,
  Database,
  Layers,
  PenTool,
  GraduationCap,
} from 'lucide-react';
import styles from '../Studio.module.css';

export default function StageDiscover({
  track,
  onProceedToPlayground,
  isVoiceActive,
  onToggleVoice,
  speakText,
  canvasRef,
  initBoardCanvas,
  drawAiConceptOnBoard,
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(track.transcript);
      setTimeout(() => setIsPlayingAudio(false), 16000);
    }
  };

  const handleToggleBoard = () => {
    const next = !showWhiteboard;
    setShowWhiteboard(next);
    if (next) {
      setTimeout(() => {
        drawAiConceptOnBoard();
      }, 50);
    }
  };

  const getModuleTakeaways = () => {
    if (track.id === 'html-structure') {
      return [
        { title: 'HTML is the Skeleton', text: 'It creates every heading, paragraph, button, and image on the web page.' },
        { title: 'Tags Wrap Content', text: 'Tags like <button>Click</button> tell the web browser exactly what role an element plays.' },
        { title: 'Why You Learn This', text: 'Every web page on the internet is built from these exact foundational tags.' },
      ];
    }
    if (track.id === 'css-styling') {
      return [
        { title: 'CSS is the Digital Paint', text: 'It controls colors, font styles, spacing, and glowing gradients.' },
        { title: 'Modern Glassmorphism', text: 'Using border-radius and backdrop-filter: blur creates sleek, luxury interfaces.' },
        { title: 'Micro-Interactions', text: 'Hover transitions make buttons lift and glow when users move their mouse over them.' },
      ];
    }
    if (track.id === 'web-app') {
      return [
        { title: 'All Three in Harmony', text: 'HTML structure + CSS design + JavaScript reactivity = a complete interactive application.' },
        { title: 'Dynamic Lists & State', text: 'User inputs are tracked in memory and instantly rendered on the screen.' },
        { title: 'Authentic Tech Skill', text: 'You are now creating real software that works in every modern browser worldwide.' },
      ];
    }
    // Default / js-interactivity
    return [
      { title: 'State is Page Memory', text: 'It remembers what numbers or items are active right now (like your cart or counter).' },
      { title: 'Event Listeners', text: 'The browser listens for button clicks and runs a function immediately.' },
      { title: 'Instant Screen Updates', text: 'The number redraws on the screen in milliseconds without reloading the page.' },
    ];
  };

  const takeaways = getModuleTakeaways();

  return (
    <div className={styles.stageContainer}>
      <div className={styles.discoverHero}>
        <div className={styles.stageBadge}>
          <Sparkles size={14} />
          <span>Step 1 • Discover the Big Idea</span>
        </div>
        <h1 className={styles.stageHeading}>{track.lessonTitle}</h1>
        <p className={styles.stageSubheading}>
          No prior coding experience needed. Let's understand how modern websites actually work under the hood using simple real-world metaphors.
        </p>
      </div>

      <div className={styles.discoverGrid}>
        {/* ── Left Column: Audio Narrator & Plain-English Story ─────────── */}
        <div className={styles.discoverStoryCard}>
          <div className={styles.cardHeader}>
            <div className={styles.mentorAvatar}>
              <GraduationCap size={24} color={track.accentColor} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>Coach Ada • AI Classroom Teacher</h3>
              <span className={styles.cardSubtitle}>Plain-English Live Explanation ({track.videoDuration})</span>
            </div>
          </div>

          <div className={styles.audioPlayerBox}>
            <button
              type="button"
              className={styles.audioPlayBtn}
              onClick={handlePlayVoice}
              aria-label={isPlayingAudio ? 'Pause Narration' : 'Listen to AI Explanation'}
            >
              {isPlayingAudio ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            </button>
            <div className={styles.audioWaveformInfo}>
              <span className={styles.audioStatus}>
                {isPlayingAudio ? 'Coach Ada is explaining… listen carefully' : 'Click play to listen to Coach Ada speak'}
              </span>
              <div className={styles.audioMiniBars}>
                {[40, 70, 95, 60, 85, 50, 100, 75].map((h, i) => (
                  <span
                    key={i}
                    className={`${styles.miniBar} ${isPlayingAudio ? styles.miniBarActive : ''}`}
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.transcriptBox}>
            <div className={styles.quoteMark}>“</div>
            <p className={styles.transcriptText}>{track.transcript}</p>
          </div>

          <div className={styles.takeawaysBox}>
            <h4 className={styles.takeawaysTitle}>
              <Lightbulb size={16} color="#f59e0b" />
              <span>Key Concept in 3 Simple Bullets:</span>
            </h4>
            <ul className={styles.takeawaysList}>
              {takeaways.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.title}:</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right Column: Interactive Visual Architecture ─────────────── */}
        <div className={styles.discoverVisualCard}>
          <div className={styles.cardHeaderRow}>
            <div>
              <h3 className={styles.cardTitle}>How It Works (Visual Flow)</h3>
              <span className={styles.cardSubtitle}>See the sequence from user tap to screen reaction</span>
            </div>
            <button
              type="button"
              className={`${styles.sketchToggleBtn} ${showWhiteboard ? styles.sketchToggleBtnActive : ''}`}
              onClick={handleToggleBoard}
            >
              <PenTool size={14} />
              <span>{showWhiteboard ? 'Hide Whiteboard' : 'AI Whiteboard'}</span>
            </button>
          </div>

          {showWhiteboard ? (
            <div className={styles.whiteboardEmbedWrapper}>
              <canvas
                ref={canvasRef}
                className={styles.discoverCanvas}
                title="Whiteboard visual concept"
              />
              <div className={styles.boardCaption}>
                <span>✦ Visualized automatically by Coach Ada for {track.name}</span>
              </div>
            </div>
          ) : (
            <div className={styles.visualFlowDiagram}>
              <div className={styles.flowStep}>
                <div className={styles.flowIconCircle} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                  <MousePointerClick size={22} />
                </div>
                <div className={styles.flowStepContent}>
                  <span className={styles.flowStepNumber}>Step 1</span>
                  <h4>User Interaction</h4>
                  <p>A person clicks a button, types text, or moves their mouse.</p>
                </div>
              </div>

              <div className={styles.flowConnector}>↓</div>

              <div className={styles.flowStep}>
                <div className={styles.flowIconCircle} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                  <Database size={22} />
                </div>
                <div className={styles.flowStepContent}>
                  <span className={styles.flowStepNumber}>Step 2</span>
                  <h4>Website Updates Memory (State)</h4>
                  <p>JavaScript processes the event and updates the internal data.</p>
                </div>
              </div>

              <div className={styles.flowConnector}>↓</div>

              <div className={styles.flowStep}>
                <div className={styles.flowIconCircle} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                  <Layers size={22} />
                </div>
                <div className={styles.flowStepContent}>
                  <span className={styles.flowStepNumber}>Step 3</span>
                  <h4>Screen Automatically Updates</h4>
                  <p>The web browser redraws the element with smooth visual feedback.</p>
                </div>
              </div>
            </div>
          )}

          {/* Chapters Breakdown */}
          <div className={styles.chaptersCard}>
            <h4 className={styles.chaptersTitle}>Lesson Breakdown</h4>
            <div className={styles.chaptersRow}>
              {track.chapters.map((ch, idx) => (
                <div key={idx} className={styles.chapterPill}>
                  <span className={styles.chapterTime}>{ch.time}</span>
                  <span className={styles.chapterLabel}>{ch.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Progression Bar ────────────────────────────────────── */}
      <div className={styles.stageFooter}>
        <div className={styles.footerNote}>
          <CheckCircle2 size={16} color="#34d399" />
          <span>You understand the core idea. Next, let's write and test real code with zero risk.</span>
        </div>
        <button
          type="button"
          className={styles.primaryStageCta}
          onClick={onProceedToPlayground}
        >
          <span>Ready! Let's Try It In Sandbox</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
