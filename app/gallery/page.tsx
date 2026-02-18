'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { monuments } from '@/data/monuments';
import { Camera, Search, Filter } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import MonumentCard from '@/components/MonumentCard';

export default function GalleryPage() {
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const query = searchParams.get('search');
        if (query !== null) {
            setSearch(query);
        }
    }, [searchParams]);

    const categories = ['All', ...Array.from(new Set(monuments.map(m => m.state)))];

    const filteredMonuments = monuments.filter(m => {
        const matchesCategory = filter === 'All' || m.state === filter;
        const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.city.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        <Camera size={16} />
                        <span>Digital Collection</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        Heritage <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Gallery</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Explore our complete collection of 3D digitized monuments from across India.
                    </p>

                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mt-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search monuments or cities..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredMonuments.map((monument) => (
                            <motion.div
                                layout
                                key={monument.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                                    <div className="relative">
                                        <MonumentCard monument={monument} />
                                        <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-primary/20 transition-colors rounded-2xl" />
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredMonuments.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No monuments found matching your criteria.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => { setFilter('All'); setSearch(''); }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
