import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#060612]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 group cursor-pointer">
                            <div className="absolute inset-1 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                            <img src="/logo192.png" alt="ZexAi" className="relative w-10 h-10 object-contain drop-shadow-lg" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            ZexAi
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher Placeholder */}
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                            <span>🌐</span>
                            <span>Türkçe</span>
                        </div>

                        {/* Wallet Connect Button */}
                        <div className="hidden md:flex items-center">
                            <w3m-button />
                        </div>

                        {/* App Login */}
                        <a
                            href="https://app.zexai.io"
                            className="hidden md:block px-5 py-2.5 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-white"
                        >
                            Uygulamaya Git
                        </a>

                        {/* Mobile Menu Toggle */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-400 hover:text-white p-2"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-[#0A0A1F] border-b border-white/10"
                >
                    <div className="px-4 pt-4 pb-6 space-y-3">
                        <div className="flex justify-center w-full">
                            <w3m-button />
                        </div>
                        <a
                            href="https://app.zexai.io"
                            className="w-full block text-center px-5 py-3 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-white"
                        >
                            Uygulamaya Git
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
