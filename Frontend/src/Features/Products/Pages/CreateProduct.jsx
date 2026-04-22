import { useState } from "react";
import { useSelector } from "react-redux";
import useProduct from "../Hook/useProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SellerProtected from "../../Authentication/components/sellerProtected";

const CreateProduct = () => {
    const navigate = useNavigate();
    const { createProductHandler } = useProduct();
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        images: [],
        price: {
            amount: '',
            currency: 'INR'
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount" || name === "currency") {
            setProductData(prev => ({
                ...prev,
                price: { ...prev.price, [name]: value }
            }));
        } else {
            setProductData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Append to existing images
        setProductData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));

        // Generate and append previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setProductData(prev => {
            const newImages = [...prev.images];
            newImages.splice(index, 1);
            return { ...prev, images: newImages };
        });
        setImagePreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]);
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createProductHandler(productData);
            if (response) {
                setShowSuccess(true);
                
                // Reset form
                setProductData({
                    title: '',
                    description: '',
                    images: [],
                    price: {
                        amount: '',
                        currency: 'INR'
                    }
                });
                
                // Clear previews and revoke URLs
                imagePreviews.forEach(url => URL.revokeObjectURL(url));
                setImagePreviews([]);
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => setShowSuccess(false), 5000);
            }
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    // Clean up URLs on unmount
    useEffect(() => {
        return () => {
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    return (
        <SellerProtected>
            <div className="font-dm min-h-screen bg-[#f7f4f0] antialiased">
                {/* ── HEADER BAR ── */}
                <header className="sticky top-0 z-30 bg-[#f7f4f0]/80 backdrop-blur-xl border-b border-[#e8e2db]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                        <span 
                            onClick={() => navigate("/product/sellerProducts")}
                            className="font-cormorant text-[13px] font-semibold tracking-[0.3em] text-[#1a1612] uppercase cursor-pointer"
                        >
                            Snitch
                        </span>
                        <button
                            onClick={() => navigate("/product/sellerProducts")}
                            className="font-dm flex items-center gap-2 px-5 py-2.5 border border-[#e8e2db] text-[#1a1612] rounded-sm
                                       text-[11px] font-medium uppercase tracking-[0.18em] cursor-pointer
                                       transition-all duration-200 hover:bg-white active:scale-[0.98]"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                    </div>
                </header>

                {/* ── MAIN CONTENT ── */}
                <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
                    {/* Page Title Section */}
                    <div className="mb-12 lg:mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm
                                             text-[9px] font-medium uppercase tracking-[0.16em] text-[#8a6e52]
                                             border border-[rgba(138,110,82,0.25)] bg-[rgba(138,110,82,0.06)]">
                                <span className="w-[5px] h-[5px] rounded-full bg-[#8a6e52]" />
                                New Collection
                            </span>
                        </div>
                        <h1 className="font-cormorant text-[clamp(36px,4.5vw,52px)] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-3">
                            Add New{' '}
                            <em className="not-italic italic font-light text-[#8a6e52]">Product</em>
                        </h1>
                        <p className="font-dm text-[13.5px] font-light text-[#9a9089] leading-relaxed max-w-md">
                            Curate your inventory with precision. Every detail matters in the storytelling of your brand.
                        </p>
                        {/* Divider */}
                        <div className="w-12 h-px bg-[rgba(138,110,82,0.3)] mt-8" />
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* ── LEFT COLUMN: FORM FIELDS ── */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* General Information Section */}
                            <section className="space-y-8">
                                <div className="space-y-1.5">
                                    <label htmlFor="title" className="block font-dm text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">
                                        Product Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={productData.title}
                                        onChange={handleChange}
                                        className="w-full bg-white/50 border border-[#e8e2db] rounded-sm px-5 py-4
                                                   font-dm text-[15px] text-[#1a1612] placeholder:text-[#c0b8b0]
                                                   focus:outline-none focus:border-[#8a6e52] transition-colors duration-300"
                                        placeholder="Enter a descriptive title..."
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="description" className="block font-dm text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={productData.description}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full bg-white/50 border border-[#e8e2db] rounded-sm px-5 py-4
                                                   font-dm text-[14px] text-[#1a1612] placeholder:text-[#c0b8b0]
                                                   focus:outline-none focus:border-[#8a6e52] transition-colors duration-300 resize-none"
                                        placeholder="Describe the craftsmanship and materials..."
                                        required
                                    />
                                </div>
                            </section>

                            {/* Media Section */}
                            <section className="space-y-4">
                                <label className="block font-dm text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">
                                    Product Imagery
                                </label>
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <div className="w-full h-48 border border-[#e8e2db] border-dashed rounded-sm bg-white/30
                                                        flex flex-col items-center justify-center gap-3 group-hover:bg-white/50 transition-colors duration-300">
                                            <div className="w-10 h-10 rounded-full bg-[#f0ebe4] border border-[#e8e2db] flex items-center justify-center">
                                                <svg className="w-4 h-4 text-[#8a6e52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="text-center px-4">
                                                <p className="font-dm text-[12px] font-medium text-[#1a1612]">Add More Images</p>
                                                <p className="font-dm text-[10px] text-[#9a9089] mt-0.5">High resolution visuals create higher conversion.</p>
                                            </div>
                                        </div>
                                        <input
                                            id="images"
                                            name="images"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>

                                    {/* Image Preview Grid */}
                                    {imagePreviews.length > 0 && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {imagePreviews.map((url, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-sm overflow-hidden border border-[#e8e2db] bg-white group">
                                                    <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#1a1612]/80 backdrop-blur-sm rounded-full 
                                                                   flex items-center justify-center text-white opacity-0 group-hover:opacity-100 
                                                                   transition-all duration-200 hover:bg-[#1a1612]"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    <div className="absolute bottom-0 left-0 right-0 bg-[#1a1612]/40 backdrop-blur-[2px] py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-[8px] text-white uppercase tracking-widest font-medium">Image {idx + 1}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Pricing Section */}
                            <section className="pt-8 border-t border-[#e8e2db]">
                                <h3 className="font-cormorant text-[24px] font-light text-[#1a1612] mb-6">Pricing Detail</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-1.5">
                                        <label htmlFor="amount" className="block font-dm text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">
                                            Amount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-cormorant text-[18px] text-[#8a6e52]">
                                                {productData.price.currency === 'INR' ? '₹' : productData.price.currency}
                                            </span>
                                            <input
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                value={productData.price.amount}
                                                onChange={handleChange}
                                                className="w-full bg-white/50 border border-[#e8e2db] rounded-sm pl-10 pr-5 py-4
                                                           font-dm text-[15px] text-[#1a1612] focus:outline-none focus:border-[#8a6e52]"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="currency" className="block font-dm text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6e52]">
                                            Currency
                                        </label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            value={productData.price.currency}
                                            onChange={handleChange}
                                            className="w-full bg-white/50 border border-[#e8e2db] rounded-sm px-5 py-4
                                                       font-dm text-[13px] text-[#1a1612] focus:outline-none focus:border-[#8a6e52] appearance-none cursor-pointer"
                                        >
                                            <option value="INR">INR - Indian Rupee</option>
                                            <option value="USD">USD - US Dollar</option>
                                            <option value="EUR">EUR - Euro</option>
                                            <option value="GBP">GBP - Pound Sterling</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Publish Action */}
                            <div className="pt-12">
                                <button
                                    type="submit"
                                    className="w-full lg:w-auto px-12 py-4 bg-[#1a1612] text-[#f0ebe4] rounded-sm
                                               text-[12px] font-medium uppercase tracking-[0.2em] cursor-pointer
                                               transition-all duration-300 hover:bg-[#2e2620] hover:shadow-xl active:scale-[0.98]"
                                >
                                    Publish Product
                                </button>
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN: INFO/TIPS ── */}
                        <div className="lg:col-span-4 space-y-10">
                            {/* Guidance Card */}
                            <div className="bg-white/40 backdrop-blur-sm border border-[#e8e2db] p-8 rounded-sm space-y-6">
                                <h4 className="font-cormorant text-[20px] font-medium text-[#1a1612] border-b border-[#e8e2db] pb-4">
                                    Curator's Notes
                                </h4>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="block font-dm text-[11px] font-semibold text-[#8a6e52] uppercase tracking-wider">Imagery</span>
                                        <p className="font-dm text-[12px] text-[#9a9089] leading-relaxed">
                                            Use natural lighting and high contrast. Minimum 3 images recommended for luxury feel.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block font-dm text-[11px] font-semibold text-[#8a6e52] uppercase tracking-wider">Storytelling</span>
                                        <p className="font-dm text-[12px] text-[#9a9089] leading-relaxed">
                                            Detail the heritage, the craftsmanship, and the journey of each piece.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block font-dm text-[11px] font-semibold text-[#8a6e52] uppercase tracking-wider">Pricing</span>
                                        <p className="font-dm text-[12px] text-[#9a9089] leading-relaxed">
                                            Honest pricing reflects the true value of the artistry involved.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Badge */}
                            <div className="relative aspect-[4/5] bg-[#f0ebe4] rounded-sm overflow-hidden border border-[#e8e2db] group">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-[#e8e2db]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="h-4 w-2/3 bg-white/40 mb-2 rounded-full animate-pulse" />
                                    <div className="h-6 w-1/3 bg-[#8a6e52]/20 rounded-full animate-pulse" />
                                </div>
                                <div className="absolute inset-0 bg-[#1a1612]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1612] shadow-sm">
                                        Preview Card
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>

                {/* ── FOOTER ── */}
                <footer className="border-t border-[#e8e2db] mt-16 bg-[#f7f4f0]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex items-center justify-between">
                        <span className="font-dm text-[11px] font-light text-[#c0b8b0] tracking-[0.04em]">
                            © 2026 Snitch. All rights reserved.
                        </span>
                        <span className="font-dm text-[11px] font-light text-[#c0b8b0] tracking-[0.04em]">
                            Artisan Portal
                        </span>
                    </div>
                </footer>

                {/* Success Message Overlay */}
                {showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                        <div className="absolute inset-0 bg-[#1a1612]/20 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
                        <div className="relative bg-white p-10 rounded-sm shadow-2xl border border-[#e8e2db] max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-[#f0ebe4] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#e8e2db]">
                                <svg className="w-8 h-8 text-[#8a6e52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-cormorant text-[28px] font-light text-[#1a1612] mb-2">Collection Updated</h3>
                            <p className="font-dm text-[13px] text-[#9a9089] leading-relaxed mb-8">
                                Your new creation has been successfully added to the catalogue.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="w-full py-3.5 bg-[#1a1612] text-[#f0ebe4] rounded-sm text-[11px] font-medium uppercase tracking-[0.2em] cursor-pointer"
                            >
                                Continue Curating
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </SellerProtected>
    );
};

export default CreateProduct;  