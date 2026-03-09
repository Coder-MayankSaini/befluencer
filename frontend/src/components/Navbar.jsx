import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Brand Dashboard', path: '/brand' },
        { name: 'Influencer Dashboard', path: '/influencer' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <span className="font-bold text-xl tracking-tight text-gray-900">
                                BeFluencer
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                    ? 'text-brand'
                                    : 'text-gray-600 hover:text-brand'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand rounded-full" />
                                )}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 ml-4">
                            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-brand transition-colors">
                                Log in
                            </Link>
                            <Link to="/signup" className="bg-brand hover:bg-brand-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Sign up
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-brand focus:outline-none p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive(link.path)
                                    ? 'bg-brand/10 text-brand'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100 mt-2 flex flex-col gap-3">
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center bg-brand text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-brand-dark transition"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
