'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { backendClient } from '@/lib/backendClient';

const BootcampAuthContext = createContext(null);

export function BootcampAuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bootcamp_student');
      if (saved) setStudent(JSON.parse(saved));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = (studentData, token) => {
    setStudent(studentData);
    localStorage.setItem('bootcamp_student', JSON.stringify(studentData));
    if (token) localStorage.setItem('bootcamp_token', token);
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('bootcamp_student');
    localStorage.removeItem('bootcamp_token');
    router.push('/bootcamp/login');
  };

  const markComplete = async (lessonId) => {
    if (!student) return;
    const progress = student.progress || [];
    if (progress.includes(lessonId)) return;

    const newProgress = [...progress, lessonId];
    const updated = { ...student, progress: newProgress };

    setStudent(updated);
    localStorage.setItem('bootcamp_student', JSON.stringify(updated));

    try {
      await backendClient.saveProgress(student.id, newProgress);
    } catch (err) {
      console.warn('Failed to sync progress to backend:', err);
    }
  };

  return (
    <BootcampAuthContext.Provider value={{ student, login, logout, loading, markComplete }}>
      {children}
    </BootcampAuthContext.Provider>
  );
}

export function useBootcampAuth() {
  const ctx = useContext(BootcampAuthContext);
  if (!ctx) {
    return {
      student: null,
      loading: false,
      login: () => {},
      logout: () => {},
      markComplete: async () => {},
    };
  }
  return ctx;
}
