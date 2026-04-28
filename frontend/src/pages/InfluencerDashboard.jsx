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
            } else {
                setPostErr(resp?.data?.msg || 'Failed to create post.');
            }
        } catch (err) {
            setPostErr(err?.response?.data?.msg || err.message || 'Failed to create post.');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="bg-white text-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <section className="relative overflow-hidden rounded-4xl border bg-slate-50 border-slate-200 backdrop-blur-2xl p-6 sm:p-8">
                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
                        <div className="space-y-4 max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] bg-slate-100 border-slate-200 text-slate-800">
                                <Sparkles className="h-3.5 w-3.5" /> Befluencer HQ
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
                    </div>
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
                                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    {postMsg}
                                </p>
                            )}
                            {postErr && (
                                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
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
            </div>
        </div>
    );
};

export default InfluencerDashboard;
