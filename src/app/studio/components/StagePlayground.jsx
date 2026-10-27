'use client';

import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Code2,
  Eye,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import styles from '../Studio.module.css';

export default function StagePlayground({
  track,
  files,
  activeFileId,
  onSelectFile,
  onCodeChange,
  onResetCode,
  iframeSrcDoc,
  consoleLogs,
  onClearConsole,
  onTriggerRunCode,
  onProceedToReview,
  isEvaluating,
  onOpenMentorWithPrompt,
}) {
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);
  const [showLogsDrawer, setShowLogsDrawer] = useState(false);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Detect recent runtime errors
  const recentError = consoleLogs.slice().reverse().find((l) => l.level === 'error');

  const getModuleHints = () => {
    if (track.id === 'html-structure') {
      return [
        {
          level: 1,
          title: 'Gentle Clue',
          text: 'Look at line 11 in "index.html". You will see `<h2 id="student-name">Alex Johnson</h2>`. Try replacing "Alex Johnson" with your own name!',
        },
        {
          level: 2,
          title: 'Deeper Clue',
          text: 'Look at line 14: `<button id="action-btn" class="primary-btn">Connect With Me</button>`. You can change "Connect With Me" to "Say Hello" or "Explore Portfolio"!',
        },
        {
          level: 3,
          title: 'Full Solution',
          text: 'Click the button in the Live Preview on the right to see it turn green and celebrate. Once you tested it, click "Check My Work" below!',
        },
      ];
    }
    if (track.id === 'css-styling') {
      return [
        {
          level: 1,
          title: 'Gentle Clue',
          text: 'In "style.css", look for `.glass-card { border-radius: 24px; }`. If you change 24px to 12px or 36px, watch the card corners change live!',
        },
        {
          level: 2,
          title: 'Deeper Clue',
          text: 'Look for `.glow-btn { background: linear-gradient(...); }`. You can change the hex colors to your favorite shades!',
        },
        {
          level: 3,
          title: 'Full Solution',
          text: 'Hover your mouse over the card and button in the Live Preview to test the smooth hover elevation effect, then click "Check My Work"!',
        },
      ];
    }
    if (track.id === 'web-app') {
      return [
        {
          level: 1,
          title: 'Gentle Clue',
          text: 'Type a goal into the input field on the right (like "Launch my portfolio") and click "Add Goal" to see it dynamically added to the list!',
        },
        {
          level: 2,
          title: 'Deeper Clue',
          text: 'In "index.html", look for `<h3>Kingshima Mini Web App</h3>`. You can personalize the title to your name\'s Dashboard!',
        },
        {
          level: 3,
          title: 'Full Solution',
          text: 'Add two or three goals in the Live Preview, test the "Clear All" button, and then click "Check My Work" to complete your Capstone!',
        },
      ];
    }
    // Default / js-interactivity
    return [
      {
        level: 1,
        title: 'Gentle Clue',
        text: 'Look at line 2 in "script.js": `let count = 0;`. If you change 0 to 5 or 10, your counter starts at that number!',
      },
      {
        level: 2,
        title: 'Deeper Clue',
        text: 'Notice how `updateDisplay()` updates the text and adds a subtle bounce scale! Every click triggers this function.',
      },
      {
        level: 3,
        title: 'Full Solution',
        text: 'Click the "+" and "-" buttons in the Live Preview on the right. Once you see the number change, you are ready to click "Check My Work"!',
      },
    ];
  };

  const hints = getModuleHints();

  return (
    <div className={styles.playgroundContainer}>
      {/* ── Top Mission Prompt ────────────────────────────────────────── */}
      <div className={styles.missionCard}>
        <div className={styles.missionLeft}>
          <div className={styles.missionBadge}>
            <Sparkles size={13} />
            <span>Step 2 • Your Hands-On Sandbox</span>
          </div>
          <h2 className={styles.missionTitle}>Try it yourself with zero fear of breaking things</h2>
          <p className={styles.missionText}>
            Click the buttons in the Live Preview on the right to see the website memory in action. Then make a simple edit in the code and watch the magic happen!
          </p>
        </div>

        <div className={styles.missionActions}>
          <button
            type="button"
            className={styles.missionSafetyBtn}
            onClick={onResetCode}
            title="Reset code back to original starter version"
          >
            <RotateCcw size={14} />
            <span>Reset Code</span>
          </button>

          <button
            type="button"
            className={styles.missionHintBtn}
            onClick={() => setShowHintModal(true)}
            title="Need a hint?"
          >
            <Lightbulb size={14} />
            <span>Need a Hint?</span>
          </button>
        </div>
      </div>

      {/* ── 2-Pane Split: Left Code Editor & Right Live Sandbox ────────── */}
      <div className={styles.playgroundSplit}>
        {/* LEFT PANE: Guided Code Editor */}
        <div className={styles.editorPane}>
          {/* File Tabs & Quick Assists */}
          <div className={styles.editorTopBar}>
            <div className={styles.editorTabs}>
              {files.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  className={`${styles.editorTab} ${activeFileId === file.id ? styles.editorTabActive : ''}`}
                  onClick={() => onSelectFile(file.id)}
                >
                  <Code2 size={13} className={styles.tabIcon} />
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.explainCodeBtn}
              onClick={() => onOpenMentorWithPrompt(`Can you explain what the code in ${activeFile.name} does in plain English?`)}
              title="Ask AI mentor to explain this file in simple words"
            >
              <span>Explain this file</span>
              <Sparkles size={13} />
            </button>
          </div>

          {/* Friendly Code Textarea */}
          <div className={styles.codeSurfaceWrapper}>
            <div className={styles.codeLineNumbers}>
              {activeFile.content.split('\n').map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <textarea
              className={styles.friendlyTextarea}
              value={activeFile.content}
              onChange={(e) => onCodeChange(e.target.value)}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Code Editor"
            />
          </div>

          {/* Human Error Banner if an issue occurred */}
          {recentError && (
            <div className={styles.errorGuidanceBanner}>
              <AlertTriangle size={16} className={styles.errorIcon} />
              <div className={styles.errorText}>
                <strong>Friendly Note:</strong> We noticed a small typo or missing reference. You can click <em>"Reset Code"</em> or ask the AI Mentor for guidance!
              </div>
            </div>
          )}

          {/* Bottom Editor Bar */}
          <div className={styles.editorBottomBar}>
            <span className={styles.editingInfo}>Editing: <strong>{activeFile.name}</strong> • Changes save automatically</span>
            <button
              type="button"
              className={styles.toggleTerminalBtn}
              onClick={() => setShowLogsDrawer(!showLogsDrawer)}
              title="Show technical logs"
            >
              <Terminal size={13} />
              <span>{showLogsDrawer ? 'Hide Logs' : `Logs (${consoleLogs.length})`}</span>
            </button>
          </div>

          {showLogsDrawer && (
            <div className={styles.technicalLogsDrawer}>
              <div className={styles.drawerHeader}>
                <span>Runtime Output</span>
                <button type="button" onClick={onClearConsole} className={styles.clearLogsBtn}>
                  Clear
                </button>
              </div>
              <div className={styles.drawerBody}>
                {consoleLogs.length === 0 ? (
                  <span className={styles.emptyLogsText}>No logs yet. Interact with the preview to test output!</span>
                ) : (
                  consoleLogs.map((log) => (
                    <div key={log.id} className={`${styles.logRow} ${styles['log_' + log.level]}`}>
                      <span className={styles.logTime}>{log.time}</span>
                      <span className={styles.logContent}>{log.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANE: Live Interactive Preview */}
        <div className={styles.previewPane}>
          <div className={styles.previewHeaderBar}>
            <div className={styles.previewStatusIndicator}>
              <span className={styles.livePulseDot} />
              <Eye size={14} />
              <span>Live Interactive App</span>
            </div>

            <div className={styles.previewActions}>
              <button
                type="button"
                className={styles.reloadPreviewBtn}
                onClick={onTriggerRunCode}
                title="Refresh preview"
              >
                <RefreshCw size={13} />
                <span>Reload</span>
              </button>
            </div>
          </div>

          {/* Live Rendered Iframe */}
          <div className={styles.liveSandboxWrapper}>
            <iframe
              title="Kingshima App Sandbox"
              srcDoc={iframeSrcDoc()}
              sandbox="allow-scripts allow-modals"
              className={styles.sandboxIframe}
            />
          </div>

          {/* Bottom Review & Grade CTA */}
          <div className={styles.previewBottomCtaBar}>
            <div className={styles.ctaPrompt}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>Tested the buttons? Ready to see how you did!</span>
            </div>
            <button
              type="button"
              className={styles.checkWorkCtaBtn}
              onClick={onProceedToReview}
              disabled={isEvaluating}
            >
              <Sparkles size={16} />
              <span>{isEvaluating ? 'Reviewing Your Work…' : 'Check My Work ✨'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Friendly Hint Modal ───────────────────────────────────────── */}
      {showHintModal && (
        <div className={styles.hintModalOverlay} onClick={() => setShowHintModal(false)}>
          <div className={styles.hintModalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.hintHeader}>
              <div className={styles.hintBadge}>
                <Lightbulb size={16} color="#f59e0b" />
                <h3>Helpful Hints</h3>
              </div>
              <button
                type="button"
                className={styles.closeHintBtn}
                onClick={() => setShowHintModal(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.hintTabs}>
              {hints.map((h) => (
                <button
                  key={h.level}
                  type="button"
                  className={`${styles.hintTabBtn} ${hintLevel === h.level ? styles.hintTabActive : ''}`}
                  onClick={() => setHintLevel(h.level)}
                >
                  {h.title}
                </button>
              ))}
            </div>

            <div className={styles.hintBody}>
              <p>{hints[hintLevel - 1].text}</p>
            </div>

            <div className={styles.hintFooter}>
              <button
                type="button"
                className={styles.gotItBtn}
                onClick={() => setShowHintModal(false)}
              >
                Got it, let me try!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
