import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog',
  description:
    'Read digital insights, software engineering concepts, design philosophy, and technology updates from the Kingshima Foundation team.',
  openGraph: {
    title: 'Blog — Kingshima Foundation',
    description:
      'Deep dives into programming, creative design, and faith-driven technology innovation.',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
