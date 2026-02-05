import Link from 'next/link';
import { states } from '@/data/monuments';

export default function Footer() {
    const currentYear = new Date().getFullYear();

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
                                <span className="text-2xl font-black font-display tracking-tight text-white block">BHARAT VISTA</span>
                                <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase block">3D Heritage Platform</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-md">
                            Bringing India&apos;s magnificent architectural heritage to life through immersive 3D narratives and virtual reality experiences.
                        </p>
                        <div className="flex gap-4">
                            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                <button
                                    key={social}
                                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                    title={social}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-40 group-hover:opacity-100">{social[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Explore States */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-10">Regional Wonders</h4>
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
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-10">Navigation</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {['Discover', 'Virtual Tours', 'History', 'About Us', 'Contact'].map((link) => (
                                <Link
                                    key={link}
                                    href="/"
                                    className="text-slate-400 hover:text-white font-bold transition-all"
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-10">Heritage Policy</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Credits'].map((link) => (
                                <Link
                                    key={link}
                                    href="/"
                                    className="text-slate-400 hover:text-white font-bold transition-all"
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-slate-500 font-bold text-sm">
                            © {currentYear} Ministry of Culture & Tourism, Govt of India (Mockup)
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">
                            Preserving the past for the future
                        </p>
                    </div>

                    <div className="flex items-center gap-8 p-1 bg-white/5 rounded-2xl border border-white/10">
                        <div className="px-6 py-3">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Status</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-white">All Systems Operational</span>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                            Language: EN
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
