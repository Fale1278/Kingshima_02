'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback((type, message, duration = 4000) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, type, message }]);
    if (duration > 0) {
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const toast = {
    success: (message, duration) => push('success', message, duration),
    error: (message, duration) => push('error', message, duration ?? 6000),
    info: (message, duration) => push('info', message, duration),
    dismiss,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 360,
          width: 'calc(100% - 32px)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }) {
  const config = {
    success: { icon: CheckCircle2, color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)' },
    error:   { icon: XCircle,      color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)', border: 'rgba(248, 113, 113, 0.3)' },
    info:    { icon: Info,         color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)', border: 'rgba(96, 165, 250, 0.3)' },
  }[toast.type] || { icon: Info, color: '#9ca3af', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' };

  const Icon = config.icon;

  return (
    <div
      role="status"
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '0.75rem 0.85rem',
        borderRadius: 10,
        background: '#1a1a1a',
        border: `1px solid ${config.border}`,
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        animation: 'kingshima-toast-in 0.18s ease-out',
      }}
    >
      <span style={{ color: config.color, flexShrink: 0, marginTop: 1 }}>
        <Icon size={18} />
      </span>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#e5e5e5', lineHeight: 1.4, flex: 1, wordBreak: 'break-word' }}>
        {toast.message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', flexShrink: 0, padding: 2 }}
      >
        <X size={14} />
      </button>
      <style>{`
        @keyframes kingshima-toast-in {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fail soft — a missing provider shouldn't crash the page, just no-op.
    return { success: () => {}, error: () => {}, info: () => {}, dismiss: () => {} };
  }
  return ctx;
}
