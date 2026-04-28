import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Building2, Users } from 'lucide-react';

const BrandDashboard = () => {
    const [influencers, setInfluencers] = useState([]);
    const [loading, setLoading] = useState(true);

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

                                    <button className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl text-sm font-semibold transition">
                                        View Profile
                                    </button>
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
        </div>
    );
};

export default BrandDashboard;
