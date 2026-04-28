import React, { useEffect, useMemo, useState } from 'react';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Award,
    BarChart3,
    Bell,
    BadgeCheck,
    Camera,
    CheckCircle2,
    Clock3,
    Eye,
    Gauge,
    LineChart,
    MessageSquare,
    PieChart,
    Plus,
    ShieldCheck,
    Sparkles,
    Target,
    Trophy,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart as ReLineChart,
    Pie,
    PieChart as RePieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const overviewCards = [
    { label: 'Total Earnings', value: '$12.4K', change: '+18%', icon: Wallet, accent: 'bg-slate-800' },
    { label: 'Active Campaigns', value: '08', change: '+3 this week', icon: Target, accent: 'bg-slate-800' },
    { label: 'Pending Requests', value: '14', change: '5 urgent', icon: Bell, accent: 'bg-slate-900' },
    { label: 'Profile Views', value: '3.8K', change: '+26%', icon: Eye, accent: 'bg-slate-800' },
];







const incomingRequests = [
    { brand: 'GlowLab', campaign: 'Summer launch', budget: '$1,800', deadline: '2 days', status: 'Urgent' },
    { brand: 'UrbanNest', campaign: 'Home styling reel', budget: '$950', deadline: '4 days', status: 'Negotiation' },
    { brand: 'FitRush', campaign: '7-day challenge', budget: '$2,400', deadline: '1 week', status: 'New' },
];

const activeCollaborations = [
    { brand: 'NovaSkin', campaign: 'Glow week takeover', progress: '68%' },
    { brand: 'TrendLoop', campaign: 'UGC product pack', progress: '84%' },
];

const completedCampaigns = [
    { brand: 'AeroWear', result: '2.4M reach', payout: '$1,250' },
    { brand: 'CaféMode', result: '17% conversion', payout: '$800' },
];

const notifications = [
    { title: 'New brand offer received', desc: 'GlowLab sent an urgent collaboration request.', tone: 'Brand Offer' },
    { title: 'Payment released', desc: '$950 pending payment marked as sent.', tone: 'Payment' },
    { title: 'Message from TrendLoop', desc: 'They want a revised concept for tomorrow.', tone: 'Message' },
];

const paymentHistory = [
    { month: 'Apr', amount: '$1,800', status: 'Paid' },
    { month: 'Mar', amount: '$2,400', status: 'Paid' },
    { month: 'Feb', amount: '$1,050', status: 'Pending' },
];

const badges = [
    { name: 'Top Performer', icon: Trophy },
    { name: 'Fast Responder', icon: BadgeCheck },
    { name: 'High Engagement', icon: Sparkles },
    { name: 'Brand Favorite', icon: ShieldCheck },
];

const weeklySummary = [
    { label: 'Reach', value: '+12.8%' },
    { label: 'Engagement', value: '+4.6%' },
    { label: 'Replies', value: '91%' },
    { label: 'Profile Completion', value: '78%' },
];

const aiSuggestions = [
    'Post 1 reel between 7-9 PM to maximize your engagement spike.',
    'Add a stronger CTA on your last 3 posts to improve conversions.',
    'Share 2 behind-the-scenes stories this week to keep audience momentum.',
];




const InfluencerDashboard = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImageName, setPostImageName] = useState('');
    const [postImagePreview, setPostImagePreview] = useState('');
    const [postMsg, setPostMsg] = useState('');
    const [postErr, setPostErr] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [activeRequestTab, setActiveRequestTab] = useState('incoming');

    useEffect(() => {
        if (!postImage) {
            setPostImagePreview('');
            return undefined;
        }

        const previewUrl = URL.createObjectURL(postImage);
        setPostImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [postImage]);

    const createPost = async (e) => {
        e.preventDefault();
        setPostMsg('');
        setPostErr('');

        if (!postTitle || !postDescription || !postImage) {
            setPostErr('Title, description, and image are required to create a post.');
            return;
        }

        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('description', postDescription);
        formData.append('image', postImage);

        try {
            setIsPosting(true);
            const resp = await axios.post('http://localhost:2001/influencer/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (resp?.data?.status) {
                setPostMsg('Post created successfully.');
                setPostTitle('');
                setPostDescription('');
                setPostImage(null);
                setPostImageName('');
                setPostImagePreview('');
            } else {
                setPostErr(resp?.data?.msg || 'Failed to create post.');
            }
        } catch (err) {
            setPostErr(err?.response?.data?.msg || err.message || 'Failed to create post.');
        } finally {
            setIsPosting(false);
        }
    };

    

    const collaborationTabs = useMemo(
        () => [
            { key: 'incoming', label: 'Incoming Requests' },
            { key: 'active', label: 'Active Collaborations' },
            { key: 'completed', label: 'Completed Campaigns' },
        ],
        []
    );

    return (
        <div className={`bg-white text-slate-900 min-h-screen`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <section className={`relative overflow-hidden rounded-4xl border bg-slate-50 border-slate-200 backdrop-blur-2xl p-6 sm:p-8`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_35%)] pointer-events-none" />
                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
                        <div className="space-y-4 max-w-3xl">
                            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] bg-slate-100 border-slate-200 text-slate-800`}>
                                <Sparkles className="h-3.5 w-3.5" /> Befluencer HQ
                            </div>
                            <div>
                                <h1 className={`text-4xl sm:text-5xl font-black tracking-tight text-slate-900`}>
                                    Your premium creator control center.
                                </h1>
                                <p className={`mt-3 max-w-2xl text-base sm:text-lg text-slate-500`}>
                                    Manage brand collaborations, track earnings, monitor growth, and publish posts from one immersive workspace.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/profile"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/25 transition hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Open Profile <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:min-w-90">
                            <div className={`rounded-3xl border p-4 bg-white border-slate-200 shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <p className={`text-sm text-slate-500`}>Profile completeness</p>
                                    <Gauge className="h-4 w-4 text-slate-800" />
                                </div>
                                <div className={`mt-3 text-3xl font-black text-slate-900`}>78%</div>
                                <div className="mt-3 h-2 rounded-full bg-black/10  overflow-hidden">
                                    <div className="h-full w-[78%] rounded-full bg-slate-800" />
                                </div>
                            </div>

                            <div className={`rounded-3xl border p-4 bg-white border-slate-200 shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <p className={`text-sm text-slate-500`}>Influencer level</p>
                                    <Award className="h-4 w-4 text-slate-600" />
                                </div>
                                <div className={`mt-3 text-3xl font-black text-slate-900`}>Pro</div>
                                <p className={`mt-1 text-sm text-slate-500`}>Level 7 of 10</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {overviewCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <article key={card.label} className={`rounded-3xl border p-5 backdrop-blur-xl transition hover:-translate-y-1 bg-white border-slate-200 shadow-sm`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className={`text-sm font-medium text-slate-500`}>{card.label}</p>
                                        <div className={`mt-3 text-3xl font-black text-slate-900`}>{card.value}</div>
                                        <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
                                            <ArrowUpRight className="h-4 w-4" /> {card.change}
                                        </p>
                                    </div>
                                    <div className={`rounded-2xl ${card.accent} p-3 text-white shadow-lg shadow-black/10`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <section className="grid gap-6 xl:grid-cols-12">
                    <div className={`xl:col-span-7 rounded-4xl border p-6 bg-white border-slate-200 shadow-sm`}>
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <h2 className={`text-2xl font-black text-slate-900`}>Collaboration manager</h2>
                                <p className={`mt-1 text-sm text-slate-500`}>Track incoming requests and live partnerships.</p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-3 gap-2 rounded-2xl p-1 bg-slate-100 border-slate-200 text-slate-800`}>
                            {collaborationTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveRequestTab(tab.key)}
                                    className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                                        activeRequestTab === tab.key ? 'bg-slate-900 text-white shadow-lg' : 'text-inherit'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 space-y-4">
                            {activeRequestTab === 'incoming' && incomingRequests.map((request) => (
                                <article key={request.brand} className={`rounded-2xl border p-4 bg-slate-100 border-slate-200 text-slate-800`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-bold">{request.brand}</p>
                                            <p className={`text-sm text-slate-500`}>{request.campaign}</p>
                                            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                                                <span className="rounded-full bg-slate-700/15 px-2.5 py-1 text-slate-700">{request.budget}</span>
                                                <span className="rounded-full bg-slate-700/15 px-2.5 py-1 text-slate-700">Due {request.deadline}</span>
                                                <span className="rounded-full bg-slate-800/15 px-2.5 py-1 text-slate-800">{request.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700">Accept</button>
                                            <button className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/20">Reject</button>
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {activeRequestTab === 'active' && activeCollaborations.map((deal) => (
                                <article key={deal.brand} className={`rounded-2xl border p-4 bg-slate-100 border-slate-200 text-slate-800`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-bold">{deal.brand}</p>
                                            <p className={`text-sm text-slate-500`}>{deal.campaign}</p>
                                            <div className="mt-3 h-2 rounded-full bg-black/10  overflow-hidden">
                                                <div className="h-full rounded-full bg-slate-800" style={{ width: deal.progress }} />
                                            </div>
                                            <p className={`mt-2 text-xs text-slate-500`}>Progress {deal.progress}</p>
                                        </div>
                                        <button className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold bg-slate-100 border-slate-200 text-slate-800">
                                            <MessageSquare className="h-3.5 w-3.5" /> Chat
                                        </button>
                                    </div>
                                </article>
                            ))}

                            {activeRequestTab === 'completed' && completedCampaigns.map((campaign) => (
                                <article key={campaign.brand} className={`rounded-2xl border p-4 bg-slate-100 border-slate-200 text-slate-800`}>
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-bold">{campaign.brand}</p>
                                            <p className={`text-sm text-slate-500`}>{campaign.result}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-800">{campaign.payout}</p>
                                            <p className={`text-xs text-slate-500`}>Completed</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-12">
                    <div className={`xl:col-span-5 rounded-4xl border p-6 bg-white border-slate-200 shadow-sm`}>
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <h2 className={`text-2xl font-black text-slate-900`}>Notifications</h2>
                                <p className={`mt-1 text-sm text-slate-500`}>Brand offers, messages, and payment updates.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {notifications.map((note) => (
                                <div key={note.title} className={`rounded-2xl border p-4 bg-slate-100 border-slate-200 text-slate-800`}>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-2xl bg-slate-900/15 p-2 text-slate-800">
                                            <Bell className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="font-semibold">{note.title}</p>
                                                <span className="rounded-full bg-slate-800/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                                                    {note.tone}
                                                </span>
                                            </div>
                                            <p className={`mt-1 text-sm text-slate-500`}>{note.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`xl:col-span-3 rounded-4xl border p-6 bg-white border-slate-200 shadow-sm`}>
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <h2 className={`text-2xl font-black text-slate-900`}>Earnings</h2>
                                <p className={`mt-1 text-sm text-slate-500`}>Income, pending payments, and payouts.</p>
                            </div>
                        </div>

                        <div className={`rounded-3xl border p-5 bg-slate-100 border-slate-200 text-slate-800`}>
                            <p className={`text-sm text-slate-500`}>Total income</p>
                            <div className={`mt-2 text-4xl font-black text-slate-900`}>$12,480</div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-2xl bg-slate-800/15 p-3 text-slate-800">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em]">Pending</p>
                                    <p className="mt-1 text-lg font-black text-current">$1,250</p>
                                </div>
                                <div className="rounded-2xl bg-slate-700/15 p-3 text-slate-700">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em]">Available</p>
                                    <p className="mt-1 text-lg font-black text-current">$4,300</p>
                                </div>
                            </div>
                            <button className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">
                                Withdraw Funds
                            </button>
                        </div>

                        <div className="mt-5 space-y-3">
                            {paymentHistory.map((payment) => (
                                <div key={payment.month} className={`flex items-center justify-between rounded-2xl border p-3 bg-slate-100 border-slate-200 text-slate-800`}>
                                    <div>
                                        <p className="font-semibold">{payment.month}</p>
                                        <p className={`text-xs text-slate-500`}>Payment status: {payment.status}</p>
                                    </div>
                                    <p className="font-bold">{payment.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`xl:col-span-4 rounded-4xl border p-6 bg-white border-slate-200 shadow-sm`}>
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <h2 className={`text-2xl font-black text-slate-900`}>Engagement system</h2>
                                <p className={`mt-1 text-sm text-slate-500`}>Badges, level, and weekly performance.</p>
                            </div>
                        </div>

                        <div className={`rounded-3xl border p-5 bg-slate-100 border-slate-200 text-slate-800`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm text-slate-500`}>Weekly summary</p>
                                    <p className={`mt-1 text-2xl font-black text-slate-900`}>Momentum rising</p>
                                </div>
                                <TrendingUp className="h-6 w-6 text-slate-800" />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {weeklySummary.map((item) => (
                                    <div key={item.label} className="rounded-2xl bg-black/5 p-3 ">
                                        <p className={`text-xs text-slate-500`}>{item.label}</p>
                                        <p className="mt-1 text-lg font-black text-slate-800">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {badges.map((badge) => {
                                const Icon = badge.icon;
                                return (
                                    <div key={badge.name} className={`rounded-2xl border p-3 bg-slate-100 border-slate-200 text-slate-800`}>
                                        <Icon className="h-5 w-5 text-slate-700" />
                                        <p className="mt-2 text-sm font-semibold">{badge.name}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={`mt-5 rounded-3xl border p-5 bg-slate-100 border-slate-200 text-slate-800`}>
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-800">AI Recommendations</p>
                                    <p className={`mt-1 text-lg font-black text-slate-900`}>Content boost suggestions</p>
                                </div>
                                <Sparkles className="h-5 w-5 text-slate-800" />
                            </div>
                            <ul className={`mt-4 space-y-3 text-sm text-slate-500`}>
                                {aiSuggestions.map((suggestion) => (
                                    <li key={suggestion} className={`rounded-2xl p-3 bg-slate-100 border-slate-200 text-slate-800`}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={`rounded-4xl border p-6 bg-white border-slate-200 shadow-sm`}>
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className={`text-2xl font-black text-slate-900`}>Content studio</h2>
                            <p className={`mt-1 text-sm text-slate-500`}>Publish a new post with image preview and instant visibility.</p>
                        </div>
                        <div className={`rounded-2xl px-4 py-2 text-sm font-semibold bg-slate-100 border-slate-200 text-slate-800`}>
                            Create once, publish everywhere.
                        </div>
                    </div>

                    <form className="grid gap-5 xl:grid-cols-12" onSubmit={createPost}>
                        <div className="xl:col-span-7 space-y-4">
                            {postMsg && (
                                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700   ">
                                    {postMsg}
                                </p>
                            )}
                            {postErr && (
                                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700   ">
                                    {postErr}
                                </p>
                            )}

                            <div>
                                <label className={`block text-sm font-medium text-slate-500 mb-2`}>Post Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter an engaging title..."
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium text-slate-500 mb-2`}>Description</label>
                                <textarea
                                    rows="5"
                                    placeholder="What do you want to share?"
                                    value={postDescription}
                                    onChange={(e) => setPostDescription(e.target.value)}
                                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900`}
                                ></textarea>
                            </div>
                        </div>

                        <div className="xl:col-span-5">
                            <label className={`block text-sm font-medium text-slate-500 mb-2`}>Post Image</label>
                            <div className={`rounded-[1.75rem] border p-4 bg-slate-100 border-slate-200 text-slate-800`}>
                                <div className="flex items-center gap-4">
                                    <div className={`rounded-2xl p-3 text-slate-800 bg-slate-100 border-slate-200 text-slate-800`}>
                                        <Camera className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Upload image</p>
                                        <p className={`text-xs text-slate-500`}>PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col items-end gap-3">
                                    <label htmlFor="post-image-upload" className={`cursor-pointer rounded-2xl border border-dashed px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 bg-slate-100 border-slate-200 text-slate-800`}>
                                        Choose Image
                                        <input
                                            id="post-image-upload"
                                            name="post-image-upload"
                                            type="file"
                                            accept="image/*"
                                            required
                                            onChange={(e) => {
                                                const selectedFile = e.target.files?.[0] || null;
                                                setPostImage(selectedFile);
                                                setPostImageName(selectedFile?.name || '');
                                            }}
                                            className="sr-only"
                                        />
                                    </label>

                                    {postImagePreview && (
                                        <div className="flex flex-col items-end gap-2">
                                            <img src={postImagePreview} alt="Post preview" className="h-28 w-28 rounded-2xl border border-white/10 object-cover shadow-xl" />
                                            {postImageName && <p className="max-w-52 text-right text-xs text-inherit/70 break-all">{postImageName}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="xl:col-span-12 flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isPosting}
                                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-200/25 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Plus size={16} /> {isPosting ? 'Publishing...' : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default InfluencerDashboard;