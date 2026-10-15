// Quiz Database for Kingshima Bootcamp Tracks

export const QUIZZES = {
  'web-dev': {
    title: 'Web Development Mastery Quiz',
    courseTitle: 'Web Development',
    xpReward: 250,
    questions: [
      {
        id: 'q1',
        question: 'What is the primary role of CSS Flexbox?',
        options: [
          'Styling database schemas',
          'One-dimensional layout alignment in rows or columns',
          'Writing server-side API endpoints',
          'Building 3D canvas animations'
        ],
        answerIndex: 1,
        explanation: 'Flexbox is designed for one-dimensional layout structure, aligning items horizontally or vertically.'
      },
      {
        id: 'q2',
        question: 'Which keyword allows non-blocking asynchronous execution in JavaScript?',
        options: ['defer', 'async / await', 'static', 'export'],
        answerIndex: 1,
        explanation: 'async/await lets promises run without freezing the main execution thread.'
      },
      {
        id: 'q3',
        question: 'What is the main advantage of React component decomposition?',
        options: [
          'Decreases file download speed',
          'Reusable UIs, memoization, and predictable state management',
          'Bypasses CSS styling completely',
          'Eliminates the need for HTML tags'
        ],
        answerIndex: 1,
        explanation: 'Modular components promote reusability and prevent full-page re-renders.'
      }
    ]
  },
  'python-ai': {
    title: 'Python AI & Automation Quiz',
    courseTitle: 'Python AI & Automations',
    xpReward: 250,
    questions: [
      {
        id: 'q1',
        question: 'What makes Python the preferred language for AI & Machine Learning?',
        options: [
          'It is compiled directly to C++',
          'Rich ecosystem of libraries like NumPy, PyTorch, and clean syntax',
          'It requires no variables',
          'It only runs on microcontrollers'
        ],
        answerIndex: 1,
        explanation: 'Python’s readable syntax combined with libraries makes model building fast and effective.'
      }
    ]
  }
};
