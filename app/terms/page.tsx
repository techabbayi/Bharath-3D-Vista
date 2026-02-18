'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui';

export default function TermsPage() {
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
                        Terms & Conditions
                    </h1>
                    <p className="text-slate-500">Effective Date: February 2026</p>
                </motion.div>

                <Card className="p-8 md:p-12 space-y-8 shadow-sm">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing or using the Bharat Vista website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">2. Intellectual Property</h2>
                        <p className="text-slate-600 leading-relaxed">
                            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Bharat Vista and its licensors. Our 3D models are protected by copyright, trademark, and other laws of both India and foreign countries.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">3. User Content</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our Service allows you to post content (e.g., photos, comments). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness. By posting Content, you grant us the right to use, modify, perform, display, reproduce, and distribute such Content.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
