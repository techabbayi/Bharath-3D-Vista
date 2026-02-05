import { getMonumentsByState, getStateBySlug } from '@/data/monuments';
import MonumentCard from '@/components/MonumentCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const state = getStateBySlug(slug);

    if (!state) return { title: 'State Not Found' };

    return {
        title: `${state.name} Heritage - Bharat Vista 3D`,
        description: `Explore the architectural wonders of ${state.name} in immersive 3D and VR.`,
    };
}

export default async function StatePage({ params }: PageProps) {
    const { slug } = await params;
    const state = getStateBySlug(slug);
    const stateMonuments = getMonumentsByState(state?.name || '');

    if (!state || stateMonuments.length === 0) notFound();

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-primary selection:text-white pb-20 font-sans">
            {/* 1. IMMERSIVE STATE HERO */}
            <section className="relative h-[80vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-slate-950">
                <Image
                    src={state.imageUrl}
                    alt={state.name}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Sophisticated Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-slate-950 to-transparent opacity-80"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-12">
                        <Link href="/" className="hover:text-primary transition-colors">Digital Home</Link>
                        <span className="opacity-20">/</span>
                        <span className="text-white">Regions</span>
                        <span className="opacity-20">/</span>
                        <span className="text-white/60">{state.name}</span>
                    </nav>

                    <div className="max-w-4xl space-y-8">
                        <div className="inline-flex items-center gap-4 px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">State Collective • {stateMonuments.length} Sites</span>
                        </div>

                        <h1 className="text-8xl md:text-[10vw] font-black text-white font-display leading-[0.8] tracking-tighter">
                            {state.name}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-3xl">
                            {state.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. DISCOVERY GRID */}
            <section className="py-32 -mt-12 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                        <div className="space-y-4">
                            <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em] block">The Repository</span>
                            <h2 className="text-6xl font-black font-display tracking-tighter text-slate-900 italic">Architectural Gems</h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {['All Wonders', 'Sacred', 'Fortified', 'Royal'].map(filter => (
                                <button key={filter} className={`px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${filter === 'All Wonders' ? 'bg-slate-950 text-white shadow-2xl shadow-slate-950/20' : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100 hover:border-slate-200 shadow-sm'}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {stateMonuments.map((monument) => (
                            <div key={monument.id} className="group hover:-translate-y-4 transition-all duration-700">
                                <MonumentCard monument={monument} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. EXPERIENCE CTA */}
            <section className="pb-40">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-950 rounded-[80px] p-20 md:p-32 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                        {/* Ambient Glows */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-[100px]" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full translate-y-1/2 translate-x-1/2 blur-[100px]" />

                        <div className="relative z-10 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter leading-none italic">Begin a New <br />Chronicle</h2>
                                <p className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed">
                                    Step beyond {state.name} and explore the vast digital archive of Indian architectural heritage.
                                </p>
                            </div>

                            <Link href="/" className="inline-flex items-center gap-6 bg-white text-slate-950 font-black px-12 py-6 rounded-full transition-all hover:bg-primary hover:text-white shadow-2xl hover:scale-105 active:scale-95 duration-500">
                                <span className="text-xs uppercase tracking-[0.2em]">Explore All Frontiers</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
