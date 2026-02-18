'use client';

import { motion } from 'framer-motion';
import { Camera, ScrollText, Code, UploadCloud, Heart } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function ContributePage() {
    const roles = [
        {
            title: "Photographers",
            icon: Camera,
            description: "Submit high-resolution photos or photogrammetry datasets of monuments in your region.",
            action: "Submit Photos"
        },
        {
            title: "Historians",
            icon: ScrollText,
            description: "Help us verify historical facts, write engaging narratives, and translate content.",
            action: "Join Research Team"
        },
        {
            title: "Developers",
            icon: Code,
            description: "Contribute to our open-source codebase or help optimize 3D rendering pipelines.",
            action: "View GitHub"
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
                        <Heart size={16} />
                        <span>Join the Mission</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        Contribute to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            Preservation
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        We are building a community-driven archive. Your skills can help save India's heritage for future generations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <role.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{role.title}</h3>
                                <p className="text-slate-600 mb-8 flex-grow">{role.description}</p>
                                <Button variant="outline" fullWidth className="mt-auto hover:bg-primary hover:text-white hover:border-primary">
                                    {role.action}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Upload Section */}
                <div className="bg-slate-900 rounded-3xl p-10 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <UploadCloud size={64} className="mx-auto text-primary" />
                        <h2 className="text-3xl md:text-4xl font-black">Have a dataset ready?</h2>
                        <p className="text-slate-400 text-lg">
                            If you have already captured a monument using photogrammetry or LiDAR, you can upload it directly to our processing queue.
                        </p>
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 px-10">
                            Start Upload
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
