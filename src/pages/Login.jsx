import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

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
        <div className="min-h-screen flex" style={{ background: 'var(--color-bg)' }}>
            {/* Left branding panel — hidden on mobile */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{ background: 'var(--color-surface-1)' }}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: 'var(--color-primary)' }}>B</div>
                        <span className="text-lg font-bold">BeFluencer</span>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                        The smarter way to<br />connect brands &amp;<br />creators.
                    </h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '15px', lineHeight: '1.7', maxWidth: '380px' }}>
                        Join thousands of brands and influencers building meaningful partnerships on BeFluencer.
                    </p>
                </div>

                <p style={{ color: 'var(--color-text-3)', fontSize: '12px' }}>
                    &copy; 2026 BeFluencer
                </p>
            </div>

            {/* Right form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: 'var(--color-primary)' }}>B</div>
                        <span className="text-lg font-bold">BeFluencer</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-1" style={{ letterSpacing: '-0.02em' }}>Welcome back</h1>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '14px', marginBottom: '28px' }}>Sign in to your account to continue</p>

                    {/* Role Tabs */}
                    <div className="flex rounded-lg p-1 mb-6" style={{ background: 'var(--color-surface-2)' }}>
                        {['influencer', 'brand'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className="flex-1 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all"
                                style={{
                                    background: role === r ? 'var(--color-primary)' : 'transparent',
                                    color: role === r ? '#fff' : 'var(--color-text-3)',
                                    border: 'none',
                                }}
                            >
                                {r === 'influencer' ? 'Influencer' : 'Brand'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="label">Email</label>
                            <div className="relative">
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
                            <div className="relative">
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--color-text-2)', fontSize: '13px' }}>
                                <input type="checkbox" style={{ accentColor: 'var(--color-primary)' }} />
                                Remember me
                            </label>
                            <a href="#" style={{ color: 'var(--color-primary)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-1">
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
