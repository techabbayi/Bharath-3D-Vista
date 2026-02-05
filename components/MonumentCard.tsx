import Link from 'next/link';
import Image from 'next/image';
import { Monument } from '@/types/monument';

interface MonumentCardProps {
    monument: Monument;
}

export default function MonumentCard({ monument }: MonumentCardProps) {
    return (
        <Link href={`/monument/${monument.id}`} className="group block h-full">
            <div className="relative h-full bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] flex flex-col">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={monument.imageUrl}
                        alt={monument.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                    {/* Category Label */}
                    <div className="absolute top-6 left-6">
                        <div className="px-4 py-1.5 bg-primary/90 backdrop-blur-md border border-white/10 text-white rounded-full">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{monument.category}</span>
                        </div>
                    </div>

                    {/* Name & Location Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 text-white/60 mb-1">
                            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{monument.city}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white font-display leading-[0.9] tracking-tighter group-hover:text-primary transition-colors">
                            {monument.name}
                        </h3>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                    <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed mb-8">
                        {monument.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                        <div className="flex items-center justify-between group-hover:text-primary transition-colors">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Era</span>
                                <span className="text-xs font-black text-slate-900 group-hover:text-primary transition-colors">{monument.builtYear}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
