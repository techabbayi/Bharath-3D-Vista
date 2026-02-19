'use client';

import { useState, useEffect } from 'react';
import { Monument } from '@/types/monument';
import Link from 'next/link';

interface Checkin {
    monumentId: string;
    timestamp: number;
}

export default function HeritagePassport({ currentMonumentId }: { currentMonumentId?: string }) {
    const [checkins, setCheckins] = useState<Checkin[]>([]);
    const [showPassport, setShowPassport] = useState(false);
    const [isJustCheckedIn, setIsJustCheckedIn] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('bharat_vista_checkins');
        if (saved) setCheckins(JSON.parse(saved));
    }, []);

    const handleCheckIn = () => {
        if (!currentMonumentId) return;
        if (checkins.find(c => c.monumentId === currentMonumentId)) {
            alert("You've already stamped your passport for this monument!");
            return;
        }

        const newCheckin = { monumentId: currentMonumentId, timestamp: Date.now() };
        const updated = [...checkins, newCheckin];
        setCheckins(updated);
        localStorage.setItem('bharat_vista_checkins', JSON.stringify(updated));
        setIsJustCheckedIn(true);
        setTimeout(() => setIsJustCheckedIn(false), 5000);
    };

    return (
        <>
            {/* Stamp Action Card (Only on Monument Page) */}
            {currentMonumentId && (
                <div className="bg-white p-6 md:p-8 lg:p-10 rounded-[40px] md:rounded-[50px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">Heritage Collection</h3>
                            <p className="text-base md:text-lg font-bold text-slate-900">{checkins.length} Monuments Visited</p>
                        </div>
                    </div>

                    {!checkins.find(c => c.monumentId === currentMonumentId) ? (
                        <button
                            onClick={handleCheckIn}
                            className="w-full flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-primary hover:bg-primary/90 text-white rounded-[24px] md:rounded-[32px] font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] shadow-[0_20px_40px_rgba(255,107,53,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                            Stamp my Passport
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-700 rounded-[24px] md:rounded-[32px] border-2 border-emerald-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            <span className="font-black uppercase text-[10px] tracking-[0.2em]">Passport Stamped</span>
                        </div>
                    )}
                </div>
            )}

            {/* Check-in Notification */}
            {isJustCheckedIn && (
                <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white p-8 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-75 duration-500 text-center max-w-sm">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-black font-display mb-2">Monument Certified!</h3>
                    <p className="text-slate-400 text-sm font-medium">Your heritage passport has been stamped. Keep exploring!</p>
                </div>
            )}

            {/* Floating Passport Button */}
            <button
                onClick={() => setShowPassport(true)}
                className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 md:w-16 md:h-16 bg-white border-4 border-slate-900 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-slate-50 transition-all hover:-translate-y-[calc(50%+0.5rem)] group"
                aria-label="Open Heritage Passport"
            >
                <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 bg-primary text-white text-[9px] md:text-[10px] font-black w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    {checkins.length}
                </div>
                <svg className="w-7 h-7 md:w-8 md:h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <div className="absolute left-full ml-3 md:ml-4 p-2 md:p-3 bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap rounded-xl shadow-xl opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
                    My Heritage Passport
                </div>
            </button>

            {/* Passport Modal */}
            {showPassport && (
                <div className="fixed inset-0 z-[150] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
                    <div className="bg-white w-full max-w-2xl rounded-[50px] overflow-hidden shadow-2xl relative">
                        <button onClick={() => setShowPassport(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="p-12">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black font-display tracking-tight text-slate-900">Heritage Passport</h2>
                                    <p className="text-slate-500 font-medium">{checkins.length} Monument Stamps Collected</p>
                                </div>
                            </div>

                            {checkins.length === 0 ? (
                                <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No stamps collected yet</p>
                                    <p className="text-slate-500 mt-2">Explore India's heritage and certifying your visits!</p>
                                    <button onClick={() => setShowPassport(false)} className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Start Exploring</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {checkins.map((c, i) => (
                                        <div key={i} className="aspect-square bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center justify-center p-6 text-center group hover:bg-white hover:shadow-xl transition-all">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.196-.381-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">{c.monumentId.replace(/-/g, ' ')}</p>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase mt-2">{new Date(c.timestamp).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                    <Link
                                        href="/"
                                        onClick={() => setShowPassport(false)}
                                        className="aspect-square rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center hover:border-primary hover:text-primary transition-all text-slate-400 group"
                                    >
                                        <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Find More</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
