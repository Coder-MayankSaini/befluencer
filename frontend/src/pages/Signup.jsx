import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Mail, Lock, User, Briefcase } from 'lucide-react';
import { useState } from 'react';
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [fname,setfname] = useState("");
    const [lname,setlname] = useState("");
    const [email,setemail] = useState("");
    const [pwd,setpwd] = useState("");
    const [phone,setPhone]= useState("");
    const [type,setType]= useState("influencer");
    const [msg, setMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const saveData = async (e) => {
        e.preventDefault();
        setMsg("");
        setErrMsg("");
        setIsSubmitting(true);
        try{
            const resp = await axios.post("http://localhost:2001/user/saveUser", {
                fname, lname, email, pwd, phone, userType: type
            });

            if (resp?.data?.status === 202) {
                setMsg("Account created successfully. Redirecting to login...");
                setTimeout(() => navigate('/login'), 1000);
            } else {
                setErrMsg(resp?.data?.msg || "Signup failed");
            }
        }
        catch(err){
            setErrMsg(err?.response?.data?.msg || err.message || "Unable to create account");
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="min-h-[calc(100vh-4rem-6rem)] flex items-center justify-center p-4 bg-white">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 sm:p-10 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex justify-center items-center w-14 h-14 rounded-2xl bg-gray-100 text-black border border-gray-200 mb-6">
                                <User size={24} />
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h1>
                            <p className="text-gray-500 mt-2 text-sm">Join BeFluencer and start accelerating your growth.</p>
                        </div>

                        <form className="space-y-5" onSubmit={saveData}>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Alex Carter"
                                        required
                                        value={fname}
                                        onChange={(e)=>{setfname(e.target.value)}}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Alex Carter"
                                        required
                                        value={lname}
                                        onChange={(e)=>{setlname(e.target.value)}}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

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
                                        onChange={(e)=>{setemail(e.target.value)}}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Create a strong password"
                                        required
                                        value={pwd}
                                        onChange={(e)=>{setpwd(e.target.value)}}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter contact number"
                                        required
                                        value={phone}
                                        onChange={(e)=>{setPhone(e.target.value)}}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a...</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase size={18} className="text-gray-400" />
                                    </div>
                                    <select 
                                    value={type}
                                    onChange={(e)=>{
                                        setType(e.target.value);
                                    }}

                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white appearance-none">
                                        <option value="influencer">Content Creator / Influencer</option>
                                        <option value="brand">Brand / Agency</option>
                                    </select>
                                </div>
                            </div>

                            

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-all transform hover:-translate-y-0.5 mt-2"
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-black hover:text-gray-600 transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
