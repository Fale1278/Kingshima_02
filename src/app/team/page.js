import TeamClient from './TeamClient';

export const metadata = {
  title: 'Our Team',
  description:
    'Meet the passionate team of mentors, instructors, and builders leading the Kingshima Foundation. Learn about our vision to shape faith-filled, technically excellent leaders.',
  openGraph: {
    title: 'Our Team — Kingshima Foundation',
    description:
      'Meet the leadership, developers, and designers raising the next generation at Kingshima.',
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
