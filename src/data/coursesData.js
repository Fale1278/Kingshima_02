// Courses Data representing all courses and their curriculums on the platform
// Access model: registration is free. A single, one-time acceptance fee
// (see /src/data/accessConfig.js) unlocks ALL courses below — there is no
// per-course price anymore.

export const COURSES = [
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Engineering',
    instructor: 'Kingshima Lead',
    duration: '6 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    description: 'Go from zero to a deployed, fullstack website — HTML, CSS, JavaScript, React, and a live backend.',
    curriculum: [
      {
        week: 1,
        title: 'HTML & CSS Foundations',
        theme: 'Building Your First Website',
        color: '#ff6d40',
        lessons: [
          {
            id: 'wd-1-1',
            title: 'HTML & Page Structure',
            duration: '40 min',
            description: 'Learn the building blocks every website is made of.',
            video_url: '',
            resources: ['HTML Cheat Sheet'],
            assignment: 'Build the structure of a simple personal page.'
          },
          {
            id: 'wd-1-2',
            title: 'Styling with CSS',
            duration: '45 min',
            description: 'Add colour, spacing, and layout to your page.',
            video_url: '',
            resources: ['CSS Basics Guide'],
            assignment: 'Style your personal page — fonts, colours, spacing.'
          },
          {
            id: 'wd-1-3',
            title: 'Making It Mobile-Friendly',
            duration: '35 min',
            description: 'Make sure your site looks good on a phone, not just a laptop.',
            video_url: '',
            resources: ['Mobile-First Checklist'],
            assignment: 'Make your page look right on a phone screen.'
          }
        ],
        assignment: 'Publish a one-page personal portfolio site.'
      },
      {
        week: 2,
        title: 'CSS Layouts & Design Systems',
        theme: 'Flexbox, Grid & Real Layouts',
        color: '#fbbf24',
        lessons: [
          {
            id: 'wd-2-1',
            title: 'Flexbox for Layouts',
            duration: '40 min',
            description: 'Line up and space elements the way real websites do.',
            video_url: '',
            resources: ['Flexbox Cheat Sheet'],
            assignment: 'Build a responsive navigation bar with Flexbox.'
          },
          {
            id: 'wd-2-2',
            title: 'CSS Grid for Page Layouts',
            duration: '40 min',
            description: 'Structure a full page layout in two dimensions.',
            video_url: '',
            resources: ['Grid Cheat Sheet'],
            assignment: 'Recreate a card-grid gallery layout.'
          },
          {
            id: 'wd-2-3',
            title: 'Design Consistency & Reusable Styles',
            duration: '35 min',
            description: 'Keep colours, spacing, and fonts consistent across a whole site.',
            video_url: '',
            resources: ['Design Tokens Guide'],
            assignment: 'Turn your portfolio\u2019s styles into reusable CSS variables.'
          }
        ],
        assignment: 'Rebuild a real webpage layout using Flexbox and Grid.'
      },
      {
        week: 3,
        title: 'JavaScript Fundamentals',
        theme: 'Programming Logic',
        color: '#a78bfa',
        lessons: [
          {
            id: 'wd-3-1',
            title: 'JavaScript Basics & Logic',
            duration: '50 min',
            description: 'Variables, conditions, and loops — the logic behind interactivity.',
            video_url: '',
            resources: ['JS Basics Handout'],
            assignment: 'Solve 5 simple logic problems in JavaScript.'
          },
          {
            id: 'wd-3-2',
            title: 'Working with the DOM',
            duration: '45 min',
            description: 'Connect JavaScript to buttons and page elements.',
            video_url: '',
            resources: ['DOM Basics Guide'],
            assignment: 'Build a button that adds items to a list.'
          },
          {
            id: 'wd-3-3',
            title: 'Events & Interactivity',
            duration: '40 min',
            description: 'Respond to clicks, typing, and other user actions.',
            video_url: '',
            resources: ['Event Handling Guide'],
            assignment: 'Build a simple interactive quiz or calculator.'
          }
        ],
        assignment: 'Build a small interactive to-do app.'
      },
      {
        week: 4,
        title: 'JavaScript in the Real World',
        theme: 'APIs & Dynamic Data',
        color: '#60a5fa',
        lessons: [
          {
            id: 'wd-4-1',
            title: 'Fetching Data from APIs',
            duration: '40 min',
            description: 'Pull real data from the internet into your page.',
            video_url: '',
            resources: ['Fetch API Cheat Sheet'],
            assignment: 'Show live weather or news data on a page.'
          },
          {
            id: 'wd-4-2',
            title: 'Async/Await & Promises',
            duration: '40 min',
            description: 'Handle things that take time — like loading data — cleanly.',
            video_url: '',
            resources: ['Async/Await Guide'],
            assignment: 'Rewrite one of your fetch calls using async/await.'
          },
          {
            id: 'wd-4-3',
            title: 'Error Handling & Loading States',
            duration: '30 min',
            description: 'Make your app feel solid even when things go wrong or take time.',
            video_url: '',
            resources: ['Error Handling Checklist'],
            assignment: 'Add a loading spinner and an error message to your API app.'
          }
        ],
        assignment: 'Build a weather or news app with live, real data.'
      },
      {
        week: 5,
        title: 'Intro to React',
        theme: 'Building With Components',
        color: '#34d399',
        lessons: [
          {
            id: 'wd-5-1',
            title: 'React Fundamentals & Components',
            duration: '45 min',
            description: 'A gentle first look at building UIs with reusable components.',
            video_url: '',
            resources: ['React Starter Guide'],
            assignment: 'Turn one section of your site into a component.'
          },
          {
            id: 'wd-5-2',
            title: 'State with useState',
            duration: '40 min',
            description: 'Make components remember and react to changes.',
            video_url: '',
            resources: ['useState Guide'],
            assignment: 'Build a filterable product list.'
          },
          {
            id: 'wd-5-3',
            title: 'Fetching Data with useEffect',
            duration: '40 min',
            description: 'Load data automatically when a component appears.',
            video_url: '',
            resources: ['useEffect Guide'],
            assignment: 'Auto-fetch and display data in a React component.'
          }
        ],
        assignment: 'Refactor your to-do app into a fully stateful React app.'
      },
      {
        week: 6,
        title: 'Backend, Databases & Shipping',
        theme: 'Going Fullstack',
        color: '#f472b6',
        lessons: [
          {
            id: 'wd-6-1',
            title: 'Node.js & Express Basics',
            duration: '45 min',
            description: 'Build a simple server that can respond to requests.',
            video_url: '',
            resources: ['Express Starter Guide'],
            assignment: 'Build 2 working API endpoints with Express.'
          },
          {
            id: 'wd-6-2',
            title: 'Connecting a Database',
            duration: '45 min',
            description: 'Save and retrieve real data instead of using fake arrays.',
            video_url: '',
            resources: ['Database Basics Guide'],
            assignment: 'Connect your Express API to a real database.'
          },
          {
            id: 'wd-6-3',
            title: 'Deploying Your Fullstack Project',
            duration: '40 min',
            description: 'Get your frontend and backend both live on the internet.',
            video_url: '',
            resources: ['Deployment Checklist'],
            assignment: 'Deploy your complete fullstack project.'
          }
        ],
        assignment: 'Ship a live, deployed fullstack capstone project.'
      }
    ]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design (Canva & Mobile)',
    category: 'Design',
    instructor: 'Creative Director',
    duration: '3 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    description: 'Design scroll-stopping graphics and brand visuals using Canva — right from your phone, no laptop needed.',
    curriculum: [
      {
        week: 1,
        title: 'Canva Basics on Mobile',
        theme: 'Getting Comfortable in Canva',
        color: '#ff6d40',
        lessons: [
          {
            id: 'gd-1-1',
            title: 'Navigating the Canva App',
            duration: '30 min',
            description: 'Learn your way around templates, elements, and the editor.',
            video_url: '',
            resources: ['Canva Quick-Start Guide'],
            assignment: 'Recreate one template in your own style.'
          },
          {
            id: 'gd-1-2',
            title: 'Text & Layout That Work',
            duration: '35 min',
            description: 'Simple rules for text that reads well and looks clean.',
            video_url: '',
            resources: ['Layout Basics Sheet'],
            assignment: 'Design 3 text-based quote graphics.'
          },
          {
            id: 'gd-1-3',
            title: 'Picking Colours & Fonts',
            duration: '30 min',
            description: 'Choose combinations that look intentional, not random.',
            video_url: '',
            resources: ['Colour Pairing Guide'],
            assignment: 'Build a simple 3-colour, 2-font palette.'
          }
        ],
        assignment: 'Design a 3-post Instagram carousel.'
      },
      {
        week: 2,
        title: 'Branding & Content Design',
        theme: 'Designing for a Business',
        color: '#a78bfa',
        lessons: [
          {
            id: 'gd-2-1',
            title: 'Building a Simple Brand Kit',
            duration: '40 min',
            description: 'Logo, colours, and fonts — kept consistent across every design.',
            video_url: '',
            resources: ['Brand Kit Template'],
            assignment: 'Create a one-page brand kit for a business idea.'
          },
          {
            id: 'gd-2-2',
            title: 'Flyers & Posters That Sell',
            duration: '40 min',
            description: 'Design promotional graphics people actually stop to read.',
            video_url: '',
            resources: ['Flyer Layout Pack'],
            assignment: 'Design a flyer for a real or imaginary event.'
          },
          {
            id: 'gd-2-3',
            title: 'Social Media Templates',
            duration: '35 min',
            description: 'Build reusable templates so you can design fast, every week.',
            video_url: '',
            resources: ['Template Starter Pack'],
            assignment: 'Build a reusable weekly content template.'
          }
        ],
        assignment: 'Create a mini brand kit plus 5 branded posts for a business.'
      },
      {
        week: 3,
        title: 'Client-Ready Design Skills',
        theme: 'Getting Paid to Design',
        color: '#34d399',
        lessons: [
          {
            id: 'gd-3-1',
            title: 'Working With a Client Brief',
            duration: '35 min',
            description: 'Turn a client\u2019s vague request into a clear design.',
            video_url: '',
            resources: ['Client Brief Template'],
            assignment: 'Fill out a brief for a sample client request.'
          },
          {
            id: 'gd-3-2',
            title: 'Exporting & Delivering Files',
            duration: '25 min',
            description: 'Get files sized and formatted the way clients expect.',
            video_url: '',
            resources: ['Export Settings Cheat Sheet'],
            assignment: 'Export one design in 3 different formats/sizes.'
          },
          {
            id: 'gd-3-3',
            title: 'Building a Design Portfolio',
            duration: '35 min',
            description: 'Put your best work in one place people can find.',
            video_url: '',
            resources: ['Portfolio Layout Ideas'],
            assignment: 'Publish a portfolio page or Instagram grid of your work.'
          }
        ],
        assignment: 'Complete one real design brief and publish a portfolio.'
      }
    ]
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    category: 'Data',
    instructor: 'Kingshima Lead',
    duration: '3 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    description: 'Learn to clean, analyse, and visualise real data using Excel/Google Sheets and beginner-friendly tools.',
    curriculum: [
      {
        week: 1,
        title: 'Data Foundations',
        theme: 'Getting Your Data Ready',
        color: '#ff6d40',
        lessons: [
          {
            id: 'da-1-1',
            title: 'What Data Analysis Actually Is',
            duration: '30 min',
            description: 'A plain-language look at what analysts really do day to day.',
            video_url: '',
            resources: ['Intro Overview PDF'],
            assignment: 'Write down 3 questions data could answer in your daily life.'
          },
          {
            id: 'da-1-2',
            title: 'Cleaning Messy Data',
            duration: '45 min',
            description: 'Fix errors, blanks, and duplicates before you analyse anything.',
            video_url: '',
            resources: ['Data Cleaning Checklist'],
            assignment: 'Clean a sample messy spreadsheet.'
          },
          {
            id: 'da-1-3',
            title: 'Sorting & Filtering in Sheets',
            duration: '35 min',
            description: 'Quickly find what matters in a large dataset.',
            video_url: '',
            resources: ['Sheets Shortcuts Sheet'],
            assignment: 'Sort and filter a dataset to answer 3 questions.'
          }
        ],
        assignment: 'Take a messy dataset from raw to clean.'
      },
      {
        week: 2,
        title: 'Analysing & Visualising',
        theme: 'Turning Numbers Into Answers',
        color: '#a78bfa',
        lessons: [
          {
            id: 'da-2-1',
            title: 'Formulas & Pivot Tables',
            duration: '50 min',
            description: 'Summarise big datasets in a few clicks.',
            video_url: '',
            resources: ['Pivot Table Guide'],
            assignment: 'Build a pivot table summary of a sample dataset.'
          },
          {
            id: 'da-2-2',
            title: 'Charts That Tell a Story',
            duration: '40 min',
            description: 'Pick the right chart so your numbers are easy to understand.',
            video_url: '',
            resources: ['Chart Type Cheat Sheet'],
            assignment: 'Turn one dataset into 2 clear charts.'
          },
          {
            id: 'da-2-3',
            title: 'Intro to Simple Dashboards',
            duration: '40 min',
            description: 'Bring your charts and numbers onto one clean page.',
            video_url: '',
            resources: ['Dashboard Layout Template'],
            assignment: 'Lay out a one-page dashboard draft.'
          }
        ],
        assignment: 'Build a one-page dashboard from a real dataset.'
      },
      {
        week: 3,
        title: 'Real-World Insights',
        theme: 'Analysing Like a Professional',
        color: '#34d399',
        lessons: [
          {
            id: 'da-3-1',
            title: 'Asking the Right Questions',
            duration: '30 min',
            description: 'Good analysis starts with a sharp question, not a spreadsheet.',
            video_url: '',
            resources: ['Question Framing Guide'],
            assignment: 'Write 3 sharp questions for a dataset of your choice.'
          },
          {
            id: 'da-3-2',
            title: 'Using AI to Speed Up Analysis',
            duration: '35 min',
            description: 'Use tools like ChatGPT to explore data and check your thinking faster.',
            video_url: '',
            resources: ['AI Prompting for Data'],
            assignment: 'Use an AI tool to help summarise a dataset.'
          },
          {
            id: 'da-3-3',
            title: 'Presenting Findings Simply',
            duration: '35 min',
            description: 'Explain what you found in plain language anyone can follow.',
            video_url: '',
            resources: ['Presentation Template'],
            assignment: 'Write up 3 key findings in plain English.'
          }
        ],
        assignment: 'Analyse a dataset of your choice and present 3 key insights.'
      }
    ]
  },
  {
    id: 'ai-automations',
    title: 'AI Automations',
    category: 'AI',
    instructor: 'Kingshima Lead',
    duration: '3 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    description: 'Use ChatGPT, Claude, and AI visual tools like Flow to automate real tasks and create content faster.',
    curriculum: [
      {
        week: 1,
        title: 'Talking to AI the Right Way',
        theme: 'Prompt Engineering Basics',
        color: '#ff6d40',
        lessons: [
          {
            id: 'ai-1-1',
            title: 'Prompt Engineering Basics',
            duration: '40 min',
            description: 'Learn how to ask AI for what you actually want, clearly.',
            video_url: '',
            resources: ['Prompt Templates Pack'],
            assignment: 'Write and test 5 prompts for tasks you do weekly.'
          },
          {
            id: 'ai-1-2',
            title: 'ChatGPT vs Claude — When to Use Which',
            duration: '35 min',
            description: 'A practical comparison so you know which tool to reach for.',
            video_url: '',
            resources: ['Tool Comparison Sheet'],
            assignment: 'Run the same task through both tools and compare results.'
          },
          {
            id: 'ai-1-3',
            title: 'Everyday AI Use Cases',
            duration: '30 min',
            description: 'Simple, real ways to use AI at work, school, or business.',
            video_url: '',
            resources: ['Use Case Checklist'],
            assignment: 'List 5 tasks in your life AI could take off your plate.'
          }
        ],
        assignment: 'Write 10 working prompts for real tasks you do weekly.'
      },
      {
        week: 2,
        title: 'AI for Visuals & Content',
        theme: 'Creating Faster With AI',
        color: '#a78bfa',
        lessons: [
          {
            id: 'ai-2-1',
            title: 'AI Image & Video Generation',
            duration: '45 min',
            description: 'Generate visuals and short video clips using tools like Flow.',
            video_url: '',
            resources: ['Visual Prompt Library'],
            assignment: 'Generate 5 visuals for a real project or idea.'
          },
          {
            id: 'ai-2-2',
            title: 'Turning Ideas Into Content',
            duration: '35 min',
            description: 'Go from a rough idea to a finished post, caption, or design.',
            video_url: '',
            resources: ['Idea-to-Content Framework'],
            assignment: 'Turn one idea into a finished piece of content.'
          },
          {
            id: 'ai-2-3',
            title: 'Batch-Creating Content With AI',
            duration: '35 min',
            description: 'Create a week\u2019s worth of content in one sitting.',
            video_url: '',
            resources: ['Batch Content Template'],
            assignment: 'Batch-create 5 pieces of content in one session.'
          }
        ],
        assignment: 'Create a 5-piece content set using AI visual tools.'
      },
      {
        week: 3,
        title: 'Automating Your Work',
        theme: 'Making AI Do the Repetitive Stuff',
        color: '#34d399',
        lessons: [
          {
            id: 'ai-3-1',
            title: 'Simple Workflow Automations',
            duration: '40 min',
            description: 'Automate one repetitive task step by step.',
            video_url: '',
            resources: ['Automation Starter Guide'],
            assignment: 'Automate one small recurring task.'
          },
          {
            id: 'ai-3-2',
            title: 'Connecting AI Tools Together',
            duration: '35 min',
            description: 'Chain tools together so work moves without you doing it manually.',
            video_url: '',
            resources: ['Tool-Chaining Examples'],
            assignment: 'Connect 2 tools to remove one manual step from your workflow.'
          },
          {
            id: 'ai-3-3',
            title: 'Shipping an Automated Project',
            duration: '35 min',
            description: 'Package your automation so it actually gets used.',
            video_url: '',
            resources: ['Launch Checklist'],
            assignment: 'Document and share your finished automation.'
          }
        ],
        assignment: 'Build and document one real automation that saves you time weekly.'
      }
    ]
  }
];

// ─── Sequential ("drip") learning helpers ─────────────────────────────────
// Lessons within a course unlock one at a time, in order. A lesson is
// unlocked once the lesson immediately before it has been marked complete
// (which the lesson page now does automatically once you submit that
// lesson's assignment). The very first lesson of every course is always
// unlocked.

export function getCourseLessonOrder(course) {
  return course.curriculum.flatMap((week) => week.lessons.map((l) => l.id));
}

export function isLessonUnlocked(course, lessonId, progress = []) {
  const order = getCourseLessonOrder(course);
  const idx = order.indexOf(lessonId);
  if (idx <= 0) return true; // first lesson (or unknown id) — never blocked
  return progress.includes(order[idx - 1]);
}
