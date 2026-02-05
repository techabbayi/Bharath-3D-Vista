import { getMonumentById, getFeaturedMonuments, monuments } from '@/data/monuments';
import SketchfabViewer from '@/components/SketchfabViewer';
import AudioGuide from '@/components/AudioGuide';
import MonumentCard from '@/components/MonumentCard';
import Soundscape from '@/components/Soundscape';
import AIHeritageGuide from '@/components/AIHeritageGuide';
import HeritagePassport from '@/components/HeritagePassport';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const monument = getMonumentById(id);
    if (!monument) return { title: 'Monument Not Found' };
    return {
        title: `${monument.name} - Bharat Vista 3D`,
        description: monument.description,
    };
}

export async function generateStaticParams() {
    return monuments.map((monument) => ({
        id: monument.id,
    }));
}

// Helper to get actual IST time and determine vibe
function getLiveVibe() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hour = istTime.getUTCHours();

    if (hour >= 5 && hour < 8) return 'sunrise';
    if (hour >= 8 && hour < 16) return 'noon';
    if (hour >= 16 && hour < 19) return 'golden-hour';
    if (hour >= 19 && hour < 22) return 'twilight';
    return 'misty'; // Late night vibe
}

export default async function MonumentPage({ params }: PageProps) {
    const { id } = await params;
    const monument = getMonumentById(id);

    if (!monument) notFound();

    const relatedMonuments = getFeaturedMonuments().filter(m => m.id !== id).slice(0, 3);
    const liveVibe = getLiveVibe();

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-primary selection:text-white pb-20 font-sans">
            {/* 1. IMMERSIVE HERO STAGE */}
            <div className="relative bg-slate-950 pt-32 pb-24 overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-12">
                        <Link href="/" className="hover:text-primary transition-colors">Digital Archive</Link>
                        <span className="opacity-20">/</span>
                        <span className="text-white/60">{monument.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Title & Badge Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{monument.category} • {monument.state}</span>
                            </div>

                            <h1 className="text-7xl md:text-9xl font-black font-display text-white tracking-tighter leading-[0.85]">
                                {monument.name}
                            </h1>

                            <p className="text-xl text-white/50 font-medium leading-relaxed max-w-lg">
                                {monument.description}
                            </p>

                            <div className="flex items-center gap-8 pt-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Established</span>
                                    <span className="text-2xl font-black text-white tracking-tight">{monument.builtYear}</span>
                                </div>
                                <div className="w-px h-12 bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Architecture</span>
                                    <span className="text-2xl font-black text-white tracking-tight">{monument.dynasty}</span>
                                </div>
                            </div>
                        </div>

                        {/* 3D Viewer Column */}
                        <div className="lg:col-span-7 h-[500px] md:h-[700px] relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
                            <div className="w-full h-full rounded-[60px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-sm relative group">
                                <SketchfabViewer
                                    modelId={monument.sketchfabId}
                                    monumentName={monument.name}
                                    vibe={liveVibe}
                                    highlights={monument.highlights}
                                />
                                {/* Bottom Floating Controls */}
                                <div className="absolute bottom-10 left-10 z-30">
                                    <Soundscape type={monument.ambientAudio} active={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. KNOWLEDGE HUB GRID */}
            <div className="container mx-auto px-6 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Narrative Column */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Narrative Panel */}
                        <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                            <div className="flex items-center gap-5 mb-12">
                                <span className="w-16 h-[2px] bg-primary" />
                                <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">The Chronicle</h3>
                            </div>

                            <div className="prose prose-slate prose-xl max-w-none">
                                {monument.history.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="text-slate-600 font-medium leading-[1.85] mb-10 last:mb-0 text-xl md:text-2xl">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Interactive AI Companion Section */}
                        <div className="bg-white rounded-[60px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-2">
                            <AIHeritageGuide monument={monument} />
                        </div>
                    </div>

                    {/* Action Hub Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Audio Guide Panel */}
                        <div className="bg-slate-900 p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-1000" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                    </div>
                                    <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Expert Narration</h3>
                                </div>
                                <AudioGuide
                                    audioUrl={monument.audioGuideUrl || ''}
                                    audioText={monument.audioGuideText}
                                    translations={monument.audioGuideTranslations}
                                    monumentName={monument.name}
                                />
                            </div>
                        </div>

                        {/* Visitor Intelligence Panel */}
                        <div className="bg-white p-10 rounded-[50px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Site Intel</h3>
                                <div className="px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Entry Open</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 hover:border-primary/20 transition-all duration-300">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Entrance</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter italic">₹{monument.category === 'temple' ? 'Free' : '50+'}</p>
                                </div>
                                <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 hover:border-primary/20 transition-all duration-300">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Duration</p>
                                    <p className="text-sm font-black text-slate-900 leading-tight uppercase">Sunrise —<br />Sunset</p>
                                </div>
                            </div>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(monument.name + ' ' + monument.city)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-7 bg-slate-950 text-white rounded-[32px] hover:bg-primary transition-all duration-500 group/nav shadow-2xl shadow-slate-950/20 hover:shadow-primary/40"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/nav:bg-white/20 transition-all duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Physical Site</span>
                                        <span className="font-bold text-base tracking-tight">{monument.city}</span>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 group-hover/nav:translate-x-2 transition-transform opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </a>
                        </div>

                        {/* Digital Collectible Section */}
                        <div className="transform hover:scale-[1.02] transition-all duration-500">
                            <HeritagePassport currentMonumentId={monument.id} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. DISCOVERY REEL */}
            <section className="py-40 mt-32 relative overflow-hidden bg-white">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="space-y-4">
                            <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em] block">Beyond Boundaries</span>
                            <h2 className="text-6xl md:text-7xl font-black font-display tracking-tighter text-slate-900">Discover More</h2>
                        </div>
                        <Link href="/" className="group flex items-center gap-4 px-10 py-5 bg-slate-900 hover:bg-primary text-white rounded-full transition-all duration-500 shadow-xl shadow-slate-900/10">
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">The Full Archive</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {relatedMonuments.map(m => (
                            <div key={m.id} className="group hover:-translate-y-4 transition-all duration-700">
                                <MonumentCard monument={m} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
