// Database initialization and seed script for Kingshima SQLite Backend
import { getDb, upsertLesson, getAllStudents, createStudent } from '../src/lib/db.js';
import { hashPassword } from '../src/lib/nodeAuth.js';

console.log('🚀 Initializing Kingshima SQLite Database...');
const db = getDb();

// Seed initial lessons if none exist
const lessonCount = db.prepare('SELECT COUNT(*) as count FROM lessons').get().count;

if (lessonCount === 0) {
  console.log('🌱 Seeding initial curriculum lessons...');

  const SEED_LESSONS = [
    {
      id: 'web-1-1',
      course_id: 'web-dev',
      title: 'How the Web Works & Modern Full-Stack Architectures',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      resources: [
        { label: 'MDN Web Docs: How the Web Works', url: 'https://developer.mozilla.org/' },
        { label: 'Next.js 16 Documentation', url: 'https://nextjs.org/docs' },
      ],
    },
    {
      id: 'web-1-2',
      course_id: 'web-dev',
      title: 'Modern JavaScript (ES6+), Asynchronous Patterns & DOM',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      resources: [
        { label: 'JavaScript.info Guide', url: 'https://javascript.info' },
      ],
    },
    {
      id: 'data-1-1',
      course_id: 'data-analysis',
      title: 'Data Foundations: Structured vs Unstructured Data',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      resources: [
        { label: 'Kaggle Python Course', url: 'https://www.kaggle.com/learn/python' },
      ],
    },
    {
      id: 'ai-1-1',
      course_id: 'ai-automations',
      title: 'AI Agent Architectures, LLM Pipelines & Workflow Automation',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      resources: [
        { label: 'LangChain Concept Guide', url: 'https://python.langchain.com' },
      ],
    },
  ];

  for (const lesson of SEED_LESSONS) {
    upsertLesson(lesson);
  }
  console.log(`✅ Seeded ${SEED_LESSONS.length} curriculum lessons.`);
} else {
  console.log(`ℹ️ Lessons table already contains ${lessonCount} entries.`);
}

// Check students
const students = getAllStudents();
console.log(`ℹ️ Students registered: ${students.length}`);

console.log('🎉 Kingshima SQLite Backend is ready to serve!');
