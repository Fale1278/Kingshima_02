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
      // Auto reset play state after typical speech duration
      setTimeout(() => setIsPlayingAudio(false), 15000);
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

  return (
    <div className={styles.stageContainer}>
      <div className={styles.discoverHero}>
        <div className={styles.stageBadge}>
          <Sparkles size={14} />
          <span>Step 1 • Discover the Big Idea</span>
        </div>
        <h1 className={styles.stageHeading}>{track.lessonTitle}</h1>
        <p className={styles.stageSubheading}>
          No prior coding experience needed. Let's understand how modern apps actually work under the hood using simple real-world metaphors.
        </p>
      </div>

      <div className={styles.discoverGrid}>
        {/* ── Left Column: Audio Narrator & Plain-English Story ─────────── */}
        <div className={styles.discoverStoryCard}>
          <div className={styles.cardHeader}>
            <div className={styles.mentorAvatar}>
              <track.icon size={24} color={track.accentColor} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>AI Mentor Explainer</h3>
              <span className={styles.cardSubtitle}>Dr. K. Ada • Plain-English Guide ({track.videoDuration})</span>
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
                {isPlayingAudio ? 'Speaking now… listen carefully' : 'Click play to listen to this concept'}
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
              <li>
                <strong>What is "State"?</strong> It's the website's short-term memory (like remembering what's in your shopping cart).
              </li>
              <li>
                <strong>What happens when you click?</strong> The website listens for your touch, changes the memory, and redraws that part of the screen instantly.
              </li>
              <li>
                <strong>Why you're learning this:</strong> Every modern app (Netflix, Instagram, Uber) is built upon this exact fundamental idea.
              </li>
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
                <span>✦ Visualized automatically by Kingshima AI for {track.name}</span>
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
                  <p>A person clicks a button, types text, or toggles a switch.</p>
                </div>
              </div>

              <div className={styles.flowConnector}>↓</div>

              <div className={styles.flowStep}>
                <div className={styles.flowIconCircle} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                  <Database size={22} />
                </div>
                <div className={styles.flowStepContent}>
                  <span className={styles.flowStepNumber}>Step 2</span>
                  <h4>Website Updates Memory</h4>
                  <p>The code changes the value (e.g., adds +1 to your count).</p>
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
                  <p>The user sees the new number immediately with smooth feedback.</p>
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
          <span>You understand the core idea. Next, you will test and change it with zero risk.</span>
        </div>
        <button
          type="button"
          className={styles.primaryStageCta}
          onClick={onProceedToPlayground}
        >
          <span>Ready! Let's Try It Ourselves</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
