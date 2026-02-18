'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'system';

interface ThemeColors {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    card: string;
    border: string;
    gradient: string;
}

const themes: Record<Theme, ThemeColors> = {
    light: {
        background: '#ffffff',
        foreground: '#0f172a',
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7B801',
        muted: '#f8fafc',
        card: '#ffffff',
        border: '#e2e8f0',
        gradient: 'from-orange-400 to-rose-400'
    },
    dark: {
        background: '#0f172a',
        foreground: '#f8fafc',
        primary: '#FF6B35',
        secondary: '#3b82f6',
        accent: '#F7B801',
        muted: '#1e293b',
        card: '#1e293b',
        border: '#334155',
        gradient: 'from-orange-400 to-rose-400'
    },
    ocean: {
        background: '#001122',
        foreground: '#e0f2fe',
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#67e8f9',
        muted: '#0c4a6e',
        card: '#0369a1',
        border: '#0284c7',
        gradient: 'from-cyan-400 to-blue-400'
    },
    forest: {
        background: '#0c2e0c',
        foreground: '#f0fdf4',
        primary: '#22c55e',
        secondary: '#16a34a',
        accent: '#84cc16',
        muted: '#14532d',
        card: '#166534',
        border: '#15803d',
        gradient: 'from-green-400 to-emerald-400'
    },
    sunset: {
        background: '#2d1b32',
        foreground: '#fef7cd',
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#fbbf24',
        muted: '#451a03',
        card: '#78350f',
        border: '#92400e',
        gradient: 'from-amber-400 to-orange-400'
    },
    system: {
        background: '#ffffff',
        foreground: '#0f172a',
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7B801',
        muted: '#f8fafc',
        card: '#ffffff',
        border: '#e2e8f0',
        gradient: 'from-orange-400 to-rose-400'
    }
};

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    colors: ThemeColors;
    isDark: boolean;
    toggleTheme: () => void;
    nextTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = 'system',
    storageKey = 'bharath-vista-theme',
}) => {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem(storageKey) as Theme;
        if (stored && Object.keys(themes).includes(stored)) {
            setThemeState(stored);
        }
    }, [storageKey]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(storageKey, newTheme);

        // Apply theme to document
        const root = document.documentElement;
        const colors = themes[newTheme];

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${key}`, value);
        });

        // Apply dark class for system detection
        if (newTheme === 'dark' || newTheme === 'ocean' || newTheme === 'forest' || newTheme === 'sunset') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const themeOrder: Theme[] = ['light', 'dark', 'ocean', 'forest', 'sunset', 'system'];

    const nextTheme = () => {
        const currentIndex = themeOrder.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        setTheme(themeOrder[nextIndex]);
    };

    const colors = themes[theme];
    const isDark = ['dark', 'ocean', 'forest', 'sunset'].includes(theme);

    // Apply theme on mount and theme change
    useEffect(() => {
        if (mounted) {
            const root = document.documentElement;

            Object.entries(colors).forEach(([key, value]) => {
                root.style.setProperty(`--theme-${key}`, value);
            });

            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [theme, colors, isDark, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            colors,
            isDark,
            toggleTheme,
            nextTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};