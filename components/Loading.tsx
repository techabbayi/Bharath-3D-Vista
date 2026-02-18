'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Page loading progress bar
export function PageLoadingBar() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Simulate page loading progress
        setIsVisible(true);
        setProgress(0);

        const intervals = [
            setTimeout(() => setProgress(30), 100),
            setTimeout(() => setProgress(60), 300),
            setTimeout(() => setProgress(90), 600),
            setTimeout(() => {
                setProgress(100);
                setTimeout(() => setIsVisible(false), 200);
            }, 800)
        ];

        return () => intervals.forEach(clearTimeout);
    }, [pathname]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
            <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary shadow-lg"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    boxShadow: '0 0 10px rgba(255, 107, 53, 0.5)'
                }}
            />
        </div>
    );
}

// Scroll progress indicator
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50 origin-left"
            style={{ scaleX }}
        />
    );
}

// Loading spinner with brand colors
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${sizeClasses[size]} ${className}`}>
            <motion.div
                className="w-full h-full border-2 border-primary/20 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}

// Enhanced loading screen
export function LoadingScreen({ title = 'Loading...', subtitle }: { title?: string, subtitle?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
            {/* Animated logo */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-2xl font-bold text-white">BV</span>
                </div>
            </motion.div>

            {/* Loading animation */}
            <div className="flex space-x-2 mb-6">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-3 h-3 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    />
                ))}
            </div>

            {/* Text */}
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold text-slate-900 mb-2"
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-slate-500 text-center max-w-md"
                >
                    {subtitle}
                </motion.p>
            )}

            {/* Progress bar */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ delay: 0.8, duration: 2 }}
                className="mt-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
            />
        </motion.div>
    );
}

// Button loading state
interface LoadingButtonProps {
    loading: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export function LoadingButton({ loading, children, onClick, className = '', disabled }: LoadingButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || loading}
            className={`relative overflow-hidden ${className}`}
            whileHover={!loading && !disabled ? { scale: 1.02 } : {}}
            whileTap={!loading && !disabled ? { scale: 0.98 } : {}}
        >
            {/* Button content */}
            <motion.span
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
            >
                {children}
            </motion.span>

            {/* Loading overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <LoadingSpinner size="sm" />
            </motion.div>

            {/* Ripple effect */}
            <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 0.2 }}
                style={{ borderRadius: 'inherit' }}
            />
        </motion.button>
    );
}

// Skeleton loading for content
export function SkeletonLoader({ className = '', lines = 3 }: { className?: string, lines?: number }) {
    return (
        <div className={`animate-pulse space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-slate-200 rounded-lg"
                    style={{
                        width: i === lines - 1 ? '60%' : '100%'
                    }}
                />
            ))}
        </div>
    );
}