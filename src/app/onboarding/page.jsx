'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { backendClient } from '@/lib/backendClient';
import styles from './page.module.css';

const STEPS = [
  {
    id: 'role',
    title: 'Welcome! How do you identify?',
    subtitle: 'This helps us personalize your dashboard and recommendations.',
    options: [
      { id: 'student', icon: '🎓', title: 'Student', desc: 'I am currently studying and looking to level up my skills.' },
      { id: 'professional', icon: '💼', title: 'Professional', desc: 'I am working and want to advance my career.' },
      { id: 'entrepreneur', icon: '🚀', title: 'Entrepreneur', desc: 'I am building my own business or startup.' },
      { id: 'creator', icon: '🎨', title: 'Creator', desc: 'I create content, art, or digital products.' }
    ],
    cols: 2
  },
  {
    id: 'goal',
    title: 'What brings you to Kingshima?',
    subtitle: 'Select your primary goal so we can guide you effectively.',
    options: [
      { id: 'learn', icon: '🧠', title: 'Learn New Skills', desc: 'I want to master AI, Web Dev, or Design.' },
      { id: 'build', icon: '🛠', title: 'Build a Project', desc: 'I have an idea and need the tools to build it.' },
      { id: 'network', icon: '🤝', title: 'Grow My Network', desc: 'I want to connect with mentors and peers.' }
    ],
    cols: 1
  },
  {
    id: 'experience',
    title: 'What is your experience level?',
    subtitle: 'Don’t worry, we have content for every stage of the journey.',
    options: [
      { id: 'beginner', icon: '🌱', title: 'Beginner', desc: 'I am just starting out.' },
      { id: 'intermediate', icon: '📈', title: 'Intermediate', desc: 'I have some experience but want to get better.' },
      { id: 'advanced', icon: '⚡', title: 'Advanced', desc: 'I am highly experienced and looking for a challenge.' }
    ],
    cols: 1
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ role: '', goal: '', experience: '' });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Check auth session
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bootcamp_student');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        router.push('/get-started');
      }
    } catch {
      router.push('/get-started');
    }
  }, [router]);

  const handleSelect = (optionId) => {
    const stepId = STEPS[currentStep].id;
    setAnswers(prev => ({ ...prev, [stepId]: optionId }));
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await submitOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitOnboarding = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      await backendClient.saveOnboarding(user.id, {
        role: answers.role,
        goal: answers.goal,
        experience: answers.experience,
      });

      // Briefly show success state before redirecting
      setCurrentStep(STEPS.length);
      setTimeout(() => {
        router.push('/bootcamp/dashboard');
      }, 1800);

    } catch (err) {
      console.error('Onboarding error:', err);
      // Fallback redirect
      setCurrentStep(STEPS.length);
      setTimeout(() => {
        router.push('/bootcamp/dashboard');
      }, 1800);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bootcamp_student');
    localStorage.removeItem('bootcamp_token');
    router.push('/get-started');
  };

  if (!user) return <div className={styles.page} />;

  const isSuccessStep = currentStep === STEPS.length;
  const currentStepData = STEPS[currentStep];

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✧</span>
          <span>Kingshima</span>
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sign Out
        </button>
      </header>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(Math.min(currentStep + 1, STEPS.length) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {isSuccessStep ? 'Complete' : `Step ${currentStep + 1} of ${STEPS.length}`}
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.wizardBox}>
          <AnimatePresence mode="wait">
            {!isSuccessStep ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.header}>
                  <h1 className={styles.title}>{currentStepData.title}</h1>
                  <p className={styles.subtitle}>{currentStepData.subtitle}</p>
                </div>

                <div className={`${styles.optionsGrid} ${styles[`cols${currentStepData.cols}`]}`}>
                  {currentStepData.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`${styles.optionCard} ${answers[currentStepData.id] === opt.id ? styles.selected : ''}`}
                      onClick={() => handleSelect(opt.id)}
                    >
                      <div className={styles.optionIcon}>{opt.icon}</div>
                      <div className={styles.optionTitle}>{opt.title}</div>
                      <div className={styles.optionDesc}>{opt.desc}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.actions}>
                  <button 
                    onClick={handleBack} 
                    className={styles.backBtn}
                    style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={handleNext} 
                    className={styles.nextBtn}
                    disabled={!answers[currentStepData.id] || loading}
                  >
                    {loading ? <span className={styles.spinner} /> : (currentStep === STEPS.length - 1 ? 'Finish →' : 'Continue →')}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.successStep}
              >
                <div className={styles.successIconWrapper}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h1 className={styles.title}>You're all set!</h1>
                  <p className={styles.subtitle}>Preparing your personalized dashboard...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
