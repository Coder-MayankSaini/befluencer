import React from 'react';
import { Building2, Plus, Briefcase, Globe, Mail, MapPin } from 'lucide-react';

const BrandDashboard = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Brand Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your brand presence.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900">Welcome to your Dashboard</h2>
                <p className="text-gray-500 mt-2">The brand feed and other features are coming soon. Stay tuned!</p>
            </div>
        </div>
    );
};

export default BrandDashboard;
