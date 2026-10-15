import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us',
  description:
    'Discover the mission, vision, and core pillars of the Kingshima Foundation. Learn about our commitment to raising a generation of Godly, technically empowered, and purpose-driven youths.',
  openGraph: {
    title: 'About Us — Kingshima Foundation',
    description:
      'Learn who we are and why we build faith-driven tech leaders. Explore our pillars and mission.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
