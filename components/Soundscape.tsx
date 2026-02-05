'use client';

import { useEffect, useRef, useState } from 'react';

interface SoundscapeProps {
    type?: 'birds' | 'temple-bells' | 'city-bustle' | 'desert-wind' | 'river-flow' | 'wind' | 'campus' | 'church-bells' | 'meditation' | 'memorial';
    active: boolean;
}

const SOUND_URLS = {
    'birds': 'https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3',
    'temple-bells': 'https://assets.mixkit.co/active_storage/sfx/1087/1087-preview.mp3',
    'city-bustle': 'https://www.soundjay.com/ambient/sounds/street-traffic-1.mp3',
    'desert-wind': 'https://www.soundjay.com/nature/sounds/wind-01.mp3',
    'river-flow': 'https://www.soundjay.com/nature/sounds/river-1.mp3',
    'wind': 'https://www.soundjay.com/nature/sounds/wind-03.mp3',
    'campus': 'https://www.soundjay.com/ambient/sounds/hallway-crowd-1.mp3',
    'church-bells': 'https://www.soundjay.com/mechanical/sounds/church-bell-1.mp3',
    'meditation': 'https://assets.mixkit.co/active_storage/sfx/614/614-preview.mp3',
    'memorial': 'https://www.soundjay.com/nature/sounds/wind-04.mp3'
};

export default function Soundscape({ type = 'birds', active }: SoundscapeProps) {
    const [volume, setVolume] = useState(0.3);
    const [isMounted, setIsMounted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [barHeights, setBarHeights] = useState<string[]>(['10%', '10%', '10%', '10%']);

    useEffect(() => {
        setIsMounted(true);
        audioRef.current = new Audio(SOUND_URLS[type]);
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [type]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (active) {
            audioRef.current.play().catch(err => console.log("Audio play blocked by browser:", err));
            // Animation logic
            const interval = setInterval(() => {
                setBarHeights([
                    `${20 + Math.random() * 60}%`,
                    `${20 + Math.random() * 60}%`,
                    `${20 + Math.random() * 60}%`,
                    `${20 + Math.random() * 60}%`
                ]);
            }, 150);
            return () => clearInterval(interval);
        } else {
            audioRef.current.pause();
            setBarHeights(['4px', '4px', '4px', '4px']);
        }
    }, [active]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    if (!isMounted) return null;

    return (
        <div className="flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all hover:bg-black/80">
            <div className="flex items-center gap-3">
                <div className="flex gap-1 items-end h-4 w-6">
                    {barHeights.map((height, i) => (
                        <div
                            key={i}
                            className={`w-1 bg-primary rounded-full transition-all duration-150 ${active ? '' : 'opacity-20'}`}
                            style={{
                                height: height
                            }}
                        />
                    ))}
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest min-w-[100px]">
                    {active ? `${type.replace('-', ' ')} ambient` : 'Audio Paused'}
                </span>
            </div>

            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                <button
                    onClick={() => setVolume(v => Math.max(0, v - 0.1))}
                    className="text-white/40 hover:text-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" /></svg>
                </button>
                <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${volume * 100}%` }} />
                </div>
                <button
                    onClick={() => setVolume(v => Math.min(1, v + 0.1))}
                    className="text-white/40 hover:text-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" /></svg>
                </button>
            </div>
        </div>
    );
}
