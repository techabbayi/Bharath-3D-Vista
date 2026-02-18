'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getStateBySlug, getMonumentsByState } from '@/data/monuments';
import { ArrowLeft, MapPin, Camera } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import MonumentCard from '@/components/MonumentCard';

export default function StateDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    if (!slug) return null;

    const stateData = getStateBySlug(slug);

    if (!stateData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">State Not Found</h1>
                    <Link href="/states">
                        <Button variant="outline">Return to States</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const monuments = getMonumentsByState(stateData.name);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={stateData.imageUrl}
                        alt={stateData.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://source.unsplash.com/1600x900/?${stateData.name},india,landscape`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <Link href="/states" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                                <ArrowLeft size={20} className="mr-2" />
                                Back to All States
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight mb-4">
                                {stateData.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
                                {stateData.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Monuments Content */}
            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-slate-100 pb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Heritage Sites</h2>
                            <p className="text-slate-600">Discover historical landmarks in {stateData.name}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-primary/5 px-6 py-3 rounded-2xl flex items-center gap-3 text-primary font-bold">
                                <MapPin size={20} />
                                <span>{monuments.length} Monuments</span>
                            </div>
                        </div>
                    </div>

                    {monuments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {monuments.map((monument, index) => (
                                <motion.div
                                    key={monument.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0">
                                        <div className="relative">
                                            <MonumentCard monument={monument} />
                                            <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-primary/20 transition-colors rounded-2xl" />
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <Camera size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900">No monuments found</h3>
                            <p className="text-slate-500 max-w-md mx-auto mt-2">
                                We are currently digitizing monuments in this region.
                                Check back soon for high-fidelity 3D scans and virtual tours.
                            </p>
                            <Link href="/gallery" className="mt-8 inline-block">
                                <Button variant="outline">Browse Full Gallery</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
