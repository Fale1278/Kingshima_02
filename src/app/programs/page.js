import ProgramsClient from './ProgramsClient';

export const metadata = {
  title: 'Training Programs',
  description:
    'Explore our comprehensive training programs. Master tech & digital skills, creative & media skills, biblical leadership, and innovation models at the Kingshima Foundation.',
  openGraph: {
    title: 'Training Programs — Kingshima Foundation',
    description:
      'Master high-demand tech skills and creative arts grounded in Godly values. Apply to our bootcamps today.',
  },
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
