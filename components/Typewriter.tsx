'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    words: string[];
    speed?: number;
    deleteSpeed?: number;
    delayBetweenWords?: number;
    loop?: boolean;
    className?: string;
    cursor?: boolean;
    cursorClassName?: string;
}

export default function Typewriter({
    words,
    speed = 100,
    deleteSpeed = 50,
    delayBetweenWords = 2000,
    loop = true,
    className = '',
    cursor = true,
    cursorClassName = 'text-primary'
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (isDone && !loop) return;

        const currentWord = words[currentWordIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (currentText.length < currentWord.length) {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                } else {
                    // Word complete, wait then start deleting
                    setTimeout(() => setIsDeleting(true), delayBetweenWords);
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    // Deletion complete, move to next word
                    setIsDeleting(false);
                    const nextIndex = (currentWordIndex + 1) % words.length;

                    if (!loop && nextIndex === 0) {
                        setIsDone(true);
                        return;
                    }

                    setCurrentWordIndex(nextIndex);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [currentText, currentWordIndex, isDeleting, words, speed, deleteSpeed, delayBetweenWords, loop, isDone]);

    return (
        <span className={className}>
            {currentText}
            {cursor && (
                <motion.span
                    className={`inline-block ${cursorClassName}`}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    |
                </motion.span>
            )}
        </span>
    );
}

// Advanced typewriter with character-by-character animation
interface AnimatedTypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export function AnimatedTypewriter({
    text,
    delay = 0,
    speed = 0.05,
    className = '',
    onComplete
}: AnimatedTypewriterProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: speed, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
        }
    };

    return (
        <motion.span
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onComplete}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: 'inline-block' }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}