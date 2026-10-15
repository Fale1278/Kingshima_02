'use client';

import React, { useState, useEffect } from 'react';
import TiltCard from './TiltCard';
import styles from './HeroTechConsole.module.css';

const CODE_SNIPPET = `// Kingshima Foundation Curriculum Architecture
import { FaithValues, CodeLab, Mentorship } from '@kingshima/core';

export async function equipNextGenLeader(student: CandidateProfile) {
  const foundation = await FaithValues.ground({
    character: 'Biblical Integrity',
    purpose: 'Serve communities with technological excellence',
  });

  const training = await CodeLab.enrollTrack(student.discipline, {
    modules: ['Next.js 16', 'Python AI', 'UI/UX Systems', 'Cloud & DevOps'],
    mode: 'project_based_capstone',
  });

  return Mentorship.launchFellowship({
    fellow: student.name,
    grounded: foundation.verified,
    readiness: 'Industry Production Standard',
  });
}`;

export default function HeroTechConsole() {
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'telemetry' | 'terminal'
  const [executing, setExecuting] = useState(false);
  const [logs, setLogs] = useState([
    '[WELCOME] Kingshima Innovation Labs & Learning Hub',
    '[MISSION] Faith-driven, youth-focused technology education',
    '[STATUS] Active cohorts in Lagos, Abuja & Virtual Learning Hub',
  ]);
  const [watTime, setWatTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Africa/Lagos',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setWatTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    if (executing) return;
    setExecuting(true);
    setLogs((prev) => [...prev, `[SPRINT] Initiating cohort project review at ${watTime} WAT...`]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        '[REVIEW] Validating code architecture, design tokens & character capstones...',
      ]);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        '[COMPLETE] Project deployed. Mentor review scheduled with industry faculty.',
      ]);
      setExecuting(false);
    }, 1400);
  };

  return (
    <TiltCard
      className={styles.consoleTilt}
      maxTilt={6}
      scale={1.012}
      perspective={1200}
    >
      <div className={styles.console}>
        {/* Top Window Bar */}
        <div className={styles.windowHeader}>
          <div className={styles.windowControls}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>

          <div className={styles.titleInfo}>
            <span className={styles.gitBranch}>Kingshima Interactive Console</span>
            <span className={styles.statusDivider}>/</span>
            <span className={styles.liveClock}>WAT {watTime || '19:00:00'}</span>
          </div>

          <div className={styles.networkBadge}>
            <span className={styles.pulseDot} />
            <span>Active Cohort Hub</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'code' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <span className={styles.tabIcon}>ts</span>
            <span>Curriculum.ts</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'telemetry' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            <span className={styles.tabIcon}>✦</span>
            <span>Program Impact</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'terminal' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <span className={styles.tabIcon}>▶</span>
            <span>Live Project Sprint</span>
          </button>
        </div>

        {/* Console Body */}
        <div className={styles.body}>
          {activeTab === 'code' && (
            <div className={styles.codeView}>
              <pre className={styles.codeBlock}>
                <code>{CODE_SNIPPET}</code>
              </pre>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className={styles.telemetryGrid}>
              <div className={styles.telemetryCard}>
                <div className={styles.telHead}>
                  <span>Youth Reached Across Cohorts</span>
                  <span className={styles.telValue}>500+</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '100%' }} />
                </div>
              </div>

              <div className={styles.telemetryCard}>
                <div className={styles.telHead}>
                  <span>Production Capstone Projects</span>
                  <span className={styles.telValue}>40+ Shipped</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '92%', background: 'var(--accent-secondary)' }} />
                </div>
              </div>

              <div className={styles.telemetryCard}>
                <div className={styles.telHead}>
                  <span>Mentor-to-Student Ratio</span>
                  <span className={styles.telValue}>1 : 5</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '100%', background: 'var(--accent-emerald)' }} />
                </div>
              </div>

              <div className={styles.telemetryMeta}>
                <span>● 5 CORE TRAINING DISCIPLINES</span>
                <span>● BIBLICAL INTEGRITY AT THE CORE</span>
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className={styles.terminalView}>
              <div className={styles.logStream}>
                {logs.map((line, idx) => (
                  <div key={idx} className={styles.logLine}>
                    <span className={styles.logPrompt}>❯</span>
                    <span className={styles.logText}>{line}</span>
                  </div>
                ))}
              </div>

              <div className={styles.terminalActionRow}>
                <button
                  className={styles.executeBtn}
                  onClick={runSimulation}
                  disabled={executing}
                >
                  {executing ? (
                    <>
                      <span className={styles.spinner} />
                      <span>Reviewing Project...</span>
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      <span>Run Sprint Simulation</span>
                    </>
                  )}
                </button>
                <span className={styles.terminalHint}>Simulate student capstone sprint</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className={styles.consoleFooter}>
          <div className={styles.footerLeft}>
            <span className={styles.accentBadge}>FAITH + TECH FOUNDATION</span>
            <span>Excellence with Purpose</span>
          </div>
          <div className={styles.footerRight}>
            <span>TypeScript 5.8</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
