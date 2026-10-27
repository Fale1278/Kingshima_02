'use client';

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Send,
  X,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  HelpCircle,
  MessageSquare,
  GraduationCap,
  Clock,
  CheckCircle2,
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
  learningSpeed = 'beginner',
  onChangeLearningSpeed,
  checkInQuestion,
  onAnswerCheckIn,
}) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Explain this code in simple words.',
    'What tag creates a button in HTML?',
    'Why do we use CSS border-radius?',
    'What does state mean in plain English?',
  ];

  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRec) {
      alert('Voice dictation is not supported in this browser. You can type your question!');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onChangeUserInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  return (
    <div className={styles.mentorOverlay} onClick={onClose}>
      <aside className={styles.mentorDrawer} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={styles.mentorHeader}>
          <div className={styles.mentorTitleGroup}>
            <div className={styles.mentorIconCircle}>
              <GraduationCap size={18} color="#60a5fa" />
            </div>
            <div>
              <h3 className={styles.mentorName}>Coach Ada • Live AI Teacher</h3>
              <span className={styles.mentorStatus}>
                <span className={styles.liveGreenDot} /> Live in Classroom • Two-Way Dialogue
              </span>
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

        {/* Adaptive Learning Speed Selector */}
        <div className={styles.speedSelectorBar}>
          <span className={styles.speedLabel}>Teaching Pace:</span>
          <div className={styles.speedPills}>
            <button
              type="button"
              className={`${styles.speedPill} ${learningSpeed === 'beginner' ? styles.speedPillActive : ''}`}
              onClick={() => onChangeLearningSpeed && onChangeLearningSpeed('beginner')}
              title="Step-by-step with simple analogies & check-ins"
            >
              🐢 Step-by-Step
            </button>
            <button
              type="button"
              className={`${styles.speedPill} ${learningSpeed === 'steady' ? styles.speedPillActive : ''}`}
              onClick={() => onChangeLearningSpeed && onChangeLearningSpeed('steady')}
              title="Standard classroom pace"
            >
              🚶 Steady
            </button>
            <button
              type="button"
              className={`${styles.speedPill} ${learningSpeed === 'fast' ? styles.speedPillActive : ''}`}
              onClick={() => onChangeLearningSpeed && onChangeLearningSpeed('fast')}
              title="Concise and fast challenges"
            >
              ⚡ Fast
            </button>
          </div>
        </div>

        {/* Socratic Classroom Check-in Card */}
        {checkInQuestion && (
          <div className={styles.classroomCheckinCard}>
            <div className={styles.checkinHeader}>
              <Sparkles size={14} color="#fbbf24" />
              <span>Coach Ada's Classroom Check-in:</span>
            </div>
            <p className={styles.checkinQuestionText}>{checkInQuestion.question}</p>
            <div className={styles.checkinOptionsRow}>
              {checkInQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={styles.checkinOptionBtn}
                  onClick={() => onAnswerCheckIn && onAnswerCheckIn(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

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
                <span className={styles.thinkingDots}>Coach Ada is thinking through the explanation…</span>
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

        {/* Voice Input & Text Input Bar */}
        <form onSubmit={onSendChat} className={styles.mentorInputForm}>
          <button
            type="button"
            className={`${styles.micButton} ${isListening ? styles.micButtonListening : ''}`}
            onClick={handleToggleMic}
            title={isListening ? 'Listening… click to stop' : 'Click to speak your question aloud'}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input
            type="text"
            className={styles.mentorInputField}
            placeholder={isListening ? 'Listening to your voice now… speak!' : 'Ask or speak anything to Coach Ada…'}
            value={userInput}
            onChange={(e) => onChangeUserInput(e.target.value)}
          />
          <button
            type="submit"
            className={styles.mentorSendBtn}
            disabled={!userInput.trim() || isAiThinking}
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </form>
      </aside>
    </div>
  );
}
