'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { ExternalLink } from 'lucide-react';

export default function CreditsPage() {
    const credits = [
        {
            category: "3D Models & Assets",
            items: [
                { name: "Sketchfab Community", description: "Various photogrammetry models used under CC Attribution." },
                { name: "Poly Haven", description: "HDRI environments and textures." },
                { name: "Unsplash", description: "Royalty-free photography for UI backgrounds." }
            ]
        },
        {
            category: "Technology Stack",
            items: [
                { name: "Next.js 14", description: "React Framework for Production" },
                { name: "Three.js / React Three Fiber", description: "3D Rendering Engine" },
                { name: "Tailwind CSS", description: "Utility-first CSS Framework" },
                { name: "Framer Motion", description: "Animation Library" }
            ]
        },
        {
            category: "Special Thanks",
            items: [
                { name: "Archaeological Survey of India (ASI)", description: "For preserving the monuments." },
                { name: "Ministry of Culture", description: "For supporting digital heritage initiatives." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-slate-900">
                        Credits & <br /> Acknowledgements
                    </h1>
                    <p className="text-slate-600">
                        We gratefully acknowledge the contributions of open-source communities and organizations that made this project possible.
                    </p>
                </motion.div>

                <div className="grid gap-8">
                    {credits.map((section, index) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-8 hover:shadow-lg transition-shadow">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                                    {section.category}
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {section.items.map((item, i) => (
                                        <div key={i}>
                                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                                {item.name}
                                                {/* <ExternalLink size={14} className="text-slate-400" /> */}
                                            </h3>
                                            <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
