'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'normal' | 'large' | 'x-large';
    focusVisible: boolean;
    screenReaderAnnouncements: boolean;
}

interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSetting: <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => void;
    announce: (message: string) => void;
}

const defaultSettings: AccessibilitySettings = {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal',
    focusVisible: true,
    screenReaderAnnouncements: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }
    return context;
};

interface AccessibilityProviderProps {
    children: ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
    const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
    const [announcer, setAnnouncer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        // Check for system preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

        // Load saved settings
        const savedSettings = localStorage.getItem('bharath-vista-accessibility');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({
                    ...defaultSettings,
                    ...parsed,
                    reducedMotion: prefersReducedMotion || parsed.reducedMotion,
                    highContrast: prefersHighContrast || parsed.highContrast,
                });
            } catch (error) {
                console.error('Failed to parse accessibility settings:', error);
            }
        } else {
            setSettings(prev => ({
                ...prev,
                reducedMotion: prefersReducedMotion,
                highContrast: prefersHighContrast,
            }));
        }

        // Create screen reader announcer
        const announcerElement = document.createElement('div');
        announcerElement.setAttribute('aria-live', 'polite');
        announcerElement.setAttribute('aria-atomic', 'true');
        announcerElement.className = 'sr-only';
        announcerElement.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
        document.body.appendChild(announcerElement);
        setAnnouncer(announcerElement);

        return () => {
            if (announcerElement && document.body.contains(announcerElement)) {
                document.body.removeChild(announcerElement);
            }
        };
    }, []);

    useEffect(() => {
        // Apply settings to document
        const root = document.documentElement;

        // Reduced motion
        if (settings.reducedMotion) {
            root.style.setProperty('--motion-duration', '0s');
            root.classList.add('reduce-motion');
        } else {
            root.style.removeProperty('--motion-duration');
            root.classList.remove('reduce-motion');
        }

        // High contrast
        if (settings.highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        // Font size
        const fontSizeMap = {
            small: '0.875rem',
            normal: '1rem',
            large: '1.125rem',
            'x-large': '1.25rem',
        };
        root.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize]);

        // Focus visible
        if (settings.focusVisible) {
            root.classList.add('focus-visible');
        } else {
            root.classList.remove('focus-visible');
        }

        // Save settings
        localStorage.setItem('bharath-vista-accessibility', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const announce = (message: string) => {
        if (announcer && settings.screenReaderAnnouncements) {
            announcer.textContent = '';
            setTimeout(() => {
                if (announcer) {
                    announcer.textContent = message;
                }
            }, 100);
        }
    };

    return (
        <AccessibilityContext.Provider value={{ settings, updateSetting, announce }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

// Accessibility control panel component
export function AccessibilityControls() {
    const { settings, updateSetting } = useAccessibility();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center"
                aria-label="Open accessibility settings"
                aria-expanded={isOpen}
            >
                ♿
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Accessibility Settings</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600"
                            aria-label="Close accessibility settings"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Reduced Motion */}
                        <label className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Reduce motion</span>
                            <input
                                type="checkbox"
                                checked={settings.reducedMotion}
                                onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                        </label>

                        {/* High Contrast */}
                        <label className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">High contrast</span>
                            <input
                                type="checkbox"
                                checked={settings.highContrast}
                                onChange={(e) => updateSetting('highContrast', e.target.checked)}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                        </label>

                        {/* Font Size */}
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">Text size</span>
                            <select
                                value={settings.fontSize}
                                onChange={(e) => updateSetting('fontSize', e.target.value as AccessibilitySettings['fontSize'])}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                            >
                                <option value="small">Small</option>
                                <option value="normal">Normal</option>
                                <option value="large">Large</option>
                                <option value="x-large">Extra Large</option>
                            </select>
                        </label>

                        {/* Focus Visible */}
                        <label className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Enhanced focus indicators</span>
                            <input
                                type="checkbox"
                                checked={settings.focusVisible}
                                onChange={(e) => updateSetting('focusVisible', e.target.checked)}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                        </label>

                        {/* Screen Reader Announcements */}
                        <label className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Screen reader announcements</span>
                            <input
                                type="checkbox"
                                checked={settings.screenReaderAnnouncements}
                                onChange={(e) => updateSetting('screenReaderAnnouncements', e.target.checked)}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                        </label>
                    </div>

                    <div className="text-xs text-slate-500">
                        These settings are saved locally and will be remembered for your next visit.
                    </div>
                </div>
            )}
        </div>
    );
}