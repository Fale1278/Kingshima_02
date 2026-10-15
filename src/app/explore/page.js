import ExploreClient from './ExploreClient';

export const metadata = {
  title: 'Explore Our Mission',
  description:
    'Discover the vision, values, and impact behind the Kingshima Foundation. Learn about our focus on faith-driven leadership, technical excellence, and global impact.',
  openGraph: {
    title: 'Explore Our Mission — Kingshima Foundation',
    description:
      'Learn why we merge technology and faith. Discover how we empower young visionaries for the digital age.',
  },
};

export default function ExplorePage() {
  return <ExploreClient />;
}
