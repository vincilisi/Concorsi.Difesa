'use client';
import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import './globals.css';

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
  const [introDone, setIntroDone] = useState(!isHome);

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => {
        setIntroDone(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isHome]);

  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen overflow-y-auto relative">
        {/* Hero Intro */}
        <AnimatePresence>
          {!introDone && isHome && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="fixed inset-0 z-[999] bg-black"
            >
              <Image
                src="/img/bandiera.jpg"
                alt="Bandiera Italiana"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background bandiera */}
        {isHome && (
          <div className="fixed inset-0 -z-10">
            <Image
              src="/img/bandiera.jpg"
              alt="Bandiera Italiana"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}

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
        <AnimatePresence>
          {introDone && (
            <motion.main
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="pt-[120px] px-4 max-w-7xl mx-auto"
            >
              {children}
            </motion.main>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
