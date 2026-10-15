'use client';

import { useState, useEffect, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';

// A practice sandbox for prompt engineering that doesn't call any real AI
// API — no keys to manage, no per-student cost. Instead it scores the
// student's prompt against the habits good prompts actually have, so they
// can iterate before ever spending a real ChatGPT/Claude credit.

const CHECKS = [
  {
    key: 'task',
    label: 'States a clear task',
    test: (p) => /\b(write|generate|create|summarize|summarise|explain|list|draft|design|build|analyze|analyse|translate|rewrite|compare|plan)\b/i.test(p),
    tip: 'Start with a clear action verb: "Write…", "Summarize…", "Generate…".',
  },
  {
    key: 'detail',
    label: 'Has enough detail (12+ words)',
    test: (p) => p.trim().split(/\s+/).filter(Boolean).length >= 12,
    tip: 'Short prompts force the AI to guess. Add specifics about topic, audience, or context.',
  },
  {
    key: 'format',
    label: 'Specifies the output format',
    test: (p) => /\b(list|bullet|table|steps|paragraph|words|sentences|json|email|caption|headline|outline|format)\b/i.test(p),
    tip: 'Say what shape you want back: "as a bulleted list", "in 3 sentences", "as a table".',
  },
  {
    key: 'constraints',
    label: 'Includes a constraint or example',
    test: (p) => /\b(must|should|avoid|don't|do not|like|such as|for example|e\.g\.|no more than|under|between)\b/i.test(p),
    tip: 'Constraints narrow the AI down: "avoid jargon", "under 100 words", "like this example…".',
  },
];

function loadSaved(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function PromptLab({ storageKey = 'promptlab', task }) {
  const [prompt, setPrompt] = useState('');
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPrompt(loadSaved(`${storageKey}_draft`, ''));
    setSaved(loadSaved(`${storageKey}_saved`, []));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persistDraft = (value) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(`${storageKey}_draft`, value);
  };
  const persistSaved = (list) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(`${storageKey}_saved`, JSON.stringify(list));
  };

  const results = useMemo(() => CHECKS.map((c) => ({ ...c, passed: prompt.trim() ? c.test(prompt) : false })), [prompt]);
  const score = results.filter((r) => r.passed).length;

  const handleChange = (e) => {
    setPrompt(e.target.value);
    persistDraft(e.target.value);
  };

  const handleSave = () => {
    if (!prompt.trim()) return;
    const next = [{ text: prompt.trim(), score, id: Date.now() }, ...saved].slice(0, 10);
    setSaved(next);
    persistSaved(next);
  };

  const handleDeleteSaved = (id) => {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    persistSaved(next);
  };

  const handleReset = () => {
    if (!window.confirm('Clear your current draft prompt?')) return;
    setPrompt('');
    persistDraft('');
  };

  if (!hydrated) return null;

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', marginTop: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.03em', color: 'var(--text-muted, #9ca3af)', textTransform: 'uppercase' }}>
          Prompt Lab
        </span>
        <button
          type="button"
          onClick={handleReset}
          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted, #9ca3af)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <RotateCcw size={12} /> Clear
        </button>
      </div>

      <div style={{ padding: '0.85rem' }}>
        {task && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)', marginTop: 0, marginBottom: '0.6rem' }}>
            Practice task: <strong style={{ color: '#e5e5e5' }}>{task}</strong>
          </p>
        )}
        <textarea
          value={prompt}
          onChange={handleChange}
          rows={4}
          placeholder="Write the prompt you'd actually send to ChatGPT or Claude…"
          style={{
            width: '100%', background: '#0d0d0f', color: '#e5e5e5', fontFamily: 'inherit',
            fontSize: '0.85rem', padding: '0.7rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, resize: 'vertical',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.75rem 0' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: score === CHECKS.length ? '#34d399' : '#e5e5e5' }}>
            {score}/{CHECKS.length}
          </span>
          <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(score / CHECKS.length) * 100}%`, height: '100%', background: score === CHECKS.length ? '#34d399' : '#ff6d40', transition: 'width 0.2s' }} />
          </div>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {results.map((r) => (
            <li key={r.key} style={{ fontSize: '0.78rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: r.passed ? '#34d399' : 'var(--text-muted, #6b7280)', fontWeight: 700, flexShrink: 0 }}>
                {r.passed ? '✓' : '○'}
              </span>
              <span style={{ color: r.passed ? '#e5e5e5' : 'var(--text-muted, #9ca3af)' }}>
                {r.label}
                {!r.passed && prompt.trim() && (
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted, #6b7280)', marginTop: '0.1rem' }}>{r.tip}</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleSave}
          disabled={!prompt.trim()}
          style={{
            marginTop: '0.85rem', fontSize: '0.78rem', fontWeight: 600, color: '#fff',
            background: prompt.trim() ? 'var(--accent-primary, #ff6d40)' : 'rgba(255,255,255,0.06)',
            border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: prompt.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Save this prompt
        </button>

        {saved.length > 0 && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted, #9ca3af)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>
              Your saved prompts
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {saved.map((s) => (
                <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.76rem', background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '0.45rem 0.6rem' }}>
                  <span style={{ color: '#e5e5e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.text}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{ color: 'var(--text-muted, #9ca3af)' }}>{s.score}/{CHECKS.length}</span>
                    <button type="button" onClick={() => handleDeleteSaved(s.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted, #6b7280)', cursor: 'pointer' }}>×</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted, #9ca3af)', padding: '0.5rem 0.85rem', margin: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        This checks prompt structure only — it doesn&apos;t call ChatGPT or Claude. Once your prompt scores well, try it for real in your AI tool of choice.
      </p>
    </div>
  );
}
