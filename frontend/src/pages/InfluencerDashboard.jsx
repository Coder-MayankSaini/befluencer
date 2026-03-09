import React from 'react';
import { Camera, Search, AlignLeft, Tags, UploadCloud, X, Plus } from 'lucide-react';

const InfluencerDashboard = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Sidebar Profile Settings */}
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 p-1 flex items-center justify-center">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-gray-500">
                                        <Camera size={32} />
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-brand shadow-sm transition">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <h2 className="mt-4 font-bold text-xl text-gray-900">Sample_Influencer</h2>
                            <p className="text-sm text-gray-500">@sample_influencer</p>
                        </div>

                        <hr className="my-6 border-gray-100" />

                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Search size={16} /> Content Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Tech', 'Lifestyle', 'Gaming', 'Fitness'].map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                    {tag} <X size={12} className="cursor-pointer hover:text-black" />
                                </span>
                            ))}
                            <button className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-gray-300 text-xs font-medium text-gray-600 hover:border-black hover:text-black transition">
                                <Plus size={12} /> Add Tag
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Tags size={16} /> Social Links
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Instagram', placeholder: 'instagram.com/sample_influencer' },
                                { label: 'YouTube', placeholder: 'youtube.com/@sample_influencer' },
                                { label: 'TikTok', placeholder: 'tiktok.com/@sample_influencer' }
                            ].map((social, i) => (
                                <div key={i}>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">{social.label}</label>
                                    <input
                                        type="text"
                                        placeholder={social.placeholder}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Main Content */}
                <div className="w-full md:w-2/3 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2 pb-4 border-b border-gray-100">
                            <AlignLeft size={20} className="text-black" /> Bio & Metrics
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">Tell brands about yourself and highlight your stats.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                                <textarea
                                    rows="4"
                                    placeholder="I am a content creator passionate about..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none resize-none transition"
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Followers</label>
                                    <input type="text" placeholder="e.g., 500K" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Avg. Engagement Rate</label>
                                    <input type="text" placeholder="e.g., 4.5%" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Portfolio Upload</h2>
                        <p className="text-sm text-gray-500 mb-6">Upload your best brand deals or content examples.</p>

                        <div className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 hover:bg-gray-50 hover:border-brand transition cursor-pointer group">
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-300 group-hover:text-brand transition" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black hover:text-gray-700 underline underline-offset-4">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm">
                                Save Portfolio
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InfluencerDashboard;
