'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui';

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500">Last updated: February 2026</p>
                </motion.div>

                <Card className="p-8 md:p-12 space-y-8 shadow-sm">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">1. Introduction</h2>
                        <p className="text-slate-600 leading-relaxed">
                            At Bharat Vista, we respect the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our virtual tour services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li><strong className="text-slate-800">Personal Data:</strong> We may collect personal information such as name and email address when you sign up for our newsletter.</li>
                            <li><strong className="text-slate-800">Usage Data:</strong> We collect information about your interaction with our 3D models and VR experiences to improve performance.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We use the collected information to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Provide and maintain our Service.</li>
                            <li>Notify you about changes to our Service.</li>
                            <li>Allow you to participate in interactive features when you choose to do so.</li>
                            <li>Provide customer support.</li>
                        </ul>
                    </section>
                </Card>
            </div>
        </div>
    );
}
