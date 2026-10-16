'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import AiAgentWidget from '@/components/AiAgentWidget';

export default function AppShell({ children }) {
  const pathname = usePathname();

  // Hide global chrome on private bootcamp pages and dedicated studio
  const hideShell =
    pathname?.startsWith('/bootcamp/dashboard') ||
    pathname?.startsWith('/bootcamp/admin') ||
    pathname?.startsWith('/studio');

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="app-container">
          <CustomCursor />
          {!hideShell && <Navbar />}
          <main>{children}</main>
          {!hideShell && <Footer />}
          <AiAgentWidget />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
