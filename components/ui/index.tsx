'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

// Button Component
interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}, ref) => {
    const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white border-primary focus:ring-primary/50 shadow-lg hover:shadow-xl',
        secondary: 'bg-secondary hover:bg-secondary-dark text-white border-secondary focus:ring-secondary/50 shadow-lg hover:shadow-xl',
        outline: 'bg-transparent hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 focus:ring-slate-500/50',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 border-transparent focus:ring-slate-500/50',
        gradient: 'bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white border-transparent focus:ring-primary/50 shadow-lg hover:shadow-xl'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-base gap-3',
        lg: 'px-8 py-4 text-lg gap-3',
        xl: 'px-12 py-6 text-xl gap-4'
    };

    return (
        <motion.button
            ref={ref}
            className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled || loading}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            {...props}
        >
            {/* Ripple effect */}
            <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 0.2 }}
            />

            {/* Content */}
            <span className="relative flex items-center justify-center gap-2">
                {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />}
                {loading ? (
                    <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                ) : (
                    children
                )}
                {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />}
            </span>
        </motion.button>
    );
});

Button.displayName = 'Button';

// Card Component
interface CardProps {
    variant?: 'default' | 'bordered' | 'elevated' | 'interactive' | 'glass';
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({
    variant = 'default',
    padding = 'md',
    children,
    className = '',
    hover = false
}: CardProps) {
    const baseClasses = 'rounded-3xl transition-all duration-300';

    const variants = {
        default: 'bg-white shadow-sm border border-slate-100',
        bordered: 'bg-white border-2 border-slate-200',
        elevated: 'bg-white shadow-lg hover:shadow-xl',
        interactive: 'bg-white shadow-md hover:shadow-2xl cursor-pointer border border-slate-100 hover:border-slate-200',
        glass: 'bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl'
    };

    const paddings = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12'
    };

    const Component = variant === 'interactive' ? motion.div : 'div';
    const motionProps = variant === 'interactive' ? {
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { scale: 0.98 }
    } : {};

    return (
        <Component
            className={`
        ${baseClasses}
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
            {...(variant === 'interactive' ? motionProps : {})}
        >
            {children}
        </Component>
    );
}

// Badge Component
interface BadgeProps {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    className?: string;
}

export function Badge({ variant = 'default', size = 'md', children, className = '' }: BadgeProps) {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full border';

    const variants = {
        default: 'bg-slate-100 text-slate-800 border-slate-200',
        primary: 'bg-primary text-white border-primary',
        secondary: 'bg-secondary text-white border-secondary',
        success: 'bg-green-500 text-white border-green-500',
        warning: 'bg-yellow-500 text-white border-yellow-500',
        error: 'bg-red-500 text-white border-red-500',
        outline: 'bg-transparent text-slate-700 border-slate-300'
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
}

// Avatar Component
interface AvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
}

export function Avatar({ src, alt, fallback, size = 'md', className = '' }: AvatarProps) {
    const sizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl'
    };

    return (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-semibold text-white overflow-hidden ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <span>{fallback}</span>
            )}
        </div>
    );
}

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
}

export function Input({
    label,
    error,
    helperText,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-semibold text-slate-700">
                    {label}
                </label>
            )}

            <div className="relative">
                {Icon && iconPosition === 'left' && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                )}

                <input
                    className={`
            w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 
            placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon && iconPosition === 'left' ? 'pl-11' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-11' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''}
            ${className}
          `}
                    {...props}
                />

                {Icon && iconPosition === 'right' && (
                    <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                )}
            </div>

            {(error || helperText) && (
                <p className={`text-sm ${error ? 'text-red-600' : 'text-slate-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
}

// Tooltip Component
interface TooltipProps {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children: ReactNode;
    delay?: number;
}

export function Tooltip({ content, position = 'top', children, delay = 0 }: TooltipProps) {
    return (
        <motion.div
            className="relative inline-block"
            whileHover="hover"
            initial="initial"
        >
            {children}

            <motion.div
                className={`
          absolute z-50 px-3 py-2 text-sm text-white bg-slate-900 rounded-lg pointer-events-none
          ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : ''}
          ${position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' : ''}
          ${position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' : ''}
          ${position === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2' : ''}
        `}
                variants={{
                    initial: { opacity: 0, scale: 0.8 },
                    hover: { opacity: 1, scale: 1 }
                }}
                transition={{ delay }}
            >
                {content}
                <div className={`
          absolute w-2 h-2 bg-slate-900 rotate-45
          ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' : ''}
          ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' : ''}
          ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' : ''}
          ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 -mr-1' : ''}
        `} />
            </motion.div>
        </motion.div>
    );
}