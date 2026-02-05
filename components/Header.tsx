'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform flex-shrink-0">
                            <span className="text-xl font-bold text-white">IN</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-slate-800 font-display tracking-tight leading-none mb-1">
                                BHARAT VISTA
                            </span>
                            <span className="text-xs text-primary font-bold tracking-[0.2em] uppercase">
                                3D HERITAGE
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link
                            href="/"
                            className={`font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-700 hover:text-primary'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/states"
                            className={`font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-700 hover:text-primary'}`}
                        >
                            States
                        </Link>
                        <Link
                            href="/about"
                            className={`font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-700 hover:text-primary'}`}
                        >
                            Gallery
                        </Link>
                        <Link href="/monument/taj-mahal" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:scale-95">
                            Virtual Tour
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-slate-800"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 p-6 animate-fade-in">
                        <div className="flex flex-col gap-6 text-center">
                            <Link
                                href="/"
                                className="text-xl font-bold text-slate-800 hover:text-primary py-2 transition-colors border-b border-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/states"
                                className="text-xl font-bold text-slate-800 hover:text-primary py-2 transition-colors border-b border-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                States
                            </Link>
                            <Link
                                href="/about"
                                className="text-xl font-bold text-slate-800 hover:text-primary py-2 transition-colors border-b border-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Gallery
                            </Link>
                            <Link
                                href="/monument/taj-mahal"
                                className="bg-primary text-white py-4 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Start Virtual Tour
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
