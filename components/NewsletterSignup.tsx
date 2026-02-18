'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { useToast } from '@/components/Toast';

interface NewsletterSignupProps {
    variant?: 'default' | 'minimal' | 'card' | 'hero';
    className?: string;
}

export default function NewsletterSignup({ variant = 'default', className = '' }: NewsletterSignupProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would integrate with your email service
            console.log('Subscribing email:', email);

            setStatus('success');
            setMessage('Welcome to our heritage journey!');
            setEmail('');

            addToast({
                title: 'Successfully subscribed!',
                message: 'You\'ll receive updates about new monuments and features.',
                type: 'success'
            });

        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');

            addToast({
                title: 'Subscription failed',
                message: 'Please try again later.',
                type: 'error'
            });
        }
    };

    const variants = {
        default: (
            <div className={`relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/10 ${className}`}>
                {/* Abstract Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900 to-accent/20" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-50" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                </div>

                <div className="relative z-10 p-12 md:p-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Premium Access</span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
                            Unlock India's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-400">
                                Hidden Heritage
                            </span>
                        </h3>

                        <p className="text-lg text-slate-400 leading-relaxed">
                            Join our community of 50,000+ explorers. Get exclusive access to new 3D scans,
                            virtual reality tours, and historical deep dives delivered to your inbox.
                        </p>

                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 p-2 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto backdrop-blur-md"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-white placeholder-slate-500 focus:outline-none focus:bg-white/5 transition-colors"
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <Button
                                type="submit"
                                loading={status === 'loading'}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                                icon={Send}
                            >
                                Subscribe
                            </Button>
                        </motion.form>

                        {message && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex items-center justify-center gap-2 text-sm font-medium ${status === 'success' ? 'text-emerald-400' : 'text-red-400'
                                    }`}
                            >
                                {status === 'success' ? <Check size={16} /> : <X size={16} />}
                                {message}
                            </motion.div>
                        )}

                        <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest pt-4">
                            <span>No Spam</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span>Unsubscribe Anytime</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span>Weekly Updates</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        ),

        // Keeping minimal and others as simple fallbacks or unchanged if not requested explicitly, 
        // but 'default' is the main one used in Home.
        minimal: (
            <div className={`border-t border-slate-200 pt-8 ${className}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 className="font-semibold text-slate-900">Stay in the loop</h4>
                        <p className="text-sm text-slate-600">Get updates on new monuments and features</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            disabled={status === 'loading'}
                        />
                        <Button
                            type="submit"
                            size="sm"
                            loading={status === 'loading'}
                            variant="primary"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
        ),

        card: (
            <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
                <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                        <Mail className="text-primary" size={24} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Heritage Newsletter
                        </h3>
                        <p className="text-slate-600">
                            Discover new monuments, explore virtual tours, and dive deep into India's rich cultural heritage.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            disabled={status === 'loading'}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={status === 'loading'}
                            variant="primary"
                        >
                            Join Our Journey
                        </Button>
                    </form>

                    <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Check size={12} className="text-green-500" />
                            Weekly updates
                        </span>
                        <span className="flex items-center gap-1">
                            <Check size={12} className="text-green-500" />
                            Exclusive content
                        </span>
                        <span className="flex items-center gap-1">
                            <Check size={12} className="text-green-500" />
                            No spam
                        </span>
                    </div>
                </div>
            </div>
        ),

        hero: (
            <div className={`relative overflow-hidden ${className}`}>
                {/* Background with parallax effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800">
                    <div className="absolute inset-0 bg-[url('/images/heritage-pattern.svg')] opacity-10" />
                </div>

                <div className="relative z-10 py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center text-white space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter">
                                Never Miss a<br />
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Heritage Discovery
                                </span>
                            </h2>

                            <p className="text-xl opacity-90 max-w-2xl mx-auto">
                                Join thousands of heritage enthusiasts and get exclusive access to new 3D monuments,
                                virtual reality experiences, and behind-the-scenes content.
                            </p>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="max-w-md mx-auto space-y-4"
                        >
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg"
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                fullWidth
                                loading={status === 'loading'}
                                className="bg-white text-slate-900 hover:bg-slate-50"
                                icon={Send}
                            >
                                Start My Heritage Journey
                            </Button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-8 text-sm opacity-70"
                        >
                            <span>✨ 50,000+ subscribers</span>
                            <span>📧 Weekly newsletter</span>
                            <span>🎯 Curated content</span>
                            <span>🚫 No spam, ever</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        )
    };

    return variants[variant];
}