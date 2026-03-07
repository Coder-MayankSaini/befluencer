import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, ImageIcon, Rocket, Inbox, Eye, MessageSquare, ArrowUpRight, Palette, UserCircle, BarChart2 } from 'lucide-react';

const STATS = [
    { label: 'Total Followers', value: '24.5K', icon: Users, color: 'var(--color-primary)' },
    { label: 'Engagement Rate', value: '4.8%', icon: TrendingUp, color: 'var(--color-accent)' },
    { label: 'Total Posts', value: '342', icon: ImageIcon, color: 'var(--color-warning)' },
    { label: 'Active Campaigns', value: '3', icon: Rocket, color: 'var(--color-info)' },
];

const ACTIVITY = [
    { id: 1, text: 'StyleCo invited you to a campaign', time: '2h ago', icon: Inbox },
    { id: 2, text: 'You gained 120 new followers', time: '5h ago', icon: TrendingUp },
    { id: 3, text: '"Summer Lookbook" got 50 views', time: '1d ago', icon: Eye },
    { id: 4, text: 'New message from GlowBeauty', time: '2d ago', icon: MessageSquare },
];

export default function InfluencerDashboard() {
    const { user } = useAuth();

    return (
        <div className="page">
            <div className="page-header anim-fade-up">
                <p className="page-title">Welcome back, {user?.name}</p>
                <p className="page-subtitle">Here's what's happening with your profile.</p>
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
                {/* Activity */}
                <div className="lg:col-span-3 card p-5">
                    <h2 className="section-heading mb-4">Recent Activity</h2>
                    <div className="flex flex-col gap-1">
                        {ACTIVITY.map((a) => (
                            <div key={a.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ transition: 'background 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-2)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                <div className="icon-box" style={{ background: 'var(--color-surface-2)', width: '36px', height: '36px' }}>
                                    <a.icon size={16} style={{ color: 'var(--color-text-2)' }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p style={{ fontSize: '13px', fontWeight: 500 }} className="truncate">{a.text}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--color-text-3)' }}>{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 card p-5">
                    <h2 className="section-heading mb-4">Quick Actions</h2>
                    <div className="flex flex-col gap-2">
                        {[
                            { to: '/influencer/portfolio', label: 'Update Portfolio', sub: 'Add new work samples', icon: Palette, color: 'var(--color-primary)' },
                            { to: '/influencer/profile', label: 'Edit Profile', sub: 'Update info & social links', icon: UserCircle, color: 'var(--color-accent)' },
                        ].map((action) => (
                            <Link key={action.to} to={action.to} className="flex items-center gap-3 p-3 rounded-lg no-underline"
                                style={{ transition: 'background 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-2)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                <div className="icon-box" style={{ background: `${action.color}12` }}>
                                    <action.icon size={18} style={{ color: action.color }} />
                                </div>
                                <div className="flex-1">
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>{action.label}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--color-text-3)' }}>{action.sub}</p>
                                </div>
                                <ArrowUpRight size={14} style={{ color: 'var(--color-text-3)' }} />
                            </Link>
                        ))}
                        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ opacity: 0.5 }}>
                            <div className="icon-box" style={{ background: 'var(--color-surface-2)' }}>
                                <BarChart2 size={18} style={{ color: 'var(--color-text-3)' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>Analytics</p>
                                <p style={{ fontSize: '11px', color: 'var(--color-text-3)' }}>Coming in Phase 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
