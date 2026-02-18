'use client';

import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe, Award, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui';

export default function AboutPage() {
    const stats = [
        { label: "Monuments Digitized", value: "50+" },
        { label: "Virtual Visitors", value: "1M+" },
        { label: "States Covered", value: "28" },
        { label: "Years of Research", value: "4" }
    ];

    const team = [
        { name: "Dr. Aditi Rao", role: "Head of Archaeology", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
        { name: "Rajesh Kumar", role: "Lead 3D Artist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
        { name: "Sarah Jenkins", role: "VR Specialist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Hero Section */}
            <div className="container mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        <Sparkles size={16} />
                        <span>Our Story</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        Preserving History <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            One Pixel at a Time
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Bharat Vista is a digital heritage initiative dedicated to preserving India's rich architectural legacy through advanced 3D photogrammetry and virtual reality. We believe that history should be accessible to everyone, everywhere.
                    </p>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 py-16 mb-20 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center space-y-2"
                            >
                                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-orange-400">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full p-8 border-l-4 border-l-primary bg-white shadow-lg">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To digitally document and preserve 100% of India's protected monuments by 2030, ensuring that future generations can experience these wonders in their full glory, regardless of physical degradation or natural calamities.
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full p-8 border-l-4 border-l-orange-500 bg-white shadow-lg">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed">
                                A world where cultural heritage is universally accessible. We envision a platform where students, researchers, and tourists can explore the intricate details of ancient architecture from the comfort of their homes.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Team</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        A diverse group of archaeologists, technologists, and artists working together to bridge the past and the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="text-white">
                                        <p className="font-medium text-sm">Passionate about {index === 0 ? 'History' : index === 1 ? 'Digital Art' : 'Technology'}</p>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                            <p className="text-primary font-medium">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
