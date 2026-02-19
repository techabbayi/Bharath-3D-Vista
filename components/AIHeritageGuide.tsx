'use client';

import { useState, useEffect, useRef } from 'react';
import { Monument } from '@/types/monument';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface AIHeritageGuideProps {
    monument: Monument;
    floating?: boolean;
}

export default function AIHeritageGuide({ monument, floating = false }: AIHeritageGuideProps) {
    const [isOpen, setIsOpen] = useState(!floating); // Auto-open when inline
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: `Namaste! I am your AI Heritage Guide. I can tell you all about the history and architecture of the ${monument.name}. What would you like to know?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            let response = "";
            const query = userMsg.toLowerCase();

            if (query.includes('built') || query.includes('who') || query.includes('creator')) {
                response = `${monument.name} was ${monument.builtYear !== 'Unknown' ? `built around ${monument.builtYear}` : 'constructed'} during the ${monument.dynasty}. ${monument.history.split('.')[0]}.`;
            } else if (query.includes('where') || query.includes('location')) {
                response = `You can find it in ${monument.city}, ${monument.state}. It's located at coordinates ${monument.location.lat}, ${monument.location.lng}.`;
            } else if (query.includes('style') || query.includes('architecture')) {
                response = `The architectural style is characteristic of the ${monument.dynasty}. ${monument.description}.`;
            } else if (query.includes('fact') || query.includes('interesting')) {
                const highlights = monument.highlights?.map(h => h.title).join(', ') || 'its grand design';
                response = `Did you know? Some of its key features include ${highlights}. ${monument.history.slice(0, 100)}...`;
            } else {
                response = `That's an interesting question about the ${monument.name}. It is a ${monument.category} known for being ${monument.description}. Is there something specific about its history or architecture you'd like to explore?`;
            }

            setMessages(prev => [...prev, { role: 'ai', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={floating ? "fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[100]" : "relative w-full"}>
            {isOpen ? (
                <div className={`bg-white rounded-[24px] md:rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden ${floating ? 'w-80 md:w-96 h-[500px] animate-in slide-in-from-bottom-5 duration-500' : 'w-full h-[600px] md:h-[700px]'}`}>
                    {/* Header */}
                    <div className="bg-slate-900 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-white text-[11px] font-black uppercase tracking-widest">Heritage Guide</h4>
                                <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest">Online & Ready</p>
                            </div>
                        </div>
                        {floating && (
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed font-medium ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex gap-1 items-center">
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 items-center focus-within:border-primary/30 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about history..."
                                className="flex-1 bg-transparent px-2 py-1 text-[12px] font-medium outline-none text-slate-900 placeholder:text-slate-400"
                            />
                            <button onClick={handleSend} className="p-2 bg-primary text-white rounded-xl hover:scale-105 transition-transform">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ) : floating ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative w-14 h-14 md:w-16 md:h-16 bg-slate-900 border-4 border-white text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-primary transition-all duration-500 hover:scale-110"
                    aria-label="Open AI Heritage Guide"
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    <div className="absolute right-full mr-3 md:mr-4 p-2 md:p-3 bg-white text-slate-900 text-[9px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap rounded-xl shadow-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
                        Ask History Guide
                    </div>
                </button>
            ) : null}
        </div>
    );
}
