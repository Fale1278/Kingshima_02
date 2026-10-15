import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Kingshima Foundation. Send us a query about partnerships, project proposals, mentorship, or general support.',
  openGraph: {
    title: 'Contact Us — Kingshima Foundation',
    description:
      'Have a vision requiring elite engineering or want to partner with our foundation? Connect with our team.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
