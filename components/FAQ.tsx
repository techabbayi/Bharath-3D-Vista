'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category?: string;
}

interface AccordionProps {
    items: FAQItem[];
    multiple?: boolean;
    className?: string;
    variant?: 'default' | 'bordered' | 'card';
}

export default function Accordion({
    items,
    multiple = false,
    className = '',
    variant = 'default'
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (multiple) {
            setOpenItems(prev =>
                prev.includes(id)
                    ? prev.filter(item => item !== id)
                    : [...prev, id]
            );
        } else {
            setOpenItems(prev =>
                prev.includes(id) ? [] : [id]
            );
        }
    };

    const variants = {
        default: 'space-y-2',
        bordered: 'border border-slate-200 rounded-2xl divide-y divide-slate-200',
        card: 'space-y-4'
    };

    return (
        <div className={`${variants[variant]} ${className}`}>
            {items.map((item, index) => (
                <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openItems.includes(item.id)}
                    onToggle={() => toggleItem(item.id)}
                    variant={variant}
                    index={index}
                />
            ))}
        </div>
    );
}

interface AccordionItemProps {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
    variant: 'default' | 'bordered' | 'card';
    index: number;
}

function AccordionItem({ item, isOpen, onToggle, variant, index }: AccordionItemProps) {
    const itemVariants = {
        default: `group ${isOpen ? 'bg-slate-50' : 'hover:bg-slate-25'}`,
        bordered: 'group',
        card: `group p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all duration-300 ${isOpen ? 'shadow-lg border-primary/20' : ''}`
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={itemVariants[variant]}
        >
            <button
                onClick={onToggle}
                className={`
          w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl
          ${variant === 'bordered' ? 'p-6' : variant === 'default' ? 'py-4 px-6 rounded-xl' : ''}
        `}
                aria-expanded={isOpen}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors pr-4">
                        {item.question}
                    </h3>

                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                    >
                        {variant === 'card' ? (
                            isOpen ? (
                                <Minus className="w-5 h-5 text-primary" />
                            ) : (
                                <Plus className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                            )
                        ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                        )}
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            className={`
                text-slate-600 leading-relaxed
                ${variant === 'bordered' ? 'px-6 pb-6' : variant === 'default' ? 'px-6 pb-4' : 'pt-4'}
              `}
                        >
                            {item.answer}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// FAQ Section Component
const faqData: FAQItem[] = [
    {
        id: '1',
        question: 'What is Bharat Vista 3D?',
        answer: 'Bharat Vista 3D is an immersive digital platform that allows you to explore India\'s magnificent monuments through high-fidelity 3D models, 360° panoramas, and virtual reality experiences. We preserve and showcase India\'s cultural heritage using cutting-edge technology.',
        category: 'General'
    },
    {
        id: '2',
        question: 'How can I explore the monuments?',
        answer: 'You can explore monuments through multiple ways: interactive 3D models that you can rotate and zoom, 360° panoramic views for immersive experiences, detailed photo galleries, historical information, and virtual reality experiences using compatible VR headsets.',
        category: 'Features'
    },
    {
        id: '3',
        question: 'Is the platform free to use?',
        answer: 'Yes, Bharat Vista 3D offers free access to most of our monument collection. We also provide premium features for enhanced experiences, including high-resolution downloads, exclusive content, and advanced VR capabilities.',
        category: 'Pricing'
    },
    {
        id: '4',
        question: 'What technology do you use for 3D modeling?',
        answer: 'We use advanced photogrammetry techniques, LiDAR scanning, and AI-powered reconstruction to create highly accurate 3D models. Our spatial engine optimizes these models for real-time web interaction while maintaining historical accuracy.',
        category: 'Technology'
    },
    {
        id: '5',
        question: 'Can I use VR headsets with the platform?',
        answer: 'Absolutely! Our platform supports WebXR technology, making it compatible with most VR headsets including Oculus Quest, HTC Vive, and other WebXR-enabled devices. Simply access the site from your VR browser.',
        category: 'VR Support'
    },
    {
        id: '6',
        question: 'How accurate are the 3D models?',
        answer: 'Our 3D models are created using professional photogrammetry and laser scanning techniques, ensuring millimeter-level accuracy. Each model undergoes rigorous verification by heritage experts and archaeologists.',
        category: 'Quality'
    }
];

export function FAQSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories: string[] = ['All', ...Array.from(new Set(faqData.map(item => item.category).filter((category): category is string => category !== undefined)))];

    const filteredFAQs = selectedCategory === 'All'
        ? faqData
        : faqData.filter(item => item.category === selectedCategory);

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-5xl md:text-6xl font-black font-display tracking-tighter bg-gradient-to-r from-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Find answers to common questions about our platform and services
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-2 mt-8"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }
                `}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto"
                >
                    <Accordion
                        items={filteredFAQs}
                        variant="card"
                        className="space-y-4"
                    />
                </motion.div>
            </div>
        </section>
    );
}