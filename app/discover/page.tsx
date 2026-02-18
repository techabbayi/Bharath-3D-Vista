'use client';

import { motion } from 'framer-motion';
import { Compass, Book, Camera, Mountain, Building, Crown, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui';
import Link from 'next/link';

export default function DiscoverPage() {
    const collections = [
        {
            title: "Mughal Marvels",
            icon: Crown,
            description: "Explore the architectural zenith of the Mughal Empire, from the Taj Mahal to the Red Fort.",
            count: "3 Monuments",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&fit=crop",
            slug: "mughal"
        },
        {
            title: "Spiritual Journeys",
            icon: Mountain,
            description: "Find peace in India's most sacred sites, from ancient temples to modern houses of worship.",
            count: "4 Monuments",
            image: "https://images.unsplash.com/photo-1561361288-aaf6f85d39da?w=800&fit=crop",
            slug: "spiritual"
        },
        {
            title: "Forts of Valor",
            icon: Building,
            description: "Walk the ramparts of legendary forts that have witnessed centuries of battles and bravery.",
            count: "2 Monuments",
            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&fit=crop",
            slug: "forts"
        },
        {
            title: "Modern Icons",
            icon: Compass,
            description: "Discover the new landmarks shaping India's skyline and future.",
            count: "2 Monuments",
            image: "https://images.unsplash.com/photo-1555026987-a2267683f237?w=800&fit=crop",
            slug: "modern"
        }
    ];

    const itineraries = [
        {
            day: "Day 1",
            title: "Golden Triangle Highlights",
            places: ["Red Fort (Delhi)", "Taj Mahal (Agra)", "Hawa Mahal (Jaipur)"]
        },
        {
            day: "Weekend",
            title: "Spiritual Varanasi",
            places: ["Kashi Vishwanath", "Ganga Aarti", "Sarnath"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        <Compass size={16} />
                        <span>Curated Collections</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        Discover Hidden <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            Gems of India
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Handpicked themes and itineraries to help you explore India's diverse heritage in a meaningful way.
                    </p>
                </motion.div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/gallery?filter=${collection.slug}`} className="group block relative h-80 rounded-3xl overflow-hidden shadow-xl">
                                <div className="absolute inset-0">
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="flex items-center gap-3 mb-2 text-white/80 text-sm font-medium">
                                        <collection.icon size={16} />
                                        <span>{collection.count}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2 group-hover:text-primary transition-colors">{collection.title}</h3>
                                    <p className="text-white/80 line-clamp-2 max-w-md">{collection.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Itineraries Section */}
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                            <Book size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Recommended Itineraries</h2>
                            <p className="text-slate-600">Planned routes for your next virtual or physical trip.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {itineraries.map((itinerary, i) => (
                            <div key={i} className="flex gap-6 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
                                <div className="text-center min-w-[80px]">
                                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Duration</span>
                                    <span className="block text-lg font-black text-slate-900">{itinerary.day}</span>
                                </div>
                                <div className="h-12 w-px bg-slate-300 self-center hidden md:block"></div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">{itinerary.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {itinerary.places.map((place, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">
                                                <MapPin size={12} className="text-primary" />
                                                {place}
                                            </span>
                                        ) as any)}
                                        {/* Note: MapPin is not imported in this specific scope in the snippet above, let's fix imports */}
                                    </div>
                                </div>
                                <div className="self-center">
                                    <Button variant="outline" size="sm" className="hidden md:flex">View Route</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper for the missing import in the snippet
function MapPin({ size, className }: { size?: number, className?: string }) {
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
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}
