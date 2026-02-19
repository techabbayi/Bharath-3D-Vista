'use client';

import { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export default function AccessibilityButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, updateSetting } = useAccessibility();

    const fontSizeOptions: Array<'small' | 'normal' | 'large' | 'x-large'> = ['small', 'normal', 'large', 'x-large'];

    return (
        <>
            {/* Accessibility Button - Hidden on mobile */}
            <div className="hidden md:block fixed left-4 md:left-6 bottom-6 md:bottom-8 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 md:w-14 md:h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:ring-4 focus:ring-primary/30 group"
                    aria-label="Accessibility Settings"
                    aria-expanded={isOpen}
                >
                    <svg
                        className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:rotate-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>

                {/* Accessibility Panel */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 -ml-4 md:-ml-6 -mb-6 md:-mb-8"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Panel */}
                        <div className="absolute left-0 bottom-16 md:bottom-20 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 animate-in slide-in-from-bottom-5 duration-300 z-50">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                                    Accessibility
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                                    aria-label="Close accessibility settings"
                                >
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Reduced Motion */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <label htmlFor="reduced-motion" className="text-sm font-bold text-slate-900 block mb-1">
                                            Reduced Motion
                                        </label>
                                        <p className="text-xs text-slate-500">Minimize animations</p>
                                    </div>
                                    <button
                                        id="reduced-motion"
                                        role="switch"
                                        aria-checked={settings.reducedMotion}
                                        onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-4 focus:ring-primary/30 ${settings.reducedMotion ? 'bg-primary' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* High Contrast */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <label htmlFor="high-contrast" className="text-sm font-bold text-slate-900 block mb-1">
                                            High Contrast
                                        </label>
                                        <p className="text-xs text-slate-500">Increase contrast</p>
                                    </div>
                                    <button
                                        id="high-contrast"
                                        role="switch"
                                        aria-checked={settings.highContrast}
                                        onClick={() => updateSetting('highContrast', !settings.highContrast)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-4 focus:ring-primary/30 ${settings.highContrast ? 'bg-primary' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Font Size */}
                                <div>
                                    <label htmlFor="font-size" className="text-sm font-bold text-slate-900 block mb-3">
                                        Font Size
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {fontSizeOptions.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => updateSetting('fontSize', size)}
                                                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${settings.fontSize === size
                                                    ? 'bg-primary text-white shadow-lg scale-105'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                aria-label={`Set font size to ${size}`}
                                                aria-pressed={settings.fontSize === size}
                                            >
                                                {size === 'x-large' ? 'XL' : size.charAt(0).toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Screen Reader Announcements */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <label htmlFor="screen-reader" className="text-sm font-bold text-slate-900 block mb-1">
                                            Screen Reader
                                        </label>
                                        <p className="text-xs text-slate-500">Enable announcements</p>
                                    </div>
                                    <button
                                        id="screen-reader"
                                        role="switch"
                                        aria-checked={settings.screenReaderAnnouncements}
                                        onClick={() => updateSetting('screenReaderAnnouncements', !settings.screenReaderAnnouncements)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-4 focus:ring-primary/30 ${settings.screenReaderAnnouncements ? 'bg-primary' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.screenReaderAnnouncements ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="text-xs text-slate-500 text-center">
                                    Settings are saved automatically
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
