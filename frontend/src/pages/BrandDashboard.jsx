import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Building2, Users, X, Heart, MapPin, Briefcase, DollarSign, Loader2 } from 'lucide-react';

const BrandDashboard = () => {
    const [influencers, setInfluencers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('brandFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (email, e) => {
        e.stopPropagation();
        let updatedFavorites;
        if (favorites.includes(email)) {
            updatedFavorites = favorites.filter(fav => fav !== email);
        } else {
            updatedFavorites = [...favorites, email];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('brandFavorites', JSON.stringify(updatedFavorites));
    };

    const handleViewProfile = async (influencer) => {
        setSelectedInfluencer(influencer);
        setIsModalOpen(true);
        setIsProfileLoading(true);
        setSelectedProfile(null);
        setSelectedPosts([]);

        try {
            const profileRes = await axios.get(`http://localhost:2001/user/getProfile/${influencer.email}`);
            if (profileRes.data.status && profileRes.data.data) {
                setSelectedProfile(profileRes.data.data);
            }

            const postsRes = await axios.post(`http://localhost:2001/influencer/fetch-post`, { email: influencer.email });
            if (postsRes.data.status && postsRes.data.obj) {
                setSelectedPosts(postsRes.data.obj);
            }
        } catch (err) {
            console.error("Error fetching influencer details:", err);
        } finally {
            setIsProfileLoading(false);
        }
    };

    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const resp = await axios.get('http://localhost:2001/user/influencers');
                if (resp.data.status) {
                    setInfluencers(resp.data.data);
                }
            } catch (error) {
                console.error('Error fetching influencers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInfluencers();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Building2 className="w-8 h-8 text-slate-800" />
                        Brand Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">Discover top influencers for your next campaign.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-slate-800" /> Total Creators ({influencers.length})
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse bg-gray-50 rounded-2xl h-64 border border-gray-100"></div>
                        ))}
                    </div>
                ) : influencers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {influencers.map((influencer) => (
                            <div key={influencer._id} className="group relative overflow-hidden bg-white border border-gray-200 hover:border-slate-800/50 rounded-2xl transition shadow-sm hover:shadow-md">
                                <div className="h-28 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-100 relative">
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                                        {influencer.profilePic ? (
                                            <img src={influencer.profilePic} alt={influencer.fname} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 font-bold text-2xl uppercase">
                                                {influencer.fname.charAt(0)}{influencer.lname.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-14 pb-6 px-4 text-center">
                                    <h3 className="font-bold text-lg text-gray-900 truncate">{influencer.fname} {influencer.lname}</h3>
                                    <p className="text-sm text-gray-500 truncate mt-1">{influencer.email}</p>

                                    <div className="mt-5 flex gap-2">
                                        <button onClick={() => handleViewProfile(influencer)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-sm font-semibold transition">
                                            View Profile
                                        </button>
                                        <button onClick={(e) => toggleFavorite(influencer.email, e)} className={`p-2.5 rounded-xl border transition ${favorites.includes(influencer.email) ? 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}>
                                            <Heart className="w-5 h-5" fill={favorites.includes(influencer.email) ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No Influencers Found</h3>
                        <p className="text-gray-500">There are currently no influencers registered on the platform.</p>
                    </div>
                )}
            </div>

            {/* Profile Modal */}
            {isModalOpen && selectedInfluencer && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto transform transition-transform duration-300 translate-x-0 border-l border-slate-200 flex flex-col">
                        
                        {/* Header Image Area */}
                        <div className="relative h-48 shrink-0 bg-gradient-to-r from-slate-100 to-slate-200">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition">
                                <X size={24}/>
                            </button>
                            <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
                                {selectedInfluencer.profilePic ? (
                                    <img src={selectedInfluencer.profilePic} alt={selectedInfluencer.fname} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 font-bold text-4xl uppercase">
                                        {selectedInfluencer.fname.charAt(0)}{selectedInfluencer.lname.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-8 pt-20 pb-8 flex-1">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900">{selectedProfile?.name || `${selectedInfluencer.fname} ${selectedInfluencer.lname}`}</h2>
                                    <p className="text-slate-500 font-medium">{selectedInfluencer.email}</p>
                                </div>
                                <button onClick={(e) => toggleFavorite(selectedInfluencer.email, e)} className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition ${favorites.includes(selectedInfluencer.email) ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                    <Heart className="w-4 h-4" fill={favorites.includes(selectedInfluencer.email) ? "currentColor" : "none"} />
                                    {favorites.includes(selectedInfluencer.email) ? 'Favorited' : 'Favorite'}
                                </button>
                            </div>

                            {isProfileLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                    <p>Loading profile details...</p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    {/* Stats / Info Row */}
                                    {selectedProfile && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                                <Briefcase className="w-5 h-5 text-slate-400 mb-2" />
                                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Niche</p>
                                                <p className="font-medium text-slate-900">{selectedProfile.niche || 'N/A'}</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                                <MapPin className="w-5 h-5 text-slate-400 mb-2" />
                                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                                                <p className="font-medium text-slate-900">{selectedProfile.location || 'N/A'}</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                                <DollarSign className="w-5 h-5 text-slate-400 mb-2" />
                                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Starting Rate</p>
                                                <p className="font-medium text-slate-900">{selectedProfile.rate || 'N/A'}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bio */}
                                    {selectedProfile?.bio && (
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-3">About Creator</h3>
                                            <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                                                {selectedProfile.bio}
                                            </p>
                                        </div>
                                    )}

                                    {/* Portfolio / Posts */}
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
                                            Content Portfolio
                                            <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{selectedPosts.length} Posts</span>
                                        </h3>
                                        
                                        {selectedPosts.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                {selectedPosts.map((post, idx) => (
                                                    <div key={idx} className="group rounded-[1.25rem] border border-slate-200 overflow-hidden bg-white hover:shadow-md transition">
                                                        {post.image ? (
                                                            <div className="h-40 overflow-hidden">
                                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                                            </div>
                                                        ) : (
                                                            <div className="h-40 bg-slate-100 flex items-center justify-center">No Image</div>
                                                        )}
                                                        <div className="p-4">
                                                            <h4 className="font-semibold text-slate-900 truncate">{post.title}</h4>
                                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{post.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                                <p className="text-slate-500 font-medium">This creator hasn't published any posts yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandDashboard;
