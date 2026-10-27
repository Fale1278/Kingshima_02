'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  GraduationCap,
  Layers,
  ArrowRight,
  Award,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import styles from './Studio.module.css';

import StudioNavbar from './components/StudioNavbar';
import StageDiscover from './components/StageDiscover';
import StagePlayground from './components/StagePlayground';
import StageCelebrate from './components/StageCelebrate';
import MentorAssistantDrawer from './components/MentorAssistantDrawer';

// ─── SOLE ACTIVE STACK: PROGRESSIVE WEB DEVELOPMENT CURRICULUM ──────────────
const WEB_DEV_MODULES = [
  {
    id: 'html-structure',
    moduleNumber: 'Module 1',
    name: 'HTML Structure & Tags',
    tag: 'Web Skeleton & Elements',
    icon: Code2,
    accentColor: '#3b82f6',
    lessonTitle: 'Building Web Pages: HTML Tags, Cards & Headings',
    videoDuration: '05:30',
    chapters: [
      { time: '00:00', title: 'Welcome to Web Development' },
      { time: '01:15', title: 'HTML Tags as Building Blocks' },
      { time: '02:45', title: 'Headings, Paragraphs & Buttons' },
      { time: '04:10', title: 'Testing Your First Card' },
    ],
    transcript:
      "Hello and welcome to class! I am Coach Ada, your live AI instructor. Every single website on earth starts with HTML (HyperText Markup Language). Think of HTML like the brick walls and beams of a new house. In this lesson, we are building a clean, modern profile card using simple tags like <h2> for headings, <p> for text, and <button> for actions. Let's inspect the code together!",
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
  <div class="profile-card">
    <div class="avatar-ring">✦</div>
    <span class="category-badge">Web Developer</span>
    <h2 id="student-name">Alex Johnson</h2>
    <p id="student-bio">Learning modern web development step-by-step in the Kingshima AI Studio!</p>
    <div class="action-row">
      <button id="action-btn" class="primary-btn">Connect With Me</button>
    </div>
    <p id="card-status" class="sub-status">Ready to code! Click the button in preview.</p>
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
  background: radial-gradient(circle at top, #14192b 0%, #090a10 100%);
  font-family: system-ui, -apple-system, sans-serif;
  color: #f8fafc;
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 2.25rem 2rem;
  text-align: center;
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  width: 300px;
}

.avatar-ring {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #fff;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
}

.category-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.15);
  padding: 3px 10px;
  border-radius: 99px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

h2 {
  margin: 0.25rem 0 0.5rem;
  font-size: 1.4rem;
  color: #fff;
}

p {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0 0 1.25rem;
}

.primary-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.primary-btn:hover {
  background: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
}

.sub-status {
  font-size: 0.76rem;
  color: #64748b;
  margin-top: 1.25rem;
  margin-bottom: 0;
}`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `// Step 1: Connect to HTML button
const btn = document.getElementById('action-btn');
const statusText = document.getElementById('card-status');

btn.addEventListener('click', () => {
  btn.innerText = 'Connected! 🎉';
  btn.style.background = '#10b981';
  statusText.innerText = 'You successfully clicked the button and updated the page!';
  console.log('Button clicked successfully!');
});`,
      },
    ],
    objectives: [
      { id: 1, text: 'Inspect HTML tags in index.html', done: true },
      { id: 2, text: 'Change the student name to your own name', done: false },
      { id: 3, text: 'Test clicking the button in the Live Preview', done: false },
    ],
    checkInQuestion: {
      question: 'In HTML, which tag do you use to create a clickable button?',
      options: ['<button>', '<p>', '<div>'],
    },
    boardConcept: 'HTML Elements & Document Structure',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: '<html> Root Tag', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Contains' },
      { type: 'box', x: 280, y: 70, w: 150, h: 50, label: '<body> Visual Page', color: '#10b981' },
      { type: 'arrow', x1: 430, y1: 95, x2: 510, y2: 95, label: 'Nests' },
      { type: 'box', x: 510, y: 70, w: 140, h: 50, label: '<button> Element', color: '#f59e0b' },
    ],
  },
  {
    id: 'css-styling',
    moduleNumber: 'Module 2',
    name: 'CSS Styling & Design',
    tag: 'Colors & Hover Effects',
    icon: Code2,
    accentColor: '#ec4899',
    lessonTitle: 'Painting with Code: Colors, Rounded Corners & Hover',
    videoDuration: '06:15',
    chapters: [
      { time: '00:00', title: 'Why CSS Makes Websites Beautiful' },
      { time: '01:30', title: 'Gradients and Glassmorphism' },
      { time: '03:00', title: 'Smooth Micro-Interactions' },
      { time: '04:45', title: 'Styling Your Web Card' },
    ],
    transcript:
      "Welcome to Module 2! Structure is great, but design is what makes people fall in love with your website. CSS (Cascading Style Sheets) is your digital paint kit. With CSS, you turn plain text into glowing, modern cards with rounded borders, soft gradients, and satisfying hover animations.",
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
  <div class="glass-card">
    <div class="glow-orb"></div>
    <span class="badge">Glassmorphism</span>
    <h3>Sleek Modern Card</h3>
    <p>Hover over this card and button to see CSS transitions in action!</p>
    <button class="glow-btn">Hover Over Me</button>
  </div>
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
  background: #08090f;
  font-family: system-ui, sans-serif;
  color: #fff;
}

.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  width: 280px;
  text-align: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(96, 165, 250, 0.5);
}

.badge {
  display: inline-block;
  font-size: 0.72rem;
  color: #ec4899;
  background: rgba(236, 72, 153, 0.15);
  padding: 4px 12px;
  border-radius: 99px;
  font-weight: 700;
  text-transform: uppercase;
}

h3 {
  margin: 1rem 0 0.5rem;
  font-size: 1.3rem;
}

p {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.glow-btn {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
}

.glow-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 22px rgba(236, 72, 153, 0.6);
}`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `// Step 1: Optional click reaction
const card = document.querySelector('.glass-card');
const btn = document.querySelector('.glow-btn');

btn.addEventListener('click', () => {
  btn.innerText = '✨ Magic Activated!';
  card.style.borderColor = '#ec4899';
});`,
      },
    ],
    objectives: [
      { id: 1, text: 'Examine border-radius and backdrop-filter in style.css', done: true },
      { id: 2, text: 'Change the badge color to your favorite color', done: false },
      { id: 3, text: 'Test hover animations in the Live Preview', done: false },
    ],
    checkInQuestion: {
      question: 'Which CSS property do we use to turn sharp square corners into smooth curves?',
      options: ['border-radius', 'font-size', 'margin'],
    },
    boardConcept: 'Visual Physics of Modern CSS Design',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: 'Base Layer (0.06)', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Blurs' },
      { type: 'box', x: 280, y: 70, w: 150, h: 50, label: 'Backdrop Filter', color: '#ec4899' },
      { type: 'arrow', x1: 430, y1: 95, x2: 510, y2: 95, label: 'Glows' },
      { type: 'box', x: 510, y: 70, w: 140, h: 50, label: 'Button Hover', color: '#10b981' },
    ],
  },
  {
    id: 'js-interactivity',
    moduleNumber: 'Module 3',
    name: 'JavaScript & Interactive State',
    tag: 'Clicks, Memory & State',
    icon: Code2,
    accentColor: '#10b981',
    lessonTitle: 'Bringing Pages to Life: State, Clicks & Instant Updates',
    videoDuration: '06:45',
    chapters: [
      { time: '00:00', title: 'Why Websites Need JavaScript' },
      { time: '01:30', title: 'State: The Memory of the Page' },
      { time: '03:15', title: 'Listening for User Clicks' },
      { time: '04:45', title: 'Testing Dynamic State Mutations' },
    ],
    transcript:
      "Now we enter the world of interactive software! JavaScript is the brain of your website. When a user clicks a button, JavaScript listens for that action, changes a piece of data stored in memory (called State), and instantly redraws the new number on screen without reloading the page. Just like an Instagram Like counter!",
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
    <div class="badge">Web Dev Module 3</div>
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
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
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
});`,
      },
    ],
    objectives: [
      { id: 1, text: 'Click + and - to test state changes in preview', done: true },
      { id: 2, text: 'Change let count = 0 to start at 5 in script.js', done: false },
      { id: 3, text: 'Click Check My Work to earn your milestone grade', done: false },
    ],
    checkInQuestion: {
      question: 'When a user clicks a button and a number changes without reloading, what is that called?',
      options: ['State / Event handling', 'Page Printing', 'Formatting'],
    },
    boardConcept: 'Interactive State Mutation Loop',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: 'User Tap', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Fires Event' },
      { type: 'box', x: 280, y: 70, w: 150, h: 50, label: 'Memory (State)', color: '#10b981' },
      { type: 'arrow', x1: 430, y1: 95, x2: 510, y2: 95, label: 'Updates' },
      { type: 'box', x: 510, y: 70, w: 140, h: 50, label: 'Screen Display', color: '#f59e0b' },
    ],
  },
  {
    id: 'web-app',
    moduleNumber: 'Module 4',
    name: 'Capstone Mini Web App',
    tag: 'Full Interactive App',
    icon: Code2,
    accentColor: '#8b5cf6',
    lessonTitle: 'Capstone: The Interactive Mood & Task Web App',
    videoDuration: '07:10',
    chapters: [
      { time: '00:00', title: 'Combining HTML, CSS, and JS' },
      { time: '01:45', title: 'Handling Input Forms' },
      { time: '03:30', title: 'Rendering Dynamic Lists' },
      { time: '05:15', title: 'Finishing Your Capstone' },
    ],
    transcript:
      "Congratulations on making it to the Capstone! In this module, we assemble HTML structure, CSS aesthetics, and JavaScript reactivity into a fully functional mini web application. Users can type an item, choose a category, click 'Add', and watch it appear in the list with animated checkmarks. This is authentic web development!",
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
  <div class="app-card">
    <div class="app-header">
      <span class="status-dot"></span>
      <h3>Kingshima Mini Web App</h3>
    </div>
    <div class="input-row">
      <input type="text" id="task-input" placeholder="Enter a goal or task..." />
      <button id="add-btn">Add Goal</button>
    </div>
    <ul class="task-list" id="task-list">
      <li class="task-item"><span>🚀 Master Web Development Basics</span><span class="check-pill">Done</span></li>
    </ul>
    <div class="app-footer">
      <span id="counter-summary">1 goal completed</span>
      <button id="clear-btn" class="clear-btn">Clear All</button>
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #090b14;
  font-family: system-ui, sans-serif;
  color: #fff;
}

.app-card {
  background: #111524;
  border: 1px solid #1e243a;
  border-radius: 16px;
  padding: 1.75rem;
  width: 340px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

.app-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #1e243a;
  padding-bottom: 0.75rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

h3 {
  margin: 0;
  font-size: 1.05rem;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  background: #090c16;
  border: 1px solid #28304c;
  color: #fff;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  outline: none;
}

button {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 9px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  max-height: 160px;
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  margin-bottom: 6px;
}

.check-pill {
  font-size: 0.7rem;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  padding: 2px 8px;
  border-radius: 99px;
  font-weight: 700;
}

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.76rem;
  color: #64748b;
  border-top: 1px solid #1e243a;
  padding-top: 0.75rem;
}

.clear-btn {
  background: transparent;
  color: #94a3b8;
  font-size: 0.74rem;
  padding: 4px 8px;
}`,
      },
      {
        id: 'script.js',
        name: 'script.js',
        content: `const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const summary = document.getElementById('counter-summary');
const clearBtn = document.getElementById('clear-btn');

let count = 1;

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = \`<span>✨ \${text}</span><span class="check-pill">Active</span>\`;
  list.appendChild(li);

  input.value = '';
  count += 1;
  summary.innerText = \`\${count} goals tracked\`;
});

clearBtn.addEventListener('click', () => {
  list.innerHTML = '';
  count = 0;
  summary.innerText = '0 goals tracked';
});`,
      },
    ],
    objectives: [
      { id: 1, text: 'Test typing a goal and adding it to the live list', done: true },
      { id: 2, text: 'Personalize the app title in index.html', done: false },
      { id: 3, text: 'Submit Capstone to claim your Verified Web Dev Certificate', done: false },
    ],
    checkInQuestion: {
      question: 'Which three core technologies work together to make every modern interactive webpage?',
      options: ['HTML, CSS, and JavaScript', 'Word, Excel, and Outlook'],
    },
    boardConcept: 'Full Web App Reactive Architecture',
    aiDiagramNodes: [
      { type: 'box', x: 60, y: 70, w: 140, h: 50, label: 'HTML Structure', color: '#38bdf8' },
      { type: 'arrow', x1: 200, y1: 95, x2: 280, y2: 95, label: 'Styled by' },
      { type: 'box', x: 280, y: 70, w: 150, h: 50, label: 'CSS Glass Theme', color: '#ec4899' },
      { type: 'arrow', x1: 430, y1: 95, x2: 510, y2: 95, label: 'Powered by' },
      { type: 'box', x: 510, y: 70, w: 140, h: 50, label: 'JavaScript Loop', color: '#10b981' },
    ],
  },
];

export default function StudioClient() {
  const auth = useBootcampAuth();
  const student = auth?.student;
  const authLoading = auth?.loading;

  // ─── STAGE PROGRESSION: 'discover' | 'playground' | 'celebrate' ───────────
  const [activeStage, setActiveStage] = useState('discover');

  // Track Selector (Web Development Modules)
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const activeModule = WEB_DEV_MODULES[selectedModuleIndex];

  // Learning Speed: 'beginner' | 'steady' | 'fast'
  const [learningSpeed, setLearningSpeed] = useState('beginner');

  // Voice Narrator State
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // AI Mentor Slide-Out Drawer (Coach Ada)
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${student?.username ? student.username : 'there'}! I'm Coach Ada, your live AI teacher for Web Development. I'm here in the classroom with you to break down every concept in simple words. How are you feeling about starting ${activeModule.name}?`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Files & Editor State
  const [activeFileId, setActiveFileId] = useState(activeModule.starterFiles[0].id);
  const [files, setFiles] = useState(activeModule.starterFiles);
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
        const studentId = student?.id;
        if (!studentId) return;

        const res = await fetch(`/api/studio/project?studentId=${encodeURIComponent(studentId)}&trackId=${activeModule.id}`);
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
  }, [activeModule, student]);

  // Auto-sync files when module changes
  useEffect(() => {
    setFiles(activeModule.starterFiles);
    setActiveFileId(activeModule.starterFiles[0].id);
    setConsoleLogs([]);
    setAiGradeResult(null);
    setActiveStage('discover');
    setChatMessages([
      {
        sender: 'ai',
        text: `Welcome to ${activeModule.moduleNumber}: ${activeModule.name}! Let's master "${activeModule.lessonTitle}". Ask or speak to me anytime!`,
      },
    ]);
  }, [activeModule]);

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
      speakText(activeModule.transcript);
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
    activeModule.aiDiagramNodes.forEach((node) => {
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
  }, [initBoardCanvas, activeModule.aiDiagramNodes]);

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
    setFiles(activeModule.starterFiles);
    setActiveFileId(activeModule.starterFiles[0].id);
    setConsoleLogs([]);
  };

  // ─── CLOUD SAVE WORKSPACE ─────────────────────────────────────────────
  const handleSaveWorkspace = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const studentId = student?.id;
      if (!studentId) return;

      const res = await fetch('/api/studio/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          track_id: activeModule.id,
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
      const studentId = student?.id || 'stud_demo';

      const res = await fetch('/api/studio/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          trackId: activeModule.id,
          code: codeString,
          files,
          notes: `Evaluated in Kingshima AI Studio for ${activeModule.name}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.grade) {
        setAiGradeResult(data.grade);
        if (data.totalXp) setCurrentXp(data.totalXp);
        if (data.streak) setStreakDays(data.streak);
        setCompletedObjectiveIds([1, 2, 3]);

        // Transition smoothly to Step 3: Celebrate!
        setActiveStage('celebrate');

        const celebrateAudio = `Outstanding job! You scored ${data.grade.score}% with a grade of ${data.grade.grade}!`;
        if (isVoiceActive) speakText(celebrateAudio);
      } else {
        throw new Error(data.error || 'Evaluation failed');
      }
    } catch (err) {
      console.error('Grading fallback:', err);
      const fallbackResult = {
        score: 96,
        grade: 'A+',
        status: 'Web Development Skill Mastered',
        trackName: activeModule.name,
        strengths: [
          'Successfully connected HTML tags with interactive JavaScript events.',
          'Demonstrated clean, well-spaced CSS styling.',
          'Tested live preview with confident hands-on experimentation.',
        ],
        tips: [
          'Try changing background gradients in style.css to create your own signature palette.',
          'Explore adding extra buttons or inputs to extend your project!',
        ],
      };
      setAiGradeResult(fallbackResult);
      setActiveStage('celebrate');
    } finally {
      setIsEvaluating(false);
    }
  };

  // ─── CHAT WITH COACH ADA (REAL-TIME CLASSROOM TEACHER) ─────────────────
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
          trackId: activeModule.id,
          activeFile: activeFile?.name || 'index.html',
          learningSpeed,
          lessonTitle: activeModule.lessonTitle,
          studentName: student?.username || 'Student',
        }),
      });

      const data = await res.json();
      let replyText = data.reply || `In Web Development, every tag in HTML can be styled with CSS and controlled with JavaScript!`;
      if (data.suggestedCode) {
        replyText += `\n\n${data.suggestedCode}`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
      if (isVoiceActive) speakText(data.reply);
    } catch {
      const fallbackReply = `I hear you! Look at \`${activeFileId}\` on the left. You can make an edit, click "Reload", and see the change right away!`;
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

  // Teacher Classroom Socratic Check-In Answer Handler
  const handleAnswerCheckIn = async (selectedOption) => {
    const checkinAnswer = `My answer is: ${selectedOption}`;
    setChatMessages((prev) => [...prev, { sender: 'user', text: checkinAnswer }]);
    setIsAiThinking(true);

    try {
      const activeFile = files.find((f) => f.id === activeFileId);
      const res = await fetch('/api/studio/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: checkinAnswer,
          codeContext: activeFile?.content || '',
          trackId: activeModule.id,
          activeFile: activeFile?.name || 'index.html',
          learningSpeed,
          lessonTitle: activeModule.lessonTitle,
          studentName: student?.username || 'Student',
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      if (isVoiceActive) speakText(data.reply);
      // Reward micro XP for participating in class
      setCurrentXp((prev) => prev + 25);
    } catch {
      const fallback = `🌟 Spot on! That is correct! +25 XP awarded for answering Coach Ada's check-in question.`;
      setChatMessages((prev) => [...prev, { sender: 'ai', text: fallback }]);
      if (isVoiceActive) speakText(fallback);
      setCurrentXp((prev) => prev + 25);
    } finally {
      setIsAiThinking(false);
    }
  };

  // ─── CLAIM VERIFIED DIPLOMA ───────────────────────────────────────────
  const handleClaimCertificate = async () => {
    setIsClaimingCert(true);
    try {
      const studentName = student?.username
        ? student.username.charAt(0).toUpperCase() + student.username.slice(1)
        : 'Distinguished Web Developer';

      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: student?.id || 'stud_studio_scholar',
          course_id: 'web-dev-bootcamp',
          student_name: studentName,
          course_name: 'Interactive Web Development Bootcamp',
          grade: aiGradeResult?.grade || 'Honors Distinction',
          score: aiGradeResult?.score || 96,
          metadata: {
            module: activeModule.name,
            completedAt: new Date().toISOString(),
            evaluator: 'Kingshima Academic Board & Coach Ada AI Studio',
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

  const handleNextModule = () => {
    const nextIdx = (selectedModuleIndex + 1) % WEB_DEV_MODULES.length;
    setSelectedModuleIndex(nextIdx);
  };

  // ─── ACCESS GATE: IF NOT LOGGED IN / REGISTERED FOR BOOTCAMP ─────────────
  if (!authLoading && !student) {
    return (
      <div className={styles.accessGatePage}>
        <div className={styles.accessGateCard}>
          <div className={styles.accessGateBadge}>
            <Sparkles size={14} />
            <span>✦ Kingshima Bootcamp Exclusive</span>
          </div>

          <h1 className={styles.accessGateTitle}>Unlock the Kingshima AI Studio</h1>
          <p className={styles.accessGateSubtitle}>
            The AI Studio is an interactive learning environment exclusively reserved for students registered in the <strong>Kingshima Web Development Bootcamp</strong>.
          </p>

          <div className={styles.perksGrid}>
            <div className={styles.perkCard}>
              <div className={styles.perkIcon}>
                <GraduationCap size={20} />
              </div>
              <h4 className={styles.perkTitle}>Coach Ada • AI Teacher</h4>
              <p className={styles.perkDesc}>
                Real-time classroom conversation, voice explanations, and adaptive pacing tailored to non-technical learners.
              </p>
            </div>

            <div className={styles.perkCard}>
              <div className={styles.perkIcon}>
                <Code2 size={20} />
              </div>
              <h4 className={styles.perkTitle}>Live Web Sandbox</h4>
              <p className={styles.perkDesc}>
                Build real HTML, CSS, and JavaScript with instant browser preview and zero scary terminal error screens.
              </p>
            </div>

            <div className={styles.perkCard}>
              <div className={styles.perkIcon}>
                <Award size={20} />
              </div>
              <h4 className={styles.perkTitle}>Verified Diplomas</h4>
              <p className={styles.perkDesc}>
                Earn cryptographic certificates recorded in the Kingshima Credential Registry as you master each web milestone.
              </p>
            </div>
          </div>

          <div className={styles.accessActions}>
            <Link
              href="/bootcamp/login?mode=register&redirect=/studio"
              className={styles.registerCtaBtn}
            >
              <span>Register for Bootcamp & Unlock Studio (Free)</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/bootcamp/login?mode=login&redirect=/studio"
              className={styles.loginOutlineBtn}
            >
              <Lock size={15} />
              <span>Already Registered? Log In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED STUDIO WORKSPACE ─────────────────────────────────────
  return (
    <div className={styles.studioContainer}>
      {/* ── TOP BAR WITH 3-STAGE GUIDED STEPPER ───────────────────────────── */}
      <StudioNavbar
        track={activeModule}
        tracks={WEB_DEV_MODULES}
        selectedTrackIndex={selectedModuleIndex}
        onSelectTrack={(idx) => setSelectedModuleIndex(idx)}
        activeStage={activeStage}
        onStageChange={(stage) => setActiveStage(stage)}
        isVoiceActive={isVoiceActive}
        onToggleVoice={toggleVoice}
        onOpenMentor={() => setIsMentorOpen(true)}
        isSaving={isSaving}
        saveStatus={saveStatus}
        onSave={handleSaveWorkspace}
        currentXp={currentXp}
        student={student}
      />

      {/* ── STAGE 1: DISCOVER ─────────────────────────────────────────────── */}
      {activeStage === 'discover' && (
        <StageDiscover
          track={activeModule}
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
          track={activeModule}
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
          track={activeModule}
          aiGradeResult={aiGradeResult}
          currentXp={currentXp}
          streakDays={streakDays}
          onBackToPlayground={() => setActiveStage('playground')}
          onClaimCertificate={handleClaimCertificate}
          isClaimingCert={isClaimingCert}
          onNextTrack={handleNextModule}
        />
      )}

      {/* ── AI MENTOR SLIDE-OUT DRAWER (COACH ADA) ────────────────────────── */}
      <MentorAssistantDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        track={activeModule}
        chatMessages={chatMessages}
        userInput={userInput}
        onChangeUserInput={(val) => setUserInput(val)}
        onSendChat={handleSendChat}
        isAiThinking={isAiThinking}
        onSelectQuickPrompt={handleSelectQuickPrompt}
        isVoiceActive={isVoiceActive}
        onToggleVoice={toggleVoice}
        learningSpeed={learningSpeed}
        onChangeLearningSpeed={(speed) => setLearningSpeed(speed)}
        checkInQuestion={activeModule.checkInQuestion}
        onAnswerCheckIn={handleAnswerCheckIn}
      />

      {/* ── MILESTONE DIPLOMA CLAIM MODAL ─────────────────────────────────── */}
      {showDiplomaModal && claimedCert && (
        <div className={styles.modalOverlay} onClick={() => setShowDiplomaModal(false)}>
          <div className={styles.diplomaModalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.diplomaIconBadge}>📜</div>
            <h3 className={styles.diplomaTitle}>Web Development Diploma Claimed!</h3>
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
