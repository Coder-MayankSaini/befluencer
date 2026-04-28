import React, { useEffect, useState } from 'react';
import { Camera, Plus, Sparkles } from 'lucide-react';
import axios from 'axios';

const InfluencerDashboard = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImageName, setPostImageName] = useState('');
    const [postImagePreview, setPostImagePreview] = useState('');
    const [postMsg, setPostMsg] = useState('');
    const [postErr, setPostErr] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [email, setEmail] = useState('');
    const [posts, setPosts] = useState([]);

    // Profile Info States
    const [profileName, setProfileName] = useState('');
    const [profileNiche, setProfileNiche] = useState('');
    const [profileLocation, setProfileLocation] = useState('');
    const [profileRate, setProfileRate] = useState('');
    const [profileBio, setProfileBio] = useState('');
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileStatusMsg, setProfileStatusMsg] = useState('');

    // Profile Picture States
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [isUploadingPic, setIsUploadingPic] = useState(false);

    const fetchPostsData = async () => {
        if (!email) return;
        try {
            const resp = await axios.post('http://localhost:2001/influencer/fetch-post', { email });
            if (resp?.data?.status) {
                setPosts(resp?.data?.obj || []);
            }
        } catch (err) {
            console.error("Failed to fetch posts:", err);
        }
    };

    useEffect(() => {
        if (email) {
            fetchPostsData();

            // Fetch Profile Data
            axios.get(`http://localhost:2001/user/getProfile/${email}`)
                .then((res) => {
                    if (res.data?.status && res.data?.data) {
                        const data = res.data.data;
                        setProfileName(data.name || '');
                        setProfileNiche(data.niche || '');
                        setProfileLocation(data.location || '');
                        setProfileRate(data.rate || '');
                        setProfileBio(data.bio || '');
                    }
                })
                .catch((err) => console.error("Error fetching profile data", err));
        }
    }, [email]);

    useEffect(() => {
        const userData = localStorage.getItem('loggedInUser');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                setEmail(parsedData.email || '');

                // Fetch latest user details from DB to ensure profile picture and other data is up to date after login/reloads
                const syncUserData = async () => {
                    try {
                        const resp = await axios.post('http://localhost:2001/user/checkUser', {
                            email: parsedData.email,
                            pwd: parsedData.pwd
                        });

                        if (resp?.data?.status) {
                            const latestUser = resp.data.obj;
                            setProfilePicUrl(latestUser.profilePic || '');
                            // Update local storage with fresh DB data
                            localStorage.setItem('loggedInUser', JSON.stringify(latestUser));
                        } else {
                            setProfilePicUrl(parsedData.profilePic || '');
                        }
                    } catch (error) {
                        setProfilePicUrl(parsedData.profilePic || '');
                    }
                };

                if (parsedData.email && parsedData.pwd) {
                    syncUserData();
                } else {
                    setProfilePicUrl(parsedData.profilePic || '');
                }
            } catch (err) {
                console.error("Error parsing user data:", err);
            }
        }
    }, []);

    // Handle Profile Picture Upload
    const uploadProfilePicture = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        if (email) formData.append('email', email);

        try {
            setIsUploadingPic(true);
            const resp = await axios.post('http://localhost:2001/user/uploadProfilePic', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (resp?.data?.status) {
                const newPicUrl = resp.data.imageUrl;
                setProfilePicUrl(newPicUrl);

                // Update local storage so it persists when page reloads
                const userData = localStorage.getItem('loggedInUser');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    parsedData.profilePic = newPicUrl;
                    localStorage.setItem('loggedInUser', JSON.stringify(parsedData));
                }

                alert('Profile picture uploaded successfully!');
            } else {
                alert(resp?.data?.msg || 'Failed to upload profile picture.');
            }
        } catch (err) {
            alert(err?.response?.data?.msg || err.message || 'Failed to upload image.');
        } finally {
            setIsUploadingPic(false);
        }
    };

    useEffect(() => {
        if (!postImage) {
            setPostImagePreview('');
            return undefined;
        }
        const previewUrl = URL.createObjectURL(postImage);
        setPostImagePreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [postImage]);

    const createPost = async (e) => {
        e.preventDefault();
        setPostMsg('');
        setPostErr('');

        if (!postTitle || !postDescription || !postImage) {
            setPostErr('Title, description, and image are required to create a post.');
            return;
        }

        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('description', postDescription);
        formData.append('image', postImage);
        formData.append('email', email);

        try {
            setIsPosting(true);
            const resp = await axios.post('http://localhost:2001/influencer/create-post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (resp?.data?.status) {
                setPostMsg('Post created successfully.');
                setPostTitle('');
                setPostDescription('');
                setPostImage(null);
                setPostImageName('');
                setPostImagePreview('');
                fetchPostsData();
            } else {
                setPostErr(resp?.data?.msg || 'Failed to create post.');
            }
        } catch (err) {
            setPostErr(err?.response?.data?.msg || err.message || 'Failed to create post.');
        } finally {
            setIsPosting(false);
        }
    };

    const saveInfluencerProfile = async (e) => {
        e.preventDefault();
        setProfileStatusMsg('');
        setIsSavingProfile(true);

        try {
            const data = {
                email,
                name: profileName,
                niche: profileNiche,
                location: profileLocation,
                rate: profileRate,
                bio: profileBio
            };
            const resp = await axios.post('http://localhost:2001/user/saveProfile', data);
            if (resp.data.status) {
                setProfileStatusMsg('Profile saved successfully!');
            } else {
                setProfileStatusMsg(resp.data.msg || 'Failed to save profile.');
            }
        } catch (err) {
            setProfileStatusMsg(err?.response?.data?.msg || 'Error saving profile.');
        } finally {
            setIsSavingProfile(false);
            setTimeout(() => setProfileStatusMsg(''), 3000);
        }
    };

    return (
        <div className="bg-white text-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <section className="relative overflow-hidden rounded-4xl border bg-slate-50 border-slate-200 backdrop-blur-2xl p-6 sm:p-8">
                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
                        <div className="space-y-4 max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] bg-slate-100 border-slate-200 text-slate-800">
                                Influencer Dashboard
                            </div>
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                                    Your premium creator control center.
                                </h1>
                                <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-500">
                                    Publish posts and share your content straight from your dashboard.
                                </p>
                            </div>
                        </div>

                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-200 flex items-center justify-center relative object-cover">
                                {profilePicUrl ? (
                                    <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="w-8 h-8 text-slate-400" />
                                )}

                                {isUploadingPic && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">Uploading...</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="profile-pic-upload"
                                    className={`cursor-pointer text-sm font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition shadow-sm ${isUploadingPic ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isUploadingPic ? 'Updating...' : 'Update Picture'}
                                </label>
                                <input
                                    id="profile-pic-upload"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={uploadProfilePicture}
                                    disabled={isUploadingPic}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile Details Section */}
                <section className="rounded-4xl border p-6 bg-white border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Profile Configuration</h2>
                            <p className="mt-1 text-sm text-slate-500">Brands will see these details on your public portfolio.</p>
                        </div>
                    </div>

                    <form className="grid gap-5 lg:grid-cols-2" onSubmit={saveInfluencerProfile}>
                        {profileStatusMsg && (
                            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                {profileStatusMsg}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Display Name</label>
                            <input type="text" required value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Your Brand/Creator Name" className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Your Niche</label>
                            <input type="text" required value={profileNiche} onChange={(e) => setProfileNiche(e.target.value)} placeholder="e.g. Tech, Fashion, Food" className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Location</label>
                            <input type="text" required value={profileLocation} onChange={(e) => setProfileLocation(e.target.value)} placeholder="e.g. New York, Online" className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Starting Rate</label>
                            <input type="text" required value={profileRate} onChange={(e) => setProfileRate(e.target.value)} placeholder="e.g. $150 / Post" className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900" />
                        </div>
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-2">Profile Bio</label>
                            <textarea rows="3" required value={profileBio} onChange={(e) => setProfileBio(e.target.value)} placeholder="A short description about your content..." className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900"></textarea>
                        </div>
                        <div className="lg:col-span-2 flex justify-end">
                            <button type="submit" disabled={isSavingProfile} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed">
                                {isSavingProfile ? 'Saving Profile...' : 'Save Profile Changes'}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="rounded-4xl border p-6 bg-white border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Content studio</h2>
                            <p className="mt-1 text-sm text-slate-500">Publish a new post with image preview and instant visibility.</p>
                        </div>
                    </div>

                    <form className="grid gap-5 xl:grid-cols-12" onSubmit={createPost}>
                        <div className="xl:col-span-7 space-y-4">
                            {postMsg && (
                                <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                    {postMsg}
                                </p>
                            )}
                            {postErr && (
                                <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                    {postErr}
                                </p>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Post Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter an engaging title..."
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Description</label>
                                <textarea
                                    rows="5"
                                    placeholder="What do you want to share?"
                                    value={postDescription}
                                    onChange={(e) => setPostDescription(e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition bg-white border-slate-200 text-slate-900 focus:border-slate-900"
                                ></textarea>
                            </div>
                        </div>

                        <div className="xl:col-span-5">
                            <label className="block text-sm font-medium text-slate-500 mb-2">Post Image</label>
                            <div className="rounded-[1.75rem] border p-4 bg-slate-100 border-slate-200 text-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl p-3 text-slate-800 bg-slate-100 border-slate-200 text-slate-800">
                                        <Camera className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Upload image</p>
                                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col items-end gap-3">
                                    <label htmlFor="post-image-upload" className="cursor-pointer rounded-2xl border border-dashed px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 bg-slate-100 border-slate-200 text-slate-800 w-full text-center">
                                        Choose Image
                                        <input
                                            id="post-image-upload"
                                            name="post-image-upload"
                                            type="file"
                                            accept="image/*"
                                            required
                                            onChange={(e) => {
                                                const selectedFile = e.target.files?.[0] || null;
                                                setPostImage(selectedFile);
                                                setPostImageName(selectedFile?.name || '');
                                            }}
                                            className="sr-only"
                                        />
                                    </label>

                                    {postImagePreview && (
                                        <div className="flex flex-col items-end gap-2 w-full mt-2">
                                            <img src={postImagePreview} alt="Post preview" className="w-full rounded-2xl border border-slate-200 object-cover shadow-sm" />
                                            {postImageName && <p className="max-w-xs text-right text-xs text-inherit/70 break-all">{postImageName}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="xl:col-span-12 flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isPosting}
                                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-200/25 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Plus size={16} /> {isPosting ? 'Publishing...' : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Posts Section */}
                <section className="relative overflow-hidden rounded-4xl border bg-slate-50 border-slate-200 backdrop-blur-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">Your Posts</h2>
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post, index) => (
                                <div key={index} className="bg-white rounded-[1.75rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                                    {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-slate-900 mb-2 truncate">{post.title}</h3>
                                        <p className="text-slate-600 text-sm line-clamp-3">{post.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-[1.75rem] border border-slate-200">
                            <p className="text-slate-500">No posts yet. Create your first post above!</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default InfluencerDashboard;
