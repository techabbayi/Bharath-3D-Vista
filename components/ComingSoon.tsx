'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, HardHat, Construction } from 'lucide-react';
import { Button } from '@/components/ui';

interface ComingSoonProps {
    title: string;
    description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full text-center space-y-8 relative z-10"
            >
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/10 backdrop-blur-sm">
                    <Construction className="w-12 h-12 text-primary animate-pulse" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white">
                        {title}
                    </h1>
                    <p className="text-lg text-slate-400">
                        {description || "We are currently building this experience. Stay tuned for updates!"}
                    </p>
                </div>

                <div className="pt-8 flex justify-center gap-4">
                    <Link href="/">
                        <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Back (Home)
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
