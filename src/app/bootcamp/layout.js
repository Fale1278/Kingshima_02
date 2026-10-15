'use client';

import { BootcampAuthProvider } from '@/context/BootcampAuthContext';

export default function BootcampLayout({ children }) {
  return (
    <BootcampAuthProvider>
      {children}
    </BootcampAuthProvider>
  );
}
