'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BandieraAnimata() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: [0.95, 1.05, 0.98, 1.02, 1],
                rotate: [0, -2, 2, -1, 1, 0],
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full my-12"
        >
            <Image
                src="/img/bandiera.jpg" // assicurati che sia in /public/img/
                alt="Bandiera Italiana"
                width={1200}
                height={300}
                className="w-full h-auto object-cover rounded shadow-xl"
                priority
            />
        </motion.div>
    );
}
