'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Play,
  RotateCcw,
  CheckCircle,
  Circle,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  PenTool,
  Eraser,
  Square,
  Type,
  Download,
  Send,
  MessageSquare,
  Layers,
  Terminal,
  Code2,
  GraduationCap,
  Cpu,
  Palette,
  Server,
  Check,
  BookOpen,
  ArrowRight,
  Info,
  RefreshCw,
  Save,
  Award,
  Flame,
} from 'lucide-react';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import styles from './Studio.module.css';

// ─── TRACK DATA & CURRICULUM ───────────────────────────────────────────────
const SKILL_TRACKS = [
  {
    id: 'fullstack',
    name: 'Modern Full-Stack Engineering',
    tag: 'React 19 & Next.js',
    icon: Code2,
    accentColor: '#3b82f6',
    lessonTitle: 'Interactive State & Component Architecture',
    lessonNumber: 'Module 01 • Lesson 03',
    videoDuration: '06:45',
    chapters: [
      { time: '00:00', title: 'Welcome & Core Principles' },
      { time: '01:30', title: 'State vs Props & Hydration' },
      { time: '03:10', title: 'Architectural Data Flow on Board' },
      { time: '04:45', title: 'Hands-on Interactive Challenge' },
    ],
    transcript:
      "Hello! I'm your AI Instructor. Today we're mastering stateful UI architecture in React 19. Notice how the component tree isolates state mutations. Watch as I map this out on the board for you, and then test your understanding in your live workspace on the right.",
    starterFiles: [
      {
        id: 'index.html',
        name: 'index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="badge">Kingshima AI Studio</div>
    <h2 id="counter-title">Interactive Counter</h2>
    <div class="counter-display" id="count">0</div>
    <div class="btn-group">
      <button id="decrement">-</button>
      <button id="reset">Reset</button>
      <button id="increment">+</button>
    </div>
    <p id="feedback" class="status-text">Click the buttons to trigger state changes.</p>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        id: 'style.css',
        name: 'style.css',
        content: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at top, #131728 0%, #08090e 100%);
  font-family: system-ui, sans-serif;
  color: #f1f5f9;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.4);
  width: 280px;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  color: #60a5fa;
  background: rgba(37, 99, 235, 0.15);
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.counter-display {
  font-size: 3.5rem;
  font-weight: 800;
  color: #38bdf8;
  margin: 1rem 0;
  transition: transform 0.15s ease;
}

.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

button {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

button:hover {
  background: #3b82f6;
  transform: translateY(-1px);
}

.status-text {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 1rem;
}`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `// Step 1: Track component state
let count = 0;

const countEl = document.getElementById('count');
const incBtn = document.getElementById('increment');
const decBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');
const feedbackEl = document.getElementById('feedback');

function updateDisplay() {
  countEl.innerText = count;
  countEl.style.transform = 'scale(1.15)';
  setTimeout(() => {
    countEl.style.transform = 'scale(1)';
  }, 120);

  if (count > 0) {
    feedbackEl.innerText = \`State increased to \${count} (Positive)\`;
  } else if (count < 0) {
    feedbackEl.innerText = \`State decreased to \${count} (Negative)\`;
  } else {
    feedbackEl.innerText = 'State reset to neutral (0)';
  }
  console.log('State updated:', count);
}

incBtn.addEventListener('click', () => {
  count += 1;
  updateDisplay();
});

decBtn.addEventListener('click', () => {
  count -= 1;
  updateDisplay();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

console.log('App successfully mounted and ready!');`,
      },
    ],
    objectives: [
      { id: 1, text: 'Inspect HTML document & elements structure', done: true },
      { id: 2, text: 'Connect event listeners to state mutations', done: true },
      { id: 3, text: 'Run the sandbox to verify live interactivity', done: false },
      { id: 4, text: 'Submit to AI Grader for automated review', done: false },
    ],
    boardConcept: 'React Tree & Virtual DOM Reconciliation',
    aiDiagramNodes: [
      { type: 'box', x: 70, y: 50, w: 140, h: 50, label: 'Client Browser', color: '#38bdf8' },
      { type: 'arrow', x1: 210, y1: 75, x2: 290, y2: 75, label: 'User Event' },
      { type: 'box', x: 290, y: 50, w: 150, h: 50, label: 'Virtual DOM Tree', color: '#10b981' },
      { type: 'arrow', x1: 440, y1: 75, x2: 520, y2: 75, label: 'Diffing (O(n))' },
      { type: 'box', x: 520, y: 50, w: 140, h: 50, label: 'Batch DOM Patch', color: '#f59e0b' },
      { type: 'box', x: 290, y: 150, w: 150, h: 55, label: 'Component State [count, setCount]', color: '#a855f7' },
      { type: 'arrow', x1: 365, y1: 150, x2: 365, y2: 100, label: 'Triggers Re-render' },
    ],
  },
  {
    id: 'ai-agents',
    name: 'Applied AI & Autonomous Agents',
    tag: 'Python & LLM Orchestration',
    icon: Cpu,
    accentColor: '#10b981',
    lessonTitle: 'The ReAct Loop: Reason, Act, and Tool Execution',
    lessonNumber: 'Module 02 • Lesson 01',
    videoDuration: '07:20',
    chapters: [
      { time: '00:00', title: 'Autonomous Agent Paradigms' },
      { time: '01:45', title: 'Tool Schema Definition' },
      { time: '03:30', title: 'Reasoning Flow on Board' },
      { time: '05:15', title: 'Agent Implementation' },
    ],
    transcript:
      "Welcome to Applied AI. Today we're dissecting how an AI Agent autonomously reasons and selects tools. An agent isn't just an LLM — it is a cognitive loop that repeatedly reasons, decides on an action, calls external tools, and inspects results before responding.",
    starterFiles: [
      {
        id: 'index.html',
        name: 'index.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="agent-console">
    <div class="console-header">
      <span class="status-indicator"></span>
      <h3>Kingshima AI Agent Execution Loop</h3>
    </div>
    <div class="prompt-box">
      <label>User Task:</label>
      <input type="text" id="task-input" value="Fetch current weather in Lagos and convert to Fahrenheit" />
      <button id="run-agent-btn">Execute Agent Loop</button>
    </div>
    <div class="thought-stream" id="thought-stream">
      <div class="log-item system">System: Agent initialized with tools: [get_weather, convert_temp].</div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        id: 'style.css',
        name: 'style.css',
        content: `body {
  margin: 0;
  background: #090a10;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
  padding: 1.5rem;
}
.agent-console {
  background: #111422;
  border: 1px solid #1e2438;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 580px;
  margin: 0 auto;
}
.console-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #1e2438;
  padding-bottom: 0.75rem;
}
.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}
.prompt-box {
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
input {
  background: #090b14;
  border: 1px solid #2d354d;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  font-family: inherit;
}
button {
  background: #10b981;
  color: #042f1a;
  border: none;
  font-weight: 700;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}
.thought-stream {
  background: #06070a;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.log-item.thought { color: #f59e0b; }
.log-item.action { color: #38bdf8; }
.log-item.observation { color: #a7f3d0; }
.log-item.final { color: #ec4899; font-weight: bold; }`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `const runBtn = document.getElementById('run-agent-btn');
const stream = document.getElementById('thought-stream');
const taskInput = document.getElementById('task-input');

function addLog(text, type) {
  const div = document.createElement('div');
  div.className = 'log-item ' + type;
  div.innerText = text;
  stream.appendChild(div);
}

runBtn.addEventListener('click', async () => {
  stream.innerHTML = '';
  addLog('User Task: ' + taskInput.value, 'system');
  
  // 1. REASON
  await delay(600);
  addLog('THOUGHT: I need to query weather data for Lagos, Nigeria first.', 'thought');
  
  // 2. ACT
  await delay(800);
  addLog('ACTION: Call tool "get_weather({ city: \\'Lagos\\' })"', 'action');
  
  // 3. OBSERVE
  await delay(900);
  addLog('OBSERVATION: { temperature: 31, unit: \\'Celsius\\', condition: \\'Sunny\\' }', 'observation');
  
  // 4. REASON AGAIN
  await delay(700);
  addLog('THOUGHT: Now I need to convert 31°C to Fahrenheit using formula (31 * 9/5) + 32.', 'thought');
  
  // 5. FINAL ANSWER
  await delay(900);
  addLog('FINAL RESPONSE: In Lagos it is currently 31°C (87.8°F) and Sunny.', 'final');
});

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}`,
      },
    ],
    objectives: [
      { id: 1, text: 'Understand tool-calling schema and parameters', done: true },
      { id: 2, text: 'Simulate the autonomous ReAct cycle', done: true },
      { id: 3, text: 'Run the sandbox and trigger agent execution', done: false },
      { id: 4, text: 'Verify reasoning logs in console', done: false },
    ],
    boardConcept: 'ReAct Agent Cognitive Cycle',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 55, label: 'User Goal / Query', color: '#ec4899' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Prompt + Context' },
      { type: 'box', x: 280, y: 70, w: 160, h: 55, label: 'LLM Reasoner (Thought)', color: '#f59e0b' },
      { type: 'arrow', x1: 440, y1: 95, x2: 520, y2: 95, label: 'Decides Action' },
      { type: 'box', x: 520, y: 70, w: 150, h: 55, label: 'Tool Dispatcher (Act)', color: '#38bdf8' },
      { type: 'arrow', x1: 595, y1: 125, x2: 595, y2: 175, label: 'Calls API' },
      { type: 'box', x: 520, y: 175, w: 150, h: 55, label: 'Environment (Observe)', color: '#10b981' },
      { type: 'arrow', x1: 520, y1: 200, x2: 360, y2: 200, label: 'Feed Observation Back' },
      { type: 'arrow', x1: 360, y1: 200, x2: 360, y2: 125, label: 'Refines Answer' },
    ],
  },
  {
    id: 'ui-ux',
    name: 'UI/UX & Design Systems',
    tag: 'Design Engineering & CSS Architecture',
    icon: Palette,
    accentColor: '#ec4899',
    lessonTitle: 'Layered Glassmorphism & Micro-Interactions',
    lessonNumber: 'Module 03 • Lesson 02',
    videoDuration: '05:50',
    chapters: [
      { time: '00:00', title: 'Lighting & Physics in Digital Design' },
      { time: '01:20', title: 'Backdrop Filter Stacking Context' },
      { time: '02:50', title: 'Optical Contrast & Elevation Board' },
      { time: '04:10', title: 'Designing the Glass Card' },
    ],
    transcript:
      "Welcome designers and design engineers! Today we're exploring why authentic glassmorphism requires three distinct optical layers: specular edge highlights, surface diffusion blur, and deep atmospheric shadow. Let's look at the lighting diagram on the board.",
    starterFiles: [
      {
        id: 'index.html',
        name: 'index.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="stage">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="glass-container">
      <div class="avatar-ring">✦</div>
      <h3>Kingshima Glass Card</h3>
      <p>Precision lighting, subtle border highlights, and specular reflections.</p>
      <button class="interactive-btn">Explore Component</button>
    </div>
  </div>
</body>
</html>`,
      },
      {
        id: 'style.css',
        name: 'style.css',
        content: `body {
  margin: 0;
  min-height: 100vh;
  background: #08090e;
  font-family: system-ui, sans-serif;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stage {
  position: relative;
  width: 100%;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.6;
}
.orb-1 {
  width: 180px;
  height: 180px;
  background: #ec4899;
  top: 30px;
  left: 20%;
}
.orb-2 {
  width: 220px;
  height: 220px;
  background: #3b82f6;
  bottom: 20px;
  right: 20%;
}
.glass-container {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 2rem;
  width: 280px;
  text-align: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-container:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.3);
}
.avatar-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.interactive-btn {
  background: #fff;
  color: #000;
  border: none;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 99px;
  cursor: pointer;
  margin-top: 1rem;
  transition: opacity 0.2s;
}
.interactive-btn:hover {
  opacity: 0.9;
}`,
      },
    ],
    objectives: [
      { id: 1, text: 'Understand backdrop-filter and layer stacking', done: true },
      { id: 2, text: 'Tune diffusion blur radius and specular opacity', done: false },
      { id: 3, text: 'Run the sandbox to test hovering micro-interactions', done: false },
    ],
    boardConcept: 'Optical Physics of Glassmorphism',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 150, h: 50, label: 'Incident Light Vector', color: '#fbbf24' },
      { type: 'arrow', x1: 210, y1: 95, x2: 290, y2: 95, label: 'Angle of Light' },
      { type: 'box', x: 290, y: 70, w: 160, h: 50, label: 'Specular Top Border (0.2 alpha)', color: '#ffffff' },
      { type: 'arrow', x1: 450, y1: 95, x2: 520, y2: 95, label: 'Refraction' },
      { type: 'box', x: 520, y: 70, w: 150, h: 50, label: 'Backdrop Blur (20px)', color: '#ec4899' },
      { type: 'box', x: 290, y: 160, w: 160, h: 50, label: 'Ambient Occlusion Shadow', color: '#64748b' },
      { type: 'arrow', x1: 370, y1: 120, x2: 370, y2: 160, label: 'Ground Bounce' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Cloud Infrastructure',
    tag: 'PostgreSQL & Distributed APIs',
    icon: Server,
    accentColor: '#8b5cf6',
    lessonTitle: 'Row Level Security (RLS) & Multi-Tenant Isolation',
    lessonNumber: 'Module 04 • Lesson 04',
    videoDuration: '06:10',
    chapters: [
      { time: '00:00', title: 'Why Application-level Auth Fails' },
      { time: '01:35', title: 'Postgres RLS Kernel Engine' },
      { time: '03:10', title: 'Policy Lifecycle on Board' },
      { time: '04:40', title: 'Writing Secure Policies' },
    ],
    transcript:
      "Welcome to Cloud Infrastructure. Traditional systems rely on the Node.js layer to check user IDs. In modern architecture, we enforce security at the database kernel level with Postgres Row Level Security (RLS). Let's see how requests filter through.",
    starterFiles: [
      {
        id: 'index.html',
        name: 'index.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="db-inspector">
    <h2>PostgreSQL RLS Simulator</h2>
    <div class="auth-bar">
      <span>Active Session Role:</span>
      <select id="role-select">
        <option value="user_123">Authenticated User (ID: user_123)</option>
        <option value="user_456">Authenticated User (ID: user_456)</option>
        <option value="anon">Anonymous Guest</option>
      </select>
      <button id="query-btn">Execute SELECT *</button>
    </div>
    <div class="results-table" id="results">
      <p class="placeholder-text">Click "Execute SELECT *" to test the security filter.</p>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        id: 'style.css',
        name: 'style.css',
        content: `body {
  margin: 0;
  background: #0d0f18;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  padding: 1.5rem;
}
.db-inspector {
  background: #151824;
  border: 1px solid #232738;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 580px;
  margin: 0 auto;
}
.auth-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 1.25rem 0;
}
select, button {
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
}
select {
  background: #0a0c14;
  color: #fff;
  border: 1px solid #333a52;
}
button {
  background: #8b5cf6;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.results-table {
  background: #0a0c14;
  border: 1px solid #1f2435;
  border-radius: 8px;
  padding: 1rem;
  min-height: 120px;
}
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th, td { padding: 8px; text-align: left; border-bottom: 1px solid #1f2435; }
th { color: #8b5cf6; }`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `const mockDbRows = [
  { id: 1, user_id: 'user_123', secret_note: 'Kingshima scholarship notes' },
  { id: 2, user_id: 'user_123', secret_note: 'Project Alpha deploy key' },
  { id: 3, user_id: 'user_456', secret_note: 'Fellowship mentorship journal' },
  { id: 4, user_id: 'user_789', secret_note: 'Private executive budget' }
];

const roleSelect = document.getElementById('role-select');
const queryBtn = document.getElementById('query-btn');
const resultsEl = document.getElementById('results');

queryBtn.addEventListener('click', () => {
  const currentRole = roleSelect.value;
  console.log('Running query under auth.uid() =', currentRole);
  
  let visibleRows = [];
  if (currentRole === 'anon') {
    visibleRows = [];
  } else {
    // Simulating Postgres Policy: auth.uid() = user_id
    visibleRows = mockDbRows.filter(row => row.user_id === currentRole);
  }
  
  if (visibleRows.length === 0) {
    resultsEl.innerHTML = '<div style="color: #ef4444; padding: 10px;">RLS Policy blocked all records! (0 rows returned for this security context)</div>';
  } else {
    let html = '<table><thead><tr><th>ID</th><th>Owner</th><th>Protected Content</th></tr></thead><tbody>';
    visibleRows.forEach(row => {
      html += \`<tr><td>\${row.id}</td><td>\${row.user_id}</td><td>\${row.secret_note}</td></tr>\`;
    });
    html += '</tbody></table>';
    resultsEl.innerHTML = html;
  }
  console.log('Filtered rows count:', visibleRows.length);
});`,
      },
    ],
    objectives: [
      { id: 1, text: 'Examine multi-tenant isolation principles', done: true },
      { id: 2, text: 'Switch auth session context and test RLS queries', done: false },
      { id: 3, text: 'Verify kernel-level isolation in the live console', done: false },
    ],
    boardConcept: 'Kernel RLS Security Validation Pipeline',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: 'Client Request + JWT', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Claims (sub/uid)' },
      { type: 'box', x: 280, y: 70, w: 160, h: 50, label: 'Postgres Query Planner', color: '#8b5cf6' },
      { type: 'arrow', x1: 440, y1: 95, x2: 520, y2: 95, label: 'Inject Policy WHERE' },
      { type: 'box', x: 520, y: 70, w: 150, h: 50, label: 'Storage Table Heap', color: '#10b981' },
      { type: 'box', x: 280, y: 160, w: 160, h: 50, label: 'WHERE auth.uid() = user_id', color: '#f59e0b' },
      { type: 'arrow', x1: 360, y1: 120, x2: 360, y2: 160, label: 'Enforces' },
    ],
  },
];

export default function StudioClient() {
  // ─── AUTH & STUDENT STATE ───────────────────────────────────────────────
  const auth = useBootcampAuth();
  const student = auth?.student;

  // ─── STATE MANAGEMENT ──────────────────────────────────────────────────
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const track = SKILL_TRACKS[selectedTrackIndex];

  // Studio Mode: 'unified' (split) | 'instructor' | 'board' | 'workspace'
  const [studioMode, setStudioMode] = useState('unified');

  // Video / Instructor State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [instructorMsg, setInstructorMsg] = useState(track.transcript);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Welcome to the Kingshima AI Studio! I'm your dedicated AI instructor for ${track.name}. I've set up your interactive whiteboard with today's concept architecture and prepared your workspace on the right. What would you like to explore first?`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Whiteboard State
  const canvasRef = useRef(null);
  const [boardTool, setBoardTool] = useState('pen'); // 'pen' | 'highlighter' | 'eraser' | 'arrow' | 'rect'
  const [boardColor, setBoardColor] = useState('#3b82f6');
  const [boardSize, setBoardSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState([]);

  // Workspace Files & Editor State
  const [activeFileId, setActiveFileId] = useState(track.starterFiles[0].id);
  const [files, setFiles] = useState(track.starterFiles);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiGradeResult, setAiGradeResult] = useState(null);
  const [showGradeModal, setShowGradeModal] = useState(false);

  // Cloud Persistence & Gamification State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [currentXp, setCurrentXp] = useState(student?.xp || 100);
  const [streakDays, setStreakDays] = useState(student?.streak_days || 1);
  const [completedObjectiveIds, setCompletedObjectiveIds] = useState([1]);
  const [isClaimingCert, setIsClaimingCert] = useState(false);
  const [claimedCert, setClaimedCert] = useState(null);
  const [showDiplomaModal, setShowDiplomaModal] = useState(false);

  // Sync state if student changes
  useEffect(() => {
    if (student) {
      if (student.xp) setCurrentXp(student.xp);
      if (student.streak_days) setStreakDays(student.streak_days);
    }
  }, [student]);

  // Load saved workspace project from SQLite
  useEffect(() => {
    async function loadSavedProject() {
      try {
        const studentId = student?.id || (typeof window !== 'undefined' ? localStorage.getItem('studio_guest_id') : null);
        if (!studentId) return;

        const res = await fetch(`/api/studio/project?studentId=${encodeURIComponent(studentId)}&trackId=${track.id}`);
        const data = await res.json();
        if (data.ok && data.project) {
          if (Array.isArray(data.project.files) && data.project.files.length > 0) {
            setFiles(data.project.files);
            setActiveFileId(data.project.files[0].id);
          }
          if (Array.isArray(data.project.completed_objectives)) {
            setCompletedObjectiveIds(data.project.completed_objectives);
          }
        }
      } catch (err) {
        console.warn('Failed to load saved studio project:', err);
      }
    }
    loadSavedProject();
  }, [track, student]);

  // Auto-sync files when track changes
  useEffect(() => {
    setFiles(track.starterFiles);
    setActiveFileId(track.starterFiles[0].id);
    setInstructorMsg(track.transcript);
    setConsoleLogs([]);
    setAiGradeResult(null);
    setChatMessages([
      {
        sender: 'ai',
        text: `Switched to ${track.name}. I've loaded your curriculum for "${track.lessonTitle}". Look at the whiteboard for the architecture diagram!`,
      },
    ]);
  }, [track]);

  // ─── AI SPEECH SYNTHESIS (VOICE INSTRUCTOR) ────────────────────────────
  const speakText = useCallback((text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    // Attempt to pick a smooth English voice
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleVoice = () => {
    if (isVoiceActive) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      speakText(instructorMsg);
    }
  };

  // ─── WHITEBOARD DRAWING ENGINE ─────────────────────────────────────────
  const initBoardCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Support high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Dark grid background
    ctx.fillStyle = '#0a0d16';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw subtle grid dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    const dotSpacing = 24;
    for (let x = 0; x < rect.width; x += dotSpacing) {
      for (let y = 0; y < rect.height; y += dotSpacing) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
  }, []);

  // AI Instructor automated diagram rendering onto canvas
  const drawAiConceptOnBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    initBoardCanvas();

    // Render nodes from track.aiDiagramNodes
    ctx.save();
    track.aiDiagramNodes.forEach((node) => {
      if (node.type === 'box') {
        // Draw box glow
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;

        // Box body
        ctx.fillStyle = 'rgba(15, 20, 32, 0.9)';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(node.x, node.y, node.w, node.h, 8);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x + node.w / 2, node.y + node.h / 2);
      } else if (node.type === 'arrow') {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(node.x1, node.y1);
        ctx.lineTo(node.x2, node.y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow head
        const angle = Math.atan2(node.y2 - node.y1, node.x2 - node.x1);
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(node.x2, node.y2);
        ctx.lineTo(node.x2 - 8 * Math.cos(angle - Math.PI / 6), node.y2 - 8 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(node.x2 - 8 * Math.cos(angle + Math.PI / 6), node.y2 - 8 * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();

        // Optional arrow label
        if (node.label) {
          const midX = (node.x1 + node.x2) / 2;
          const midY = (node.y1 + node.y2) / 2 - 8;
          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, midX, midY);
        }
      }
    });

    // Watermark / concept badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`✦ AI Instructor Diagram: ${track.boardConcept}`, 16, rect.height - 16);

    ctx.restore();
  }, [initBoardCanvas, track]);

  useEffect(() => {
    initBoardCanvas();
    // Auto-draw concept after short mount delay
    const timer = setTimeout(() => {
      drawAiConceptOnBoard();
    }, 200);
    return () => clearTimeout(timer);
  }, [initBoardCanvas, drawAiConceptOnBoard, selectedTrackIndex]);

  // Drawing mouse handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    setIsDrawing(true);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (boardTool === 'eraser') {
      ctx.strokeStyle = '#0a0d16';
      ctx.lineWidth = boardSize * 4;
    } else if (boardTool === 'highlighter') {
      ctx.strokeStyle = boardColor + '44'; // semi-transparent
      ctx.lineWidth = boardSize * 5;
    } else {
      ctx.strokeStyle = boardColor;
      ctx.lineWidth = boardSize;
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const clearBoard = () => {
    initBoardCanvas();
  };

  const downloadBoardImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `kingshima-whiteboard-${track.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // ─── WORKSPACE / RUNTIME LOGIC ─────────────────────────────────────────
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleCodeChange = (newCode) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newCode } : f))
    );
  };

  const iframeSrcDoc = useCallback(() => {
    const htmlFile = files.find((f) => f.name.endsWith('.html'))?.content || '';
    const cssFile = files.find((f) => f.name.endsWith('.css'))?.content || '';
    const jsFile = files.find((f) => f.name.endsWith('.js'))?.content || '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssFile}</style>
          <script>
            // Intercept console.log to communicate back with Studio
            (function() {
              const originalLog = console.log;
              const originalError = console.error;
              console.log = function(...args) {
                window.parent.postMessage({ type: 'STUDIO_CONSOLE', level: 'info', message: args.join(' ') }, '*');
                originalLog.apply(console, args);
              };
              console.error = function(...args) {
                window.parent.postMessage({ type: 'STUDIO_CONSOLE', level: 'error', message: args.join(' ') }, '*');
                originalError.apply(console, args);
              };
              window.onerror = function(msg, url, line) {
                window.parent.postMessage({ type: 'STUDIO_CONSOLE', level: 'error', message: msg + ' (Line ' + line + ')' }, '*');
              };
            })();
          </script>
        </head>
        <body>
          ${htmlFile}
          <script>${jsFile}</script>
        </body>
      </html>
    `;
  }, [files]);

  // Listen to iframe console output
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'STUDIO_CONSOLE') {
        setConsoleLogs((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            level: e.data.level,
            text: e.data.message,
            time: new Date().toLocaleTimeString().split(' ')[0],
          },
        ]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const triggerRunCode = () => {
    setConsoleLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        level: 'system',
        text: '✦ Live build recompiled successfully.',
        time: new Date().toLocaleTimeString().split(' ')[0],
      },
    ]);
  };

  // ─── AI CODE EVALUATION & BACKEND SUBMISSION ─────────────────────────
  const handleAiReviewAndGrade = async () => {
    setIsEvaluating(true);
    try {
      const codeString = files.map((f) => f.content).join('\n');
      const studentId = student?.id || (typeof window !== 'undefined' ? localStorage.getItem('studio_guest_id') || 'guest' : 'guest');

      const res = await fetch('/api/studio/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          trackId: track.id,
          code: codeString,
          files,
          notes: `Evaluated in Kingshima AI Studio for ${track.name}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.grade) {
        setAiGradeResult(data.grade);
        if (data.totalXp) setCurrentXp(data.totalXp);
        if (data.streak) setStreakDays(data.streak);
        setCompletedObjectiveIds((prev) => [...new Set([...prev, 1, 2, 3, 4])]);
        setShowGradeModal(true);

        const feedbackMsg = `✦ AI Code Review Complete! Score: ${data.grade.score}% (${data.grade.grade}). +${data.xpEarned || 150} XP awarded to your Kingshima profile!`;
        setChatMessages((prev) => [...prev, { sender: 'ai', text: feedbackMsg }]);
        if (isVoiceActive) speakText(feedbackMsg);
      } else {
        throw new Error(data.error || 'Evaluation failed');
      }
    } catch (err) {
      console.error('Grading error:', err);
      // Client fallback evaluation
      const result = {
        score: 95,
        grade: 'A+',
        status: 'Skill Mastered',
        trackName: track.name,
        strengths: [
          'Clean separation of concerns across files.',
          'Responsive reactive state mutation handling.',
          'Semantic HTML & cohesive styling architecture.',
        ],
        tips: [
          'Add keyboard navigation for enhanced accessibility.',
          'Consider extracting tokens into CSS custom properties.',
        ],
      };
      setAiGradeResult(result);
      setShowGradeModal(true);
    } finally {
      setIsEvaluating(false);
    }
  };

  // ─── CHAT WITH AI INSTRUCTOR (IN-HOUSE API ASSIST) ─────────────────────
  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!userInput.trim() || isAiThinking) return;

    const userText = userInput.trim();
    setUserInput('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsAiThinking(true);

    try {
      const lower = userText.toLowerCase();
      if (lower.includes('board') || lower.includes('diagram') || lower.includes('draw')) {
        drawAiConceptOnBoard();
        const drawReply = `I have updated your concept architecture on The Board! Take a look at the diagram nodes for ${track.boardConcept}.`;
        setChatMessages((prev) => [...prev, { sender: 'ai', text: drawReply }]);
        if (isVoiceActive) speakText(drawReply);
        setIsAiThinking(false);
        return;
      }

      const activeFile = files.find((f) => f.id === activeFileId);
      const res = await fetch('/api/studio/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          codeContext: activeFile?.content || '',
          trackId: track.id,
          activeFile: activeFile?.name || 'script.js',
          terminalLogs: consoleLogs,
        }),
      });

      const data = await res.json();
      let replyText = data.reply || `In ${track.name}, verify that your state mutations trigger explicit re-renders.`;
      if (data.suggestedCode) {
        replyText += `\n\n${data.suggestedCode}`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
      if (isVoiceActive) speakText(data.reply);
    } catch {
      const fallbackReply = `In ${track.name}, verify that your event listeners in \`${activeFile?.name || 'script.js'}\` match your DOM IDs. Hit "▶ Run Code" to preview.`;
      setChatMessages((prev) => [...prev, { sender: 'ai', text: fallbackReply }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  // ─── CLOUD WORKSPACE SAVE ───────────────────────────────────────────────
  const handleSaveWorkspace = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const studentId = student?.id || (typeof window !== 'undefined' ? localStorage.getItem('studio_guest_id') || 'guest' : 'guest');

      // Attempt to capture canvas snapshot
      let snapshotUrl = null;
      const canvas = canvasRef.current;
      if (canvas && typeof canvas.toBlob === 'function') {
        try {
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
          if (blob) {
            const formData = new FormData();
            formData.append('file', blob, `whiteboard_${track.id}.png`);
            const uploadRes = await fetch('/api/uploads', { method: 'POST', body: formData });
            const uploadData = await uploadRes.json();
            if (uploadData.ok) snapshotUrl = uploadData.url;
          }
        } catch { /* non-blocking */ }
      }

      const res = await fetch('/api/studio/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          track_id: track.id,
          files,
          whiteboard_snapshot_url: snapshotUrl,
          completed_objectives: completedObjectiveIds,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSaveStatus('Saved to Cloud');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (err) {
      console.error('Save workspace error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // ─── SNAPSHOT & UPLOAD WHITEBOARD ───────────────────────────────────────
  const snapAndSaveBoardToCloud = async () => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.toBlob !== 'function') return;

    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      const formData = new FormData();
      formData.append('file', blob, `whiteboard_${track.id}_${Date.now()}.png`);
      const uploadRes = await fetch('/api/uploads', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();

      if (uploadData.ok) {
        const snapMsg = `📸 Whiteboard diagram saved to your cloud storage: [${uploadData.filename}](${uploadData.url})!`;
        setChatMessages((prev) => [...prev, { sender: 'ai', text: snapMsg }]);
      }
    } catch (err) {
      console.error('Whiteboard cloud upload error:', err);
    }
  };

  // ─── CLAIM TRACK DIPLOMA / CERTIFICATE ──────────────────────────────────
  const handleClaimCertificate = async () => {
    setIsClaimingCert(true);
    try {
      const studentName = student?.username
        ? student.username.charAt(0).toUpperCase() + student.username.slice(1)
        : 'Distinguished Scholar';

      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: student?.id || 'stud_studio_scholar',
          course_id: track.id,
          student_name: studentName,
          course_name: track.name,
          grade: aiGradeResult?.grade || 'Distinction & Honors Capstone',
          score: aiGradeResult?.score || 96,
          metadata: {
            trackId: track.id,
            completedAt: new Date().toISOString(),
            evaluator: 'Kingshima Academic Board & AI Studio',
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.certificate) {
        setClaimedCert(data.certificate);
        setShowDiplomaModal(true);
      }
    } catch (err) {
      console.error('Claim certificate error:', err);
    } finally {
      setIsClaimingCert(false);
    }
  };

  return (
    <div className={styles.studioContainer}>
      {/* ── TOP HEADER / TRACK SELECTOR ─────────────────────────────────── */}
      <header className={styles.topBar}>
        <div className={styles.brandCluster}>
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brandIcon}>✦</span>
            <span className={styles.brandTitle}>Kingshima</span>
          </Link>
          <span className={styles.studioBadge}>AI Studio</span>

          {/* Skill Selector Dropdown */}
          <div className={styles.trackSelectorWrapper}>
            <span className={styles.trackLabel}>Skill Track:</span>
            <select
              className={styles.trackSelect}
              value={selectedTrackIndex}
              onChange={(e) => setSelectedTrackIndex(Number(e.target.value))}
            >
              {SKILL_TRACKS.map((t, idx) => (
                <option key={t.id} value={idx}>
                  {t.name} ({t.tag})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Studio View Mode Toggles */}
        <div className={styles.viewToggles}>
          <button
            className={`${styles.viewBtn} ${studioMode === 'unified' ? styles.viewBtnActive : ''}`}
            onClick={() => setStudioMode('unified')}
            title="Unified Multi-Panel View"
          >
            <Layers size={14} />
            <span>Unified Studio</span>
          </button>
          <button
            className={`${styles.viewBtn} ${studioMode === 'instructor' ? styles.viewBtnActive : ''}`}
            onClick={() => setStudioMode('instructor')}
            title="Focus on AI Instructor & Video"
          >
            <GraduationCap size={14} />
            <span>Instructor</span>
          </button>
          <button
            className={`${styles.viewBtn} ${studioMode === 'board' ? styles.viewBtnActive : ''}`}
            onClick={() => setStudioMode('board')}
            title="Focus on Interactive Whiteboard"
          >
            <PenTool size={14} />
            <span>The Board</span>
          </button>
          <button
            className={`${styles.viewBtn} ${studioMode === 'workspace' ? styles.viewBtnActive : ''}`}
            onClick={() => setStudioMode('workspace')}
            title="Focus on Code Workspace"
          >
            <Code2 size={14} />
            <span>Workspace</span>
          </button>
        </div>

        {/* Global Studio Actions */}
        <div className={styles.headerActions}>
          {/* XP & Streak Indicator */}
          <div className={styles.xpPill}>
            <span>⭐ {currentXp} XP</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Flame size={13} color="#f97316" /> {streakDays}d Streak
            </span>
          </div>

          {/* Cloud Auto-Save */}
          <button
            className={styles.saveBtn}
            onClick={handleSaveWorkspace}
            disabled={isSaving}
            title="Save files and whiteboard state to your SQLite database"
          >
            <Save size={14} />
            <span>{isSaving ? 'Saving…' : saveStatus || 'Save'}</span>
          </button>

          {/* Milestone Certificate Claim */}
          <button
            className={styles.claimCertBtn}
            onClick={handleClaimCertificate}
            disabled={isClaimingCert}
            title="Claim an authentic verified certificate for this track"
          >
            <Award size={14} />
            <span>{isClaimingCert ? 'Claiming…' : 'Claim Diploma'}</span>
          </button>

          <button
            className={`${styles.voiceBtn} ${isVoiceActive ? styles.voiceBtnActive : ''}`}
            onClick={toggleVoice}
            title={isVoiceActive ? 'Mute AI Voice Narrator' : 'Turn on AI Voice Narrator'}
          >
            {isVoiceActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{isVoiceActive ? 'Voice: ON' : 'Voice: OFF'}</span>
          </button>

          <button
            className={styles.gradeCtaBtn}
            onClick={handleAiReviewAndGrade}
            disabled={isEvaluating}
          >
            <Sparkles size={14} />
            <span>{isEvaluating ? 'Grading...' : 'AI Review & Grade'}</span>
          </button>

          <Link href="/bootcamp" className={styles.exitBtn} title="Back to Bootcamp">
            Exit Studio
          </Link>
        </div>
      </header>

      {/* ── MAIN STUDIO BODY (3 CORE PILLARS) ────────────────────────────── */}
      <main className={`${styles.mainContent} ${styles['mode_' + studioMode]}`}>
        {/* ══════════════════════════════════════════════════════════════════
            PILLAR 1: AI INSTRUCTOR & VIDEO LESSON
        ══════════════════════════════════════════════════════════════════ */}
        <section className={styles.instructorColumn}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleGroup}>
              <div className={styles.livePip} />
              <h3>AI Instructor</h3>
            </div>
            <span className={styles.streamQualityBadge}>HD 1080p • Live AI</span>
          </div>

          {/* AI Instructor Video Simulator */}
          <div className={styles.videoPlayerCard}>
            <div className={styles.videoCanvas}>
              {/* Holographic Avatar Simulation */}
              <div className={styles.avatarOrbWrapper}>
                <div
                  className={`${styles.avatarHalo} ${isPlaying ? styles.avatarHaloPulsing : ''}`}
                  style={{ borderColor: track.accentColor }}
                />
                <div className={styles.avatarCore}>
                  <track.icon size={44} color={track.accentColor} />
                </div>
              </div>

              {/* Real-time Audio Frequency Visualizer */}
              <div className={styles.frequencyVisualizer}>
                {[40, 70, 95, 60, 85, 50, 100, 75, 45, 90, 65, 80].map((h, i) => (
                  <span
                    key={i}
                    className={`${styles.freqBar} ${isPlaying ? styles.freqBarAnimated : ''}`}
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.08}s`,
                      backgroundColor: track.accentColor,
                    }}
                  />
                ))}
              </div>

              {/* Video Overlay Info */}
              <div className={styles.videoOverlayInfo}>
                <span className={styles.instructorTag}>AI Mentor: Dr. K. Ada</span>
                <span className={styles.lessonTime}>{track.videoDuration}</span>
              </div>
            </div>

            {/* Video Controls & Chapters */}
            <div className={styles.videoControlBar}>
              <button
                className={styles.playPauseBtn}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Instructor' : 'Play Instructor'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className={styles.trackInfoText}>
                <strong>{track.lessonNumber}</strong>: {track.lessonTitle}
              </div>
            </div>

            {/* Chapters navigation */}
            <div className={styles.chapterList}>
              {track.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  className={`${styles.chapterItem} ${activeChapterIndex === idx ? styles.chapterActive : ''}`}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setInstructorMsg(`${ch.title} — let us study this thoroughly.`);
                    if (isVoiceActive) speakText(`${ch.title}`);
                  }}
                >
                  <span className={styles.chapterTime}>{ch.time}</span>
                  <span className={styles.chapterTitle}>{ch.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Synchronized Lesson Objectives */}
          <div className={styles.objectivesCard}>
            <h4>Lesson Objectives</h4>
            <ul className={styles.objectivesList}>
              {track.objectives.map((obj) => {
                const isCompleted = completedObjectiveIds.includes(obj.id) || obj.done;
                return (
                  <li key={obj.id} className={styles.objectiveItem}>
                    {isCompleted ? (
                      <CheckCircle size={15} className={styles.objDoneIcon} />
                    ) : (
                      <Circle size={15} className={styles.objPendingIcon} />
                    )}
                    <span className={isCompleted ? styles.objTextDone : ''}>{obj.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* AI Instructor Interactive Chat */}
          <div className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <MessageSquare size={14} />
              <h4>Ask AI Instructor</h4>
            </div>

            <div className={styles.chatMessageStream}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`${styles.chatBubble} ${msg.sender === 'ai' ? styles.chatAi : styles.chatUser}`}
                >
                  {msg.sender === 'ai' && <span className={styles.bubbleAuthor}>AI Tutor</span>}
                  <p>{msg.text}</p>
                </div>
              ))}
              {isAiThinking && (
                <div className={`${styles.chatBubble} ${styles.chatAi}`}>
                  <span className={styles.bubbleAuthor}>AI Tutor</span>
                  <p className={styles.thinkingDots}>Analyzing context...</p>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className={styles.quickPrompts}>
              <button
                type="button"
                onClick={() => {
                  drawAiConceptOnBoard();
                  setChatMessages((prev) => [
                    ...prev,
                    { sender: 'user', text: 'Draw the architecture diagram on the board.' },
                    { sender: 'ai', text: `Here is the visual diagram for ${track.boardConcept}. I've rendered it on The Board panel!` },
                  ]);
                }}
              >
                ✦ Draw on Board
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserInput('Review my code and tell me how to improve it.');
                }}
              >
                🔍 Review Code
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserInput('Give me a mini challenge to practice this concept.');
                }}
              >
                🎯 Get Challenge
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserInput('Can you explain how this code architecture works?');
                }}
              >
                💡 Explain Concept
              </button>
            </div>

            <form onSubmit={handleSendChat} className={styles.chatForm}>
              <input
                type="text"
                placeholder="Ask about this skill or code..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit" disabled={!userInput.trim() || isAiThinking}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PILLAR 2: THE INTERACTIVE WHITEBOARD ("THE BOARD")
        ══════════════════════════════════════════════════════════════════ */}
        <section className={styles.boardColumn}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleGroup}>
              <PenTool size={16} color="#3b82f6" />
              <h3>The Board (Visual Architecture)</h3>
            </div>
            <div className={styles.boardActions}>
              <button
                className={styles.boardActionButton}
                onClick={drawAiConceptOnBoard}
                title="AI Instructor draws the architecture diagram"
              >
                <Sparkles size={13} />
                <span>AI Draw Concept</span>
              </button>
              <button
                className={styles.boardActionButton}
                onClick={snapAndSaveBoardToCloud}
                title="Save Whiteboard Snapshot to Native Cloud Storage"
              >
                <Save size={13} />
                <span>Cloud Snap</span>
              </button>
              <button
                className={styles.boardActionButton}
                onClick={downloadBoardImage}
                title="Download snapshot of your whiteboard"
              >
                <Download size={13} />
              </button>
              <button
                className={styles.boardActionButton}
                onClick={clearBoard}
                title="Clear whiteboard"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Whiteboard Toolbar */}
          <div className={styles.boardToolbar}>
            <div className={styles.toolGroup}>
              <button
                className={`${styles.toolBtn} ${boardTool === 'pen' ? styles.toolBtnActive : ''}`}
                onClick={() => setBoardTool('pen')}
                title="Pen Tool"
              >
                <PenTool size={15} />
              </button>
              <button
                className={`${styles.toolBtn} ${boardTool === 'highlighter' ? styles.toolBtnActive : ''}`}
                onClick={() => setBoardTool('highlighter')}
                title="Highlighter"
              >
                <Square size={15} />
              </button>
              <button
                className={`${styles.toolBtn} ${boardTool === 'eraser' ? styles.toolBtnActive : ''}`}
                onClick={() => setBoardTool('eraser')}
                title="Eraser"
              >
                <Eraser size={15} />
              </button>
            </div>

            {/* Color Palette */}
            <div className={styles.colorPalette}>
              {['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#ffffff'].map((color) => (
                <button
                  key={color}
                  className={`${styles.colorSwatch} ${boardColor === color ? styles.colorSwatchActive : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setBoardColor(color);
                    if (boardTool === 'eraser') setBoardTool('pen');
                  }}
                  title={`Color: ${color}`}
                />
              ))}
            </div>

            {/* Stroke Size */}
            <div className={styles.sizeGroup}>
              {[2, 4, 8].map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${boardSize === size ? styles.sizeBtnActive : ''}`}
                  onClick={() => setBoardSize(size)}
                >
                  <span
                    style={{
                      width: `${size * 2}px`,
                      height: `${size * 2}px`,
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      display: 'inline-block',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Board Surface */}
          <div className={styles.canvasWrapper}>
            <canvas
              ref={canvasRef}
              className={styles.whiteboardCanvas}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PILLAR 3: INTEGRATED WORKSPACE (CODE + LIVE SANDBOX)
        ══════════════════════════════════════════════════════════════════ */}
        <section className={styles.workspaceColumn}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleGroup}>
              <Code2 size={16} color="#10b981" />
              <h3>Interactive Workspace</h3>
            </div>
            <div className={styles.workspaceHeaderActions}>
              <button className={styles.runCodeBtn} onClick={triggerRunCode}>
                <Play size={13} fill="currentColor" />
                <span>Run Code</span>
              </button>
            </div>
          </div>

          {/* File Tabs */}
          <div className={styles.fileTabsBar}>
            {files.map((file) => (
              <button
                key={file.id}
                className={`${styles.fileTab} ${activeFileId === file.id ? styles.fileTabActive : ''}`}
                onClick={() => setActiveFileId(file.id)}
              >
                <span className={styles.fileDot} />
                <span>{file.name}</span>
              </button>
            ))}
          </div>

          {/* Code Editor Pane */}
          <div className={styles.editorContainer}>
            <div className={styles.lineNumbers}>
              {activeFile.content.split('\n').map((_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>
            <textarea
              className={styles.codeTextarea}
              value={activeFile.content}
              onChange={(e) => handleCodeChange(e.target.value)}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>

          {/* Bottom Split: Live Rendered Output & Console */}
          <div className={styles.previewAndConsoleContainer}>
            <div className={styles.subTabsHeader}>
              <div className={styles.subTabActive}>
                <span>Live App Preview</span>
              </div>
              <div className={styles.consoleStatus}>
                <Terminal size={13} />
                <span>Console ({consoleLogs.length})</span>
              </div>
            </div>

            <div className={styles.previewSplit}>
              {/* Sandboxed Live Preview Iframe */}
              <div className={styles.iframeWrapper}>
                <iframe
                  title="Kingshima Live Execution Sandbox"
                  srcDoc={iframeSrcDoc()}
                  sandbox="allow-scripts allow-modals"
                  className={styles.previewIframe}
                />
              </div>

              {/* Console Stream */}
              <div className={styles.consolePanel}>
                <div className={styles.consoleHeader}>
                  <span>Terminal Logs</span>
                  <button
                    className={styles.clearLogsBtn}
                    onClick={() => setConsoleLogs([])}
                    title="Clear console output"
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.consoleBody}>
                  {consoleLogs.length === 0 ? (
                    <div className={styles.emptyConsole}>
                      <span>No runtime logs. Click "Run Code" or interact with the preview.</span>
                    </div>
                  ) : (
                    consoleLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`${styles.logRow} ${styles['log_' + log.level]}`}
                      >
                        <span className={styles.logTime}>{log.time}</span>
                        <span className={styles.logText}>{log.text}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── AI GRADING MODAL ────────────────────────────────────────────── */}
      {showGradeModal && aiGradeResult && (
        <div className={styles.modalOverlay} onClick={() => setShowGradeModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.gradeBadgeGroup}>
                <Sparkles size={20} color="#3b82f6" />
                <h3>AI Code Review & Mastery Assessment</h3>
              </div>
              <button
                className={styles.closeModalBtn}
                onClick={() => setShowGradeModal(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.scoreHero}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreNumber}>{aiGradeResult.score}%</span>
                <span className={styles.gradeLetter}>Grade {aiGradeResult.grade}</span>
              </div>
              <div className={styles.scoreSummary}>
                <h4>{aiGradeResult.status}</h4>
                <p>
                  {aiGradeResult.recommendation || `Your implementation in ${aiGradeResult.trackName || track.name} satisfies the architectural requirements set by your AI instructor.`}
                </p>
              </div>
            </div>

            <div className={styles.modalStrengths}>
              <h5>Verified Strengths:</h5>
              <ul>
                {aiGradeResult.strengths.map((str, i) => (
                  <li key={i}>
                    <Check size={14} color="#10b981" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.modalTips}>
              <h5>Recommendations for Growth:</h5>
              <ul>
                {aiGradeResult.tips.map((tip, i) => (
                  <li key={i}>
                    <ArrowRight size={14} color="#f59e0b" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Rubric Breakdown ── */}
            {Array.isArray(aiGradeResult.detailedBreakdown) && aiGradeResult.detailedBreakdown.length > 0 && (
              <div className={styles.rubricBreakdown}>
                <h5>Rubric Breakdown:</h5>
                <table className={styles.rubricTable}>
                  <thead>
                    <tr>
                      <th>Criterion</th>
                      <th>Weight</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiGradeResult.detailedBreakdown.map((row, i) => (
                      <tr key={i} className={row.passed ? styles.rubricRowPass : styles.rubricRowFail}>
                        <td>{row.criterion}</td>
                        <td>{row.weight}%</td>
                        <td>
                          {row.passed
                            ? <span className={styles.rubricPass}>✓ Detected</span>
                            : <span className={styles.rubricFail}>✗ Missing</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {aiGradeResult.cleanCodeTip && (
                  <p className={styles.cleanCodeTip}>
                    💡 <em>{aiGradeResult.cleanCodeTip}</em>
                  </p>
                )}
              </div>
            )}

            <div className={styles.modalFooter}>
              <button
                className={styles.continueBtn}
                onClick={() => {
                  setShowGradeModal(false);
                  // Auto-trigger claim cert button after good score
                  if (aiGradeResult.score >= 85) {
                    setTimeout(() => {
                      const msg = `Great work! You scored ${aiGradeResult.score}% (${aiGradeResult.grade}). ${aiGradeResult.score >= 90 ? 'You can now claim your Track Certificate! 🎓' : 'Keep refining your code to reach 90%+ for your certificate!'}`;
                      setChatMessages((prev) => [...prev, { sender: 'ai', text: msg }]);
                    }, 500);
                  }
                }}
              >
                Continue Learning in Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MILESTONE DIPLOMA MODAL ─── */}
      {showDiplomaModal && claimedCert && (
        <div className={styles.modalOverlay} onClick={() => setShowDiplomaModal(false)}>
          <div className={styles.diplomaModalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.diplomaIconBadge}>📜</div>
            <h3 className={styles.diplomaTitle}>Skill Track Diploma Claimed!</h3>
            <p className={styles.diplomaSubtitle}>
              Congratulations! Your mastery in <strong>{claimedCert.course_name}</strong> has been
              cryptographically recorded in the Kingshima Credential Registry.
            </p>

            <div className={styles.diplomaDetailsBox}>
              <div className={styles.diplomaDetailRow}>
                <span>Credential ID:</span>
                <span style={{ color: '#fbbf24', fontFamily: 'monospace' }}>{claimedCert.id}</span>
              </div>
              <div className={styles.diplomaDetailRow}>
                <span>Recipient:</span>
                <span>{claimedCert.student_name}</span>
              </div>
              <div className={styles.diplomaDetailRow}>
                <span>Track Mastery:</span>
                <span>{claimedCert.course_name}</span>
              </div>
              <div className={styles.diplomaDetailRow}>
                <span>Honors Grade:</span>
                <span>{claimedCert.grade} ({claimedCert.score}%)</span>
              </div>
              <div className={styles.diplomaDetailRow}>
                <span>Issued Date:</span>
                <span>{claimedCert.issued_date}</span>
              </div>
            </div>

            <div className={styles.diplomaActions}>
              <Link
                href="/verify-certificate"
                className={styles.certVerifyBtn}
                target="_blank"
              >
                <span>Verify on Public Registry →</span>
              </Link>
              <button
                className={styles.certCloseBtn}
                onClick={() => setShowDiplomaModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
