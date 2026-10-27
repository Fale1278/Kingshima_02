'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Flame,
  Star,
  BookOpen,
} from 'lucide-react';
import styles from '../Studio.module.css';

export default function StageCelebrate({
  track,
  aiGradeResult,
  currentXp,
  streakDays,
  onBackToPlayground,
  onClaimCertificate,
  isClaimingCert,
  onNextTrack,
}) {
  const score = aiGradeResult?.score || 95;
  const grade = aiGradeResult?.grade || 'A+';
  const status = aiGradeResult?.status || 'Skill Mastered';

  const strengths = aiGradeResult?.strengths || [
    'Successfully mapped user clicks to component memory (state).',
    'Created immediate, fluid visual changes in the live preview.',
    'Demonstrated clean, well-structured web principles with zero fear.',
  ];

  const tips = aiGradeResult?.tips || [
    'Try experimenting with different background gradients in style.css.',
    'Challenge yourself: can you add a button that doubles the number?',
  ];

  return (
    <div className={styles.stageContainer}>
      <div className={styles.celebrateCard}>
        {/* Confetti & Hero Badge */}
        <div className={styles.celebrateBadge}>
          <Sparkles size={16} />
          <span>Step 3 • Milestone Mastered</span>
        </div>

        <h1 className={styles.celebrateHeading}>Congratulations! You Did It! 🎉</h1>
        <p className={styles.celebrateSubheading}>
          You just built, understood, and tested real reactive software. Here is your AI instructor's personalized feedback.
        </p>

        {/* Score & Rewards Row */}
        <div className={styles.scoreRewardRow}>
          <div className={styles.scoreHeroCircle}>
            <span className={styles.scoreBigNum}>{score}%</span>
            <span className={styles.scoreGradeTag}>Grade {grade}</span>
          </div>

          <div className={styles.rewardBadgesCol}>
            <div className={styles.rewardPill}>
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <span>+150 XP Added to Your Profile</span>
            </div>
            <div className={styles.rewardPill}>
              <Flame size={16} color="#f97316" />
              <span>{streakDays} Day Learning Streak</span>
            </div>
            <div className={styles.rewardPill}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>All 4 Lesson Objectives Completed</span>
            </div>
          </div>
        </div>

        {/* Feedback Breakdown in Plain English */}
        <div className={styles.feedbackBreakdownGrid}>
          <div className={styles.strengthsBox}>
            <h3 className={styles.boxTitle}>
              <CheckCircle2 size={18} color="#34d399" />
              <span>What You Did Exceptionally Well</span>
            </h3>
            <ul className={styles.strengthsList}>
              {strengths.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>

          <div className={styles.tipsBox}>
            <h3 className={styles.boxTitle}>
              <Sparkles size={18} color="#60a5fa" />
              <span>Ideas to Explore Next</span>
            </h3>
            <ul className={styles.tipsList}>
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.celebrateActions}>
          <button
            type="button"
            className={styles.tinkerBtn}
            onClick={onBackToPlayground}
            title="Return to sandbox to keep experimenting"
          >
            <RotateCcw size={15} />
            <span>Keep Tinkering in Sandbox</span>
          </button>

          <button
            type="button"
            className={styles.diplomaCtaBtn}
            onClick={onClaimCertificate}
            disabled={isClaimingCert}
            title="Claim your verified Kingshima milestone diploma"
          >
            <Award size={16} />
            <span>{isClaimingCert ? 'Claiming…' : 'Claim Milestone Certificate'}</span>
          </button>

          <button
            type="button"
            className={styles.nextLessonCtaBtn}
            onClick={onNextTrack}
          >
            <span>Next Learning Mission</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
