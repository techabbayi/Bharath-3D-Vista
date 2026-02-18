'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFoundAnimation() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto h-64">
            {/* Floating monuments */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {/* Taj Mahal silhouette */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-8xl opacity-20 select-none"
                >
                    🕌
                </motion.div>
            </motion.div>

            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full"
                    style={{
                        left: `${20 + (i * 10)}%`,
                        top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 2 + (i * 0.2),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1,
                    }}
                />
            ))}

            {/* Searching magnifying glass */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-4 right-8"
            >
                <motion.div
                    animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-4xl opacity-60"
                >
                    🔍
                </motion.div>
            </motion.div>

            {/* Confused traveler */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-4 left-8"
            >
                <motion.div
                    animate={{
                        x: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-3xl"
                >
                    🧳
                </motion.div>
            </motion.div>

            {/* Question marks */}
            {['❓', '❔', '❓'].map((mark, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl opacity-40"
                    style={{
                        left: `${60 + (i * 15)}%`,
                        top: `${10 + (i * 20)}%`,
                    }}
                    animate={{
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 1.5 + (i * 0.3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                    }}
                >
                    {mark}
                </motion.div>
            ))}

            {/* Compass spinning */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 right-4"
            >
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="text-3xl"
                >
                    🧭
                </motion.div>
            </motion.div>
        </div>
    );
}