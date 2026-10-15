import CommunityClient from './CommunityClient';

export const metadata = {
  title: 'Our Community',
  description:
    'Join the Kingshima Foundation community of faith-driven technology innovators, creators, and leaders. Apply for our mentorship programs and grow together.',
  openGraph: {
    title: 'Our Community — Kingshima Foundation',
    description:
      'Become a builder, learner, or mentor. Explore stories of transformation and faith in tech.',
  },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
