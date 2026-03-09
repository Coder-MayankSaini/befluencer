import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const influencerLinks = [
        { to: '/influencer/dashboard', label: 'Dashboard' },
        { to: '/influencer/portfolio', label: 'Portfolio' },
        { to: '/influencer/profile', label: 'Profile' },
    ];

    const brandLinks = [
        { to: '/brand/dashboard', label: 'Dashboard' },
        { to: '/brand/profile', label: 'Company Profile' },
    ];

    const navLinks = user?.role === 'brand' ? brandLinks : influencerLinks;

    return (
        <nav className="navbar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', maxWidth: '1280px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
                {/* Logo */}
                <Link
                    to={isAuthenticated ? (user?.role === 'brand' ? '/brand/dashboard' : '/influencer/dashboard') : '/'}
                    className="flex items-center gap-2.5 no-underline"
                >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: 'var(--color-primary)' }}>
                        B
                    </div>
                    <span className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                        BeFluencer
                    </span>
                    {isAuthenticated && (
                        <span className="badge" style={{
                            background: user?.role === 'brand' ? 'var(--color-accent-subtle)' : 'var(--color-primary-subtle)',
                            color: user?.role === 'brand' ? 'var(--color-accent)' : 'var(--color-primary)',
                        }}>
                            {user?.role}
                        </span>
                    )}
                </Link>

                {/* Desktop Nav */}
                {isAuthenticated && (
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-3 py-1.5 rounded-md text-[13px] font-medium no-underline transition-colors"
                                style={{
                                    background: isActive(link.to) ? 'var(--color-primary-muted)' : 'transparent',
                                    color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text-2)',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Right side */}
                <div className="hidden md:flex items-center gap-2">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-surface-2)' }}>
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: 'var(--color-primary)' }}>
                                    {user?.name?.charAt(0)}
                                </div>
                                <span className="text-[13px] font-medium" style={{ color: 'var(--color-text-2)' }}>{user?.name}</span>
                            </div>
                            <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ gap: '6px' }}>
                                <LogOut size={14} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden p-1.5 cursor-pointer" style={{ background: 'none', border: 'none', color: 'var(--color-text)' }} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 pt-1 anim-fade-up" style={{ borderTop: '1px solid var(--color-border)' }}>
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-3 py-2 rounded-md text-[13px] font-medium no-underline"
                                    style={{
                                        background: isActive(link.to) ? 'var(--color-primary-muted)' : 'transparent',
                                        color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text-2)',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button onClick={handleLogout} className="btn btn-ghost btn-sm justify-start mt-2" style={{ color: 'var(--color-danger)' }}>
                                <LogOut size={14} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 pt-2">
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-ghost btn-sm">Sign In</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-sm">Get Started</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
