import { BootcampAuthProvider } from '@/context/BootcampAuthContext';
import StudioClient from './StudioClient';

export const metadata = {
  title: 'AI Studio — Interactive AI-Aided Tech Learning Platform | Kingshima',
  description:
    'Experience all-in-one AI-guided tech learning. Select your track, learn with an interactive AI instructor, draw on the live whiteboard, and build in real-time in the integrated workspace.',
  keywords: [
    'AI tech learning',
    'AI instructor',
    'interactive coding workspace',
    'AI whiteboard',
    'Kingshima studio',
    'learn to code with AI',
  ],
};

export default function StudioPage() {
  return (
    <BootcampAuthProvider>
      <StudioClient />
    </BootcampAuthProvider>
  );
}
