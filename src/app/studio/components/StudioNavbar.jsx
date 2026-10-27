'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  MessageSquare,
  Sparkles,
  Save,
  CheckCircle,
  Code2,
  GraduationCap,
} from 'lucide-react';
import styles from '../Studio.module.css';

export default function StudioNavbar({
  track,
  tracks,
  selectedTrackIndex,
  onSelectTrack,
  activeStage,
  onStageChange,
  isVoiceActive,
  onToggleVoice,
  onOpenMentor,
  isSaving,
  saveStatus,
  onSave,
  currentXp,
  student,
}) {
  const stages = [
    { id: 'discover', step: '1', title: 'Discover' },
    { id: 'playground', step: '2', title: 'Try It' },
    { id: 'celebrate', step: '3', title: 'Celebrate' },
  ];

  return (
    <header className={styles.topBar}>
      {/* ── Left: Back & Track Orientation ─────────────────────────────── */}
      <div className={styles.navLeft}>
        <Link href="/bootcamp/dashboard" className={styles.backLink} title="Back to Bootcamp Dashboard">
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </Link>

        <div className={styles.divider} />

        <div className={styles.trackPickerWrapper}>
          <span className={styles.trackPickerLabel}>Web Dev:</span>
          <select
            className={styles.trackSelectDropdown}
            value={selectedTrackIndex}
            onChange={(e) => onSelectTrack(Number(e.target.value))}
            aria-label="Select Web Development Module"
          >
            {tracks.map((t, idx) => (
              <option key={t.id} value={idx}>
                {t.moduleNumber}: {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Center: 3-Stage Guided Stepper ─────────────────────────────── */}
      <nav className={styles.stageStepper} aria-label="Learning Stages">
        {stages.map((stage, idx) => {
          const isActive = activeStage === stage.id;
          const isPassed =
            (activeStage === 'playground' && stage.id === 'discover') ||
            (activeStage === 'celebrate' && (stage.id === 'discover' || stage.id === 'playground'));

          return (
            <React.Fragment key={stage.id}>
              {idx > 0 && <div className={`${styles.stepperLine} ${isPassed ? styles.stepperLineDone : ''}`} />}
              <button
                type="button"
                className={`${styles.stepButton} ${isActive ? styles.stepButtonActive : ''} ${isPassed ? styles.stepButtonDone : ''}`}
                onClick={() => onStageChange(stage.id)}
                title={`Go to Step ${stage.step}: ${stage.title}`}
              >
                <span className={styles.stepCircle}>
                  {isPassed ? <CheckCircle size={13} /> : stage.step}
                </span>
                <span className={styles.stepTitle}>{stage.title}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* ── Right: Supportive Actions (Clean & Quiet) ─────────────────── */}
      <div className={styles.navRight}>
        {/* Student XP Badge */}
        {student && (
          <div className={styles.studentBadgePill} title={`Logged in as ${student.username}`}>
            <span>⭐ {currentXp} XP</span>
            <span className={styles.studentDot}>•</span>
            <span className={styles.studentNameText}>{student.username}</span>
          </div>
        )}

        {/* Voice Toggle */}
        <button
          type="button"
          className={`${styles.iconPillBtn} ${isVoiceActive ? styles.iconPillBtnActive : ''}`}
          onClick={onToggleVoice}
          title={isVoiceActive ? 'Coach Ada Voice: Active (Click to mute)' : 'Coach Ada Voice: Off (Click to turn on)'}
        >
          {isVoiceActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{isVoiceActive ? 'Voice On' : 'Voice Off'}</span>
        </button>

        {/* Ask AI Teacher CTA */}
        <button
          type="button"
          className={styles.mentorToggleBtn}
          onClick={onOpenMentor}
          title="Open Coach Ada for real-time classroom conversation"
        >
          <GraduationCap size={16} />
          <span>Coach Ada</span>
          <span className={styles.liveTinyDot} />
        </button>
      </div>
    </header>
  );
}
