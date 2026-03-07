import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Zap, BarChart3, Handshake, ShieldCheck, Globe, Clock } from 'lucide-react';

const FEATURES = [
    { icon: Zap, title: 'Smart Matching', desc: 'AI-powered recommendations connect the right creators with the right brands based on audience and niche.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track campaign performance, engagement metrics, and ROI with intuitive dashboards.' },
    { icon: Handshake, title: 'Easy Collaboration', desc: 'Built-in messaging and contract tools make managing partnerships effortless.' },
    { icon: ShieldCheck, title: 'Verified Profiles', desc: 'Every account goes through verification to ensure authentic, trustworthy partnerships.' },
    { icon: Globe, title: 'Global Reach', desc: 'Connect with creators and brands across all major platforms worldwide.' },
    { icon: Clock, title: 'Quick Setup', desc: 'From signup to first campaign in minutes with streamlined onboarding.' },
];

export default function Home() {
    const { isAuthenticated, user } = useAuth();

    return (
        <div>
            {/* Hero */}
            <section className="hero-section">
                <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px 88px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div className="anim-fade-up">
                        <span className="badge" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)', marginBottom: '20px', display: 'inline-flex' }}>
                            Now in Early Access
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.15,
                            marginBottom: '20px',
                            color: 'var(--color-text)',
                        }}>
                            Where brands and creators<br />build together
                        </h1>

                        <p style={{
                            color: 'var(--color-text-2)',
                            fontSize: '16px',
                            lineHeight: 1.7,
                            maxWidth: '480px',
                            margin: '0 auto 36px',
                        }}>
                            BeFluencer is the platform for authentic influencer marketing. Find the perfect partners, manage campaigns, and grow together.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            {isAuthenticated ? (
                                <Link to={user?.role === 'brand' ? '/brand/dashboard' : '/influencer/dashboard'} className="btn btn-primary btn-lg">
                                    Go to Dashboard <ArrowRight size={18} />
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary btn-lg">
                                        Get Started Free <ArrowRight size={18} />
                                    </Link>
                                    <Link to="/login" className="btn btn-ghost btn-lg">Sign In</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                        Everything you need to succeed
                    </h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '15px' }}>Tools designed for modern influencer marketing</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {FEATURES.map((f, i) => (
                        <div key={i} className={`feature-card anim-fade-up anim-delay-${i < 6 ? i : 5}`}>
                            <div className="icon-box" style={{ background: 'var(--color-primary-subtle)', marginBottom: '16px' }}>
                                <f.icon size={20} style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>{f.title}</h3>
                            <p style={{ color: 'var(--color-text-2)', fontSize: '13px', lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            {!isAuthenticated && (
                <section className="cta-section" style={{ padding: '56px 24px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '10px' }}>Ready to get started?</h2>
                    <p style={{ color: 'var(--color-text-2)', fontSize: '15px', marginBottom: '28px' }}>
                        Create your free account and start building partnerships today.
                    </p>
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Create Free Account <ArrowRight size={18} />
                    </Link>
                </section>
            )}
        </div>
    );
}
