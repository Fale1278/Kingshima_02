// Better Code Structure & Refactoring Suggestions for Red Box Inspector & AI Assistant

export const CODE_SUGGESTIONS = [
  {
    id: 'async-await',
    keywords: ['fetch', 'then', 'promise', 'async', 'api', 'http'],
    title: 'Modern Async/Await Pattern',
    category: 'JavaScript Logic',
    problem: 'Nested .then() callbacks create "callback hell" and hard-to-read error paths.',
    improvedCode: `// Improved Code Structure (Clean Async/Await + Try/Catch)
async function fetchCourseData(courseId) {
  try {
    const response = await fetch(\`/api/courses/\${courseId}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to load course:', error);
    return { success: false, error: error.message };
  }
}`,
    explanation: 'Using async/await keeps asynchronous logic linear, readable, and allows centralized try/catch error handling.',
  },
  {
    id: 'react-components',
    keywords: ['react', 'component', 'jsx', 'props', 'state', 'card', 'item'],
    title: 'Modular Component Architecture',
    category: 'React Best Practices',
    problem: 'Monolithic page files mixing fetch logic, complex UI styling, and event handlers.',
    improvedCode: `// Improved Code Structure (Decomposed & Typed Component)
import React, { useMemo } from 'react';
import styles from './CourseCard.module.css';

export const CourseCard = React.memo(({ course, onSelect }) => {
  const formattedPrice = useMemo(() => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(course.price),
    [course.price]
  );

  return (
    <article className={styles.card} onClick={() => onSelect(course)}>
      <img src={course.imageUrl} alt={course.title} loading="lazy" />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <span>{formattedPrice}</span>
    </article>
  );
});`,
    explanation: 'Decomposing UIs into memoized sub-components reduces unnecessary re-renders and improves testability.',
  },
  {
    id: 'css-modules',
    keywords: ['css', 'style', 'flexbox', 'grid', 'layout', 'design', 'glass'],
    title: 'CSS Variables & Dynamic Design Tokens',
    category: 'CSS Architecture',
    problem: 'Hardcoding hex colors and fixed pixel values makes dark mode and responsive layouts brittle.',
    improvedCode: `/* Improved CSS Structure (Design System Tokens) */
.glassContainer {
  background: var(--surface-glass, rgba(15, 23, 42, 0.75));
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-light, rgba(255, 255, 255, 0.1));
  border-radius: var(--radius-lg, 16px);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.glassContainer:hover {
  transform: translateY(-4px);
  border-color: var(--accent-red, #ef4444);
}`,
    explanation: 'Centralizing colors into CSS custom properties makes themes, hover interactions, and dark modes effortlessly maintainable.',
  },
  {
    id: 'database-security',
    keywords: ['sql', 'database', 'auth', 'postgres', 'sqlite', 'security'],
    title: 'SQL Database Security & Access Control Pattern',
    category: 'Backend & Security',
    problem: 'Exposing backend tables without query parameterization and authorization guards lets unauthenticated users read or tamper with private rows.',
    improvedCode: `-- Secure In-House Database Schema with Constraints
CREATE TABLE student_enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- Parameterized backend query guard:
-- SELECT * FROM student_enrollments WHERE student_id = ? AND course_id = ?;`,
    explanation: 'Parameterized queries and foreign key constraints guarantee data integrity and eliminate SQL injection vulnerabilities at the engine level.',
  },
];

export function getCodeSuggestionForElement(elementText, tagName) {
  if (!elementText) return CODE_SUGGESTIONS[0];
  const text = elementText.toLowerCase();

  for (const sug of CODE_SUGGESTIONS) {
    if (sug.keywords.some(kw => text.includes(kw))) {
      return sug;
    }
  }

  if (tagName === 'IMG') {
    return {
      id: 'img-opt',
      title: 'Responsive & Accessible Image Pattern',
      category: 'Frontend Performance',
      problem: 'Unoptimized images lack responsive sizes, loading state, and screen-reader accessibility.',
      improvedCode: `<Image 
  src={imageUrl} 
  alt={imageAlt} 
  width={600} 
  height={400} 
  loading="lazy" 
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{ objectFit: 'cover', borderRadius: '12px' }}
/>`,
      explanation: 'Using explicit width/height and next/image optimizes layout shift and reduces bandwidth on mobile.',
    };
  }

  return CODE_SUGGESTIONS[0];
}
