import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('influencer');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password, role);
        setTimeout(() => {
            navigate(role === 'brand' ? '/brand/dashboard' : '/influencer/dashboard');
        }, 900);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
            {/* Left branding panel — hidden on mobile */}
            <div className="auth-brand-panel">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--color-text-2)', fontSize: '13px', marginBottom: '32px', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-2)'}>
                        <ArrowLeft size={14} /> Back to home
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#fff', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' }}>B</div>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)' }}>BeFluencer</span>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '16px', color: 'var(--color-text)' }}>
                        The smarter way to<br />connect brands &amp;<br />creators.
                    </h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '15px', lineHeight: '1.7', maxWidth: '380px', marginBottom: '32px' }}>
                        Join thousands of brands and influencers building meaningful partnerships on BeFluencer.
                    </p>

                    {/* Social proof stats */}
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {[
                            { value: '2K+', label: 'Creators' },
                            { value: '500+', label: 'Brands' },
                            { value: '10K+', label: 'Campaigns' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-primary-light)', letterSpacing: '-0.02em' }}>{stat.value}</p>
                                <p style={{ fontSize: '12px', color: 'var(--color-text-3)', fontWeight: 500 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p style={{ color: 'var(--color-text-3)', fontSize: '12px', position: 'relative', zIndex: 1 }}>
                    &copy; 2026 BeFluencer. All rights reserved.
                </p>
            </div>

            {/* Right form panel */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
                <div style={{ width: '100%', maxWidth: '380px' }}>
                    {/* Mobile logo + back */}
                    <div className="auth-mobile-header">
                        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'var(--color-text-2)', fontSize: '13px' }}>
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#fff', background: 'var(--color-primary)' }}>B</div>
                            <span style={{ fontSize: '15px', fontWeight: 700 }}>BeFluencer</span>
                        </div>
                    </div>

                    <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Welcome back</h1>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '14px', marginBottom: '28px' }}>Sign in to your account to continue</p>

                    {/* Role Tabs */}
                    <div style={{ display: 'flex', borderRadius: '10px', padding: '4px', marginBottom: '24px', background: 'var(--color-surface-2)' }}>
                        {['influencer', 'brand'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                style={{
                                    flex: 1, padding: '8px 0', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                    background: role === r ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' : 'transparent',
                                    color: role === r ? '#fff' : 'var(--color-text-3)',
                                    border: 'none',
                                    boxShadow: role === r ? '0 2px 8px rgba(112, 71, 235, 0.25)' : 'none',
                                }}
                            >
                                {r === 'influencer' ? 'Influencer' : 'Brand'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label className="label">Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input"
                                    style={{ paddingLeft: '36px' }}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input"
                                    style={{ paddingLeft: '36px' }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--color-text-2)', fontSize: '13px' }}>
                                <input type="checkbox" style={{ accentColor: 'var(--color-primary)' }} />
                                Remember me
                            </label>
                            <a href="#" style={{ color: 'var(--color-primary)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', marginTop: '4px' }}>
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--color-text-2)' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
