import { useSelector } from "react-redux";
import useProduct from "../Hook/useProduct";
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { ProductHandler } = useProduct();
    const productData = useSelector((state) => state.products.Product);
    const { productId } = useParams();

    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { addItemToCartHandler } = useProduct();

    useEffect(() => {
        ProductHandler({ productId });
    }, [productId]);

    useEffect(() => {
        if (selectedVariant?.images?.length > 0) {
            setMainImage(selectedVariant.images[0]);
        } else if (productData?.images?.length > 0) {
            setMainImage(productData.images[0]);
        }
    }, [productData, selectedVariant]);

    // Extract unique attribute types and their available values
    const attributeStructure = useMemo(() => {
        if (!productData?.variants?.length) return {};

        const structure = {};
        productData.variants.forEach((variant) => {
            const attrs = variant.attribute || variant.attributes || {};
            if (typeof attrs === 'object' && !Array.isArray(attrs)) {
                Object.entries(attrs).forEach(([key, value]) => {
                    if (!structure[key]) {
                        structure[key] = new Set();
                    }
                    structure[key].add(value);
                });
            }
        });

        // Convert Sets to Arrays
        Object.keys(structure).forEach(key => {
            structure[key] = Array.from(structure[key]).sort();
        });

        return structure;
    }, [productData?.variants]);

    // Find matching variant based on selected attributes
    useEffect(() => {
        if (!productData?.variants?.length) return;

        const matchingVariant = productData.variants.find((variant) => {
            const attrs = variant.attribute || variant.attributes || {};
            return Object.keys(selectedAttributes).length > 0 &&
                Object.entries(selectedAttributes).every(
                    ([key, value]) => attrs[key] === value
                );
        });

        setSelectedVariant(matchingVariant || null);
    }, [selectedAttributes, productData?.variants]);

    if (!productData) {
        return (
            <div className="min-h-screen bg-[#f7f4f0] flex items-center justify-center font-dm antialiased">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#1a1612] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#9a9089] text-[13px] uppercase tracking-[0.2em]">Loading Piece...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f4f0] font-dm antialiased">
            {/* ── NAVIGATION ── */}
            <nav className="sticky top-0 z-40 bg-[#f7f4f0]/80 backdrop-blur-xl border-b border-[#e8e2db]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[#1a1612] transition-colors"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Back</span>
                    </button>
                    <span className="font-cormorant text-[13px] font-semibold tracking-[0.3em] text-[#1a1612] uppercase">
                        Snitch
                    </span>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* ── LEFT COLUMN: IMAGERY ── */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Main Image Display */}
                        <div className="relative aspect-[4/5] bg-white overflow-hidden group">
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={productData.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#f0ebe4] animate-pulse" />
                            )}
                            {/* Zoom/Expand indicator (Decorative) */}
                            <div className="absolute bottom-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>

                        {/* Thumbnails Strip */}
                        {(selectedVariant?.images && selectedVariant.images.length > 1 || productData.images && productData.images.length > 1) && (
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                {(selectedVariant?.images || productData.images).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`flex-shrink-0 w-24 aspect-[4/5] bg-white overflow-hidden transition-all duration-300 relative
                                                   ${mainImage === img ? 'ring-1 ring-[#1a1612]' : 'hover:opacity-80'}`}
                                    >
                                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                        {mainImage === img && <div className="absolute inset-0 bg-[#1a1612]/5" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN: DETAILS ── */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <header className="mb-10">
                            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8a6e52] font-medium mb-3 block">
                                Collection 2026
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-cormorant font-light text-[#1a1612] leading-tight mb-6">
                                {productData.title}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-2xl font-dm font-medium text-[#1a1612]">
                                    {productData.price?.currency === 'INR' ? '₹' : '$'}
                                    {productData.price?.amount?.toLocaleString()}
                                </span>
                                <span className="text-[11px] text-[#9a9089] uppercase tracking-wider">
                                    Taxes Included
                                </span>
                            </div>
                        </header>

                        <div className="space-y-8 mb-12">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#1a1612] font-bold mb-3">
                                    Description
                                </h3>
                                <p className="text-[#586064] text-[14px] leading-[1.8] font-light max-w-md">
                                    {productData.description}
                                </p>
                            </div>

                            {/* ── VARIANTS SECTION ── */}
                            {productData.variants && productData.variants.length > 0 && Object.keys(attributeStructure).length > 0 && (
                                <div className="space-y-6 pt-6 border-t border-[#e8e2db]">
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#1a1612] font-bold">
                                        Select Options
                                    </h3>

                                    {Object.entries(attributeStructure).map(([attrName, attrValues]) => {
                                        // Helper function to get the first image of a variant with this attribute value
                                        const getImageForAttributeValue = (attrValue) => {
                                            const variant = productData.variants.find((v) => {
                                                const attrs = v.attribute || v.attributes || {};
                                                return attrs[attrName] === attrValue;
                                            });
                                            return variant?.images?.[0] || null;
                                        };

                                        return (
                                            <div key={attrName} className="space-y-4">
                                                <label className="text-[11px] uppercase tracking-[0.15em] text-[#8a6e52] font-semibold block">
                                                    {attrName}
                                                </label>
                                                <div className="flex flex-wrap gap-6">
                                                    {attrValues.map((value) => {
                                                        const isSelected = selectedAttributes[attrName] === value;
                                                        const imageUrl = getImageForAttributeValue(value);

                                                        return (
                                                            <div key={`${attrName}-${value}`} className="flex flex-col items-center gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedAttributes(prev => {
                                                                            const updated = { ...prev };
                                                                            if (updated[attrName] === value) {
                                                                                delete updated[attrName];
                                                                            } else {
                                                                                updated[attrName] = value;
                                                                            }
                                                                            return updated;
                                                                        });
                                                                    }}
                                                                    className={`w-16 h-16 rounded-full overflow-hidden transition-all duration-300 flex-shrink-0
                                                                        ${isSelected
                                                                            ? 'ring-2 ring-[#1a1612] ring-offset-2 shadow-lg'
                                                                            : 'ring-1 ring-[#e8e2db] hover:ring-[#1a1612]'
                                                                        }`}
                                                                >
                                                                    {imageUrl ? (
                                                                        <img
                                                                            src={imageUrl}
                                                                            alt={value}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-[#f0ebe4] flex items-center justify-center">
                                                                            <svg className="w-6 h-6 text-[#c0b8b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                                <span className="text-[11px] uppercase tracking-wider font-medium text-[#1a1612] text-center">
                                                                    {value}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Selected Variant Info */}
                                    {selectedVariant && (
                                        <div className="mt-6 p-4 bg-[#f0ebe4] rounded-sm space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[12px] text-[#8a6e52] uppercase tracking-wider font-medium">
                                                    Stock Available:
                                                </span>
                                                <span className={`font-medium ${selectedVariant.stock > 0 ? 'text-[#1a1612]' : 'text-red-600'}`}>
                                                    {selectedVariant.stock} {selectedVariant.stock === 0 ? '(Out of Stock)' : ''}
                                                </span>
                                            </div>
                                            {selectedVariant.price?.amount && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[12px] text-[#8a6e52] uppercase tracking-wider font-medium">
                                                        Variant Price:
                                                    </span>
                                                    <span className="font-medium text-[#1a1612]">
                                                        ₹{selectedVariant.price.amount.toLocaleString()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {Object.keys(selectedAttributes).length > 0 && !selectedVariant && (
                                        <div className="mt-6 p-4 bg-[#fce8e8] rounded-sm">
                                            <span className="text-[12px] text-red-600 uppercase tracking-wider font-medium">
                                                ✕ This combination is not available
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col gap-4 pt-6">
                                <button className={`w-full py-4 text-[#f7f4f0] font-dm text-[12px] font-medium uppercase tracking-[0.2em] 
                                                 rounded-sm transition-all duration-300 active:scale-[0.98] shadow-lg
                                                 ${selectedVariant && selectedVariant.stock > 0
                                        ? 'bg-[#1a1612] hover:bg-[#2e2620] cursor-pointer'
                                        : 'bg-[#c0b8b0] cursor-not-allowed'}`}
                                    disabled={!selectedVariant || selectedVariant.stock === 0}
                                    onClick={() => { addItemToCartHandler(productId, selectedVariant._id) }}
                                >
                                    {selectedVariant
                                        ? selectedVariant.stock > 0
                                            ? 'Add Selected to Bag'
                                            : 'Out of Stock'
                                        : productData.variants?.length > 0
                                            ? 'Select Options First'
                                            : 'Purchase Now'
                                    }
                                </button>

                            </div>
                        </div>

                        {/* ── TONAL INFO SECTIONS ── */}
                        <div className="space-y-1 mt-auto">
                            <div className="bg-[#f0ebe4] p-6 group cursor-pointer transition-colors hover:bg-[#e8e2db]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#8a6e52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1a1612]">Complimentary Shipping</span>
                                    </div>
                                    <svg className="w-3.5 h-3.5 text-[#9a9089]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <p className="mt-2 pl-9 text-[12px] text-[#9a9089] leading-relaxed">
                                    Standard delivery within 3-5 business days.
                                </p>
                            </div>

                            <div className="bg-[#f0ebe4] p-6 group cursor-pointer transition-colors hover:bg-[#e8e2db]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <svg className="w-5 h-5 text-[#8a6e52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                        </svg>
                                        <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1a1612]">Curated Returns</span>
                                    </div>
                                    <svg className="w-3.5 h-3.5 text-[#9a9089]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <p className="mt-2 pl-9 text-[12px] text-[#9a9089] leading-relaxed">
                                    30-day effortless returns for all curated pieces.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── FOOTER ── */}
            <footer className="border-t border-[#e8e2db] mt-20">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="font-cormorant text-[16px] italic text-[#1a1612]">
                        The Art of Minimalism
                    </span>
                    <span className="font-dm text-[10px] font-light text-[#c0b8b0] uppercase tracking-[0.2em]">
                        © 2026 Snitch Atelier. All rights reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default ProductDetail;  