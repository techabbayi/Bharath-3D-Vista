'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    title: string;
    message?: string;
    type: ToastType;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ToastContextType {
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
    maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };

        setToasts(prev => {
            const newToasts = [newToast, ...prev].slice(0, maxToasts);
            return newToasts;
        });

        // Auto remove after duration
        if (toast.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, toast.duration || 5000);
        }
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (title: string, message?: string) => {
        addToast({ title, message, type: 'success' });
    };

    const error = (title: string, message?: string) => {
        addToast({ title, message, type: 'error' });
    };

    const warning = (title: string, message?: string) => {
        addToast({ title, message, type: 'warning' });
    };

    const info = (title: string, message?: string) => {
        addToast({ title, message, type: 'info' });
    };

    return (
        <ToastContext.Provider value={{
            addToast,
            removeToast,
            success,
            error,
            warning,
            info
        }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastComponent
                        key={toast.id}
                        toast={toast}
                        onRemove={onRemove}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

interface ToastComponentProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

function ToastComponent({ toast, onRemove }: ToastComponentProps) {
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const colors = {
        success: 'bg-green-500 border-green-400 text-white',
        error: 'bg-red-500 border-red-400 text-white',
        warning: 'bg-yellow-500 border-yellow-400 text-white',
        info: 'bg-blue-500 border-blue-400 text-white',
    };

    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`
        relative w-96 max-w-sm p-4 rounded-2xl border-2 shadow-2xl
        backdrop-blur-xl bg-white/95 border-white/20 text-slate-900
        transform-gpu
      `}
            style={{
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            layout
        >
            {/* Progress bar */}
            <motion.div
                className={`absolute top-0 left-0 h-1 rounded-t-2xl ${toast.type === 'success' ? 'bg-green-400' :
                        toast.type === 'error' ? 'bg-red-400' :
                            toast.type === 'warning' ? 'bg-yellow-400' :
                                'bg-blue-400'
                    }`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
            />

            <div className="flex items-start gap-3">
                <div className={`
          p-2 rounded-xl flex-shrink-0
          ${toast.type === 'success' ? 'bg-green-100 text-green-600' :
                        toast.type === 'error' ? 'bg-red-100 text-red-600' :
                            toast.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-blue-100 text-blue-600'}
        `}>
                    <Icon size={20} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900 text-sm">
                            {toast.title}
                        </h4>
                        <button
                            onClick={() => onRemove(toast.id)}
                            className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X size={16} className="text-slate-400" />
                        </button>
                    </div>

                    {toast.message && (
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                            {toast.message}
                        </p>
                    )}

                    {toast.action && (
                        <motion.button
                            onClick={toast.action.onClick}
                            className={`
                mt-3 px-3 py-1.5 text-xs font-medium rounded-lg transition-all
                ${toast.type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                                    toast.type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                                        toast.type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                                            'bg-blue-500 hover:bg-blue-600 text-white'}
              `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {toast.action.label}
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}