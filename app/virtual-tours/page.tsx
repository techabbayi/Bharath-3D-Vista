'use client';

import { motion } from 'framer-motion';
import { Camera, Glasses, Headset, Play, Users } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { monuments } from '@/data/monuments';
import Link from 'next/link';

export default function VirtualToursPage() {
    const vrMonuments = monuments.filter(m => m.hasVR);

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 overflow-hidden relative">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-900/90 backdrop-blur-3xl" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-20 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium text-sm backdrop-blur-md border border-white/10">
                        <Headset size={16} />
                        <span>Virtual Reality Experience</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight">
                        Step Inside <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                            History
                        </span>
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        Experience India's monuments like never before. Put on your headset and walk through ancient corridors, climb towering minarets, and touch the past.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
                            <Play size={20} className="mr-2 fill-current" />
                            Start Demo Tour
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            Compatible Devices
                        </Button>
                    </div>
                </motion.div>

                {/* VR Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vrMonuments.map((monument, index) => (
                        <motion.div
                            key={monument.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/monument/${monument.id}`} className="block group h-full">
                                <div className="relative h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                    {/* Image Background */}
                                    <img
                                        src={monument.imageUrl}
                                        alt={monument.name}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-primary/20">
                                                VR Ready
                                            </span>
                                            {monument.hasPanorama && (
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                                    <Glasses size={14} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">{monument.name}</h3>
                                        <p className="text-slate-300 text-sm line-clamp-2 mb-6">{monument.description}</p>

                                        <div className="flex items-center gap-2 text-white/60 text-sm group-hover:text-primary transition-colors font-medium">
                                            <span>Enter Experience</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    {/* Hover Overlay Icon */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <Headset size={32} className="text-white" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Glasses}
                        title="Immersive 8K"
                        description="High-fidelity scans providing crystal clear details of carvings and textures."
                    />
                    <FeatureCard
                        icon={Users}
                        title="Multiplayer Tours"
                        description="Explore with friends and family in real-time, guided by expert historians."
                    />
                    <FeatureCard
                        icon={Camera}
                        title="Photo Mode"
                        description="Capture stunning angles that are impossible to reach in real life."
                    />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    )
}

function ArrowRight({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    )
}
