import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
Users,
TrendingUp,
ImageIcon,
Rocket,
Inbox,
Eye,
MessageSquare,
ArrowUpRight,
Palette,
UserCircle,
BarChart2
} from 'lucide-react';

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

<div className="page max-w-7xl mx-auto px-6 py-8">

{/* HEADER */}

<div className="page-header anim-fade-up mb-8">

<p className="page-title text-3xl font-semibold">

Welcome back, {user?.name || "Influencer"}

</p>

<p className="page-subtitle mt-1">

Here's what's happening with your profile.

</p>

</div>


{/* STATS */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

{STATS.map((s, i) => {

const Icon = s.icon;

return (

<div

key={i}

className="stat-card anim-fade-up p-6 rounded-xl"

style={{ animationDelay: `${(i + 1) * 0.1}s` }}

>

<div

className="icon-box mb-3 flex items-center justify-center w-10 h-10 rounded-lg"

style={{ background: `${s.color}12` }}

>

<Icon size={18} style={{ color: s.color }} />

</div>


<p className="stat-value text-3xl font-semibold">{s.value}</p>

<p className="stat-label text-sm text-[var(--color-text-3)]">

{s.label}

</p>

</div>

);

})}

</div>


{/* BOTTOM SECTION */}

<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">


{/* RECENT ACTIVITY */}

<div className="lg:col-span-3 card p-6 rounded-xl">

<h2 className="section-heading mb-4 text-lg font-semibold">

Recent Activity

</h2>


<div className="flex flex-col gap-2">

{ACTIVITY.map((a) => {

const Icon = a.icon;

return (

<div

key={a.id}

className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-[var(--color-surface-2)]"

>

<div

className="icon-box flex items-center justify-center"

style={{

background: 'var(--color-surface-2)',

width: '36px',

height: '36px',

borderRadius: '10px'

}}

>

<Icon size={16} style={{ color: 'var(--color-text-2)' }} />

</div>


<div className="flex-1 min-w-0">

<p className="text-sm font-medium truncate">

{a.text}

</p>

<p className="text-xs text-[var(--color-text-3)]">

{a.time}

</p>

</div>

</div>

);

})}

</div>

</div>


{/* QUICK ACTIONS */}

<div className="lg:col-span-2 card p-6 rounded-xl">

<h2 className="section-heading mb-4 text-lg font-semibold">

Quick Actions

</h2>


<div className="flex flex-col gap-3">

{[

{

to: '/influencer/portfolio',

label: 'Update Portfolio',

sub: 'Add new work samples',

icon: Palette,

color: 'var(--color-primary)'

},

{

to: '/influencer/profile',

label: 'Edit Profile',

sub: 'Update info & social links',

icon: UserCircle,

color: 'var(--color-accent)'

}

].map((action) => {

const Icon = action.icon;

return (

<Link

key={action.to}

to={action.to}

className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[var(--color-surface-2)]"

>

<div

className="icon-box flex items-center justify-center w-10 h-10 rounded-lg"

style={{ background: `${action.color}12` }}

>

<Icon size={18} style={{ color: action.color }} />

</div>


<div className="flex-1">

<p className="text-sm font-semibold">

{action.label}

</p>

<p className="text-xs text-[var(--color-text-3)]">

{action.sub}

</p>

</div>


<ArrowUpRight size={16} className="text-[var(--color-text-3)]" />

</Link>

);

})}


{/* Analytics */}

<div

className="flex items-center gap-3 p-3 rounded-lg"

style={{ opacity: 0.5 }}

>

<div

className="icon-box flex items-center justify-center w-10 h-10 rounded-lg"

style={{ background: 'var(--color-surface-2)' }}

>

<BarChart2 size={18} style={{ color: 'var(--color-text-3)' }} />

</div>


<div>

<p className="text-sm font-semibold">Analytics</p>

<p className="text-xs text-[var(--color-text-3)]">

Coming in Phase 2

</p>

</div>

</div>

</div>

</div>

</div>

</div>

);

}