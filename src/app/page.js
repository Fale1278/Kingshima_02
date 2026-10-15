import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import TechStack from '@/components/TechStack';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ThreeDBackground from '@/components/ThreeDBackground';

export const metadata = {
  title: 'Kingshima Foundation — Faith + Tech Innovation',
  description:
    'Equipping young people with technical skills, creative tools, and Godly values. Explore our programs, bootcamp, and community.',
  openGraph: {
    title: 'Kingshima Foundation — Faith + Tech Innovation',
    description:
      'A faith-driven, youth-focused initiative empowering the next generation through digital technology, design, and Godly values.',
  },
};

export default function HomePage() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ThreeDBackground />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <TechStack />
      <Team />
      <Testimonials />
      <Contact />
    </div>
  );
}
