'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Animated Error Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center"
                >
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </motion.div>

                {/* Error Animation */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl md:text-5xl font-black font-display text-slate-900">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-lg text-slate-600 max-w-lg mx-auto">
                            We encountered an unexpected error while loading this heritage experience.
                            Our team has been notified and is working to fix it.
                        </p>
                    </motion.div>

                    {/* Floating error particles */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-red-300 rounded-full"
                            style={{
                                left: `${20 + (i * 15)}%`,
                                top: `${i % 2 === 0 ? '20%' : '80%'}`,
                            }}
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Error Details (in development) */}
                {process.env.NODE_ENV === 'development' && (
                    <motion.details
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-left max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                        <summary className="cursor-pointer font-semibold text-red-700">
                            Error Details (Development Only)
                        </summary>
                        <pre className="mt-2 text-xs text-red-600 overflow-auto">
                            {error.message}
                            {error.digest && `\nDigest: ${error.digest}`}
                        </pre>
                    </motion.details>
                )}

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </motion.button>

                    <motion.button
                        onClick={handleGoHome}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home size={18} />
                        Go Home
                    </motion.button>
                </motion.div>

                {/* Support Information */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-slate-500 space-y-2"
                >
                    <p>If this problem persists, please contact our support team.</p>
                    <p className="font-mono text-xs">Error ID: {error.digest || 'Unknown'}</p>
                </motion.div>

                {/* Helpful Tips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left max-w-lg mx-auto"
                >
                    <h3 className="font-semibold text-blue-900 mb-3">Quick Fixes:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Refresh the page or try again</li>
                        <li>• Check your internet connection</li>
                        <li>• Clear your browser cache</li>
                        <li>• Try accessing from a different device</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}