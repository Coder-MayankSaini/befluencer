import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [msg, setMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkUser = async (e) => {
        e.preventDefault();
        setMsg('');
        setErrMsg('');
        setIsSubmitting(true);

        try {
            const resp = await axios.post('http://localhost:2001/user/checkUser', { email, pwd });

            if (resp?.data?.status) {
                const loggedInUser = resp.data.obj;
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                setMsg('Login successful. Redirecting...');

                if (loggedInUser?.userType === 'brand') {
                    navigate('/brand');
                } else {
                    navigate('/influencer');
                }
            } else {
                setErrMsg(resp?.data?.msg || 'Invalid email or password');
            }
        } catch (err) {
            setErrMsg(err?.response?.data?.msg || err.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem-6rem)] flex items-center justify-center p-4 bg-white">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 sm:p-10 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex justify-center items-center w-14 h-14 rounded-2xl bg-gray-100 text-black border border-gray-200 mb-6">
                                <Lock size={24} />
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h1>
                            <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in.</p>
                        </div>

                        <form className="space-y-6" onSubmit={checkUser}>
                            {msg && (
                                <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                                    {msg}
                                </p>
                            )}
                            {errMsg && (
                                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {errMsg}
                                </p>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-xs font-semibold text-black hover:text-gray-600 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-all transform hover:-translate-y-0.5"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-black hover:text-gray-600 transition-colors">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
