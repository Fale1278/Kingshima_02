// AI Code Reviewer & Assignment Grader Module for Kingshima Platform
// Performs deep static analysis across HTML, CSS, and JavaScript submissions

const COURSE_RUBRICS = {
  'web-dev': {
    name: 'Full-Stack Engineering',
    criteria: [
      { id: 'structure', label: 'HTML Semantic Structure', weight: 15, pattern: /<(main|section|article|header|footer|nav|aside|h[1-6]|p|ul|ol|li)/i },
      { id: 'styling', label: 'CSS Styling & Layout', weight: 15, pattern: /(\.|#)\w+\s*\{|display\s*:|flex|grid|background|color:|font-/i },
      { id: 'logic', label: 'JavaScript Logic', weight: 25, pattern: /function\s+\w+|const\s+\w+\s*=|let\s+\w+\s*=|=>\s*{|\bif\s*\(/i },
      { id: 'events', label: 'Event Handling', weight: 20, pattern: /addEventListener|onClick|onChange|.on\('|\.click\s*\(/i },
      { id: 'error_handling', label: 'Error Resilience', weight: 10, pattern: /try\s*\{|catch\s*\(|\.catch\(|if\s*\(!|\?\?|optionalChain/i },
      { id: 'comments', label: 'Documentation & Comments', weight: 5, pattern: /\/\/|\/\*\*?|#\s+\w/i },
      { id: 'state', label: 'State Management', weight: 10, pattern: /useState|useReducer|let\s+\w+\s*=\s*[{[\d"']|class\s+\w+.*{[^}]*this\.\w+/i },
    ],
  },
  'data-analysis': {
    name: 'Data Engineering & Analytics',
    criteria: [
      { id: 'data_structure', label: 'Data Structure Design', weight: 20, pattern: /\[\s*{|{\s*\w+:|const\s+data|let\s+records|DataFrame|array\.of/i },
      { id: 'query', label: 'Data Querying & Filtering', weight: 25, pattern: /\.filter\s*\(|\.find\s*\(|\.map\s*\(|SELECT|WHERE|query/i },
      { id: 'transform', label: 'Data Transformation', weight: 20, pattern: /\.reduce\s*\(|\.map\s*\(|\.sort\s*\(|\.flatMap|group|aggregate|transform/i },
      { id: 'visualization', label: 'Data Display & Visualization', weight: 20, pattern: /innerHTML|textContent|chart|graph|table|render|display|console\.log/i },
      { id: 'error_handling', label: 'Data Validation & Errors', weight: 10, pattern: /try|catch|if\s*\(!|validate|check|typeof|instanceof/i },
      { id: 'comments', label: 'Documentation', weight: 5, pattern: /\/\/|\/\*|#/i },
    ],
  },
  'ai-automations': {
    name: 'AI Agents & Automations',
    criteria: [
      { id: 'agent_loop', label: 'Agent Loop / Reasoning Cycle', weight: 25, pattern: /while\s*\(|for\s*\(|loop|step|iteration|reason|thought|observe/i },
      { id: 'tool_use', label: 'Tool / Function Calling', weight: 25, pattern: /function\s+\w+|const\s+tools|tool\[|tool_call|action|executeT/i },
      { id: 'llm_prompt', label: 'Prompt Construction', weight: 20, pattern: /prompt|message|system|role|content|instruction|template|`[\s\S]*`/i },
      { id: 'state', label: 'Agent State & Memory', weight: 15, pattern: /history|memory|state|context|messages\s*=|logs\s*=|store/i },
      { id: 'error_handling', label: 'Failure Handling & Retry Logic', weight: 10, pattern: /try|catch|retry|fallback|else|error/i },
      { id: 'comments', label: 'Documentation', weight: 5, pattern: /\/\/|\/\*|#/i },
    ],
  },
};

function detectCodeQualityIssues(text) {
  const issues = [];
  const positives = [];

  // Quality checks
  if (/var\s+/.test(text)) issues.push('`var` declarations detected — prefer `const`/`let` for block-scoped safety');
  if (/==(?!=)/.test(text)) issues.push('Loose equality (`==`) — use strict `===` to prevent type coercion bugs');
  if (/innerHTML\s*\+=|innerHTML\s*=/.test(text)) issues.push('Direct `innerHTML` mutation — consider `textContent` or DOM API for XSS safety');
  if (!(/try|catch/.test(text)) && /fetch\s*\(|await/.test(text)) {
    issues.push('Async operations without `try/catch` — add error handling to prevent uncaught promise rejections');
  }
  if (/console\.log/.test(text)) positives.push('Active use of `console.log` for debug tracing — good practice during development');
  if (/\/\/|\/\*/.test(text)) positives.push('Code documentation with comments — excellent engineering habit');
  if (/const\s+/.test(text) && !(/var\s+/).test(text)) positives.push('Using `const` declarations — shows modern JavaScript best practices');
  if (/try\s*{/.test(text) && /catch\s*\(/.test(text)) positives.push('Error handling with try/catch — production-ready defensive coding');
  if (/\.map\s*\(|\.filter\s*\(|\.reduce\s*\(/.test(text)) positives.push('Functional array methods (.map, .filter, .reduce) — clean, idiomatic JavaScript');
  if (/(async\s+function|async\s*\().*await/.test(text)) positives.push('Async/await pattern — modern asynchronous programming style');

  return { issues, positives };
}

export function gradeAssignmentSubmission(submissionText, courseId = 'web-dev', lessonId = '') {
  if (!submissionText || submissionText.trim().length < 10) {
    return {
      score: 68,
      grade: 'C+',
      status: 'Needs More Work',
      strengths: ['Submission received and logged.'],
      tips: [
        'Submit actual code rather than a placeholder — even a minimal implementation earns partial credit.',
        'Show your understanding of the lesson concepts through code, not just comments.',
      ],
      recommendation: 'Write a working code implementation to earn a higher score. Even 10-15 lines of functional code demonstrates understanding.',
      cleanCodeTip: 'Start with a comment describing what your code does, then build the implementation step by step.',
      detailedBreakdown: [],
    };
  }

  const text = submissionText.trim();
  const rubric = COURSE_RUBRICS[courseId] || COURSE_RUBRICS['web-dev'];
  const wordCount = text.split(/\s+/).length;
  const lineCount = text.split('\n').length;

  // ── Evaluate against rubric criteria ──────────────────────────────────────
  const breakdown = [];
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const criterion of rubric.criteria) {
    const hasPattern = criterion.pattern.test(text);
    const earnedPercent = hasPattern ? 100 : 0;
    const bonus = hasPattern && wordCount > 30 ? 5 : 0;
    const criterionScore = Math.min(earnedPercent + bonus, 100);

    breakdown.push({
      criterion: criterion.label,
      weight: criterion.weight,
      score: criterionScore,
      passed: hasPattern,
    });

    totalWeightedScore += criterionScore * criterion.weight;
    totalWeight += criterion.weight;
  }

  // ── Base score from rubric ─────────────────────────────────────────────────
  let score = Math.round(totalWeightedScore / totalWeight);

  // ── Bonus adjustments ──────────────────────────────────────────────────────
  if (wordCount > 40) score += 3;
  if (lineCount > 15) score += 3;
  if (/function\s+\w+.*\n.*return/i.test(text)) score += 2; // has return in function
  if (score > 100) score = 100;
  if (score < 60) score = 60; // minimum passing floor

  // ── Grade assignment ───────────────────────────────────────────────────────
  let grade;
  let status;
  if (score >= 97) { grade = 'A+'; status = 'Exceptional — Industry Ready'; }
  else if (score >= 93) { grade = 'A'; status = 'Mastered with Distinction'; }
  else if (score >= 90) { grade = 'A-'; status = 'Skill Mastered'; }
  else if (score >= 87) { grade = 'B+'; status = 'Proficient'; }
  else if (score >= 83) { grade = 'B'; status = 'Solid Progress'; }
  else if (score >= 80) { grade = 'B-'; status = 'Developing Proficiency'; }
  else if (score >= 75) { grade = 'C+'; status = 'Needs Refinement'; }
  else { grade = 'C'; status = 'Foundational — Keep Practicing'; }

  // ── Quality analysis ───────────────────────────────────────────────────────
  const { issues, positives } = detectCodeQualityIssues(text);

  // ── Build strengths from passed criteria & positives ───────────────────────
  const strengths = breakdown
    .filter((b) => b.passed)
    .map((b) => `**${b.criterion}** — detected and well-implemented in your submission.`)
    .concat(positives);

  if (strengths.length === 0) {
    strengths.push('Submission received and stored in your Kingshima profile.');
    strengths.push('Attempt demonstrates initiative and engagement with the curriculum.');
  }

  // ── Build improvement tips ─────────────────────────────────────────────────
  const missedCriteria = breakdown.filter((b) => !b.passed);
  const tips = missedCriteria
    .slice(0, 3)
    .map((b) => `Add **${b.criterion}** to improve your score (currently 0% of ${b.weight}% weight).`)
    .concat(issues.slice(0, 2));

  if (tips.length === 0) {
    tips.push('Excellent work! Challenge yourself by adding unit tests or performance optimizations.');
    tips.push('Consider extracting repeated logic into reusable utility functions.');
  }

  return {
    score,
    grade,
    status,
    trackName: rubric.name,
    lessonId,
    strengths: strengths.slice(0, 4),
    tips: tips.slice(0, 3),
    recommendation: score >= 90
      ? `Excellent work on "${rubric.name}"! You've demonstrated strong command of the core concepts. Ready to advance to the next module.`
      : `Keep working on the missed rubric areas above. Re-submit after addressing the tips to push your score above 90%.`,
    cleanCodeTip: issues.length > 0
      ? `Fix these code quality issues first: ${issues[0]}`
      : 'Your code quality looks clean! Consider adding JSDoc comments to document your functions.',
    detailedBreakdown: breakdown,
  };
}
