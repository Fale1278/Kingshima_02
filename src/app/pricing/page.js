import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing & Packages',
  description:
    'Choose the perfect model to build your digital vision. Transparent pricing for web engineering, UI/UX modeling, and brand identity suite by the Kingshima team.',
  openGraph: {
    title: 'Pricing — Kingshima Foundation',
    description:
      'Explore our pricing plans for web engineering and digital design products. Start building your vision today.',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
