import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', role: 'influencer',
    });
    const [errors, setErrors] = useState({});
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = 'Required';
        if (!formData.email.trim()) errs.email = 'Required';
        if (formData.password.length < 6) errs.password = 'Min 6 characters';
        if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords don\'t match';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        if (Object.keys(v).length) { setErrors(v); return; }
        register(formData.name, formData.email, formData.password, formData.role);
        setTimeout(() => {
            navigate(formData.role === 'brand' ? '/brand/dashboard' : '/influencer/dashboard');
        }, 900);
    };

    const setRole = (role) => setFormData({ ...formData, role });

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--color-bg)' }}>
            {/* Left branding panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{ background: 'var(--color-surface-1)' }}>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: 'var(--color-primary)' }}>B</div>
                        <span className="text-lg font-bold">BeFluencer</span>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                        Start building<br />your influencer<br />network today.
                    </h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '15px', lineHeight: '1.7', maxWidth: '380px' }}>
                        Whether you're a creator or a brand, BeFluencer gives you the tools to grow authentic partnerships.
                    </p>
                </div>
                <p style={{ color: 'var(--color-text-3)', fontSize: '12px' }}>&copy; 2026 BeFluencer</p>
            </div>

            {/* Right form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: 'var(--color-primary)' }}>B</div>
                        <span className="text-lg font-bold">BeFluencer</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-1" style={{ letterSpacing: '-0.02em' }}>Create an account</h1>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '14px', marginBottom: '28px' }}>Get started in less than a minute</p>

                    {/* Role Tabs */}
                    <div className="flex rounded-lg p-1 mb-6" style={{ background: 'var(--color-surface-2)' }}>
                        {['influencer', 'brand'].map((r) => (
                            <button key={r} type="button" onClick={() => setRole(r)}
                                className="flex-1 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all"
                                style={{ background: formData.role === r ? 'var(--color-primary)' : 'transparent', color: formData.role === r ? '#fff' : 'var(--color-text-3)', border: 'none' }}>
                                {r === 'influencer' ? 'Influencer' : 'Brand'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="label">{formData.role === 'brand' ? 'Company Name' : 'Full Name'}</label>
                            <div className="relative">
                                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                                <input name="name" type="text" value={formData.name} onChange={handleChange}
                                    placeholder={formData.role === 'brand' ? 'Acme Inc.' : 'John Doe'}
                                    className="input" style={{ paddingLeft: '36px' }} />
                            </div>
                            {errors.name && <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <div className="relative">
                                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                                <input name="email" type="email" value={formData.email} onChange={handleChange}
                                    placeholder="you@example.com" className="input" style={{ paddingLeft: '36px' }} />
                            </div>
                            {errors.email && <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                                <input name="password" type="password" value={formData.password} onChange={handleChange}
                                    placeholder="Min 6 characters" className="input" style={{ paddingLeft: '36px' }} />
                            </div>
                            {errors.password && <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '4px' }}>{errors.password}</p>}
                        </div>

                        <div>
                            <label className="label">Confirm Password</label>
                            <div className="relative">
                                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                                    placeholder="••••••••" className="input" style={{ paddingLeft: '36px' }} />
                            </div>
                            {errors.confirmPassword && <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '4px' }}>{errors.confirmPassword}</p>}
                        </div>

                        <label className="flex items-start gap-2 cursor-pointer" style={{ fontSize: '12px', color: 'var(--color-text-2)' }}>
                            <input type="checkbox" required style={{ accentColor: 'var(--color-primary)', marginTop: '2px' }} />
                            <span>I agree to the <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Terms</a> and <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy</a></span>
                        </label>

                        <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-1">
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--color-text-2)' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
