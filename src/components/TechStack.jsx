'use client';

import React, { useState } from 'react';
import styles from './TechStack.module.css';

const categories = [
  { id: 'all', label: 'All Tooling' },
  { id: 'web', label: 'Full-Stack Web' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'cloud', label: 'Cloud & Distributed Systems' },
  { id: 'design', label: 'Design Systems & 3D' },
];

const techs = [
  {
    id: 'nextjs',
    name: 'Next.js 16',
    category: 'web',
    role: 'Production Full-Stack Architecture',
    version: 'v16.2',
    symbol: '▲',
    whyWeTeach: 'Industry standard for high-performance React architectures, server components, streaming SSR, and edge deployments.',
    cohortProject: 'Multi-tenant real-time learning management system with server action pipelines.',
    masteryRubric: ['Server Actions & Optimistic Mutations', 'Edge Middleware & Session Auth', 'Streaming SSR & Suspense Boundaries'],
    snippet: `export default async function CohortDashboard({ params }) {\n  const session = await auth();\n  const metrics = await getCohortMetrics(params.id);\n  return <CohortProgressGrid data={metrics} user={session.user} />;\n}`,
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'web',
    role: 'Declarative UI Foundations',
    version: 'v19.2',
    symbol: '⚛',
    whyWeTeach: 'The world\'s most in-demand UI paradigm. We teach modern hooks, compiler optimizations, and robust mental models.',
    cohortProject: 'High-frequency live data dashboard with custom canvas renderers.',
    masteryRubric: ['Concurrent Rendering & Transitions', 'Custom Context State Management', 'Memoization & Fiber Architecture'],
    snippet: `const [isPending, startTransition] = useTransition();\nconst handleFilterChange = (filter) => {\n  startTransition(() => setActiveFilter(filter));\n};`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'web',
    role: 'Strict Type Safety & Contracts',
    version: 'v5.8',
    symbol: 'TS',
    whyWeTeach: 'Zero-runtime type bugs. Every production company requires strict typing, generics, and shared interface contracts.',
    cohortProject: 'End-to-end type-safe API SDK with Zod runtime schema validation.',
    masteryRubric: ['Advanced Generics & Conditional Types', 'Discriminated Unions', 'Utility Types & Template Literals'],
    snippet: `type Result<T, E = Error> = \n  | { ok: true; value: T }\n  | { ok: false; error: E };\n\nfunction validateToken<T>(raw: unknown): Result<T> { ... }`,
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai',
    role: 'Deep Learning & Neural Networks',
    version: 'v2.5',
    symbol: '∇',
    whyWeTeach: 'The research and production standard for neural network design, tensor calculus, and fine-tuning foundation models.',
    cohortProject: 'Custom neural classifier for spiritual scripture cross-referencing and contextual search.',
    masteryRubric: ['Tensor Operations & Autograd Engine', 'Custom Dataset & DataLoader Pipelines', 'Model Fine-Tuning & Quantization'],
    snippet: `class ScriptureEmbeddingNet(nn.Module):\n  def __init__(self, vocab_sz, emb_dim):\n    super().__init__()\n    self.embedding = nn.Embedding(vocab_sz, emb_dim)\n    self.fc = nn.Linear(emb_dim, 256)`,
  },
  {
    id: 'python',
    name: 'Python 3.12',
    category: 'ai',
    role: 'Agentic Systems & Automation',
    version: 'v3.12',
    symbol: 'PY',
    whyWeTeach: 'The foundational language for data engineering, LLM orchestration, vector search, and automated backend agents.',
    cohortProject: 'Autonomous multi-agent research analyst with tool-calling and web verification.',
    masteryRubric: ['AsyncIO Concurrent Execution', 'Type Hinting & Pydantic V2', 'Vector Math & NumPy/Pandas'],
    snippet: `async def execute_agent_loop(goal: str) -> AgentResult:\n  plan = await orchestrator.create_plan(goal)\n  return await executor.run_concurrent_tools(plan.tasks)`,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & Supabase',
    category: 'cloud',
    role: 'Relational & Real-Time Data',
    version: 'v17',
    symbol: 'PG',
    whyWeTeach: 'ACID-compliant relational database modeling, Row-Level Security (RLS), and real-time WebSocket subscriptions.',
    cohortProject: 'Distributed data store with custom stored procedures and vector embeddings indexing (pgvector).',
    masteryRubric: ['Complex Joins & Index Tuning', 'Row-Level Security Policies', 'pgvector Cosine Distance Queries'],
    snippet: `CREATE POLICY "Users can only view cohort data"\nON cohort_submissions\nFOR SELECT USING (\n  auth.uid() = student_id OR is_faculty(auth.uid())\n);`,
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'cloud',
    role: 'Reproducible Environments',
    version: 'v27',
    symbol: 'DK',
    whyWeTeach: 'Ensures code runs identically on student laptops, staging clusters, and production cloud nodes.',
    cohortProject: 'Multi-container microservice compose architecture with Nginx reverse proxy.',
    masteryRubric: ['Multi-Stage Dockerfiles for Next.js', 'Container Security Hardening', 'Compose Networking & Volumes'],
    snippet: `FROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/.next/standalone ./\nEXPOSE 3000\nCMD ["node", "server.js"]`,
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'design',
    role: '3D Visualization & Spatial Web',
    version: 'r174',
    symbol: '3D',
    whyWeTeach: 'Takes web experiences beyond flat 2D screens into immersive, high-framerate interactive spatial computing.',
    cohortProject: 'Interactive 3D planetary telemetry globe and holographic blueprint viewer.',
    masteryRubric: ['Custom GLSL Shaders & Materials', 'BufferGeometry Optimization', 'Physics & Raycasting Interactions'],
    snippet: `const geometry = new THREE.IcosahedronGeometry(1.5, 12);\nconst material = new THREE.ShaderMaterial({ vertexShader, fragmentShader });\nconst mesh = new THREE.Mesh(geometry, material);`,
  },
  {
    id: 'figma',
    name: 'Figma & Design Tokens',
    category: 'design',
    role: 'Systemic UI/UX Architecture',
    version: 'Tokens',
    symbol: '❖',
    whyWeTeach: 'Teaches students how to construct scalable design systems that map 1-to-1 with production CSS tokens.',
    cohortProject: 'Comprehensive 40-component design system with dark/light themes and accessibility auditing.',
    masteryRubric: ['Auto-Layout & Responsive Constraints', 'Design Token Naming Conventions', 'Interactive Micro-Prototyping'],
    snippet: `:root {\n  --color-primary: var(--navy-600);\n  --radius-card: 16px;\n  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);\n}`,
  },
];

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTech, setActiveTech] = useState(techs[0]);

  const filteredTechs = activeCategory === 'all'
    ? techs
    : techs.filter((t) => t.category === activeCategory);

  return (
    <section id="tech-stack" className={styles.section}>
      <div className={styles.inner}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.labelWrapper}>
            <span className={styles.dot} />
            <span className={styles.label}>Applied Tooling & Curriculum Stack</span>
          </div>
          <h2 className={styles.title}>
            The tools we teach. <em>The tools that build the future.</em>
          </h2>
          <p className={styles.tagline}>
            No superficial drag-and-drop builders or outdated tutorials. We train students on modern production
            standards used by top-tier engineering teams worldwide.
          </p>

          {/* Category Filter Pills */}
          <div className={styles.filterRow}>
            {categories.map((cat) => {
              const count = cat.id === 'all' ? techs.length : techs.filter((t) => t.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Layout: Interactive Tooling Grid & Live Architectural Spec Inspector */}
        <div className={styles.layoutGrid}>
          
          {/* Left Grid */}
          <div className={styles.grid}>
            {filteredTechs.map((tech) => {
              const isSelected = activeTech.id === tech.id;
              return (
                <button
                  key={tech.id}
                  type="button"
                  className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                  onClick={() => setActiveTech(tech)}
                >
                  <div className={styles.chipTop}>
                    <span className={styles.chipIcon}>{tech.symbol}</span>
                    <span className={styles.chipVersion}>{tech.version}</span>
                  </div>
                  <span className={styles.chipName}>{tech.name}</span>
                  <span className={styles.chipRole}>{tech.role}</span>
                  <div className={styles.chipIndicator} />
                </button>
              );
            })}
          </div>

          {/* Right Inspector Box */}
          <div className={styles.inspectorCol}>
            <div className={styles.inspectorCard}>
              <div className={styles.inspectorHeader}>
                <div className={styles.inspectorHeaderLeft}>
                  <span className={styles.inspectorSymbol}>{activeTech.symbol}</span>
                  <div>
                    <h3 className={styles.inspectorTitle}>{activeTech.name}</h3>
                    <span className={styles.inspectorRole}>{activeTech.role}</span>
                  </div>
                </div>
                <span className={styles.versionBadge}>{activeTech.version}</span>
              </div>

              <div className={styles.inspectorBody}>
                {/* Why We Teach */}
                <div className={styles.specBlock}>
                  <span className={styles.specBlockLabel}>Why Kingshima Teaches This:</span>
                  <p className={styles.specBlockText}>{activeTech.whyWeTeach}</p>
                </div>

                {/* Cohort Project */}
                <div className={styles.specBlock}>
                  <span className={styles.specBlockLabel}>Cohort Production Deliverable:</span>
                  <p className={styles.specBlockProject}>{activeTech.cohortProject}</p>
                </div>

                {/* Mastery Rubric */}
                <div className={styles.specBlock}>
                  <span className={styles.specBlockLabel}>Mastery Checkpoints:</span>
                  <ul className={styles.rubricList}>
                    {activeTech.masteryRubric.map((item, idx) => (
                      <li key={idx} className={styles.rubricItem}>
                        <span className={styles.rubricCheck}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Snippet Preview */}
                <div className={styles.codeSnippetBox}>
                  <div className={styles.snippetHeader}>
                    <span>Pattern Implementation</span>
                    <span className={styles.snippetLang}>TypeScript / Production</span>
                  </div>
                  <pre className={styles.snippetPre}>
                    <code>{activeTech.snippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Continuous Marquee Track */}
        <div className={styles.scrollTrack} aria-hidden>
          <div className={styles.scrollContent}>
            {[...techs, ...techs].map((tech, i) => (
              <div key={i} className={styles.miniChip}>
                <span className={styles.miniSymbol}>{tech.symbol}</span>
                <span className={styles.miniName}>{tech.name}</span>
                <span className={styles.miniNote}>{tech.role}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;
