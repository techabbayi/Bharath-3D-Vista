import { getMonumentById, getFeaturedMonuments, monuments } from '@/data/monuments';
import SketchfabViewer from '@/components/SketchfabViewer';
import AudioGuide from '@/components/AudioGuide';
import MonumentCard from '@/components/MonumentCard';
import AIHeritageGuide from '@/components/AIHeritageGuide';
import HeritagePassport from '@/components/HeritagePassport';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AccessibilityButton from '@/components/AccessibilityButton';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const monument = getMonumentById(id);
    if (!monument) return {
        title: 'Monument Not Found - Bharat Vista 3D',
        description: 'The requested monument could not be found.'
    };

    const title = `${monument.name} - 3D Virtual Tour | Bharat Vista 3D`;
    const description = `Explore ${monument.name} in stunning 3D. ${monument.description} Built in ${monument.builtYear}, discover the ${monument.dynasty} architecture and rich history of this ${monument.category} in ${monument.city}, ${monument.state}.`;
    const url = `https://bharatvista3d.com/monument/${id}`;
    const imageUrl = monument.imageUrl || `https://bharatvista3d.com/og-images/${id}.jpg`;

    return {
        title,
        description,
        keywords: [
            monument.name,
            monument.state,
            monument.city,
            monument.category,
            monument.dynasty,
            'Indian heritage',
            '3D virtual tour',
            'Indian monuments',
            'cultural heritage',
            'architecture',
            'history',
            'tourism India'
        ],
        authors: [{ name: 'Bharat Vista 3D' }],
        creator: 'Bharat Vista 3D',
        publisher: 'Bharat Vista 3D',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            type: 'website',
            locale: 'en_IN',
            url,
            title,
            description,
            siteName: 'Bharat Vista 3D',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${monument.name} - 3D Virtual Tour`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
            creator: '@BharatVista3D',
        },
        alternates: {
            canonical: url,
        },
        verification: {
            google: 'your-google-verification-code',
        },
        other: {
            'application-name': 'Bharat Vista 3D',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
            'apple-mobile-web-app-title': 'Bharat Vista 3D',
        },
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

    // Structured Data for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: monument.name,
        description: monument.description,
        image: monument.imageUrl || `https://bharatvista3d.com/images/monuments/${id}.jpg`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: monument.city,
            addressRegion: monument.state,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: monument.coordinates?.lat || 0,
            longitude: monument.coordinates?.lng || 0,
        },
        url: `https://bharatvista3d.com/monument/${id}`,
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(monument.name + ' ' + monument.city)}`,
        additionalType: monument.category,
        founded: monument.builtYear,
        architect: {
            '@type': 'Organization',
            name: monument.dynasty,
        },
        touristType: ['History enthusiasts', 'Architecture lovers', 'Cultural tourists'],
        isAccessibleForFree: monument.category === 'temple',
        publicAccess: true,
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-primary selection:text-white pb-20 font-sans">
                {/* Accessibility Button */}
                <AccessibilityButton />

                {/* 1. IMMERSIVE HERO STAGE */}
                <div className="relative bg-slate-950 pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
                    {/* Background Ambient Glows */}
                    <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <nav className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/30 mb-8 md:mb-12 overflow-x-auto">
                            <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">Digital Archive</Link>
                            <span className="opacity-20">/</span>
                            <span className="text-white/60 truncate">{monument.name}</span>
                        </nav>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
                            {/* Title & Badge Column */}
                            <div className="lg:col-span-5 space-y-6 md:space-y-8">
                                <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-xs md:text-sm">
                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[8px] md:text-[10px] font-black text-white/80 uppercase tracking-[0.15em] md:tracking-[0.2em]">{monument.category} • {monument.state}</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-display text-white tracking-tighter leading-[0.85]">
                                    {monument.name}
                                </h1>

                                <p className="text-base md:text-lg lg:text-xl text-white/50 font-medium leading-relaxed max-w-lg">
                                    {monument.description}
                                </p>

                                <div className="flex items-center gap-4 md:gap-6 lg:gap-8 pt-4 md:pt-6 flex-wrap">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2">Established</span>
                                        <span className="text-xl md:text-2xl font-black text-white tracking-tight">{monument.builtYear}</span>
                                    </div>
                                    <div className="w-px h-10 md:h-12 bg-white/10" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2">Architecture</span>
                                        <span className="text-xl md:text-2xl font-black text-white tracking-tight">{monument.dynasty}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3D Viewer Column */}
                            <div className="lg:col-span-7 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
                                <div className="w-full h-full rounded-[30px] md:rounded-[50px] lg:rounded-[60px] overflow-hidden border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-sm relative group">
                                    <SketchfabViewer
                                        modelId={monument.sketchfabId}
                                        monumentName={monument.name}
                                        vibe={liveVibe}
                                        highlights={monument.highlights}
                                    />
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
                            <div className="bg-white p-8 md:p-12 lg:p-20 rounded-[40px] md:rounded-[60px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                                <div className="flex items-center gap-5 mb-12">
                                    <span className="w-16 h-[2px] bg-primary" />
                                    <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">The Chronicle</h3>
                                </div>

                                <div className="prose prose-slate prose-xl max-w-none">
                                    {monument.history.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className="text-slate-600 font-medium leading-[1.85] mb-10 last:mb-0 text-lg md:text-xl lg:text-2xl">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Visitor Intelligence Panel */}
                            <div className="bg-white p-8 md:p-10 rounded-[40px] md:rounded-[50px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Site Intel</h3>
                                    <div className="px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2 w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Entry Open</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                                    <div className="p-4 md:p-6 bg-slate-50/50 rounded-[24px] md:rounded-[32px] border border-slate-100 hover:border-primary/20 transition-all duration-300">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Entrance</p>
                                        <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter italic">₹{monument.category === 'temple' ? 'Free' : '50+'}</p>
                                    </div>
                                    <div className="p-4 md:p-6 bg-slate-50/50 rounded-[24px] md:rounded-[32px] border border-slate-100 hover:border-primary/20 transition-all duration-300">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Duration</p>
                                        <p className="text-xs md:text-sm font-black text-slate-900 leading-tight uppercase">Sunrise —<br />Sunset</p>
                                    </div>
                                    <div className="col-span-2 lg:col-span-2">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(monument.name + ' ' + monument.city)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-5 md:p-7 bg-slate-950 text-white rounded-[24px] md:rounded-[32px] hover:bg-primary transition-all duration-500 group/nav shadow-2xl shadow-slate-950/20 hover:shadow-primary/40 h-full"
                                        >
                                            <div className="flex items-center gap-3 md:gap-5">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/nav:bg-white/20 transition-all duration-300">
                                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Physical Site</span>
                                                    <span className="font-bold text-sm md:text-base tracking-tight">{monument.city}</span>
                                                </div>
                                            </div>
                                            <svg className="w-4 h-4 md:w-5 md:h-5 group-hover/nav:translate-x-2 transition-transform opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Hub Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Audio Guide Panel */}
                            <div className="bg-slate-900 p-8 md:p-10 rounded-[40px] md:rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
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

                            {/* Digital Collectible Section */}
                            <HeritagePassport currentMonumentId={monument.id} />
                        </div>
                    </div>
                </div>

                {/* 3. DISCOVERY REEL */}
                <section className="py-16 md:py-24 lg:py-32 xl:py-40 mt-16 md:mt-24 lg:mt-32 relative overflow-hidden bg-white">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-20">
                            <div className="space-y-3 md:space-y-4">
                                <span className="text-[9px] md:text-[11px] font-black text-primary uppercase tracking-[0.4em] md:tracking-[0.5em] block">Beyond Boundaries</span>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter text-slate-900">Discover More</h2>
                            </div>
                            <Link href="/" className="group flex items-center gap-3 md:gap-4 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-slate-900 hover:bg-primary text-white rounded-full transition-all duration-500 shadow-xl shadow-slate-900/10 w-fit">
                                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em]">The Full Archive</span>
                                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                            {relatedMonuments.map(m => (
                                <div key={m.id} className="group hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-700">
                                    <MonumentCard monument={m} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Floating AI Heritage Guide */}
                <AIHeritageGuide monument={monument} floating={true} />
            </div>
        </>
    );
}
