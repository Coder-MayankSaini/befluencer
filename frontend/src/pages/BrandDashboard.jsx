import React from 'react';
import { Building2, Plus, Briefcase, Globe, Mail, MapPin } from 'lucide-react';

const BrandDashboard = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Brand Profile</h1>
                <p className="text-gray-500 mt-1">Manage your company details and platform presence.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="h-32 bg-gray-100 border-b border-gray-200"></div>
                        <div className="px-6 pb-6">
                            <div className="relative flex justify-center -mt-12 mb-4">
                                <div className="w-24 h-24 rounded-2xl bg-white p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                                    <Building2 size={40} className="text-gray-300" />
                                </div>
                                <button className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 p-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-brand shadow-sm transition">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <h2 className="text-center font-bold text-xl text-gray-900">BeFluencer</h2>
                            <p className="text-center text-sm text-gray-600 font-medium mb-6">Influencer Marketing Platform</p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Globe size={16} className="text-gray-400" />
                                    befluencer.com
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    contact@befluencer.com
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin size={16} className="text-gray-400" />
                                    Chitkara University, Punjab
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                            <Briefcase className="text-black w-5 h-5" />
                            <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        defaultValue="xyzzzzz"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                    <select className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition appearance-none bg-white">
                                        <option>Technology</option>
                                        <option>Fashion</option>
                                        <option>Food & Beverage</option>
                                        <option>Health & Wellness</option>
                                        <option>content creation</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                                <textarea
                                    rows="4"
                                    placeholder="Describe your brand's mission and what you're looking for in creators..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none resize-none transition"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                    <input
                                        type="email"
                                        placeholder="contact@company.com"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" className="px-6 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition border border-gray-300 text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2.5 rounded-xl font-medium bg-black text-white hover:bg-gray-800 transition shadow-sm text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandDashboard;
