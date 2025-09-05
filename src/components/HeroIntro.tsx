'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function HeroIntro({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2500); // durata intro

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
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
        </AnimatePresence>
    );
}
