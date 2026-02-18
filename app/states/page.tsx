'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { states } from '@/data/monuments';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui';

export default function StatesPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        <MapPin size={16} />
                        <span>Discover India</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Region</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Journey through the diverse landscapes and architectural marvels of India's states and union territories.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {states.map((state, index) => (
                        <motion.div
                            key={state.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/state/${state.slug}`} className="group block h-full">
                                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-slate-50 group-hover:bg-white">
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        {/* Placeholder image logic since we might not have all images */}
                                        <div className="w-full h-full bg-slate-200 group-hover:scale-110 transition-transform duration-700">
                                            {/* We would use Image component here if we had real images, for now using a colored div or the image url if valid */}
                                            {/* Since imageUrls in data are placeholders like '/images/states/rajasthan.jpg', we assume they might work or show alt */}
                                            <img
                                                src={state.imageUrl}
                                                alt={state.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://source.unsplash.com/800x600/?${state.name},india,monument`;
                                                }}
                                            />
                                        </div>
                                        <div className="absolute bottom-6 left-6 z-20 text-white">
                                            <p className="text-sm font-medium opacity-90 mb-1">{state.monumentCount} Monuments</p>
                                            <h3 className="text-2xl font-black tracking-tight">{state.name}</h3>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <p className="text-slate-600 mb-6 line-clamp-2">
                                            {state.description}
                                        </p>
                                        <div className="flex items-center text-primary font-bold group-hover:gap-2 transition-all">
                                            <span>Explore Monuments</span>
                                            <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
