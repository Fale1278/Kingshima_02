'use client';

import React, { useState } from 'react';
import { QUIZZES } from '@/data/quizData';
import styles from './QuizModal.module.css';

export default function QuizModal({ courseId = 'web-dev', onClose, onComplete }) {
  const quiz = QUIZZES[courseId] || QUIZZES['web-dev'];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = quiz.questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === q.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      if (onComplete) onComplete(score + (selectedOpt === q.answerIndex ? 1 : 0), quiz.xpReward);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.quizWindow} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.header}>
          <h3 className={styles.title}>{quiz.title}</h3>
          <span className={styles.xpBadge}>+ {quiz.xpReward} XP</span>
        </div>

        {!completed ? (
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
              Question {currentIdx + 1} of {quiz.questions.length}
            </p>
            <h4 className={styles.questionText}>{q.question}</h4>

            <div className={styles.optionsList}>
              {q.options.map((opt, idx) => {
                let optClass = styles.optionBtn;
                if (isAnswered) {
                  if (idx === q.answerIndex) optClass = `${styles.optionBtn} ${styles.optionCorrect}`;
                  else if (idx === selectedOpt) optClass = `${styles.optionBtn} ${styles.optionWrong}`;
                }

                return (
                  <button 
                    key={idx}
                    className={optClass}
                    onClick={() => handleSelectOption(idx)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div>
                <div className={styles.explanation}>
                  💡 <strong>Explanation:</strong> {q.explanation}
                </div>
                <button className={styles.submitBtn} onClick={handleNext}>
                  {currentIdx < quiz.questions.length - 1 ? 'Next Question →' : 'Complete Quiz 🎉'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h2 style={{ color: '#34d399', margin: '0 0 0.5rem 0' }}>🎉 Quiz Completed!</h2>
            <p style={{ fontSize: '1rem', color: '#e5e7eb' }}>
              You scored <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong>!
            </p>
            <p style={{ fontSize: '0.85rem', color: '#eab308', fontWeight: 700 }}>
              + {quiz.xpReward} XP Awarded to your profile!
            </p>
            <button className={styles.submitBtn} onClick={onClose} style={{ marginTop: '1rem' }}>
              Back to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
