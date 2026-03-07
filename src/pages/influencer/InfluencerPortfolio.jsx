import { useState, useRef } from 'react';
import { Upload, Plus, X, GripVertical, Image, Video, FileText, Loader2 } from 'lucide-react';

const MOCK_PORTFOLIO = [
    { id: 1, title: 'Summer Fashion Lookbook', type: 'image', category: 'Fashion' },
    { id: 2, title: 'Skincare Routine Reel', type: 'video', category: 'Beauty' },
    { id: 3, title: 'Travel Vlog - Goa', type: 'video', category: 'Travel' },
];

const TYPE_ICONS = { image: Image, video: Video, article: FileText };
const CATEGORIES = ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Food', 'Travel', 'Lifestyle', 'Gaming'];

export default function InfluencerPortfolio() {
    const [items, setItems] = useState(MOCK_PORTFOLIO);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', category: 'Fashion', type: 'image' });
    const fileInputRef = useRef(null);
    const [draggedIdx, setDraggedIdx] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer?.files?.length) simulateUpload(e.dataTransfer.files[0].name);
    };

    const handleFileSelect = (e) => {
        if (e.target.files?.length) simulateUpload(e.target.files[0].name);
    };

    const simulateUpload = (filename) => {
        setUploading(true);
        setTimeout(() => {
            setItems([...items, { id: Date.now(), title: filename.replace(/\.[^/.]+$/, ''), type: 'image', category: 'Uncategorized' }]);
            setUploading(false);
        }, 1200);
    };

    const addItem = () => {
        if (!newItem.title.trim()) return;
        setItems([...items, { ...newItem, id: Date.now() }]);
        setNewItem({ title: '', category: 'Fashion', type: 'image' });
        setShowForm(false);
    };

    const removeItem = (id) => setItems(items.filter((i) => i.id !== id));

    const handleDragStart = (i) => setDraggedIdx(i);
    const handleDragOverItem = (e, i) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === i) return;
        const r = [...items];
        const [m] = r.splice(draggedIdx, 1);
        r.splice(i, 0, m);
        setItems(r);
        setDraggedIdx(i);
    };
    const handleDragEnd = () => setDraggedIdx(null);

    return (
        <div className="page">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 anim-fade-up">
                <div>
                    <p className="page-title">Portfolio</p>
                    <p className="page-subtitle">Showcase your best work to brands</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm">
                    {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Item</>}
                </button>
            </div>

            {/* Add form */}
            {showForm && (
                <div className="card p-5 mb-5 anim-fade-up">
                    <h2 className="section-heading mb-4">New Portfolio Item</h2>
                    <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                            <label className="label">Title</label>
                            <input className="input" placeholder="My amazing work" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="label">Category</label>
                            <select className="input" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Type</label>
                            <select className="input" value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                                <option value="article">Article</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={addItem} className="btn btn-primary btn-sm">Add to Portfolio</button>
                    </div>
                </div>
            )}

            {/* Drop zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="card mb-6 p-10 text-center cursor-pointer transition-all anim-fade-up"
                style={{
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    borderColor: dragOver ? 'var(--color-primary)' : 'var(--color-border)',
                    background: dragOver ? 'var(--color-primary-subtle)' : 'var(--color-surface-1)',
                }}
            >
                <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleFileSelect} />
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-primary)' }}>Uploading...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <Upload size={32} style={{ color: 'var(--color-text-3)' }} />
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>Drag & drop files here</p>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-3)' }}>or click to browse · Images & Videos</p>
                    </div>
                )}
            </div>

            {/* Grid */}
            {items.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item, index) => {
                        const TypeIcon = TYPE_ICONS[item.type] || FileText;
                        return (
                            <div
                                key={item.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOverItem(e, index)}
                                onDragEnd={handleDragEnd}
                                className="card overflow-hidden group cursor-grab active:cursor-grabbing"
                                style={{ opacity: draggedIdx === index ? 0.4 : 1 }}
                            >
                                {/* Preview area */}
                                <div className="h-36 flex items-center justify-center" style={{ background: 'var(--color-surface-2)' }}>
                                    <TypeIcon size={36} style={{ color: 'var(--color-text-3)', opacity: 0.4 }} />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 style={{ fontSize: '14px', fontWeight: 600 }} className="truncate flex-1">{item.title}</h3>
                                        <button onClick={() => removeItem(item.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            style={{ background: 'none', border: 'none', color: 'var(--color-danger)', padding: '2px' }}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="badge" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>{item.category}</span>
                                        <span style={{ fontSize: '12px', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <TypeIcon size={12} /> {item.type}
                                        </span>
                                    </div>
                                </div>
                                {/* Drag indicator */}
                                <div className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'var(--color-primary)' }} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="card p-16 text-center">
                    <Image size={40} style={{ color: 'var(--color-text-3)', margin: '0 auto 12px', opacity: 0.4 }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>No portfolio items yet</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-3)' }}>Upload your best work to showcase to brands</p>
                </div>
            )}
        </div>
    );
}
