'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioGuideProps {
    audioUrl?: string;
    audioText?: string;
    translations?: {
        hi?: string;
        ta?: string;
        te?: string;
    };
    monumentName: string;
}

export default function AudioGuide({ audioUrl, audioText, translations, monumentName }: AudioGuideProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [language, setLanguage] = useState('English');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [isTTS, setIsTTS] = useState(false);

    const [lastCharIndex, setLastCharIndex] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Brave and other browsers need careful voice loading
    useEffect(() => {
        const loadVoices = () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.getVoices();
            }
        };
        loadVoices();
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const getLanguageConfig = (lang: string) => {
        const hasTranslation = translations && (
            (lang === 'Hindi' && translations.hi) ||
            (lang === 'Tamil' && translations.ta) ||
            (lang === 'Telugu' && translations.te)
        );

        if (!hasTranslation && lang !== 'English') {
            return { code: 'en-IN', text: audioText || '', isFallback: true };
        }

        switch (lang) {
            case 'Hindi': return { code: 'hi-IN', text: translations?.hi || audioText || '' };
            case 'Tamil': return { code: 'ta-IN', text: translations?.ta || audioText || '' };
            case 'Telugu': return { code: 'te-IN', text: translations?.te || audioText || '' };
            default: return { code: 'en-IN', text: audioText || '' };
        }
    };

    const speak = (config: ReturnType<typeof getLanguageConfig>, resumeFromPercent: number = 0) => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        setTimeout(() => {
            if (!config.text || config.text.trim().length < 5) return;

            // Handle middle-of-text switching
            let textToSpeak = config.text;
            if (resumeFromPercent > 0 && resumeFromPercent < 95) {
                const startIndex = Math.floor((resumeFromPercent / 100) * config.text.length);
                const spaceIndex = config.text.indexOf(' ', startIndex);
                if (spaceIndex !== -1) {
                    textToSpeak = config.text.substring(spaceIndex);
                }
            }

            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            const voices = window.speechSynthesis.getVoices();

            const langPrefix = config.code.split('-')[0];
            const preferredVoice = voices.find(v => v.lang.startsWith(langPrefix)) ||
                voices.find(v => v.lang.includes('en-IN')) ||
                voices.find(v => v.lang.startsWith('en')) ||
                voices[0];

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.lang = config.code;
            utterance.rate = 0.9;
            utterance.volume = volume;

            utterance.onend = () => {
                if (resumeFromPercent === 0) {
                    setIsPlaying(false);
                    setProgress(100);
                }
            };

            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    const charPos = event.charIndex;
                    const totalLen = config.text.length;
                    const actualCharPos = resumeFromPercent > 0 ?
                        Math.floor((resumeFromPercent / 100) * totalLen) + charPos : charPos;

                    const currentProgress = (actualCharPos / totalLen) * 100;
                    setProgress(Math.min(currentProgress, 100));
                }
            };

            speechRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        }, 100);
    };

    const restart = () => {
        const config = getLanguageConfig(language);
        setProgress(0);
        setIsPlaying(true);
        speak(config, 0);
    };

    useEffect(() => {
        if (!audioUrl && audioText) {
            setIsTTS(true);
            if (isPlaying) {
                const config = getLanguageConfig(language);
                speak(config, progress);
            }
        }
    }, [language]);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        if (speechRef.current) {
            speechRef.current.volume = isMuted ? 0 : volume;
        }
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (isTTS && audioText) {
            if (isPlaying) {
                window.speechSynthesis.pause();
                setIsPlaying(false);
            } else {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                } else {
                    const config = getLanguageConfig(language);
                    speak(config, progress);
                }
                setIsPlaying(true);
            }
            return;
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (!isTTS && audioRef.current && audioRef.current.duration) {
            const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleLoadedMetadata = () => {
        if (!isTTS && audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isTTS) return; // Progress seeking not easily supported in TTS
        if (audioRef.current && audioRef.current.duration) {
            const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume === 0) setIsMuted(true);
        else setIsMuted(false);
    };

    const formatTime = (time: number) => {
        if (isTTS) return isPlaying ? 'Playing' : 'Ready';
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!audioUrl && !audioText) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-black/10 rounded-[32px] border border-white/10 backdrop-blur-sm">
                <svg className="w-12 h-12 text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0M12 18v.01" />
                </svg>
                <p className="text-white font-medium text-center">Audio narration coming soon for {monumentName}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {!isTTS && audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
            )}

            <div className="flex flex-col gap-6">
                {/* Language Selection */}
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <button
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all border border-white/10"
                        >
                            <span className="opacity-60 uppercase tracking-widest text-[10px]">Language</span>
                            <span className="text-xs uppercase font-black">{language}</span>
                            <svg className={`w-4 h-4 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showLanguageMenu && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl overflow-hidden z-20 animate-fade-in">
                                {['English', 'Hindi', 'Tamil', 'Telugu'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setShowLanguageMenu(false);
                                        }}
                                        className={`w-full text-left px-6 py-4 text-sm font-bold transition-colors ${language === lang
                                            ? 'bg-primary text-white'
                                            : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {isTTS && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={restart}
                                className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Reset
                            </button>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">AI Voice Active</span>
                        </div>
                    )}
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-xl transform active:scale-90 transition-transform flex-shrink-0"
                    >
                        {isPlaying ? (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8 translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    <div className="flex flex-col flex-1 gap-2">
                        <span className="text-sm font-black uppercase tracking-widest text-white/60">Now Narrating</span>
                        <span className="text-lg font-bold truncate">Stories of {monumentName}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col gap-2">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        disabled={isTTS}
                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white disabled:cursor-not-allowed"
                    />
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-white/50">
                        <span>{isTTS ? (isPlaying ? 'Syncing...' : 'Paused') : formatTime(audioRef.current?.currentTime || 0)}</span>
                        <span>{isTTS ? (progress >= 99 ? '100%' : `≈ ${Math.round(progress)}%`) : formatTime(duration)}</span>
                    </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/5">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0M12 18v.01" />
                    </svg>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                </div>
            </div>
        </div>
    );
}
