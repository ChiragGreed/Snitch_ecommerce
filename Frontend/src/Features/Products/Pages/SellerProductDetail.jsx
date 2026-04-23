import React, { useEffect, useState, useRef } from 'react'
import useProduct from '../Hook/useProduct';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const SellerProductDetail = () => {
    const { ProductHandler, updateProductHandler } = useProduct();
    const productData = useSelector((state) => state.products.Product);
    const { productId } = useParams();
    const navigate = useNavigate();

    const imageInputRef = useRef(null);

    const [FormData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        price: {
            amount: '',
            currency: 'INR'
        }
    });


    useEffect(() => {
        ProductHandler({ productId });
    }, [productId]);

    useEffect(() => {
        if (productData) {
            setFormData({
                title: productData.title,
                description: productData.description,
                price: productData.price,
                images: productData.images
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount" || name === "currency") {
            setFormData(prev => ({
                ...prev,
                price: { ...prev.price, [name]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageRemove = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleImageAdd = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...files]
            }));
        }
    };

    const getImageSource = (img) => {
        if (img instanceof File) {
            return URL.createObjectURL(img);
        }
        return img;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProductHandler(productId, FormData.title, FormData.description, FormData.price, FormData.images);

            // Clear previews and revoke URLs
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
            setImagePreviews([]);

            // Auto-hide success message after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000);
        }
        catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4f0] font-dm text-[#1a1612] antialiased">
            {/* ── HEADER ── */}
            <header className="sticky top-0 z-40 bg-[#f7f4f0]/90 backdrop-blur-md border-b border-[#e8e2db]">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/product/sellerProducts')}
                            className="group flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9a9089] hover:text-[#1a1612] transition-colors duration-300"
                        >
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Collection
                        </button>
                        <div className="w-px h-6 bg-[#e8e2db]" />
                        <h2 className="font-cormorant text-xl font-medium italic text-[#8a6e52]">Editing Product</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] border border-[#d4cdc6] text-[#9a9089] hover:bg-white hover:text-[#1a1612] transition-all duration-300 rounded-sm">
                            Discard
                        </button>
                        <button onClick={handleSubmit} className="px-8 py-2.5 bg-[#1a1612] text-[#f7f4f0] text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-[#2e2620] transition-all duration-300 rounded-sm shadow-lg shadow-[#1a1612]/10">
                            Save Changes
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* ── LEFT COLUMN: FORM ── */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Section: Basic Info */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a6e52] font-semibold">Step 01</span>
                                <h3 className="font-cormorant text-3xl font-light tracking-tight">Essential Details</h3>
                                <p className="text-[13px] text-[#9a9089] font-light">Define the core identity of your product. Titles should be evocative yet clear.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Title Input */}
                                <div className="space-y-2">
                                    <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium">Product Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={FormData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Linen Overcoat in Obsidian"
                                        className="w-full bg-transparent border-b border-[#d4cdc6] py-3 text-lg font-cormorant placeholder:text-[#d4cdc6] focus:border-[#1a1612] focus:outline-none transition-colors duration-300"
                                    />
                                </div>

                                {/* Description Input */}
                                <div className="space-y-2">
                                    <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={FormData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Narrate the craftsmanship behind this piece..."
                                        className="w-full bg-transparent border border-[#d4cdc6] p-4 text-[14px] leading-relaxed placeholder:text-[#d4cdc6] focus:border-[#1a1612] focus:outline-none transition-colors duration-300 resize-none rounded-sm"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section: Price & Category */}
                        <section className="pt-8 border-t border-[#e8e2db] space-y-8">
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a6e52] font-semibold">Step 02</span>
                                <h3 className="font-cormorant text-3xl font-light tracking-tight">Valuation</h3>
                            </div>

                            <div className="max-w-xs space-y-2">
                                <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium">Price (INR)</label>
                                <div className="relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9a9089] font-cormorant text-xl">₹</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={FormData.price.amount}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-[#d4cdc6] pl-6 py-3 text-xl font-cormorant focus:border-[#1a1612] focus:outline-none transition-colors duration-300"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ── RIGHT COLUMN: MEDIA ── */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-8">
                            <div className="space-y-2 text-right">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a6e52] font-semibold">Step 03</span>
                                <h3 className="font-cormorant text-3xl font-light tracking-tight">Visual Narrative</h3>
                                <p className="text-[13px] text-[#9a9089] font-light">The gallery defines the first impression. Arrange with care.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {FormData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-[3/4] bg-[#f0ebe4] overflow-hidden group">
                                        <img
                                            src={getImageSource(img)}
                                            alt={`Preview ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#1a1612]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button
                                                onClick={() => handleImageRemove(idx)}
                                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1a1612] hover:bg-white transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        {idx === 0 && (
                                            <span className="absolute top-3 left-3 px-2 py-1 bg-[#1a1612] text-[#f7f4f0] text-[8px] uppercase tracking-[0.15em] font-medium">Main</span>
                                        )}
                                    </div>
                                ))}

                                {/* Add Image Placeholder */}
                                <button
                                    onClick={() => imageInputRef.current?.click()}
                                    className="aspect-[3/4] border-2 border-dashed border-[#d4cdc6] flex flex-col items-center justify-center gap-3 text-[#9a9089] hover:border-[#1a1612] hover:text-[#1a1612] transition-all duration-300 group"
                                >
                                    <svg className="w-8 h-8 font-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Add Media</span>
                                </button>
                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    onChange={handleImageAdd}
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>

                            <div className="p-6 bg-white border border-[#e8e2db] rounded-sm">
                                <h4 className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium mb-3">Inventory Status</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                        <span className="text-[13px] text-[#1a1612]">Live in Boutique</span>
                                    </div>
                                    <button className="text-[11px] text-[#8a6e52] hover:underline">Mark as Archive</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* ── FOOTER SPACING ── */}
            <div className="h-24" />
        </div>
    )
}

export default SellerProductDetail
