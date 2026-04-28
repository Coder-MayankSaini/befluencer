import React, { useEffect, useMemo, useState } from 'react';
import {
    ArrowUpRight,
    Award,
    BadgeCheck,
    Camera,
    Edit3,
    Link2,
    Mail,
    MapPin,
    Plus,
    ShieldCheck,
    Sparkles,
    Trophy,
    UploadCloud,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const theme = {
    page: 'bg-white text-slate-900',
    shell: 'bg-white border-slate-200 shadow-lg',
    card: 'bg-slate-50 border-slate-200 shadow-md',
    subtle: 'text-slate-500',
    heading: 'text-slate-900',
    input: 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-600',
    chip: 'bg-slate-100 border-slate-300 text-slate-700',
};

const badges = [
    { name: 'Top Performer', icon: Trophy },
    { name: 'Fast Responder', icon: BadgeCheck },
    { name: 'High Engagement', icon: Sparkles },
    { name: 'Brand Favorite', icon: ShieldCheck },
];

const InfluencerProfile = () => {
    
    const [avatarImage, setAvatarImage] = useState(null);
    const [avatarImageName, setAvatarImageName] = useState('');
    const [name, setName] = useState('Sample Influencer');
    const [niche, setNiche] = useState('Lifestyle / Tech / UGC');
    const [location, setLocation] = useState('Chitkara University, Punjab');
    const [rate, setRate] = useState('$900 / campaign');
    const [bio, setBio] = useState('I create high-converting lifestyle and tech content for modern brands that want personality, clarity, and premium visuals.');
    const [isSaving, setIsSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [saveErr, setSaveErr] = useState('');

    const avatarImagePreview = useMemo(() => (avatarImage ? URL.createObjectURL(avatarImage) : ''), [avatarImage]);

    const saveProfile = async (e) => {
        e.preventDefault();
        setSaveMsg('');
        setSaveErr('');

        if (!name || !niche || !location || !rate || !bio) {
            setSaveErr('All fields are required.');
            return;
        }

        const profileData = {
            name,
            niche,
            location,
            rate,
            bio,
        };

        try {
            setIsSaving(true);
            const resp = await axios.post('http://localhost:2001/user/saveProfile', profileData);

            if (resp?.data?.status === 202) {
                setSaveMsg('Profile saved successfully!');
                setTimeout(() => setSaveMsg(''), 3000);
            } else {
                setSaveErr(resp?.data?.msg || 'Failed to save profile.');
            }
        } catch (err) {
            setSaveErr(err?.response?.data?.msg || err.message || 'Failed to save profile.');
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        return () => {
            if (avatarImagePreview) {
                URL.revokeObjectURL(avatarImagePreview);
            }
        };
    }, [avatarImagePreview]);

    return (
        <div className={`${theme.page} min-h-screen`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <section className={`relative overflow-hidden rounded-4xl border ${theme.shell} backdrop-blur-2xl p-6 sm:p-8`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.14),transparent_35%)] pointer-events-none" />
                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
                        <div className="space-y-4 max-w-3xl">
                            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${theme.chip}`}>
                                <Sparkles className="h-3.5 w-3.5" /> Creator Profile System
                            </div>
                            <div>
                                <h1 className={`text-4xl sm:text-5xl font-black tracking-tight ${theme.heading}`}>
                                    Build a brand-ready identity that converts.
                                </h1>
                                <p className={`mt-3 max-w-2xl text-base sm:text-lg ${theme.subtle}`}>
                                    Shape your bio, audience story, portfolio, and performance proof in one sleek profile workspace.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/influencer"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Back to Dashboard <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className={`rounded-3xl border p-5 ${theme.card}`}>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className={`text-sm ${theme.subtle}`}>Profile completeness</p>
                                    <div className={`mt-2 text-3xl font-black ${theme.heading}`}>78%</div>
                                </div>
                                <div className="rounded-2xl bg-slate-200 p-3 text-slate-700">
                                    <Award className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 h-2 rounded-full bg-slate-200 overflow-hidden">
                                <div className="h-full w-[78%] rounded-full bg-slate-900" />
                            </div>
                            <p className={`mt-3 text-sm ${theme.subtle}`}>Level 7 • Pro Rising Creator</p>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-12">
                    <div className={`xl:col-span-4 rounded-4xl border p-6 ${theme.card}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className={`text-2xl font-black ${theme.heading}`}>Profile card</h2>
                                <p className={`mt-1 text-sm ${theme.subtle}`}>Your creator identity in one snapshot.</p>
                            </div>
                            <div className="rounded-2xl bg-slate-200 p-3 text-slate-700">
                                <BadgeCheck className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <div className="relative inline-block">
                                <div className="h-28 w-28 rounded-full border border-slate-300 bg-slate-100 p-2 shadow-xl">
                                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-400">
                                        {avatarImagePreview ? (
                                            <img src={avatarImagePreview} alt="Avatar preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <Camera className="h-10 w-10" />
                                        )}
                                    </div>
                                </div>
                                <label className="absolute bottom-0 right-0 inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-900 p-2 text-white shadow-lg transition hover:scale-105">
                                    <Plus className="h-4 w-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const selectedFile = e.target.files?.[0] || null;
                                            setAvatarImage(selectedFile);
                                            setAvatarImageName(selectedFile?.name || '');
                                        }}
                                        className="sr-only"
                                    />
                                </label>
                            </div>

                            <h3 className={`mt-5 text-2xl font-black ${theme.heading}`}>Sample_Influencer</h3>
                            <p className={`mt-1 text-sm ${theme.subtle}`}>@sample_influencer</p>
                            {avatarImageName && <p className="mt-2 text-xs font-medium text-violet-500">{avatarImageName}</p>}
                        </div>

                        <div className={`mt-6 rounded-3xl border p-4 ${theme.chip}`}>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold">Next level progress</p>
                                <ShieldCheck className="h-4 w-4 text-slate-700" />
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                                <div className="h-full w-[72%] rounded-full bg-slate-900" />
                            </div>
                            <p className={`mt-2 text-xs ${theme.subtle}`}>72% to Elite Creator</p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {badges.map((badge) => {
                                const Icon = badge.icon;
                                return (
                                    <div key={badge.name} className={`rounded-2xl border p-3 ${theme.chip}`}>
                                        <Icon className="h-5 w-5 text-amber-500" />
                                        <p className="mt-2 text-sm font-semibold">{badge.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="xl:col-span-8 space-y-6">
                        <div className={`rounded-4xl border p-6 ${theme.card}`}>
                            <div className="flex items-start justify-between gap-4 mb-5">
                                <div>
                                    <h2 className={`text-2xl font-black ${theme.heading}`}>Profile editor</h2>
                                    <p className={`mt-1 text-sm ${theme.subtle}`}>Refine your bio, location, niche, and brand-ready credentials.</p>
                                </div>
                                <div className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${theme.chip}`}>
                                    <Edit3 className="h-4 w-4" /> Quick edit
                                </div>
                            </div>

                            {saveMsg && (
                                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 mb-4">
                                    {saveMsg}
                                </p>
                            )}
                            {saveErr && (
                                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 mb-4">
                                    {saveErr}
                                </p>
                            )}

                            <form onSubmit={saveProfile} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className={`mb-2 block text-sm font-medium ${theme.subtle}`}>Creator name</label>
                                        <input 
                                        value={name}
                                         onChange={(e) => setName(e.target.value)}
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.input}`} />
                                    </div>
                                    <div>
                                        <label className={`mb-2 block text-sm font-medium ${theme.subtle}`}>Creator niche</label>
                                        <input 
                                        value={niche}
                                         onChange={(e) => setNiche(e.target.value)}
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.input}`} />
                                    </div>
                                    <div>
                                        <label className={`mb-2 block text-sm font-medium ${theme.subtle}`}>Location</label>
                                        <input 
                                        value={location}
                                         onChange={(e) => setLocation(e.target.value)}
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.input}`} />
                                    </div>
                                    <div>
                                        <label className={`mb-2 block text-sm font-medium ${theme.subtle}`}>Media kit rate</label>
                                        <input 
                                        value={rate}
                                         onChange={(e) => setRate(e.target.value)}
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.input}`} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={`mb-2 block text-sm font-medium ${theme.subtle}`}>Bio</label>
                                        <textarea
                                            value={bio}
                                             onChange={(e) => setBio(e.target.value)}
                                            rows="4"
                                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${theme.input}`}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>

                       

                    </div>
                </section>
            </div>
        </div>
    );
};

export default InfluencerProfile;