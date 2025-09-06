'use client';
import { useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import './globals.css';
import HeroImmage from '@/components/HeroImmage';
import Avviso from '@/components/Avviso';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [introDone, setIntroDone] = useState(true); // Intro disattivata

  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen overflow-y-auto relative bg-[rgba(221, 221, 221, 0.5)]">
        {/* Navbar animata da destra */}
        <AnimatePresence>
          {introDone && (
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Navbar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main animato dal basso */}
        {children}
        <div className="flex flex-col">
          <HeroImmage />
          <Avviso />
        </div>

      </body>
    </html>
  );
}
