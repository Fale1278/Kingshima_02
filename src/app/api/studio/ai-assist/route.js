import { NextResponse } from 'next/server';

// ── Kingshima AI Studio Instructor Engine ──────────────────────────────────────
// Provides intelligent, context-aware tutoring using Google Gemini AI when
// GEMINI_API_KEY is set, or falls back to a sophisticated built-in engine.

const TRACK_NAMES = {
  fullstack: 'Modern Full-Stack Engineering (React 19 & Next.js)',
  'ai-agents': 'Applied AI & Autonomous Agents (Python & LLM Orchestration)',
  'data-eng': 'Data Engineering & Analytics (Python & SQL)',
  'cloud-arch': 'Backend & Cloud Infrastructure (PostgreSQL & Distributed APIs)',
  backend: 'Backend & Cloud Infrastructure (PostgreSQL & Distributed APIs)',
};

// ── Gemini AI Integration ──────────────────────────────────────────────────────
async function callGeminiApi(systemPrompt, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\n---\n\n${userMessage}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
        stopSequences: [],
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || null;
  } catch {
    return null;
  }
}

// ── Built-in Intelligent Fallback Engine ──────────────────────────────────────
function analyzeCode(codeContext) {
  if (!codeContext || codeContext.trim().length < 10) {
    return { isEmpty: true, issues: [], patterns: [] };
  }

  const code = codeContext.trim();
  const issues = [];
  const patterns = [];
  const suggestions = [];

  // Detect common patterns
  if (/document\.getElementById/.test(code)) patterns.push('DOM manipulation');
  if (/addEventListener/.test(code)) patterns.push('event-driven programming');
  if (/fetch\s*\(|async|await/.test(code)) patterns.push('async/await with Fetch API');
  if (/useState|useEffect|useCallback/.test(code)) patterns.push('React Hooks');
  if (/class\s+\w+/.test(code)) patterns.push('OOP class structure');
  if (/import\s+.+from/.test(code)) patterns.push('ES Module imports');
  if (/\.map\(|\.filter\(|\.reduce\(/.test(code)) patterns.push('functional array methods');
  if (/try\s*{|catch\s*\(/.test(code)) patterns.push('error handling (try/catch)');
  if (/console\.log/.test(code)) patterns.push('debug logging');
  if (/#|\/\/|\/\*/.test(code)) patterns.push('code comments');

  // Detect common issues
  if (/var\s+/.test(code)) issues.push('`var` declarations detected — prefer `const` or `let` for block scoping');
  if (/==(?!=)/.test(code)) issues.push('loose equality (`==`) detected — use strict equality (`===`) to avoid type coercion bugs');
  if (/innerHTML\s*=/.test(code)) issues.push('`innerHTML` assignment can expose XSS vectors — consider `textContent` or DOM API methods');
  if (!/try|catch/.test(code) && /fetch\s*\(/.test(code)) {
    issues.push('`fetch` calls without try/catch — add error handling to prevent unhandled promise rejections');
  }
  if (/function\s+\w+\s*\([^)]{60,}/.test(code)) {
    issues.push('function with many parameters detected — consider destructuring or passing an options object');
  }

  // Generate specific suggestions
  if (patterns.includes('DOM manipulation') && !patterns.includes('error handling (try/catch)')) {
    suggestions.push('Wrap DOM queries in defensive checks: `const el = document.getElementById("id"); if (!el) return;`');
  }
  if (patterns.includes('React Hooks') && !/useCallback|useMemo/.test(code)) {
    suggestions.push('Consider `useCallback` for event handlers passed as props to avoid unnecessary re-renders.');
  }

  return { isEmpty: false, issues, patterns, suggestions };
}

function buildIntelligentResponse(prompt, codeContext, trackId, activeFile, terminalLogs) {
  const lower = prompt.toLowerCase();
  const trackName = TRACK_NAMES[trackId] || 'Full-Stack Engineering';
  const codeAnalysis = analyzeCode(codeContext);
  const fileName = activeFile || 'script.js';

  // ── Intent Detection ──────────────────────────────────────────────────────
  const isErrorDebug = /error|bug|crash|fix|broken|why|wrong|fail|not working|undefined|null/i.test(prompt);
  const isConceptual = /what is|explain|how does|how do|tell me|describe|understand|concept/i.test(prompt);
  const isCodeReview = /review|check|improve|optimize|refactor|better|cleaner|feedback/i.test(prompt);
  const isHowTo = /how to|how can i|can i|should i|best way|good practice/i.test(prompt);
  const isExercise = /challenge|exercise|practice|task|build|create|make/i.test(prompt);
  const isProgress = /progress|score|xp|streak|complete|done|finish|next/i.test(prompt);

  let reply = '';
  let suggestedCode = null;

  if (isErrorDebug) {
    const errorContext = terminalLogs?.filter((l) => l.level === 'error').map((l) => l.text).join('\n') || '';
    
    if (codeAnalysis.issues.length > 0) {
      reply = `I scanned your \`${fileName}\` and found ${codeAnalysis.issues.length} potential issue${codeAnalysis.issues.length > 1 ? 's' : ''}:\n\n`;
      codeAnalysis.issues.forEach((issue, i) => {
        reply += `**${i + 1}.** ${issue}\n`;
      });
      reply += `\nIn **${trackName}**, fixing these patterns will make your code more robust and production-ready.`;
    } else if (errorContext) {
      reply = `I see an error in your console:\n\n\`\`\`\n${errorContext.slice(0, 200)}\n\`\`\`\n\nCommon causes in \`${fileName}\`:\n1. **Selector mismatch** — check if the element ID in HTML matches your JavaScript selector.\n2. **Script loading order** — ensure \`${fileName}\` loads after the DOM is ready.\n3. **Scope issue** — variables declared inside functions aren't accessible globally.`;
    } else {
      reply = `Let's debug your \`${fileName}\` step-by-step:\n\n1. **Open the Console** (F12 → Console tab) to see the exact error message.\n2. **Check element selectors** — do all \`getElementById\` / \`querySelector\` targets exist in your HTML?\n3. **Verify execution order** — is your script tag placed before or after the elements it targets?\n\nIn **${trackName}**, systematic debugging starts with isolating the exact failure point.`;
      suggestedCode = `// Debug: Safely verify element exists before operating on it
const el = document.getElementById('your-element-id');
if (!el) {
  console.error('[Debug] Element not found — check your HTML IDs!');
  return;
}
// Proceed safely
console.log('[Debug] Element found:', el);`;
    }
  } else if (isConceptual) {
    if (/state|reactive|component|react|virtual dom|render/i.test(prompt)) {
      reply = `Great question! In **${trackName}**, **state** is the "memory" of your UI component:\n\n- **State** = data that lives inside a component and triggers re-renders when changed\n- **Props** = read-only data passed from a parent component\n- **Virtual DOM** = React's in-memory representation that diffs against the real DOM to apply minimal updates\n\nThink of state like a shop's inventory count — when it changes, the display automatically updates to reflect the new value.\n\nIn your current \`${fileName}\`: ${codeAnalysis.patterns.length > 0 ? `I can see you're using **${codeAnalysis.patterns.slice(0, 2).join('** and **')}**` : 'try declaring state with `const [count, setCount] = useState(0)`'}.`;
    } else if (/api|fetch|http|request|response|rest|endpoint/i.test(prompt)) {
      reply = `In **${trackName}**, APIs (Application Programming Interfaces) are the communication bridges between your frontend and backend:\n\n- **GET** — fetch/read data (e.g., \`fetch('/api/users')\`)\n- **POST** — send/create data (with a \`body\` payload)\n- **PATCH/PUT** — update existing data\n- **DELETE** — remove a record\n\nA clean API call always handles three states: **loading**, **success**, and **error**. Are you fetching data in your current project?`;
    } else if (/sql|database|query|sqlite|postgres/i.test(prompt)) {
      reply = `In **${trackName}**, databases are organized into **tables** (like spreadsheets) with **rows** (records) and **columns** (fields):\n\n\`\`\`sql\n-- Read all records:\nSELECT * FROM students;\n\n-- Filter by condition:\nSELECT * FROM students WHERE xp > 500;\n\n-- Add a new record:\nINSERT INTO students (id, email, xp) VALUES ('s001', 'king@example.com', 100);\n\`\`\`\n\nThe SQLite backend behind Kingshima uses exactly these patterns to persist your data!`;
    } else {
      reply = `In **${trackName}**, let me break that down for you:\n\n${codeAnalysis.patterns.length > 0 ? `Based on your current code, you're working with **${codeAnalysis.patterns.join('**, **')}**.` : 'Start by writing a clear problem statement in comments.'}\n\nEvery concept in software engineering has three layers:\n1. **What** it does (the purpose)\n2. **How** it works (the mechanism)\n3. **When** to use it (the pattern)\n\nWould you like me to diagram the concept on The Board, or explore a hands-on example in your workspace?`;
    }
  } else if (isCodeReview) {
    if (codeAnalysis.isEmpty) {
      reply = `Your workspace looks empty! Start by writing some code in \`${fileName}\` and I'll give you a detailed code review with improvement suggestions.`;
    } else {
      reply = `**Code Review for \`${fileName}\`** in ${trackName}:\n\n`;
      if (codeAnalysis.patterns.length > 0) {
        reply += `✅ **Detected patterns:** ${codeAnalysis.patterns.join(', ')}\n\n`;
      }
      if (codeAnalysis.issues.length > 0) {
        reply += `⚠️ **Issues to address:**\n`;
        codeAnalysis.issues.forEach((iss, i) => reply += `${i + 1}. ${iss}\n`);
        reply += '\n';
      } else {
        reply += `✅ No critical issues found in this snippet!\n\n`;
      }
      if (codeAnalysis.suggestions.length > 0) {
        reply += `💡 **Suggestions:**\n`;
        codeAnalysis.suggestions.forEach((s) => reply += `- ${s}\n`);
      }
      reply += `\nClick **"Submit to AI Grader"** for a full automated score with detailed strengths and improvement tips.`;
    }
  } else if (isHowTo) {
    if (/event|click|listener|button/i.test(prompt)) {
      reply = `In **${trackName}**, add event listeners like this:\n\n\`\`\`js\nconst btn = document.getElementById('my-button');\nbtn.addEventListener('click', () => {\n  console.log('Button clicked!');\n  // Your logic here\n});\n\`\`\`\n\nFor React, use the \`onClick\` JSX prop:\n\`\`\`jsx\n<button onClick={() => handleClick()}>Click Me</button>\n\`\`\``;
      suggestedCode = `// Event listener with defensive check pattern:
const btn = document.getElementById('my-button');
if (btn) {
  btn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission if needed
    console.log('Clicked!', event.target);
  });
}`;
    } else if (/style|css|class|animation|transition/i.test(prompt)) {
      reply = `In **${trackName}**, apply CSS dynamically:\n\n\`\`\`js\n// Toggle a class:\nelement.classList.toggle('active');\n\n// Add inline styles:\nelement.style.transform = 'translateY(-4px)';\nelement.style.transition = 'transform 0.2s ease';\n\n// Remove a class after delay:\nsetTimeout(() => element.classList.remove('flash'), 300);\n\`\`\`\n\nFor animations, always prefer CSS classes over inline styles for performance.`;
    } else {
      reply = `Here's the professional pattern for **${trackName}**:\n\n1. **Plan** — Write a comment describing what your function should do\n2. **Code** — Implement the smallest working version first\n3. **Test** — Click ▶ Run Code and check the console output\n4. **Refine** — Add error handling and edge cases\n\nWhat specific functionality are you trying to build? Give me more detail and I'll write a targeted code snippet for you.`;
    }
  } else if (isExercise) {
    reply = `Here's a targeted challenge for **${trackName}**:\n\n**🎯 Mini Challenge:** Extend your current \`${fileName}\` with one of these:\n\n${trackId === 'fullstack' || trackId === 'backend'
      ? '1. Add a **reset** button that clears all state back to zero\n2. Add a **max counter** — prevent incrementing past 10\n3. Add **localStorage persistence** — save the counter value on refresh'
      : trackId === 'ai-agents'
      ? '1. Add a **confidence score** (0-100%) to each agent reasoning step\n2. Implement a **retry loop** — the agent re-plans if the first action fails\n3. Add a **memory store** — the agent remembers the last 3 user messages'
      : '1. Add a **chart** that visualizes your data distribution\n2. Implement a **sort function** that orders results by a chosen column\n3. Add a **filter input** to search through your dataset in real-time'
    }\n\nComplete one and hit **"Submit to AI Grader"** for instant feedback! 🚀`;
  } else if (isProgress) {
    reply = `Great work so far in **${trackName}**! Here's how to maximize your learning:\n\n🔥 **Keep your streak active** — study every day to maintain your consecutive day count\n⚡ **Earn XP** — submit your completed workspace to the AI Grader for +150 XP\n📜 **Unlock your Certificate** — complete all objectives and claim your Track Diploma\n\nYour current workspace in \`${fileName}\` shows ${codeAnalysis.patterns.length > 0 ? `you're applying **${codeAnalysis.patterns.slice(0, 2).join('** and **')}**` : 'a clean starting state — let\'s fill it with impressive code!'}`;
  } else {
    // General intelligent response
    reply = `I'm your dedicated AI instructor for **${trackName}**! Here's how I can help right now:\n\n${codeAnalysis.patterns.length > 0
      ? `📊 **Analyzing your \`${fileName}\`:** I can see you're using **${codeAnalysis.patterns.join(', ')}**.\n\n`
      : ''
    }**Ask me to:**\n- 🔍 **Review your code** — "review my code" or "check for bugs"\n- 📐 **Explain a concept** — "what is a closure?" or "explain async/await"\n- 🎯 **Give a challenge** — "give me a challenge"\n- 🎨 **Draw on the board** — "draw the architecture" or "diagram the flow"\n- ✅ **Grade my work** — click the **"Submit to AI Grader"** button above\n\nWhat would you like to explore?`;
  }

  return { reply, suggestedCode };
}

// ── Main Route Handler ─────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { prompt, codeContext, trackId, activeFile, terminalLogs } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 2) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();
    const trackName = TRACK_NAMES[trackId] || 'Full-Stack Engineering';

    // ── Try Gemini AI first ────────────────────────────────────────────────
    const geminiSystemPrompt = `You are "Kingshima AI", an expert AI instructor for the Kingshima coding bootcamp platform. You are teaching the "${trackName}" track.

Your role is to provide clear, practical, encouraging tutoring to students. Always:
- Reference the specific track and technology being learned
- Be concise (3-5 sentences max for most answers, unless showing code)
- Include actionable code examples when relevant
- Use markdown formatting (**bold**, \`code\`, \`\`\`blocks\`\`\`)
- Refer to the student's actual code context when provided

The student's current workspace:
- Active file: ${activeFile || 'script.js'}
- Code snippet: ${codeContext ? `\`\`\`\n${codeContext.slice(0, 600)}\n\`\`\`` : '(empty workspace)'}
${terminalLogs?.length > 0 ? `- Console output: ${terminalLogs.slice(-3).map(l => l.text).join(' | ')}` : ''}

Respond only with your tutoring message — no preamble like "Sure!" or "Great question!". Be direct and educational.`;

    const geminiReply = await callGeminiApi(geminiSystemPrompt, cleanPrompt);

    if (geminiReply) {
      return NextResponse.json({
        ok: true,
        reply: geminiReply,
        suggestedCode: null,
        powered_by: 'gemini',
        timestamp: new Date().toISOString(),
      });
    }

    // ── Fallback to built-in intelligent engine ────────────────────────────
    const { reply, suggestedCode } = buildIntelligentResponse(
      cleanPrompt,
      codeContext,
      trackId,
      activeFile,
      terminalLogs
    );

    return NextResponse.json({
      ok: true,
      reply,
      suggestedCode,
      powered_by: 'kingshima-engine',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('POST /api/studio/ai-assist error:', err);
    return NextResponse.json({ error: 'Failed to process AI tutoring request' }, { status: 500 });
  }
}
