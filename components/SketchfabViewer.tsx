'use client';

import { useEffect, useRef, useState } from 'react';

interface SketchfabViewerProps {
    modelId: string;
    autoRotate?: boolean;
    vibe?: 'golden-hour' | 'sunrise' | 'noon' | 'twilight' | 'misty';
    highlights?: { title: string; description: string }[];
    monumentName?: string;
}

declare global {
    interface Window {
        Sketchfab: any;
    }
}

export default function SketchfabViewer({
    modelId,
    autoRotate = true,
    vibe = 'noon',
    highlights = [],
    monumentName = "India Heritage"
}: SketchfabViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [api, setApi] = useState<any>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [initError, setInitError] = useState<string | null>(null);
    const [showHighlights, setShowHighlights] = useState(false);
    const [isTouring, setIsTouring] = useState(false);
    const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });
    const [modelReady, setModelReady] = useState(false);

    const vibeGradients = {
        'golden-hour': 'from-orange-500/20 via-amber-500/10 to-rose-950/60',
        'sunrise': 'from-blue-400/20 via-pink-400/10 to-indigo-950/60',
        'noon': 'from-sky-100/10 via-transparent to-slate-950/40',
        'twilight': 'from-purple-900/30 via-blue-900/30 to-black/80',
        'misty': 'from-slate-200/30 via-slate-400/20 to-slate-950/60',
    };

    // Parallax Effect Logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setParallaxPos({ x: x * 30, y: y * 30 });
    };

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '100px', // Start loading 100px before visible
                threshold: 0.1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;

        // Preload and optimize script loading
        if (!window.Sketchfab) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setIsLoaded(true);
            };
            script.onerror = () => {
                setInitError('Failed to load Sketchfab viewer');
            };
            document.body.appendChild(script);

            return () => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            };
        } else {
            setIsLoaded(true);
        }
    }, [shouldLoad]);

    // Initialize Sketchfab API and control rotation
    useEffect(() => {
        if (!isLoaded || !shouldLoad || !iframeRef.current || !window.Sketchfab) return;

        const iframe = iframeRef.current;

        // Wait for iframe to load before initializing API
        const initializeAPI = () => {
            const client = new window.Sketchfab(iframe);
            let currentApi: any = null;

            client.init({
                success: (apiInstance: any) => {
                    currentApi = apiInstance;
                    setApi(apiInstance);

                    apiInstance.start(() => {
                        setModelReady(true);

                        // Enable autospin initially
                        apiInstance.setAutospin(0.5, () => {
                            // After 5 seconds, stop autospin and set to optimal view
                            setTimeout(() => {
                                apiInstance.setAutospin(0, () => {
                                    // Set camera to a nice frontal-angled view
                                    apiInstance.getCameraLookAt((err: any, camera: any) => {
                                        if (!err && camera) {
                                            // Calculate optimal viewing angle (45-degree angle, slightly elevated)
                                            const distance = Math.sqrt(
                                                Math.pow(camera.position[0] - camera.target[0], 2) +
                                                Math.pow(camera.position[1] - camera.target[1], 2) +
                                                Math.pow(camera.position[2] - camera.target[2], 2)
                                            );

                                            const angle = Math.PI / 4; // 45 degrees
                                            const elevation = distance * 0.3; // Slightly elevated

                                            const newPosition = [
                                                camera.target[0] + distance * Math.cos(angle),
                                                camera.target[1] + elevation,
                                                camera.target[2] + distance * Math.sin(angle)
                                            ];

                                            apiInstance.setCameraLookAt(
                                                newPosition,
                                                camera.target,
                                                2 // 2 second transition to final position
                                            );
                                        }
                                    });
                                });
                            }, 5000); // 5 seconds
                        });
                    });
                },
                error: (err: any) => {
                    console.error('Sketchfab API initialization failed:', err);
                    // Don't set error state, model might still load in iframe
                },
                autostart: 1,
                preload: 1,
                ui_stop: 0,
                ui_hint: 0,
                ui_help: 0,
                ui_settings: 0,
                ui_inspector: 0,
                ui_infos: 0,
                ui_watermark: 0,
                ui_controls: 1,
                ui_annotations: 0,
                ui_theme: 'dark',
                camera: 0
            });
        };

        // Give iframe time to load before initializing API
        const timer = setTimeout(() => {
            initializeAPI();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [isLoaded, shouldLoad]);

    const startTour = () => {
        if (!api) return;
        setIsTouring(true);
        // Cinematic Camera Path
        const points = [
            { eye: [10, 5, 10], target: [0, 0, 0] },
            { eye: [-10, 8, 5], target: [0, 2, 0] },
            { eye: [0, 15, -10], target: [0, 0, 0] },
            { eye: [5, 2, 12], target: [0, 1, 0] }
        ];

        let i = 0;
        const move = () => {
            if (i >= points.length) {
                setIsTouring(false);
                return;
            }
            api.setCameraLookAt(points[i].eye, points[i].target, 4, () => {
                i++;
                setTimeout(move, 1000);
            });
        };
        move();
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-full group bg-slate-950 overflow-hidden rounded-[inherit]"
        >
            {/* Parallax Background Layer */}
            <div
                className={`absolute inset-[-50px] z-10 pointer-events-none bg-gradient-to-br ${vibeGradients[vibe]} mix-blend-overlay transition-transform duration-300 ease-out`}
                style={{ transform: `translate(${parallaxPos.x}px, ${parallaxPos.y}px)` }}
            />

            {/* Loading Narrative */}
            {(!isLoaded || !shouldLoad) && !initError && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950">
                    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
                    <div className="text-white font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
                        {!shouldLoad ? 'Preparing Model' : 'Architectural Synthesis'}
                    </div>
                </div>
            )}

            {initError && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 p-8 text-center text-white">
                    <p className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-4">Connection Interrupted</p>
                    <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all">Retry Link</button>
                </div>
            )}

            <div className="absolute inset-0 z-20 transition-opacity duration-1000" style={{ opacity: isLoaded && shouldLoad ? 1 : 0 }}>
                {shouldLoad && (
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full border-0 rounded-lg"
                        allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; magnetometer; gyroscope"
                        title={monumentName}
                        loading="lazy"
                        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&preload=1&ui_theme=dark`}
                    />
                )}
            </div>

            {/* Professional Integrated Controls */}
            {isLoaded && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                    <button
                        onClick={startTour}
                        disabled={isTouring}
                        className={`p-3 rounded-full transition-all ${isTouring ? 'bg-primary text-white scale-110' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        title="Cinematic Tour"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 00-2 2z" />
                        </svg>
                    </button>

                    <div className="w-px h-6 bg-white/10"></div>

                    <button
                        onClick={() => setShowHighlights(!showHighlights)}
                        className={`p-3 rounded-full transition-all ${showHighlights ? 'bg-primary text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        title="Interactive landmarks"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                    </button>

                    <div className="w-px h-6 bg-white/10"></div>

                    <button
                        onClick={toggleFullscreen}
                        className="p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        title="Theatre Mode"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5M16 4h4m0 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
                        </svg>
                    </button>

                    <div className="w-px h-6 bg-white/10"></div>

                    <button
                        onClick={() => window.open(`https://sketchfab.com/models/${modelId}/embed?cardboard=1`, '_blank')}
                        className="p-3 text-white/50 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-full transition-all"
                        title="External VR Engine"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 5H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zm-11.5 9a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm7 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
                    </button>
                </div>
            )}

            {/* Landmarks Overlay - Positioned to side to avoid center/bottom overlap */}
            {showHighlights && highlights.length > 0 && (
                <div className="absolute top-24 left-8 z-50 w-72 p-8 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-[40px] animate-in slide-in-from-left-8 duration-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Landmarks</p>
                    </div>
                    <div className="space-y-6">
                        {highlights.map((h, i) => (
                            <div key={i} className="group/item cursor-pointer">
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-2 group-hover/item:text-primary transition-colors">{h.title}</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed">{h.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
