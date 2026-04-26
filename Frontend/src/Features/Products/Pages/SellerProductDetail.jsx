import React, { useEffect, useState, useRef } from 'react'
import useProduct from '../Hook/useProduct';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import SellerProtected from '../../Authentication/components/sellerProtected';

const SellerProductDetail = () => {
    const { ProductHandler, updateProductHandler, createVariantHandler } = useProduct();
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

    const [newVariants, setNewVariants] = useState([]);
    const [isAddingVariant, setIsAddingVariant] = useState(false);
    const [currentVariant, setCurrentVariant] = useState({
        attributes: [{ key: '', value: '' }],
        price: { amount: '', currency: 'INR' },
        stock: '',
        images: []
    });

    const variantImageInputRef = useRef(null);

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

    // --- VARIANT HANDLERS ---
    const handleVariantChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount") {
            setCurrentVariant(prev => ({
                ...prev,
                price: { ...prev.price, amount: value }
            }));
        } else {
            setCurrentVariant(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAttributeChange = (index, field, value) => {
        const updatedAttributes = [...currentVariant.attributes];
        updatedAttributes[index][field] = value;
        setCurrentVariant(prev => ({ ...prev, attributes: updatedAttributes }));
    };

    const addAttributeField = () => {
        setCurrentVariant(prev => ({
            ...prev,
            attributes: [...prev.attributes, { key: '', value: '' }]
        }));
    };

    const removeAttributeField = (index) => {
        setCurrentVariant(prev => ({
            ...prev,
            attributes: prev.attributes.filter((_, i) => i !== index)
        }));
    };

    const handleVariantImageAdd = (e) => {
        const files = Array.from(e.target.files);
        setCurrentVariant(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleVariantImageRemove = (index) => {
        setCurrentVariant(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const addVariantToStaging = () => {
        if (!currentVariant.stock) {
            alert("Stock is required for a variant.");
            return;
        }
        setNewVariants(prev => [...prev, currentVariant]);
        setCurrentVariant({
            attributes: [{ key: '', value: '' }],
            price: { amount: '', currency: 'INR' },
            stock: '',
            images: []
        });
        setIsAddingVariant(false);
    };

    const removeStagedVariant = (index) => {
        setNewVariants(prev => prev.filter((_, i) => i !== index));
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
            const updatedTitle = FormData.title === productData.title ? null : FormData.title;
            const updatedDescription = FormData.description === productData.description ? null : FormData.description;
            const updatedPrice = JSON.stringify(FormData.price) === JSON.stringify(productData.price) ? null : FormData.price;
            const updatedImages = FormData.images;

            // Update main product
            await updateProductHandler(productId, updatedTitle, updatedDescription, updatedPrice, updatedImages);

            // Create new variants
            for (const variant of newVariants) {
                const attributeMap = {};
                variant.attributes.forEach(attr => {
                    if (attr.key && attr.value) attributeMap[attr.key] = attr.value;
                });

                // Fallback price if variant price is empty (as it's optional)
                const variantPrice = variant.price.amount ? variant.price : FormData.price;

                await createVariantHandler({
                    productId,
                    attribute: attributeMap,
                    price: variantPrice,
                    stock: variant.stock,
                    images: variant.images
                });
            }

            setNewVariants([]);
            alert("Product and variants updated successfully.");
        }
        catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    return (
        <SellerProtected>
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
                        <div className="lg:col-span-7 space-y-16">
                            {/* Section: Basic Info */}
                            <section className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a6e52] font-semibold">Step 01</span>
                                    <h3 className="font-cormorant text-3xl font-light tracking-tight">Essential Details</h3>
                                    <p className="text-[13px] text-[#9a9089] font-light">Define the core identity of your product. Titles should be evocative yet clear.</p>
                                </div>

                                <div className="space-y-6">
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
                                    <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium">Base Price (INR)</label>
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

                            {/* Section: Variants */}
                            <section className="pt-12 border-t border-[#e8e2db] space-y-10">
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a6e52] font-semibold">Step 04</span>
                                    <h3 className="font-cormorant text-3xl font-light tracking-tight">Product Variants</h3>
                                    <p className="text-[13px] text-[#9a9089] font-light">Create versions of this product with unique attributes like color or size.</p>
                                </div>

                                {/* Variant List (Staged) */}
                                {newVariants.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="text-[11px] uppercase tracking-[0.1em] text-[#8a6e52] font-medium">Staged Variants ({newVariants.length})</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {newVariants.map((v, idx) => (
                                                <div key={idx} className="bg-white p-5 border border-[#e8e2db] rounded-sm relative group">
                                                    <button
                                                        onClick={() => removeStagedVariant(idx)}
                                                        className="absolute top-3 right-3 text-[#9a9089] hover:text-red-500 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    <div className="space-y-2">
                                                        <div className="flex flex-wrap gap-2">
                                                            {v.attributes.map((attr, i) => (
                                                                <span key={i} className="px-2 py-0.5 bg-[#f7f4f0] text-[10px] uppercase tracking-wider text-[#8a6e52] rounded-full">
                                                                    {attr.key}: {attr.value}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <div className="text-[12px] text-[#1a1612] flex justify-between pt-2">
                                                            <span>Stock: {v.stock}</span>
                                                            <span className="italic font-cormorant text-[#8a6e52]">
                                                                {v.price.amount ? `₹${v.price.amount}` : "Inherited Price"}
                                                            </span>
                                                        </div>
                                                        {v.images.length > 0 && (
                                                            <div className="flex gap-1 pt-2">
                                                                {v.images.map((img, i) => (
                                                                    <img key={i} src={getImageSource(img)} className="w-8 h-8 object-cover rounded-xs" alt="" />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add Variant Control */}
                                {!isAddingVariant ? (
                                    <button
                                        onClick={() => setIsAddingVariant(true)}
                                        className="w-full py-8 border-2 border-dashed border-[#d4cdc6] rounded-sm flex flex-col items-center justify-center gap-3 text-[#8a6e52] hover:border-[#1a1612] hover:text-[#1a1612] transition-all duration-300 group bg-white/50"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-[#d4cdc6] flex items-center justify-center group-hover:border-[#1a1612] transition-colors">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-[11px] uppercase tracking-[0.2em] font-medium">Add Product Variant</span>
                                            <span className="block text-[10px] text-[#9a9089] mt-1 font-light italic">Define sizes, colors, or specifications</span>
                                        </div>
                                    </button>
                                ) : (
                                    <div className="bg-white p-10 border border-[#e8e2db] rounded-sm space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="font-cormorant text-2xl font-light text-[#1a1612]">Configure New Variant</h4>
                                                <p className="text-[11px] text-[#9a9089] italic">Set unique attributes for this version</p>
                                            </div>
                                            <button
                                                onClick={() => setIsAddingVariant(false)}
                                                className="p-2 text-[#9a9089] hover:text-[#1a1612] transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Attributes Builder */}
                                        <div className="space-y-6">
                                            <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium block">Defining Attributes</label>
                                            <div className="space-y-4">
                                                {currentVariant.attributes.map((attr, idx) => (
                                                    <div key={idx} className="flex gap-4 items-end">
                                                        <div className="flex-1 space-y-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Key (e.g. Color)"
                                                                value={attr.key}
                                                                onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
                                                                className="w-full bg-transparent border-b border-[#d4cdc6] py-2 text-[14px] focus:border-[#1a1612] focus:outline-none transition-colors"
                                                            />
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Value (e.g. Midnight)"
                                                                value={attr.value}
                                                                onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                                                                className="w-full bg-transparent border-b border-[#d4cdc6] py-2 text-[14px] focus:border-[#1a1612] focus:outline-none transition-colors"
                                                            />
                                                        </div>
                                                        {currentVariant.attributes.length > 1 && (
                                                            <button onClick={() => removeAttributeField(idx)} className="p-2 text-[#9a9089] hover:text-red-400">
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={addAttributeField}
                                                    className="text-[11px] uppercase tracking-[0.1em] text-[#8a6e52] hover:text-[#1a1612] transition-colors flex items-center gap-2"
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add Attribute
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price & Stock */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium">Override Price (Optional)</label>
                                                <div className="relative">
                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9a9089] font-cormorant">₹</span>
                                                    <input
                                                        type="number"
                                                        name="amount"
                                                        value={currentVariant.price.amount}
                                                        onChange={handleVariantChange}
                                                        className="w-full bg-transparent border-b border-[#d4cdc6] pl-4 py-2 text-[14px] focus:border-[#1a1612] focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium">Available Stock</label>
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    value={currentVariant.stock}
                                                    onChange={handleVariantChange}
                                                    className="w-full bg-transparent border-b border-[#d4cdc6] py-2 text-[14px] focus:border-[#1a1612] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Variant Images */}
                                        <div className="space-y-4">
                                            <label className="text-[11px] uppercase tracking-[0.1em] text-[#1a1612] font-medium block">Variant Imagery</label>
                                            <div className="flex flex-wrap gap-4">
                                                {currentVariant.images.map((img, idx) => (
                                                    <div key={idx} className="relative w-16 h-20 bg-[#f0ebe4] rounded-xs group">
                                                        <img src={getImageSource(img)} className="w-full h-full object-cover rounded-xs" alt="" />
                                                        <button
                                                            onClick={() => handleVariantImageRemove(idx)}
                                                            className="absolute -top-2 -right-2 w-5 h-5 bg-white shadow-sm border border-[#e8e2db] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => variantImageInputRef.current?.click()}
                                                    className="w-16 h-20 border border-dashed border-[#d4cdc6] flex flex-col items-center justify-center gap-1 text-[#9a9089] hover:border-[#1a1612] hover:text-[#1a1612] transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    <span className="text-[8px] uppercase tracking-tighter">Add</span>
                                                </button>
                                                <input type="file" ref={variantImageInputRef} onChange={handleVariantImageAdd} multiple accept="image/*" className="hidden" />
                                            </div>
                                        </div>

                                        <button
                                            onClick={addVariantToStaging}
                                            className="w-full py-4 border border-[#1a1612] text-[#1a1612] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#1a1612] hover:text-[#f7f4f0] transition-all duration-300 rounded-sm"
                                        >
                                            Add to Staging List
                                        </button>
                                    </div>
                                )}
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

                <div className="h-24" />
            </div>
        </SellerProtected>
    );
};

export default SellerProductDetail;
