import { NextResponse } from 'next/server';

// ── Kingshima AI Studio Instructor Engine: Coach Ada ─────────────────────────
// Real-time classroom teacher that breaks down tech skills for non-tech learners,
// adapts to user speed, asks check-in questions, and provides conversational guidance.

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
              text: `${systemPrompt}\n\n---\n\nStudent says: "${userMessage}"`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 600,
      },
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

// ── Built-in Intelligent Fallback Classroom Engine ─────────────────────────────
function buildTeacherClassroomResponse(prompt, codeContext, activeFile, learningSpeed = 'beginner', lessonTitle = 'Web Development') {
  const lower = prompt.toLowerCase();
  const speed = learningSpeed || 'beginner';

  // Socratic check-in questions Coach Ada asks to keep conversation real-time
  const checkInQuestions = {
    beginner: 'Quick check-in for you: Does this make sense so far, or would you like another real-world example?',
    steady: 'Quick question for you: What do you predict happens to the element when we trigger this change?',
    fast: 'Challenge question: How would you refactor this to be even cleaner?',
  };

  const followUp = checkInQuestions[speed] || checkInQuestions.beginner;

  // 1. Student Answering a Classroom Check-in Question
  if (lower.includes('<button>') || lower.includes('button')) {
    return {
      reply: `🌟 Spot on! Exactly right! The \`<button>\` tag is the universal way we tell browsers "this is clickable". You are already thinking like a real web developer.\n\n${followUp}`,
      suggestedCode: '<button class="my-btn">Click Me!</button>',
    };
  }

  if (lower.includes('border-radius') || lower.includes('rounded')) {
    return {
      reply: `🎉 Brilliant answer! \`border-radius\` is the CSS magic wand for modern design. Setting it to something like \`12px\` or \`99px\` transforms harsh square corners into smooth, inviting shapes!\n\n${followUp}`,
      suggestedCode: 'border-radius: 16px;',
    };
  }

  if (lower.includes('state') || lower.includes('event')) {
    return {
      reply: `🎯 You got it! "State" is simply the website's memory. When you click, an event triggers, state updates, and the browser redraws the number instantly without reloading the page.\n\n${followUp}`,
      suggestedCode: 'count += 1; updateDisplay();',
    };
  }

  // 2. Beginner conceptual questions
  if (/what is|explain|how does|simple words|like i am 10/i.test(prompt)) {
    if (/html/i.test(prompt)) {
      return {
        reply: `Great question! Think of **HTML** like the brick walls and beams of a new house. It doesn't have paint or electricity yet, but it gives the building its structure: headings, paragraphs, and buttons!\n\n${followUp}`,
        suggestedCode: '<h1>My Web Page</h1>\n<p>Welcome to my site!</p>',
      };
    }
    if (/css/i.test(prompt)) {
      return {
        reply: `**CSS** is the paint, lighting, and interior decoration! Without CSS, every website is plain black text on a white background. With CSS, you add gorgeous colors, glowing glassmorphic cards, and smooth animations.\n\n${followUp}`,
        suggestedCode: 'background: #2563eb;\ncolor: white;\npadding: 10px;',
      };
    }
    if (/javascript|js/i.test(prompt)) {
      return {
        reply: `**JavaScript** is the electricity and appliances in the house! When you flick a light switch (click a button), JavaScript makes the light turn on (updates the screen). It makes webpages alive and interactive.\n\n${followUp}`,
        suggestedCode: "btn.addEventListener('click', () => { alert('Hello!'); });",
      };
    }
    return {
      reply: `In web development, we build everything with 3 simple pieces:\n1. **HTML** = The skeleton\n2. **CSS** = The clothes & style\n3. **JavaScript** = The muscles & brain\n\nTake a look at your starter files on the left — you have one file for each piece!\n\n${followUp}`,
      suggestedCode: null,
    };
  }

  // 3. Debugging / Help
  if (/error|broken|not working|why|bug|help/i.test(prompt)) {
    return {
      reply: `Don't worry at all — every single professional developer runs into typos every day! That's why we have our **"Reset Code"** button to start fresh anytime.\n\nHere are the top 2 things to check:\n1. In HTML, make sure every open tag like \`<button>\` has a matching closing tag \`</button>\`.\n2. In CSS, make sure each line ends with a semicolon \`;\`.\n\nWould you like me to guide you through fixing it line by line?`,
      suggestedCode: null,
    };
  }

  // 4. General Friendly Teacher Response
  return {
    reply: `I hear you loud and clear! In our Web Development class for **${lessonTitle}**, the most important thing is to experiment and see the instant visual changes in the Live Preview.\n\nTry clicking on the code, change one word or color, and see what happens on the right. You cannot break anything!\n\n${followUp}`,
    suggestedCode: null,
  };
}

// ── Main Route Handler ─────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { prompt, codeContext, activeFile, learningSpeed, lessonTitle, studentName } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 1) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();
    const speed = learningSpeed || 'beginner';
    const activeLesson = lessonTitle || 'Interactive Web Development';
    const name = studentName || 'Student';

    // ── Try Gemini AI first with our Coach Ada Persona ────────────────────
    const geminiSystemPrompt = `You are Coach Ada, a warm, patient, world-class classroom teacher at the Kingshima Web Development Bootcamp.
You are having a real-time classroom conversation with your non-technical student (${name}).

Classroom Context:
- Subject: Web Development (HTML, CSS, JavaScript)
- Current Lesson: ${activeLesson}
- Student Learning Speed: ${speed} (If "beginner", use clear everyday analogies like cooking, houses, or notebooks. Avoid technical jargon or explain it immediately.)
- Active File: ${activeFile || 'index.html'}
- Code in Editor:
\`\`\`
${codeContext ? codeContext.slice(0, 600) : '(empty)'}
\`\`\`

Pedagogical Rules:
1. Speak warmly like a real teacher in a classroom (e.g. "Great question, ${name}!", "Notice how...").
2. Keep explanations concise and encouraging (3 to 5 sentences).
3. If they asked a question, answer it clearly in plain English.
4. Conclude your answer by asking them a brief Socratic check-in question to verify their understanding and keep the classroom dialogue active!`;

    const geminiReply = await callGeminiApi(geminiSystemPrompt, cleanPrompt);

    if (geminiReply) {
      return NextResponse.json({
        ok: true,
        reply: geminiReply,
        powered_by: 'gemini',
        timestamp: new Date().toISOString(),
      });
    }

    // ── Fallback to Built-in Teacher Engine ────────────────────────────────
    const fallback = buildTeacherClassroomResponse(cleanPrompt, codeContext, activeFile, speed, activeLesson);

    return NextResponse.json({
      ok: true,
      reply: fallback.reply,
      suggestedCode: fallback.suggestedCode,
      powered_by: 'coach-ada-in-house',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('AI Assist error:', err);
    return NextResponse.json(
      {
        ok: true,
        reply: "I am right here with you in the classroom! Let's inspect your HTML and CSS tags on the left. What would you like to build or change first?",
        powered_by: 'fallback',
      },
      { status: 200 }
    );
  }
}
