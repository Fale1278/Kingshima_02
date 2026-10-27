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
  HelpCircle,
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
        <Link href="/bootcamp" className={styles.backLink} title="Back to Bootcamp">
          <ArrowLeft size={16} />
          <span>Bootcamp</span>
        </Link>

        <div className={styles.divider} />

        <div className={styles.trackPickerWrapper}>
          <span className={styles.trackPickerLabel}>Learning:</span>
          <select
            className={styles.trackSelectDropdown}
            value={selectedTrackIndex}
            onChange={(e) => onSelectTrack(Number(e.target.value))}
            aria-label="Select Learning Track"
          >
            {tracks.map((t, idx) => (
              <option key={t.id} value={idx}>
                {t.name}
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
        {/* Voice Toggle */}
        <button
          type="button"
          className={`${styles.iconPillBtn} ${isVoiceActive ? styles.iconPillBtnActive : ''}`}
          onClick={onToggleVoice}
          title={isVoiceActive ? 'Voice Explanations: Active (Click to mute)' : 'Voice Explanations: Off (Click to activate)'}
        >
          {isVoiceActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{isVoiceActive ? 'Voice On' : 'Voice Off'}</span>
        </button>

        {/* Auto / Manual Save Indicator */}
        <button
          type="button"
          className={styles.saveStatusBtn}
          onClick={onSave}
          disabled={isSaving}
          title="Save your current progress to the cloud"
        >
          <Save size={14} />
          <span>{isSaving ? 'Saving…' : saveStatus || 'Saved'}</span>
        </button>

        {/* Ask AI Mentor CTA */}
        <button
          type="button"
          className={styles.mentorToggleBtn}
          onClick={onOpenMentor}
          title="Open AI Mentor for friendly help"
        >
          <Sparkles size={15} className={styles.sparkleIcon} />
          <span>Ask Mentor</span>
        </button>
      </div>
    </header>
  );
}
