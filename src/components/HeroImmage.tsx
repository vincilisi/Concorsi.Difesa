'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroIntro() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 py-8 w-full max-w-4xl mx-auto">
            {/* Aeronautica */}
            <motion.div
                initial={{ x: -200, y: -100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="w-full h-[200px] relative"
            >
                <a href="#">
                    <Image
                        src="/img/aeronautica.png"
                        alt="Logo Aeronautica"
                        fill
                        className="object-contain rounded shadow-md"
                    />
                </a>
            </motion.div>

            {/* Marina */}
            <motion.div
                initial={{ x: 200, y: -100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="w-full h-[200px] relative"
            >
                <a href="#">
                    <Image
                        src="/img/marina.png"
                        alt="Logo Marina"
                        fill
                        className="object-contain rounded shadow-md"
                    />
                </a>
            </motion.div>

            {/* Esercito */}
            <motion.div
                initial={{ x: 200, y: 100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="w-full h-[200px] relative"
            >
                <a href="#">
                    <Image
                        src="/img/esercito.png"
                        alt="Logo Esercito"
                        fill
                        className="object-contain rounded shadow-md"
                    />
                </a>
            </motion.div>

            {/* Carabinieri */}
            <motion.div
                initial={{ x: -200, y: 100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="w-full h-[200px] relative"
            >
                <a href="#">
                    <Image
                        src="/img/carabbinieri.png"
                        alt="Logo Carabinieri"
                        fill
                        className="object-contain rounded shadow-md"
                    />
                </a>
            </motion.div>
        </div>
    );
}
