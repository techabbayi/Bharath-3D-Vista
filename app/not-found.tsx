import Link from 'next/link';
import { Metadata } from 'next';
import NotFoundAnimation from '@/components/NotFoundAnimation';

export const metadata: Metadata = {
    title: '404 - Page Not Found | Bharat Vista 3D',
    description: 'The page you are looking for could not be found. Explore our heritage collection instead.',
};

export default function NotFound() {
    const popularLinks = [
        { name: 'Taj Mahal Experience', href: '/monument/taj-mahal', icon: '🕌' },
        { name: 'Red Fort Virtual Tour', href: '/monument/red-fort', icon: '🏰' },
        { name: 'Explore by States', href: '/states', icon: '🗺️' },
        { name: 'Heritage Collection', href: '/monuments', icon: '🏛️' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                {/* Animated 404 Illustration */}
                <NotFoundAnimation />

                {/* Content */}
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black font-display text-slate-900 tracking-tighter">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700 max-w-2xl mx-auto">
                        Oops! This heritage site seems to be lost in time
                    </h2>

                    <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                        The page you're looking for doesn't exist, but don't worry!
                        There are plenty of amazing monuments waiting to be discovered.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    >
                        Return Home
                    </Link>

                    <Link
                        href="/monuments"
                        className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
                    >
                        Explore Monuments
                    </Link>
                </div>

                {/* Popular Links */}
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-slate-700 mb-6">
                        Popular Destinations
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {popularLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-200 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{link.icon}</span>
                                    <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">
                                        {link.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Easter Egg */}
                <div className="text-sm text-slate-400">
                    <p>Fun fact: Did you know the Taj Mahal appears slightly different in color throughout the day? 🌅</p>
                </div>
            </div>
        </div>
    );
}