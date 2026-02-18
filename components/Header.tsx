'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, MapPin, Camera, Home, Landmark, Compass, Glasses, Info, ArrowRight } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui';
import { monuments } from '@/data/monuments';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const isHome = pathname === '/';
    const isNavbarActive = isScrolled || !isHome;

    // Get random recommendations
    const recommendations = monuments.slice(0, 3);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/gallery?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Explore', href: '/states', icon: Compass },
        { name: 'Gallery', href: '/gallery', icon: Camera },
        { name: 'Virtual Tours', href: '/virtual-tours', icon: Glasses },
        { name: 'About', href: '/about', icon: Info },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isNavbarActive
                    ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-200/50 py-3'
                    : 'bg-transparent py-4'
                    }`}
            >
                <nav className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                className="w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Landmark className="text-white w-6 h-6" strokeWidth={2} />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className={`text-xl font-black font-display tracking-tight leading-none transition-colors ${isNavbarActive ? 'text-slate-900' : 'text-white'}`}>
                                    BHARAT VISTA
                                </span>
                                <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                                    Digital Heritage
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className={`hidden lg:flex items-center gap-1 backdrop-blur-sm p-1.5 rounded-full border transition-colors duration-300 ${isNavbarActive ? 'bg-slate-100/80 border-slate-200/60 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${isNavbarActive ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={16} className={`opacity-70 group-hover:opacity-100 transition-opacity ${isNavbarActive ? 'text-slate-500 group-hover:text-primary' : 'text-white group-hover:text-white'}`} />
                                    <span>{item.name}</span>
                                    <div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-10 ${isNavbarActive ? 'bg-white shadow-sm' : 'bg-white/10'}`} />
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="hidden lg:flex items-center gap-4">
                            <motion.button
                                onClick={() => setIsSearchOpen(true)}
                                className={`relative z-10 p-2.5 rounded-full transition-all duration-300 border ${isNavbarActive ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Search size={20} />
                            </motion.button>

                            <div className={`w-px h-6 ${isNavbarActive ? 'bg-slate-200' : 'bg-white/20'}`} />

                            <ThemeSwitcher isScrolled={isNavbarActive} />

                            <Link href="/contribute">
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-opacity-20 ${isNavbarActive ? 'border-slate-200 text-slate-900 hover:bg-slate-100' : 'border-white/20 text-white hover:bg-white/10'}`}
                                >
                                    Contribute
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <ThemeSwitcher isScrolled={isNavbarActive} />
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-xl transition-colors ${isNavbarActive ? 'text-slate-900' : 'text-white'}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl mt-4 border border-white/20 shadow-2xl"
                            >
                                <div className="p-6 space-y-2">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-all group"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <item.icon size={20} />
                                                </div>
                                                <span className="font-semibold text-lg">{item.name}</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <div className="pt-4 mt-4 border-t border-slate-100">
                                        <Link href="/contribute" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button fullWidth size="lg" className="bg-primary text-white shadow-lg shadow-primary/25">
                                                Contribute Content
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </motion.header>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={24} />
                        </motion.button>

                        <div className="w-full max-w-2xl">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-center mb-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-2">What are you looking for?</h2>
                                <p className="text-slate-400">Search for monuments, cities, or eras</p>
                            </motion.div>

                            <motion.form
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                onSubmit={handleSearch}
                                className="relative mb-12"
                            >
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Type to search..."
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-500 text-xl py-6 pl-16 pr-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-2xl"
                                />
                            </motion.form>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-slate-500 font-medium mb-4 uppercase tracking-wider text-sm">Recommended</h3>
                                <div className="grid gap-4">
                                    {recommendations.map((monument, i) => (
                                        <Link
                                            key={monument.id}
                                            href={`/state/${monument.state.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                                                <img
                                                    src={monument.imageUrl}
                                                    alt={monument.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="text-white font-bold group-hover:text-primary transition-colors">{monument.name}</h4>
                                                <p className="text-slate-400 text-sm">{monument.city}, {monument.state}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                <ArrowRight size={18} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
