// Static course data — swap lesson video_url / resources from Supabase in production

export const COURSE_WEEKS = [
  {
    week: 1,
    title: 'Foundations',
    theme: 'Building Your AI Base',
    color: '#ff6d40',
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to AI & Its Role in Productivity',
        duration: '45 min',
        description: 'Understand what AI tools exist today and how they fit into your workflow.',
        video_url: '',
        resources: ['AI Tools Overview PDF', 'Starter Checklist'],
        assignment: 'List 5 tasks in your life that could be automated or improved with AI.',
      },
      {
        id: '1-2',
        title: 'Prompt Engineering Fundamentals',
        duration: '60 min',
        description: 'Learn how to communicate clearly with AI models to get powerful results.',
        video_url: '',
        resources: ['Prompt Templates Pack', 'Cheat Sheet'],
        assignment: 'Write 10 prompts for your most common daily tasks and test them.',
      },
      {
        id: '1-3',
        title: 'Setting Up Your AI-Powered Workflow',
        duration: '50 min',
        description: 'Build your personal AI toolkit and daily system.',
        video_url: '',
        resources: ['Workflow Template', 'Tool Comparison Guide'],
        assignment: 'Design your weekly AI workflow and share it in the community.',
      },
    ],
    assignment: 'Map your current productivity workflow and identify 3 areas AI can improve.',
  },
  {
    week: 2,
    title: 'Creativity',
    theme: 'AI as Your Creative Partner',
    color: '#a78bfa',
    lessons: [
      {
        id: '2-1',
        title: 'AI for Content Creation',
        duration: '55 min',
        description: 'Generate, edit, and publish content 10x faster with AI assistance.',
        video_url: '',
        resources: ['Content Templates', 'Platform Guide'],
        assignment: 'Create 3 pieces of content using AI tools and post one publicly.',
      },
      {
        id: '2-2',
        title: 'Visual Design with AI',
        duration: '60 min',
        description: 'Use AI image and design tools to produce professional visuals.',
        video_url: '',
        resources: ['Design Tool Comparison', 'Prompt Library for Visuals'],
        assignment: 'Design a social media graphic set using at least one AI design tool.',
      },
      {
        id: '2-3',
        title: 'Building a Creative System',
        duration: '45 min',
        description: 'Create repeatable creative systems that leverage AI at every step.',
        video_url: '',
        resources: ['Creative System Template', 'Automation Map'],
        assignment: 'Document your creative system and identify automation opportunities.',
      },
    ],
    assignment: 'Build a mini content campaign using only AI-assisted tools.',
  },
  {
    week: 3,
    title: 'Productivity',
    theme: 'Automating the Boring Stuff',
    color: '#34d399',
    lessons: [
      {
        id: '3-1',
        title: 'Task Automation with AI',
        duration: '60 min',
        description: 'Automate repetitive tasks using AI-powered tools and workflows.',
        video_url: '',
        resources: ['Automation Blueprint', 'Tool Setup Guide'],
        assignment: 'Identify and automate one recurring task in your workflow.',
      },
      {
        id: '3-2',
        title: 'AI for Research & Learning',
        duration: '50 min',
        description: 'Use AI to learn faster, research deeper, and retain more.',
        video_url: '',
        resources: ['Research Framework', 'Note-Taking Templates'],
        assignment: 'Research a topic of your choice using only AI tools and present findings.',
      },
      {
        id: '3-3',
        title: 'Time Management with AI',
        duration: '45 min',
        description: 'Let AI help you plan, prioritize, and protect your time.',
        video_url: '',
        resources: ['Time Blocking Template', 'Priority Matrix'],
        assignment: 'Build a 2-week AI-assisted schedule and follow it for 3 days.',
      },
    ],
    assignment: 'Cut your weekly task time by 20% using automation and AI tools.',
  },
  {
    week: 4,
    title: 'Execution',
    theme: 'Shipping Your AI-Powered Project',
    color: '#fbbf24',
    lessons: [
      {
        id: '4-1',
        title: 'Project Planning with AI',
        duration: '55 min',
        description: 'Plan and scope a real project using AI for research and structure.',
        video_url: '',
        resources: ['Project Brief Template', 'AI Planning Prompts'],
        assignment: 'Define your capstone project scope using the AI planning framework.',
      },
      {
        id: '4-2',
        title: 'Execution & Iteration',
        duration: '60 min',
        description: 'Build, test, and iterate your project with AI feedback loops.',
        video_url: '',
        resources: ['Feedback Loop Guide', 'Iteration Template'],
        assignment: 'Complete your first version and get feedback from the community.',
      },
      {
        id: '4-3',
        title: 'Presenting & Shipping Your Work',
        duration: '50 min',
        description: 'Present your project professionally and share it with the world.',
        video_url: '',
        resources: ['Presentation Framework', 'Launch Checklist'],
        assignment: 'Publish your capstone project and share the link with the cohort.',
      },
    ],
    assignment: 'Ship your AI-powered capstone project by end of week.',
  },
];

export const WHAT_YOU_LEARN = [
  { icon: '💻', title: 'Web Development', desc: 'Build and publish real websites — HTML, CSS, JavaScript, and a live project.' },
  { icon: '🎨', title: 'Graphic Design', desc: 'Design branded, scroll-stopping graphics using Canva, right from your phone.' },
  { icon: '📊', title: 'Data Analysis', desc: 'Clean, analyse, and visualise real data using Sheets and beginner-friendly tools.' },
  { icon: '🤖', title: 'AI Automations', desc: 'Use ChatGPT, Claude, and AI visual tools to automate real tasks and create faster.' },
  { icon: '📋', title: 'Practical Assignments', desc: 'Every lesson ends with a real task, not just theory — you build as you learn.' },
  { icon: '🚀', title: 'A Finished Project', desc: 'Each track ends with a real, shareable project you can show off.' },
];

export const FAQ_ITEMS = [
  {
    q: 'Who is this platform for?',
    a: 'Anyone who wants practical, real-world skills in web development, design, data, or AI — no prior experience required.',
  },
  {
    q: 'Is registration really free?',
    a: 'Yes. Creating your student account costs nothing. A small one-time acceptance fee is only required to unlock full access to the courses.',
  },
  {
    q: 'How much is the acceptance fee, and what does it unlock?',
    a: 'A one-time fee of a few thousand naira unlocks lifetime access to every course on the platform — not just one track.',
  },
  {
    q: 'How do I pay?',
    a: 'From your dashboard, after you register and log in. Payment is handled securely through Paystack.',
  },
  {
    q: 'How long do I have access?',
    a: 'Once you pay the acceptance fee, you have lifetime access to every course and its resources.',
  },
  {
    q: 'Can I get a refund?',
    a: 'We offer a 7-day refund window on the acceptance fee. If you are not satisfied after your first week, reach out and we will process your refund.',
  },
];
