'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { RotateCcw, Trash2, Plus, X, Play, Download } from 'lucide-react';
import { downloadZip } from '@/lib/zip';
import { useToast } from '@/context/ToastContext';
import styles from './CodePlayground.module.css';

// A VSCode-flavoured, in-browser code editor + runtime for coding lessons.
// No npm packages, no external sandbox service:
//  - multiple files, created/deleted like editor tabs
//  - a Run button — nothing executes until the student asks it to
//  - a real console panel (captures console.log/warn/error + runtime errors)
//  - a ZIP download of everything the student has written
// Work auto-saves to localStorage per lesson so it survives a refresh.

const DEFAULT_FILES = [
  {
    id: 'index.html',
    name: 'index.html',
    content: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, Kingshima!</h1>
  <p>Edit the files, hit Run, and watch the preview update.</p>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: 'style.css',
    name: 'style.css',
    content: `body {
  font-family: sans-serif;
  padding: 1.5rem;
  color: #1a1a1a;
  background: #ffffff;
}
h1 {
  color: #ff6d40;
}`,
  },
  {
    id: 'script.js',
    name: 'script.js',
    content: `// Try adding some interactivity
console.log('Playground ready!');`,
  },
];

const ENTRY_FILE = 'index.html'; // can't be deleted — the preview needs an entry point

function loadSaved(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function extOf(name) {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function tabDotClass(name) {
  const ext = extOf(name);
  if (ext === 'html') return styles.tabDotHtml;
  if (ext === 'css') return styles.tabDotCss;
  if (ext === 'js') return styles.tabDotJs;
  return '';
}

// Injected into the iframe so we can see console output and errors from
// the parent page, since the iframe is sandboxed and otherwise silent.
function buildRuntimeScript() {
  return `
    <script>
      (function () {
        function serialize(arg) {
          if (typeof arg === 'string') return arg;
          try { return JSON.stringify(arg); } catch (e) { return String(arg); }
        }
        function send(type, args) {
          try {
            window.parent.postMessage({ __playground: true, type, args: args.map(serialize) }, '*');
          } catch (e) {}
        }
        ['log', 'warn', 'error', 'info'].forEach(function (method) {
          var original = console[method];
          console[method] = function () {
            send(method, Array.prototype.slice.call(arguments));
            original.apply(console, arguments);
          };
        });
        window.addEventListener('error', function (e) {
          send('error', [e.message]);
        });
      })();
    <\/script>
  `;
}

function buildSrcDoc(files) {
  const htmlFile = files.find((f) => f.name.toLowerCase() === ENTRY_FILE) || files.find((f) => extOf(f.name) === 'html');
  if (!htmlFile) return '';

  const byName = Object.fromEntries(files.map((f) => [f.name, f]));
  const referenced = new Set();
  let doc = htmlFile.content;

  // Resolve <link rel="stylesheet" href="style.css"> to the real file, the
  // way it actually works on the web — not just merging every CSS file in.
  doc = doc.replace(/<link\s+[^>]*href=["']([^"']+)["'][^>]*>/gi, (match, href) => {
    const file = byName[href] || byName[href.replace(/^\.?\//, '')];
    if (file && extOf(file.name) === 'css') {
      referenced.add(file.name);
      return `<style>${file.content}</style>`;
    }
    return match; // leave external stylesheets (e.g. CDN links) alone
  });

  // Resolve <script src="script.js"></script> to the real file.
  doc = doc.replace(/<script\s+[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi, (match, src) => {
    const file = byName[src] || byName[src.replace(/^\.?\//, '')];
    if (file && extOf(file.name) === 'js') {
      referenced.add(file.name);
      return `<script>try{${file.content}}catch(err){console.error(err && err.message ? err.message : String(err));}<\/script>`;
    }
    return match; // leave external scripts (e.g. CDN links) alone
  });

  // Anything not explicitly linked still runs, so a student who hasn't
  // learned <link>/<script src> yet gets the old "just works" behaviour.
  const unreferencedCss = files.filter((f) => extOf(f.name) === 'css' && !referenced.has(f.name)).map((f) => f.content).join('\n\n');
  const unreferencedJs = files.filter((f) => extOf(f.name) === 'js' && !referenced.has(f.name)).map((f) => f.content).join('\n\n');
  const runtime = buildRuntimeScript();
  const cssBlock = unreferencedCss ? `<style>${unreferencedCss}</style>` : '';
  const jsBlock = unreferencedJs
    ? `<script>try{${unreferencedJs}}catch(err){console.error(err && err.message ? err.message : String(err));}<\/script>`
    : '';

  // The student's index.html might be a full document (<html>/<head>/<body>,
  // once they've learned that structure) or just a body fragment (earlier
  // lessons, before that's introduced) — handle both correctly.
  const isFullDocument = /<html[\s>]/i.test(doc);

  if (isFullDocument) {
    let out = doc;
    out = /<head[\s>]/i.test(out)
      ? out.replace(/<head([^>]*)>/i, `<head$1>${runtime}${cssBlock}`)
      : out.replace(/<html([^>]*)>/i, `<html$1><head>${runtime}${cssBlock}</head>`);
    out = /<\/body>/i.test(out) ? out.replace(/<\/body>/i, `${jsBlock}</body>`) : out + jsBlock;
    return out;
  }

  return `
    <html>
      <head>
        ${runtime}
        ${cssBlock}
      </head>
      <body>
        ${doc}
        ${jsBlock}
      </body>
    </html>
  `;
}

export default function CodePlayground({ storageKey = 'playground' }) {
  const toast = useToast();
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeId, setActiveId] = useState(ENTRY_FILE);
  const [committedFiles, setCommittedFiles] = useState(null); // null = not run yet
  const [dirty, setDirty] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [logs, setLogs] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const textareaRef = useRef(null);

  // Load saved files once, on mount.
  useEffect(() => {
    const saved = loadSaved(`${storageKey}_files`);
    const initial = saved && Array.isArray(saved) && saved.length > 0 ? saved : DEFAULT_FILES;
    setFiles(initial);
    setActiveId(initial.some((f) => f.id === ENTRY_FILE) ? ENTRY_FILE : initial[0]?.id);
    setCommittedFiles(initial); // auto-run once so there's something to see
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = (list) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(`${storageKey}_files`, JSON.stringify(list));
  };

  const activeFile = files.find((f) => f.id === activeId) || files[0];

  const updateActiveContent = (value) => {
    const next = files.map((f) => (f.id === activeId ? { ...f, content: value } : f));
    setFiles(next);
    persist(next);
    setDirty(true);
  };

  const handleAddFile = () => {
    const name = window.prompt('New file name (e.g. about.html, extra.js, notes.css):');
    if (!name || !name.trim()) return;
    const trimmed = name.trim();
    if (files.some((f) => f.name === trimmed)) {
      toast.error('A file with that name already exists.');
      return;
    }
    const next = [...files, { id: trimmed, name: trimmed, content: '' }];
    setFiles(next);
    setActiveId(trimmed);
    persist(next);
    setDirty(true);
  };

  const handleDeleteFile = (id, e) => {
    e.stopPropagation();
    if (id === ENTRY_FILE) return;
    if (!window.confirm(`Delete ${id}? This can't be undone.`)) return;
    const next = files.filter((f) => f.id !== id);
    setFiles(next);
    if (activeId === id) setActiveId(next[0]?.id);
    persist(next);
    setDirty(true);
  };

  const handleRun = useCallback(() => {
    setCommittedFiles(files);
    setDirty(false);
  }, [files]);

  const handleReset = () => {
    if (!window.confirm('Reset this playground back to the starting files? This clears everything you wrote.')) return;
    setFiles(DEFAULT_FILES);
    setActiveId(ENTRY_FILE);
    setCommittedFiles(DEFAULT_FILES);
    setDirty(false);
    setLogs([]);
    persist(DEFAULT_FILES);
    toast.info('Playground reset.');
  };

  const handleDownload = () => {
    downloadZip(files.map((f) => ({ name: f.name, content: f.content })), 'kingshima-playground.zip');
    toast.success('Downloaded kingshima-playground.zip');
  };

  const srcDoc = useMemo(() => (committedFiles ? buildSrcDoc(committedFiles) : ''), [committedFiles]);

  // Clear stale console output every time a new run happens.
  useEffect(() => {
    setLogs([]);
  }, [srcDoc]);

  useEffect(() => {
    function handleMessage(e) {
      if (!e.data || !e.data.__playground) return;
      setLogs((prev) => [...prev, { type: e.data.type, text: e.data.args.join(' '), id: `${Date.now()}-${Math.random()}` }].slice(-50));
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!hydrated || !activeFile) return null;

  const lineCount = activeFile.content.split('\n').length;

  return (
    <div className={styles.shell}>
      {/* ── Title bar ─────────────────────── */}
      <div className={styles.titlebar}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <span className={styles.titlebarLabel}>Kingshima Playground — {activeFile.name}</span>
      </div>

      {/* ── Tab bar ───────────────────────── */}
      <div className={styles.tabbar}>
        <div className={styles.tabs} style={{ overflowX: 'auto' }}>
          {files.map((f) => (
            <div
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`${styles.tab} ${f.id === activeId ? styles.tabActive : ''}`}
            >
              <span className={`${styles.tabDot} ${tabDotClass(f.name)}`} />
              {f.name}
              {f.id !== ENTRY_FILE && (
                <button
                  type="button"
                  className={styles.tabCloseBtn}
                  onClick={(e) => handleDeleteFile(f.id, e)}
                  title={`Delete ${f.name}`}
                >
                  <X size={11} />
                </button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addTabBtn} onClick={handleAddFile} title="New file">
            <Plus size={15} />
          </button>
        </div>
        <div className={styles.toolbarRight}>
          <button type="button" className={styles.downloadBtn} onClick={handleDownload} title="Download all files as a .zip">
            <Download size={13} /> Download
          </button>
          <button type="button" className={styles.resetBtn} onClick={handleReset} title="Reset to starting files">
            <RotateCcw size={13} /> Reset
          </button>
          <button
            type="button"
            className={`${styles.runBtn} ${dirty ? styles.runBtnDirty : ''}`}
            onClick={handleRun}
            title="Run your code"
          >
            <Play size={13} /> {dirty ? 'Run' : 'Ran ✓'}
          </button>
        </div>
      </div>

      {/* ── Editor + preview ──────────────── */}
      <div className={styles.editorArea}>
        <div className={styles.explorer}>
          <div className={styles.explorerHeader}>
            <span>Explorer</span>
            <button type="button" className={styles.explorerAddBtn} onClick={handleAddFile} title="New file">
              <Plus size={13} />
            </button>
          </div>
          {files.map((f) => (
            <div
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`${styles.explorerItem} ${f.id === activeId ? styles.explorerItemActive : ''}`}
            >
              <span className={`${styles.tabDot} ${tabDotClass(f.name)}`} />
              {f.name}
            </div>
          ))}
        </div>
        <div className={styles.editorPane}>
          <div className={styles.gutter} style={{ transform: `translateY(-${scrollTop}px)` }}>
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className={styles.gutterLine}>{i + 1}</div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className={styles.codeInput}
            value={activeFile.content}
            onChange={(e) => updateActiveContent(e.target.value)}
            onScroll={(e) => setScrollTop(e.target.scrollTop)}
            spellCheck={false}
            aria-label={`${activeFile.name} code`}
          />
        </div>
        <div className={styles.previewWrap}>
          <iframe
            title="Live preview"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className={styles.previewPane}
          />
          {dirty && (
            <div className={styles.runPrompt}>
              <Play size={20} />
              <span>You have unrun changes — click <strong>Run</strong> to update the preview.</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Console ───────────────────────── */}
      <div className={styles.consoleHeader}>
        <span className={styles.consoleLabel}>Console</span>
        {logs.length > 0 && (
          <button type="button" className={styles.clearBtn} onClick={() => setLogs([])}>
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>
      <div className={styles.consoleBody}>
        {logs.length === 0 ? (
          <p className={styles.consoleEmpty}>console.log output and errors will show up here after you Run.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`${styles.consoleLine} ${log.type === 'error' ? styles.consoleError : log.type === 'warn' ? styles.consoleWarn : styles.consoleLog}`}
            >
              <span className={styles.consolePrefix}>{log.type === 'error' ? '✕' : log.type === 'warn' ? '⚠' : '›'}</span>
              {log.text}
            </div>
          ))
        )}
      </div>

      {/* ── Status bar ────────────────────── */}
      <div className={styles.statusbar}>
        <div className={styles.statusItem}>
          <span className={styles.liveDot} />
          {files.length} file{files.length !== 1 ? 's' : ''} · nothing to install
        </div>
        <div className={styles.statusItem}>
          {extOf(activeFile.name).toUpperCase() || 'TXT'} · Ln {lineCount}
        </div>
      </div>
    </div>
  );
}
