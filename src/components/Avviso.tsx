'use client';
import { IoDocumentOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

export default function Avviso() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-transparent p-4 rounded max-w-2xl mx-auto"
        >
            <div className="relative bg-[rgba(221,221,221,0.5)] border border-[#DDDDDD] rounded-lg p-4 w-full h-auto">
                {/* Link in alto a sinistra */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-sm">
                    <IoDocumentOutline className="text-gray-600" />
                    <a
                        href="https://concorsi.difesa.it/Documents/Informativa_Privacy.pdf"
                        className="text-blue-700 hover:underline"
                    >
                        Privacy
                    </a>
                </div>

                {/* Link in alto a destra */}
                <div className="absolute top-3 right-3 flex items-center gap-2 text-sm">
                    <IoDocumentOutline className="text-gray-600" />
                    <a
                        href="https://concorsi.difesa.it/Documents/convenzione-trenitaliaefd634c5a6be62f2877cff000071f215.pdf"
                        className="text-blue-700 hover:underline"
                    >
                        Trenitalia
                    </a>
                </div>

                {/* Link in basso a sinistra */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm">
                    <IoDocumentOutline className="text-gray-600" />
                    <a
                        href="https://concorsi.difesa.it/Documents/BandiUffSott.pdf"
                        className="text-blue-700 hover:underline"
                    >
                        Ufficiali
                    </a>
                </div>

                {/* Link in basso a destra */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm">
                    <IoDocumentOutline className="text-gray-600" />
                    <a
                        href="https://concorsi.difesa.it/Documents/BandiGradTruppa.pdf"
                        className="text-blue-700 hover:underline"
                    >
                        Truppa
                    </a>
                </div>

                {/* Paragrafo centrale nel flusso */}
                <p className="mt-5 mb-8 text-gray-800 text-sm leading-snug">
                    Nei seguenti avvisi sono disponibili i calendari dei concorsi per il reclutamento di Ufficiali, Sottufficiali, Graduati e Militari di Truppa già pubblicati e da pubblicare nel 2° semestre 2025.
                </p>
            </div>
        </motion.div>
    );
}
