import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Instagram, Youtube, Twitter, Linkedin, Link2, MapPin, Globe, Save, Check } from 'lucide-react';

const CATEGORIES = ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Food', 'Travel', 'Lifestyle', 'Gaming', 'Education', 'Music'];

const PLATFORMS = [
    { name: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/yourhandle' },
    { name: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@yourchannel' },
    { name: 'Twitter / X', icon: Twitter, placeholder: 'https://x.com/yourhandle' },
    { name: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/yourprofile' },
];

export default function InfluencerProfile() {
    const { user } = useAuth();
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        displayName: user?.name || '',
        bio: 'Creative content creator passionate about lifestyle and fashion. Collaborating with brands to tell authentic stories.',
        location: 'Mumbai, India',
        website: 'https://myportfolio.com',
        categories: ['Fashion', 'Lifestyle'],
        socialLinks: { Instagram: 'https://instagram.com/priyasharma', YouTube: '', 'Twitter / X': 'https://x.com/priyasharma', LinkedIn: '' },
    });

    const handleSocialChange = (platform, value) => {
        setProfile({ ...profile, socialLinks: { ...profile.socialLinks, [platform]: value } });
    };

    const toggleCategory = (cat) => {
        const updated = profile.categories.includes(cat)
            ? profile.categories.filter((c) => c !== cat)
            : [...profile.categories, cat];
        setProfile({ ...profile, categories: updated });
    };

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    return (
        <div className="page page-narrow">
            <div className="page-header anim-fade-up">
                <p className="page-title">Edit Profile</p>
                <p className="page-subtitle">Manage your influencer profile information</p>
            </div>

            {/* Basic Info */}
            <div className="card p-5 mb-4 anim-fade-up anim-delay-1">
                <h2 className="section-heading mb-4">Basic Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Display Name</label>
                        <input className="input" value={profile.displayName} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} />
                    </div>
                    <div>
                        <label className="label">Location</label>
                        <div className="relative">
                            <MapPin size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                            <input className="input" style={{ paddingLeft: '34px' }} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label">Bio</label>
                        <textarea className="input" rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label">Website</label>
                        <div className="relative">
                            <Globe size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                            <input className="input" style={{ paddingLeft: '34px' }} value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="card p-5 mb-4 anim-fade-up anim-delay-2">
                <h2 className="section-heading mb-2">Content Categories</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-text-3)', marginBottom: '14px' }}>Select categories that describe your content</p>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                        const active = profile.categories.includes(cat);
                        return (
                            <button key={cat} onClick={() => toggleCategory(cat)}
                                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all"
                                style={{
                                    background: active ? 'var(--color-primary)' : 'var(--color-surface-2)',
                                    color: active ? '#fff' : 'var(--color-text-2)',
                                    border: active ? 'none' : '1px solid var(--color-border)',
                                }}>
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Social Links */}
            <div className="card p-5 mb-6 anim-fade-up anim-delay-3">
                <h2 className="section-heading mb-4">Social Media Links</h2>
                <div className="flex flex-col gap-3">
                    {PLATFORMS.map((p) => (
                        <div key={p.name} className="flex items-center gap-3">
                            <div className="icon-box" style={{ background: 'var(--color-surface-2)' }}>
                                <p.icon size={16} style={{ color: 'var(--color-text-2)' }} />
                            </div>
                            <div className="flex-1">
                                <label className="label" style={{ marginBottom: '4px' }}>{p.name}</label>
                                <input className="input" placeholder={p.placeholder} value={profile.socialLinks[p.name]}
                                    onChange={(e) => handleSocialChange(p.name, e.target.value)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save */}
            <div className="flex items-center justify-end gap-3">
                {saved && (
                    <span className="flex items-center gap-1.5 text-[13px] anim-fade-up" style={{ color: 'var(--color-success)' }}>
                        <Check size={14} /> Saved successfully
                    </span>
                )}
                <button onClick={handleSave} className="btn btn-primary">
                    <Save size={16} /> Save Profile
                </button>
            </div>
        </div>
    );
}
