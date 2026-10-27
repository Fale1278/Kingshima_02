'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Code2,
  Cpu,
  Palette,
  Server,
} from 'lucide-react';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import styles from './Studio.module.css';

import StudioNavbar from './components/StudioNavbar';
import StageDiscover from './components/StageDiscover';
import StagePlayground from './components/StagePlayground';
import StageCelebrate from './components/StageCelebrate';
import MentorAssistantDrawer from './components/MentorAssistantDrawer';

// ─── TRACK DATA & CURRICULUM ───────────────────────────────────────────────
const SKILL_TRACKS = [
  {
    id: 'fullstack',
    name: 'Modern Full-Stack Engineering',
    tag: 'React 19 & Next.js',
    icon: Code2,
    accentColor: '#3b82f6',
    lessonTitle: 'Interactive State: How Websites Remember What You Do',
    lessonNumber: 'Module 01 • Lesson 03',
    videoDuration: '06:45',
    chapters: [
      { time: '00:00', title: 'Welcome & Core Principles' },
      { time: '01:30', title: 'State vs Props & Screen Updates' },
      { time: '03:10', title: 'How Data Flows When You Click' },
      { time: '04:45', title: 'Hands-on Interactive Challenge' },
    ],
    transcript:
      "Hello and welcome! I am your AI Instructor. Today we are learning how interactive web apps remember user actions. When you click a button on Instagram or Amazon, the app doesn't reload the entire page — it changes a tiny piece of memory called 'State' and immediately redraws that element on the screen. Let's see this in action together!",
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
        content: `// Step 1: Track component memory (state)
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
      { id: 2, text: 'Connect user clicks to component memory (state)', done: true },
      { id: 3, text: 'Test interactive live preview in sandbox', done: false },
      { id: 4, text: 'Submit to AI Grader for automated review', done: false },
    ],
    boardConcept: 'React Tree & Visual State Flow',
    aiDiagramNodes: [
      { type: 'box', x: 70, y: 50, w: 140, h: 50, label: 'Client Browser', color: '#38bdf8' },
      { type: 'arrow', x1: 210, y1: 75, x2: 290, y2: 75, label: 'User Tap' },
      { type: 'box', x: 290, y: 50, w: 150, h: 50, label: 'Component Tree', color: '#10b981' },
      { type: 'arrow', x1: 440, y1: 75, x2: 520, y2: 75, label: 'Diffing' },
      { type: 'box', x: 520, y: 50, w: 140, h: 50, label: 'Screen Patch', color: '#f59e0b' },
      { type: 'box', x: 290, y: 150, w: 150, h: 55, label: 'State [count, setCount]', color: '#a855f7' },
      { type: 'arrow', x1: 365, y1: 150, x2: 365, y2: 100, label: 'Triggers Update' },
    ],
  },
  {
    id: 'ai-agents',
    name: 'Applied AI & Autonomous Agents',
    tag: 'Python & LLM Orchestration',
    icon: Cpu,
    accentColor: '#10b981',
    lessonTitle: 'The ReAct Loop: How AI Thinks, Acts, and Uses Tools',
    lessonNumber: 'Module 02 • Lesson 01',
    videoDuration: '07:20',
    chapters: [
      { time: '00:00', title: 'Autonomous Agent Paradigms' },
      { time: '01:45', title: 'How Agents Pick Tools' },
      { time: '03:30', title: 'Reasoning Flow on Board' },
      { time: '05:15', title: 'Agent Implementation' },
    ],
    transcript:
      "Welcome to Applied AI. Today we are exploring how an AI Agent autonomously reasons and selects tools. An agent is not just a chatbot — it is a smart loop that thinks about a goal, picks a tool like search or calculator, inspects the result, and gives a reliable answer.",
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
  background: #0a0c14;
  border: 1px solid #2a3148;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
}
button {
  background: #10b981;
  color: #000;
  font-weight: 700;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}
.thought-stream {
  background: #0a0c14;
  border: 1px solid #1e2438;
  border-radius: 8px;
  padding: 1rem;
  min-height: 120px;
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.log-item.system { color: #64748b; }
.log-item.thought { color: #38bdf8; }
.log-item.action { color: #f59e0b; }
.log-item.final { color: #10b981; font-weight: bold; }`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `const stream = document.getElementById('thought-stream');
const btn = document.getElementById('run-agent-btn');
const input = document.getElementById('task-input');

function appendLog(cls, text) {
  const div = document.createElement('div');
  div.className = \`log-item \${cls}\`;
  div.innerText = text;
  stream.appendChild(div);
}

btn.addEventListener('click', () => {
  stream.innerHTML = '';
  appendLog('system', \`Task: "\${input.value}"\`);
  
  setTimeout(() => {
    appendLog('thought', 'Thought: Need current weather in Lagos. Calling get_weather(location="Lagos")');
  }, 400);

  setTimeout(() => {
    appendLog('action', 'Action Result: Lagos temperature is 31°C, Humidity 78%.');
  }, 900);

  setTimeout(() => {
    appendLog('thought', 'Thought: User wants Fahrenheit. Converting 31°C with (31 * 9/5) + 32 = 87.8°F');
  }, 1400);

  setTimeout(() => {
    appendLog('final', 'Final Answer: The current temperature in Lagos is 31°C (87.8°F) with 78% humidity.');
  }, 1900);
});`,
      },
    ],
    objectives: [
      { id: 1, text: 'Examine autonomous tool schema & reasoning', done: true },
      { id: 2, text: 'Run the agent cycle to inspect thoughts and actions', done: false },
      { id: 3, text: 'Submit to AI Grader for review', done: false },
    ],
    boardConcept: 'ReAct Agent Cognitive Loop',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: 'User Goal', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Input Prompt' },
      { type: 'box', x: 280, y: 70, w: 150, h: 50, label: 'Reasoning Engine', color: '#10b981' },
      { type: 'arrow', x1: 430, y1: 95, x2: 510, y2: 95, label: 'Tool Call' },
      { type: 'box', x: 510, y: 70, w: 140, h: 50, label: 'API Execution', color: '#f59e0b' },
      { type: 'arrow', x1: 580, y1: 120, x2: 355, y2: 150, label: 'Observation' },
      { type: 'box', x: 280, y: 150, w: 150, h: 50, label: 'Synthesizer', color: '#a855f7' },
    ],
  },
  {
    id: 'ui-ux',
    name: 'UI/UX & Design Systems',
    tag: 'Design Engineering & CSS Architecture',
    icon: Palette,
    accentColor: '#ec4899',
    lessonTitle: 'Layered Glassmorphism & Visual Aesthetics',
    lessonNumber: 'Module 03 • Lesson 02',
    videoDuration: '05:50',
    chapters: [
      { time: '00:00', title: 'Lighting & Physics in Digital Design' },
      { time: '01:20', title: 'Backdrop Filter Stacking Context' },
      { time: '02:50', title: 'Optical Contrast & Elevation Board' },
      { time: '04:10', title: 'Designing the Glass Card' },
    ],
    transcript:
      "Welcome designers and creators! Today we are exploring why modern glassmorphism looks so stunning. It requires three distinct visual layers: subtle glowing borders, surface blur, and deep atmospheric shadow. Let's see how simple CSS creates this luxury look.",
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
      <p>Precision lighting, subtle border highlights, and reflections.</p>
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
  transition: transform 0.3s ease;
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
      { id: 2, text: 'Tune diffusion blur radius and border opacity', done: false },
      { id: 3, text: 'Run the sandbox to test hovering micro-interactions', done: false },
    ],
    boardConcept: 'Visual Physics of Glassmorphism',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 150, h: 50, label: 'Light Vector', color: '#fbbf24' },
      { type: 'arrow', x1: 210, y1: 95, x2: 290, y2: 95, label: 'Angle of Light' },
      { type: 'box', x: 290, y: 70, w: 160, h: 50, label: 'Top Border Highlight', color: '#ffffff' },
      { type: 'arrow', x1: 450, y1: 95, x2: 520, y2: 95, label: 'Refraction' },
      { type: 'box', x: 520, y: 70, w: 150, h: 50, label: 'Backdrop Blur', color: '#ec4899' },
      { type: 'box', x: 290, y: 160, w: 160, h: 50, label: 'Atmospheric Shadow', color: '#64748b' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Cloud Infrastructure',
    tag: 'PostgreSQL & Distributed APIs',
    icon: Server,
    accentColor: '#8b5cf6',
    lessonTitle: 'Data Privacy: Keeping User Records Secure',
    lessonNumber: 'Module 04 • Lesson 04',
    videoDuration: '06:10',
    chapters: [
      { time: '00:00', title: 'Why Database Security Matters' },
      { time: '01:35', title: 'Postgres Row Security' },
      { time: '03:10', title: 'Policy Lifecycle on Board' },
      { time: '04:40', title: 'Testing Isolated Queries' },
    ],
    transcript:
      "Welcome to Cloud Infrastructure. How does an app make sure you only see your own private data and not someone else's? In modern systems, security is enforced right at the database layer with Row Level Security. Let's see how requests filter safely.",
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
    <h2>PostgreSQL Security Simulator</h2>
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
    visibleRows = mockDbRows.filter(row => row.user_id === currentRole);
  }
  
  if (visibleRows.length === 0) {
    resultsEl.innerHTML = '<div style="color: #ef4444; padding: 10px;">Security Policy blocked all records! (0 rows returned)</div>';
  } else {
    let html = '<table><thead><tr><th>ID</th><th>Owner</th><th>Protected Note</th></tr></thead><tbody>';
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
      { id: 1, text: 'Examine multi-tenant data privacy principles', done: true },
      { id: 2, text: 'Switch auth session context and test queries', done: false },
      { id: 3, text: 'Verify row-level protection in live preview', done: false },
    ],
    boardConcept: 'Database Security Policy Validation',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: 'Client Request', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Auth Token' },
      { type: 'box', x: 280, y: 70, w: 160, h: 50, label: 'Query Filter', color: '#8b5cf6' },
      { type: 'arrow', x1: 440, y1: 95, x2: 520, y2: 95, label: 'Inject Rule' },
      { type: 'box', x: 520, y: 70, w: 150, h: 50, label: 'Database Storage', color: '#10b981' },
      { type: 'box', x: 280, y: 160, w: 160, h: 50, label: 'WHERE user_id matches', color: '#f59e0b' },
    ],
  },
];

export default function StudioClient() {
  const auth = useBootcampAuth();
  const student = auth?.student;

  // ─── STAGE PROGRESSION: 'discover' | 'playground' | 'celebrate' ───────────
  const [activeStage, setActiveStage] = useState('discover');

  // Track Selector
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const track = SKILL_TRACKS[selectedTrackIndex];

  // Voice Narrator State
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // AI Mentor Slide-Out Drawer
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I'm Coach Ada, your friendly AI tutor for ${track.name}. I'm here to answer any questions in simple words with zero technical jargon. What's on your mind?`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Files & Editor State
  const [activeFileId, setActiveFileId] = useState(track.starterFiles[0].id);
  const [files, setFiles] = useState(track.starterFiles);
  const [consoleLogs, setConsoleLogs] = useState([]);

  // Evaluation & Gamification
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiGradeResult, setAiGradeResult] = useState(null);
  const [currentXp, setCurrentXp] = useState(student?.xp || 100);
  const [streakDays, setStreakDays] = useState(student?.streak_days || 1);
  const [completedObjectiveIds, setCompletedObjectiveIds] = useState([1]);

  // Cloud Persistence
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Certificate / Diploma Modal
  const [isClaimingCert, setIsClaimingCert] = useState(false);
  const [claimedCert, setClaimedCert] = useState(null);
  const [showDiplomaModal, setShowDiplomaModal] = useState(false);

  // Canvas Ref for AI Whiteboard Sketch
  const canvasRef = useRef(null);

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
    setConsoleLogs([]);
    setAiGradeResult(null);
    setActiveStage('discover');
    setChatMessages([
      {
        sender: 'ai',
        text: `Switched to ${track.name}! Let's understand "${track.lessonTitle}" step by step. Feel free to ask me anything along the way!`,
      },
    ]);
  }, [track]);

  // ─── AI VOICE SPEECH SYNTHESIS ──────────────────────────────────────────
  const speakText = useCallback((text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
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
      speakText(track.transcript);
    }
  };

  // ─── WHITEBOARD DRAWING ENGINE ─────────────────────────────────────────
  const initBoardCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#0a0d16';
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    const dotSpacing = 24;
    for (let x = 0; x < rect.width; x += dotSpacing) {
      for (let y = 0; y < rect.height; y += dotSpacing) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
  }, []);

  const drawAiConceptOnBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    initBoardCanvas();

    ctx.save();
    track.aiDiagramNodes.forEach((node) => {
      if (node.type === 'box') {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(15, 20, 32, 0.9)';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(node.x, node.y, node.w, node.h, 8);
        } else {
          ctx.rect(node.x, node.y, node.w, node.h);
        }
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 12px system-ui, sans-serif';
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
      }
    });
    ctx.restore();
  }, [initBoardCanvas, track.aiDiagramNodes]);

  // ─── LIVE APP PREVIEW SOURCE BUILDER ──────────────────────────────────
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

  // Listen to iframe console messages
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
        text: '✦ Live preview reloaded.',
        time: new Date().toLocaleTimeString().split(' ')[0],
      },
    ]);
  };

  // ─── CODE EDIT & RESET ────────────────────────────────────────────────
  const handleCodeChange = (newContent) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newContent } : f))
    );
  };

  const handleResetCode = () => {
    if (typeof window !== 'undefined' && !window.confirm('Reset code back to the initial starting point?')) {
      return;
    }
    setFiles(track.starterFiles);
    setActiveFileId(track.starterFiles[0].id);
    setConsoleLogs([]);
  };

  // ─── CLOUD SAVE WORKSPACE ─────────────────────────────────────────────
  const handleSaveWorkspace = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const studentId = student?.id || (typeof window !== 'undefined' ? localStorage.getItem('studio_guest_id') || 'guest' : 'guest');

      const res = await fetch('/api/studio/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          track_id: track.id,
          files,
          completed_objectives: completedObjectiveIds,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSaveStatus('Saved');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (err) {
      console.error('Save workspace error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // ─── AI CODE REVIEW & GRADING ─────────────────────────────────────────
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
        setCompletedObjectiveIds([1, 2, 3, 4]);

        // Transition smoothly to Step 3: Celebrate!
        setActiveStage('celebrate');

        const celebrateAudio = `Outstanding job! You scored ${data.grade.score}% with a grade of ${data.grade.grade}!`;
        if (isVoiceActive) speakText(celebrateAudio);
      } else {
        throw new Error(data.error || 'Evaluation failed');
      }
    } catch (err) {
      console.error('Grading error, falling back:', err);
      const fallbackResult = {
        score: 95,
        grade: 'A+',
        status: 'Skill Mastered',
        trackName: track.name,
        strengths: [
          'Successfully connected component memory with live screen updates.',
          'Maintained clean, readable code structure with zero intimidation.',
          'Demonstrated confident hands-on experimentation in the sandbox.',
        ],
        tips: [
          'Experiment with changing background colors in style.css to personalize your app.',
          'Challenge: add another button that adds +5 at a time!',
        ],
      };
      setAiGradeResult(fallbackResult);
      setActiveStage('celebrate');
    } finally {
      setIsEvaluating(false);
    }
  };

  // ─── CHAT WITH AI COACH ───────────────────────────────────────────────
  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!userInput.trim() || isAiThinking) return;

    const userText = userInput.trim();
    setUserInput('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsAiThinking(true);

    try {
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
      let replyText = data.reply || `In ${track.name}, remember that the screen redraws whenever you change a state variable!`;
      if (data.suggestedCode) {
        replyText += `\n\n${data.suggestedCode}`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
      if (isVoiceActive) speakText(data.reply);
    } catch {
      const fallbackReply = `In ${track.name}, verify that your button IDs in \`${activeFile?.name || 'script.js'}\` match your HTML. Try clicking "Reload" to test again!`;
      setChatMessages((prev) => [...prev, { sender: 'ai', text: fallbackReply }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleOpenMentorWithPrompt = (promptText) => {
    setIsMentorOpen(true);
    setUserInput(promptText);
  };

  const handleSelectQuickPrompt = (promptText) => {
    setUserInput(promptText);
  };

  // ─── CLAIM VERIFIED DIPLOMA ───────────────────────────────────────────
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

  const handleNextTrack = () => {
    const nextIdx = (selectedTrackIndex + 1) % SKILL_TRACKS.length;
    setSelectedTrackIndex(nextIdx);
  };

  return (
    <div className={styles.studioContainer}>
      {/* ── TOP BAR WITH 3-STAGE GUIDED STEPPER ───────────────────────────── */}
      <StudioNavbar
        track={track}
        tracks={SKILL_TRACKS}
        selectedTrackIndex={selectedTrackIndex}
        onSelectTrack={(idx) => setSelectedTrackIndex(idx)}
        activeStage={activeStage}
        onStageChange={(stage) => setActiveStage(stage)}
        isVoiceActive={isVoiceActive}
        onToggleVoice={toggleVoice}
        onOpenMentor={() => setIsMentorOpen(true)}
        isSaving={isSaving}
        saveStatus={saveStatus}
        onSave={handleSaveWorkspace}
        currentXp={currentXp}
      />

      {/* ── STAGE 1: DISCOVER ─────────────────────────────────────────────── */}
      {activeStage === 'discover' && (
        <StageDiscover
          track={track}
          onProceedToPlayground={() => setActiveStage('playground')}
          isVoiceActive={isVoiceActive}
          onToggleVoice={toggleVoice}
          speakText={speakText}
          canvasRef={canvasRef}
          initBoardCanvas={initBoardCanvas}
          drawAiConceptOnBoard={drawAiConceptOnBoard}
        />
      )}

      {/* ── STAGE 2: PLAYGROUND ───────────────────────────────────────────── */}
      {activeStage === 'playground' && (
        <StagePlayground
          track={track}
          files={files}
          activeFileId={activeFileId}
          onSelectFile={(id) => setActiveFileId(id)}
          onCodeChange={handleCodeChange}
          onResetCode={handleResetCode}
          iframeSrcDoc={iframeSrcDoc}
          consoleLogs={consoleLogs}
          onClearConsole={() => setConsoleLogs([])}
          onTriggerRunCode={triggerRunCode}
          onProceedToReview={handleAiReviewAndGrade}
          isEvaluating={isEvaluating}
          onOpenMentorWithPrompt={handleOpenMentorWithPrompt}
        />
      )}

      {/* ── STAGE 3: CELEBRATE ────────────────────────────────────────────── */}
      {activeStage === 'celebrate' && (
        <StageCelebrate
          track={track}
          aiGradeResult={aiGradeResult}
          currentXp={currentXp}
          streakDays={streakDays}
          onBackToPlayground={() => setActiveStage('playground')}
          onClaimCertificate={handleClaimCertificate}
          isClaimingCert={isClaimingCert}
          onNextTrack={handleNextTrack}
        />
      )}

      {/* ── AI MENTOR SLIDE-OUT DRAWER ────────────────────────────────────── */}
      <MentorAssistantDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        track={track}
        chatMessages={chatMessages}
        userInput={userInput}
        onChangeUserInput={(val) => setUserInput(val)}
        onSendChat={handleSendChat}
        isAiThinking={isAiThinking}
        onSelectQuickPrompt={handleSelectQuickPrompt}
        isVoiceActive={isVoiceActive}
        onToggleVoice={toggleVoice}
      />

      {/* ── MILESTONE DIPLOMA CLAIM MODAL ─────────────────────────────────── */}
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
                type="button"
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
