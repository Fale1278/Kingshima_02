'use client';

import React from 'react';
import {
  Sparkles,
  Send,
  X,
  Volume2,
  VolumeX,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import styles from '../Studio.module.css';

export default function MentorAssistantDrawer({
  isOpen,
  onClose,
  track,
  chatMessages,
  userInput,
  onChangeUserInput,
  onSendChat,
  isAiThinking,
  onSelectQuickPrompt,
  isVoiceActive,
  onToggleVoice,
}) {
  if (!isOpen) return null;

  const quickPrompts = [
    'Explain this code like I am 10 years old.',
    'What happens if I change the starting number?',
    'Give me a gentle clue to make a new button.',
    'How do real apps like Instagram use this?',
  ];

  return (
    <div className={styles.mentorOverlay} onClick={onClose}>
      <aside className={styles.mentorDrawer} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={styles.mentorHeader}>
          <div className={styles.mentorTitleGroup}>
            <div className={styles.mentorIconCircle}>
              <Sparkles size={16} color="#60a5fa" />
            </div>
            <div>
              <h3 className={styles.mentorName}>Dr. K. Ada • AI Learning Coach</h3>
              <span className={styles.mentorStatus}>Always patient, ready to explain in simple words</span>
            </div>
          </div>

          <div className={styles.mentorHeaderActions}>
            <button
              type="button"
              className={`${styles.voiceSmallBtn} ${isVoiceActive ? styles.voiceSmallBtnActive : ''}`}
              onClick={onToggleVoice}
              title={isVoiceActive ? 'Voice: ON (Click to mute)' : 'Voice: OFF (Click to turn on)'}
            >
              {isVoiceActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <button
              type="button"
              className={styles.closeDrawerBtn}
              onClick={onClose}
              aria-label="Close AI Mentor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Stream */}
        <div className={styles.mentorChatBody}>
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.chatMessageRow} ${msg.sender === 'ai' ? styles.chatMsgAi : styles.chatMsgUser}`}
            >
              {msg.sender === 'ai' && (
                <div className={styles.mentorBubbleAuthor}>
                  <Sparkles size={12} color="#60a5fa" />
                  <span>Coach Ada</span>
                </div>
              )}
              <div className={styles.chatMessageBubble}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {isAiThinking && (
            <div className={`${styles.chatMessageRow} ${styles.chatMsgAi}`}>
              <div className={styles.mentorBubbleAuthor}>
                <Sparkles size={12} color="#60a5fa" />
                <span>Coach Ada</span>
              </div>
              <div className={styles.chatMessageBubble}>
                <span className={styles.thinkingDots}>Thinking through simple explanation…</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className={styles.quickPromptsSection}>
          <span className={styles.quickPromptsLabel}>One-click questions:</span>
          <div className={styles.quickChipsWrapper}>
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                type="button"
                className={styles.quickChipBtn}
                onClick={() => onSelectQuickPrompt(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={onSendChat} className={styles.mentorInputForm}>
          <input
            type="text"
            className={styles.mentorInputField}
            placeholder="Ask anything, no question is too basic…"
            value={userInput}
            onChange={(e) => onChangeUserInput(e.target.value)}
          />
          <button
            type="submit"
            className={styles.mentorSendBtn}
            disabled={!userInput.trim() || isAiThinking}
            aria-label="Send question"
          >
            <Send size={15} />
          </button>
        </form>
      </aside>
    </div>
  );
}
