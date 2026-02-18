'use client';

import { motion } from 'framer-motion';
import { History, Calendar, Flag, Landmark } from 'lucide-react';
import { Card } from '@/components/ui';

export default function HistoryPage() {
    const events = [
        {
            year: "2500 BCE",
            title: "Indus Valley Civilization",
            description: "Urban planning and architecture emerge in Harappa and Mohenjo-Daro, laying the foundations for Indian civic design.",
            icon: Landmark
        },
        {
            year: "300 BCE",
            title: "Mauryan Empire",
            description: "Emperor Ashoka commissions rock edicts and stupas, including the Sanchi Stupa, marking a golden age of Buddhist art.",
            icon: History
        },
        {
            year: "1000 CE",
            title: "Temple Architecture Peak",
            description: "The Chola dynasty builds the Brihadeeswarar Temple, showcasing the pinnacle of Dravidian architecture.",
            icon: Landmark
        },
        {
            year: "1632 CE",
            title: "Mughal Grandeur",
            description: "Shah Jahan commissions the Taj Mahal, blending Persian, Islamic, and Indian styles into a world wonder.",
            icon: Calendar
        },
        {
            year: "1947 CE",
            title: "Independent India",
            description: "The Red Fort becomes the symbol of India's sovereignty as the first Prime Minister hoists the national flag.",
            icon: Flag
        },
        {
            year: "2024 CE",
            title: "Digital Preservation",
            description: "Bharat Vista initiative launches to digitize and preserve this 5000-year legacy for the future.",
            icon: History
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
                        <History size={16} />
                        <span>Timeline</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900">
                        A Journey Through <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            Time
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        From the Indus Valley to the Digital Age, trace the evolution of India's architectural heritage.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2"></div>

                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex items-center mb-12 md:mb-20 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10"></div>

                            {/* Content Card */}
                            <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary relative">
                                    <div className="absolute -left-3 top-6 w-6 h-6 bg-white rotate-45 border-l border-b border-slate-100 hidden md:block" style={index % 2 !== 0 ? { left: 'auto', right: '-0.75rem', borderLeft: 'none', borderBottom: 'none', borderRight: '1px solid #e2e8f0', borderTop: '1px solid #e2e8f0' } : {}}></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            {event.year}
                                        </span>
                                        <event.icon size={16} className="text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
