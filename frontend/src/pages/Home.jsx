import React from 'react';
import { ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col flex-1 bg-white">
            {/* Hero Section */}
            <section className="relative px-6 py-24 sm:py-32 lg:px-8 flex-1 flex flex-col justify-center">
                <div className="mx-auto max-w-4xl text-center relative z-10">

                    <h1 className="text-5xl font-mono tracking-tight text-gray-900 sm:text-7xl mb-8 leading-tight">
                        Connect Brands and Influencers Seamlessly.
                    </h1>
                    <p className="mt-6 text-xl font-mono leading-8 text-gray-600 max-w-2xl mx-auto">
                        Discover, collaborate, and grow with BeFluencer. The all-in-one ecosystem for impactful influencer marketing.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/brand"
                            className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                            I'm a Brand <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/influencer"
                            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-sm border border-gray-300 hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                            I'm an Influencer <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
