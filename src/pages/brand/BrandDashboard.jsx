import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Rocket, Handshake, Radio, TrendingUp, ArrowUpRight, Building2, Search, BarChart2 } from 'lucide-react';

const STATS = [
    { label: 'Active Campaigns', value: '5', icon: Rocket, color: 'var(--color-primary)' },
    { label: 'Influencers Hired', value: '12', icon: Handshake, color: 'var(--color-accent)' },
    { label: 'Total Reach', value: '1.2M', icon: Radio, color: 'var(--color-warning)' },
    { label: 'Avg Engagement', value: '3.6%', icon: TrendingUp, color: 'var(--color-info)' },
];

const CAMPAIGNS = [
    { id: 1, name: 'Summer Collection Launch', status: 'active', influencers: 4, budget: '$5,000' },
    { id: 2, name: 'Brand Awareness Q1', status: 'completed', influencers: 8, budget: '$12,000' },
    { id: 3, name: 'Product Review Series', status: 'draft', influencers: 0, budget: '$3,000' },
];

const STATUS_MAP = {
    active: { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', label: 'Active' },
    completed: { bg: 'var(--color-primary-subtle)', color: 'var(--color-primary)', label: 'Completed' },
    draft: { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', label: 'Draft' },
};

export default function BrandDashboard() {
    const { user } = useAuth();

    return (
        <div className="page">
            <div className="page-header anim-fade-up">
                <p className="page-title">Welcome back, {user?.name}</p>
                <p className="page-subtitle">Manage your campaigns and discover creators.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {STATS.map((s, i) => (
                    <div key={i} className={`stat-card anim-fade-up anim-delay-${i + 1}`}>
                        <div className="icon-box mb-3" style={{ background: `${s.color}12` }}>
                            <s.icon size={18} style={{ color: s.color }} />
                        </div>
                        <p className="stat-value">{s.value}</p>
                        <p className="stat-label">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-4">
                {/* Campaigns */}
                <div className="lg:col-span-3 card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="section-heading">Your Campaigns</h2>
                        <button className="btn btn-primary btn-sm"><Plus size={14} /> New Campaign</button>
                    </div>
                    <div className="flex flex-col gap-1">
                        {CAMPAIGNS.map((c) => {
                            const st = STATUS_MAP[c.status];
                            return (
                                <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-lg"
                                    style={{ transition: 'background 0.15s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <div className="icon-box" style={{ background: 'var(--color-surface-2)', width: '40px', height: '40px' }}>
                                        <Rocket size={16} style={{ color: 'var(--color-text-2)' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p style={{ fontSize: '14px', fontWeight: 600 }} className="truncate">{c.name}</p>
                                            <span className="badge" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                                        </div>
                                        <p style={{ fontSize: '12px', color: 'var(--color-text-3)' }}>{c.influencers} influencers · Budget: {c.budget}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 card p-5">
                    <h2 className="section-heading mb-4">Quick Actions</h2>
                    <div className="flex flex-col gap-2">
                        <Link to="/brand/profile" className="flex items-center gap-3 p-3 rounded-lg no-underline"
                            style={{ transition: 'background 0.15s' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                            <div className="icon-box" style={{ background: 'var(--color-primary-subtle)' }}>
                                <Building2 size={18} style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <div className="flex-1">
                                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>Edit Company Profile</p>
                                <p style={{ fontSize: '11px', color: 'var(--color-text-3)' }}>Update brand details</p>
                            </div>
                            <ArrowUpRight size={14} style={{ color: 'var(--color-text-3)' }} />
                        </Link>
                        {[
                            { icon: Search, label: 'Discover Creators', sub: 'Coming in Phase 2', color: 'var(--color-accent)' },
                            { icon: BarChart2, label: 'Campaign Analytics', sub: 'Coming in Phase 2', color: 'var(--color-warning)' },
                        ].map((a, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ opacity: 0.5 }}>
                                <div className="icon-box" style={{ background: 'var(--color-surface-2)' }}>
                                    <a.icon size={18} style={{ color: 'var(--color-text-3)' }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>{a.label}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--color-text-3)' }}>{a.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Plus({ size, ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}
