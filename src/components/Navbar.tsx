'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaSignInAlt } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type MenuItem = {
    id: number;
    label: string;
    href: string;
    parent_id: number | null;
    visible: boolean;
    ord: number;
};

type MenuGroup = {
    label: string;
    href: string;
    dropdown: { label: string; href: string }[];
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [menuItems, setMenuItems] = useState<MenuGroup[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    const toggleMobileDropdown = (label: string) => {
        setOpenMobileDropdown(openMobileDropdown === label ? null : label);
    };

    useEffect(() => {
        const fetchMenu = async () => {
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .eq('visible', true)
                .order('ord', { ascending: true });

            if (error) {
                console.error('Errore nel recupero menu:', error.message);
                return;
            }

            const mainItems = data.filter((item: MenuItem) => item.parent_id === null);
            const dropdownItems = data.filter((item: MenuItem) => item.parent_id !== null);

            const grouped: MenuGroup[] = mainItems.map((main) => ({
                label: main.label,
                href: main.href,
                dropdown: dropdownItems
                    .filter((sub) => sub.parent_id === main.id)
                    .map((sub) => ({
                        label: sub.label,
                        href: sub.href,
                    })),
            }));

            grouped.push({ label: 'Archivio', href: '/archivio', dropdown: [] });

            setMenuItems(grouped);
        };

        fetchMenu();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
                setOpenMobileDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-[#DDDDDD] text-black sticky w-full z-50 shadow-md pt-3">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Top row */}
                <div className="grid grid-cols-3 items-center py-3">
                    <div className="flex justify-start">
                        <Image
                            src="/img/logo-ministero-difesa.png"
                            alt="Logo Ministero della Difesa"
                            width={175}
                            height={40}
                        />
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold text-4xl text-center text-black">Concorsi Online</span>
                    </div>
                    <div className="hidden lg:flex justify-end items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="CERCA NEL QUESTO SITO"
                                className="pl-3 pr-10 py-1 rounded text-black border border-[#999999] bg-white"
                            />
                            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-900" />
                        </div>
                        <button className="flex items-center space-x-2 bg-white text-black font-semibold px-4 py-1 rounded border border-gray-400 hover:bg-gray-200">
                            <FaSignInAlt className="text-xl" />
                            <span>Accedi</span>
                        </button>
                    </div>
                    <button
                        className="lg:hidden absolute top-4 right-4 p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <RxCross2 className="text-3xl text-black transition-transform duration-300" />
                        ) : (
                            <RxHamburgerMenu className="text-3xl text-black transition-transform duration-300" />
                        )}
                    </button>
                </div>

                {/* Desktop menu */}
                <nav ref={dropdownRef} className="hidden lg:flex justify-center items-center space-x-6 mt-4 relative z-40">
                    import Link from 'next/link';

                    <Link href="/" className="flex items-center space-x-1 text-black hover:text-blue-900">
                        <IoHomeSharp />
                        <span>Home</span>
                    </Link>


                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => toggleDropdown(item.label)}
                            className="flex items-center space-x-1 text-black font-medium hover:text-blue-900"
                        >
                            <span>{item.label}</span>
                            {item.dropdown.length > 0 && (
                                <MdKeyboardArrowDown
                                    className={`transition-transform duration-300 text-2xl ${openDropdown === item.label ? 'rotate-180' : ''}`}
                                />
                            )}
                        </button>
                    ))}

                    {/* Accordion laterale */}
                    <AnimatePresence>
                        {openDropdown && (
                            <motion.div
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed top-[110px] right-0 w-72 h-[calc(100vh-100px)] bg-[#DDDDDD] shadow-md border-l border-gray-300 z-50 overflow-y-auto"
                            >
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{openDropdown}</h2>
                                    {menuItems
                                        .find((group) => group.label === openDropdown)
                                        ?.dropdown.map((sub) => (
                                            <a
                                                key={sub.label}
                                                href={sub.href}
                                                className="block px-3 py-2 text-black hover:bg-[#CCCCCC] rounded"
                                            >
                                                {sub.label}
                                            </a>
                                        ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>

            {/* Mobile menu (rimasto invariato) */}
            {mobileOpen && (
                <div ref={dropdownRef} className="lg:hidden bg-[#003366] px-4 py-2 space-y-2">
                    <a href="/" className="block text-white hover:bg-[#002244] px-3 py-2 rounded">Home</a>
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            <button
                                onClick={() => toggleMobileDropdown(item.label)}
                                className="flex justify-between items-center w-full text-white px-3 py-2 rounded hover:bg-[#002244]"
                            >
                                <span>{item.label}</span>
                                {item.dropdown.length > 0 && (
                                    <MdKeyboardArrowDown
                                        className={`transition-transform duration-300 text-xl ${openMobileDropdown === item.label ? 'rotate-180' : ''}`}
                                    />
                                )}
                            </button>
                            {openMobileDropdown === item.label && item.dropdown.length > 0 && (
                                <div className="ml-4">
                                    {item.dropdown.map((sub) => (
                                        <a
                                            key={sub.label}
                                            href={sub.href}
                                            className="block text-white hover:bg-[#002244] px-3 py-1 rounded text-sm"
                                        >
                                            {sub.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="CERCA NEL QUESTO SITO"
                            className="w-full pl-3 pr-10 py-2 rounded text-black bg-white border border-[#999999]"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <button className="flex items-center justify-center space-x-2 w-full bg-white text-black font-semibold px-4 py-2 rounded border border-gray-400 hover:bg-gray-200">
                        <FaSignInAlt className="text-xl" />
                        <span>Accedi</span>
                    </button>
                </div>
            )}
        </header>
    );
}
