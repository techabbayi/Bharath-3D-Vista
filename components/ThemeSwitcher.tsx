'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, Moon, CloudRain, Trees, Sunset, Monitor, ChevronDown } from 'lucide-react';
import { Theme } from '@/contexts/ThemeContext';

const themeIcons = {
    light: Sun,
    dark: Moon,
    ocean: CloudRain,
    forest: Trees,
    sunset: Sunset,
    system: Monitor
};

const themeNames: Record<string, string> = {
    light: 'Light',
    dark: 'Dark',
    ocean: 'Ocean',
    forest: 'Forest',
    sunset: 'Sunset',
    system: 'System'
};

export default function ThemeSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
    const { theme, setTheme, nextTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false); // Kept for potential future dropdown use, though currently simple toggle is primary
    const [showTooltip, setShowTooltip] = useState(false);

    // Keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                nextTheme();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextTheme]);

    const themes = Object.keys(themeIcons);
    const CurrentIcon = themeIcons[theme as keyof typeof themeIcons] || Sun;

    return (
        <div className="relative">
            {/* Simple Toggle Button */}
            <motion.button
                onClick={nextTheme}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`relative p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${isScrolled
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                aria-label={`Switch to next theme (Current: ${themeNames[theme]})`}
            >
                <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <CurrentIcon size={20} />
                </motion.div>

                {/* Ripple effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 1.5, opacity: 0.3 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl border border-white/10"
                    >
                        <div className="flex items-center gap-2">
                            <span>{themeNames[theme]} Theme</span>
                            <span className="text-slate-500 border border-slate-700 px-1 rounded text-[10px]">⌘⇧D</span>
                        </div>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-t border-white/10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}