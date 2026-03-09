import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2, Instagram, Linkedin, Twitter, MapPin, Globe, Phone, Mail, Save, Check, Upload } from 'lucide-react';

const INDUSTRIES = [
    'Fashion & Apparel', 'Beauty & Cosmetics', 'Technology', 'Food & Beverage',
    'Health & Fitness', 'Travel & Hospitality', 'Education', 'Entertainment',
    'Finance', 'Real Estate', 'Automotive', 'Other'
];
const SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];

export default function BrandProfile() {
    const { user } = useAuth();
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        companyName: user?.name || '',
        tagline: 'Building the future of digital fashion',
        description: 'StyleCo is a leading fashion brand dedicated to creating sustainable, trendy clothing. We partner with creative influencers worldwide to tell our brand story.',
        industry: 'Fashion & Apparel',
        companySize: '51-200',
        founded: '2018',
        website: 'https://styleco.com',
        email: user?.email || '',
        phone: '+91 9876543210',
        headquarters: 'Mumbai, India',
        budget: '$5,000 - $50,000',
        socialLinks: { Instagram: 'https://instagram.com/styleco', LinkedIn: 'https://linkedin.com/company/styleco', Twitter: 'https://x.com/styleco' },
    });

    const update = (f, v) => setProfile({ ...profile, [f]: v });
    const updateSocial = (p, v) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, [p]: v } });
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const socialIcons = { Instagram, LinkedIn: Linkedin, Twitter };

    return (
        <div className="page page-narrow">
            <div className="page-header anim-fade-up">
                <p className="page-title">Company Profile</p>
                <p className="page-subtitle">Manage your brand's public profile</p>
            </div>

            {/* Identity */}
            <div className="card p-5 mb-4 anim-fade-up anim-delay-1">
                <h2 className="section-heading mb-4">Company Identity</h2>

                <div className="flex items-center gap-4 p-4 rounded-lg mb-5" style={{ background: 'var(--color-surface-2)' }}>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: 'var(--color-primary)' }}>
                        {profile.companyName?.charAt(0) || 'B'}
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>Company Logo</p>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-3)', marginBottom: '8px' }}>400×400px, PNG or JPG</p>
                        <button className="btn btn-ghost btn-sm"><Upload size={13} /> Upload</button>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Company Name</label>
                        <input className="input" value={profile.companyName} onChange={(e) => update('companyName', e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Tagline</label>
                        <input className="input" value={profile.tagline} onChange={(e) => update('tagline', e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label">Description</label>
                        <textarea className="input" rows={4} value={profile.description} onChange={(e) => update('description', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Business Details */}
            <div className="card p-5 mb-4 anim-fade-up anim-delay-2">
                <h2 className="section-heading mb-4">Business Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Industry</label>
                        <select className="input" value={profile.industry} onChange={(e) => update('industry', e.target.value)}>
                            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Company Size</label>
                        <select className="input" value={profile.companySize} onChange={(e) => update('companySize', e.target.value)}>
                            {SIZES.map((s) => <option key={s} value={s}>{s} employees</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Founded</label>
                        <input className="input" value={profile.founded} onChange={(e) => update('founded', e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Headquarters</label>
                        <div className="relative">
                            <MapPin size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                            <input className="input" style={{ paddingLeft: '34px' }} value={profile.headquarters} onChange={(e) => update('headquarters', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="label">Campaign Budget Range</label>
                        <input className="input" value={profile.budget} onChange={(e) => update('budget', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="card p-5 mb-4 anim-fade-up anim-delay-3">
                <h2 className="section-heading mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Email</label>
                        <div className="relative">
                            <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                            <input className="input" style={{ paddingLeft: '34px' }} type="email" value={profile.email} onChange={(e) => update('email', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="label">Phone</label>
                        <div className="relative">
                            <Phone size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                            <input className="input" style={{ paddingLeft: '34px' }} value={profile.phone} onChange={(e) => update('phone', e.target.value)} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label">Website</label>
                        <div className="relative">
                            <Globe size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-3)' }} />
                            <input className="input" style={{ paddingLeft: '34px' }} value={profile.website} onChange={(e) => update('website', e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Social */}
            <div className="card p-5 mb-6 anim-fade-up anim-delay-4">
                <h2 className="section-heading mb-4">Social Media</h2>
                <div className="flex flex-col gap-3">
                    {Object.entries(profile.socialLinks).map(([platform, url]) => {
                        const Icon = socialIcons[platform] || Globe;
                        return (
                            <div key={platform} className="flex items-center gap-3">
                                <div className="icon-box" style={{ background: 'var(--color-surface-2)' }}>
                                    <Icon size={16} style={{ color: 'var(--color-text-2)' }} />
                                </div>
                                <div className="flex-1">
                                    <label className="label" style={{ marginBottom: '4px' }}>{platform}</label>
                                    <input className="input" value={url} onChange={(e) => updateSocial(platform, e.target.value)} />
                                </div>
                            </div>
                        );
                    })}
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
