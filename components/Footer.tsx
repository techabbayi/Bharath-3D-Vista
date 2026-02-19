'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { states } from '@/data/monuments';
import { useLanguage, languages, Language } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { language, setLanguage, t } = useLanguage();
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

    const currentLanguage = languages.find(l => l.code === language) || languages[0];

    return (
        <footer className="bg-slate-900 pt-32 pb-16 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

                    {/* Brand Column */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="flex items-center gap-3 mb-10 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 transform group-hover:rotate-12 transition-transform">
                                <span className="text-white text-2xl font-black">BV</span>
                            </div>
                            <div>
                                <span className="text-2xl font-black font-display tracking-tight text-white block">{t('hero.title')}</span>
                                <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase block">{t('hero.subtitle')}</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-md">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Linkedin, href: '#' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                >
                                    <social.icon size={20} className="opacity-60 group-hover:opacity-100 text-white transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Explore States */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-10">{t('footer.regionalWonders')}</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {states.slice(0, 6).map((state) => (
                                <Link
                                    key={state.slug}
                                    href={`/state/${state.slug}`}
                                    className="text-slate-400 hover:text-primary font-bold transition-all flex items-center gap-2 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary transition-colors"></div>
                                    {state.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-10">{t('footer.navigation')}</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { key: 'nav.discover', href: '/discover' },
                                { key: 'nav.virtualTours', href: '/virtual-tours' },
                                { key: 'nav.history', href: '/history' },
                                { key: 'nav.contribute', href: '/contribute' },
                                { key: 'nav.about', href: '/about' },
                                { key: 'nav.contact', href: '/contact' }
                            ].map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="text-slate-400 hover:text-white font-bold transition-all"
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-10">{t('footer.heritagePolicy')}</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { key: 'footer.privacyPolicy', href: '/privacy' },
                                { key: 'footer.termsAndConditions', href: '/terms' },
                                { key: 'footer.credits', href: '/credits' }
                            ].map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="text-slate-400 hover:text-white font-bold transition-all"
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-slate-500 font-bold text-sm">
                            © {currentYear} {t('footer.copyright')}
                        </p>
                        <p className="text-slate-500 text-xs font-medium">
                            {t('footer.developedBy')} <a href="https://github.com/techabbayi" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors">TechAbbayi</a>
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">
                            {t('footer.preserving')}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 p-1 bg-white/5 rounded-2xl border border-white/10 flex-wrap justify-center">
                        <div className="px-4 md:px-6 py-3">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">{t('footer.status')}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-white">{t('footer.allSystemsOperational')}</span>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                className="px-4 md:px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                                aria-label="Select Language"
                                aria-expanded={languageMenuOpen}
                            >
                                <span>{t('footer.language')}: {currentLanguage.code.toUpperCase()}</span>
                                <svg className={`w-3 h-3 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {languageMenuOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setLanguageMenuOpen(false)}
                                    />

                                    {/* Language Menu */}
                                    <div className="absolute bottom-full mb-2 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden min-w-[200px] z-50 animate-in slide-in-from-bottom-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setLanguageMenuOpen(false);
                                                }}
                                                className={`w-full px-6 py-3 text-left hover:bg-primary hover:text-white transition-all font-bold text-sm flex items-center justify-between gap-4 ${language === lang.code ? 'bg-primary/10 text-primary' : 'text-slate-900'
                                                    }`}
                                            >
                                                <span>{lang.nativeName}</span>
                                                <span className="text-[10px] font-black tracking-widest opacity-50">{lang.code.toUpperCase()}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
