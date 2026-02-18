'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
    };

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
                        <MessageSquare size={16} />
                        <span>Get in Touch</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        We'd Love to Hear <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            From You
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Have a question about a monument? Want to collaborate on a preservation project? Or just want to say hello? Drop us a message.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="grid gap-6">
                            <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                                    <p className="text-slate-600 mb-2">For general inquiries and support.</p>
                                    <a href="mailto:hello@bharatvista.in" className="text-primary font-medium hover:underline">hello@bharatvista.in</a>
                                </div>
                            </Card>

                            <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
                                    <p className="text-slate-600 mb-2">Mon-Fri from 9am to 6pm IST.</p>
                                    <a href="tel:+919876543210" className="text-primary font-medium hover:underline">+91 98765 43210</a>
                                </div>
                            </Card>

                            <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Visit Us</h3>
                                    <p className="text-slate-600 mb-2">Come say hello at our office.</p>
                                    <p className="text-slate-900 font-medium">123 Heritage Lane, Cyber City,<br />Hyderabad, Telangana 500081</p>
                                </div>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="p-8 shadow-xl border-slate-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="collaboration">Collaboration / Partnership</option>
                                        <option value="feedback">Website Feedback</option>
                                        <option value="support">Report an Issue</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    loading={status === 'submitting'}
                                    className="mt-4"
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    {!status && <Send size={18} className="ml-2" />}
                                </Button>

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium"
                                    >
                                        Message sent successfully! We'll allow 24-48 hours for a response.
                                    </motion.div>
                                )}
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
