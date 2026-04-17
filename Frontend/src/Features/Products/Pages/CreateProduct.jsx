import { useState } from "react";
import { useSelector } from "react-redux";
import useProduct from "../Hook/useProduct";

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        images: [],
        price: {
            amount: '',
            currency: 'USD'
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductData(prev => ({
            ...prev,
            images: files
        }));
    };

    const { createProductHandler } = useProduct();

    const handleSubmit = (e) => {
        e.preventDefault();
        createProductHandler(productData);
    };

    return (
        <div className="bg-[#f8f9fa] text-[#2b3437] min-h-screen py-12 font-sans tracking-wide">
            <main className="max-w-5xl mx-auto px-6 py-12 mb-24">
                {/* Editorial Header */}
                <div className="mb-12">
                    <h1 className="text-[3.5rem] font-extrabold leading-tight text-[#2b3437] tracking-tight">New Curation</h1>
                    <p className="text-[#586064] text-lg mt-2 max-w-2xl font-medium tracking-wide">
                        Transform your product into an experience. Provide high-fidelity details to captivate your discerning audience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Primary Product Card */}
                        <section className="bg-white rounded-xl p-8 lg:p-12 shadow-[0_8px_24px_rgba(82,94,127,0.04)] border border-[#dbe4e7]/40">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Title Field */}
                                <div className="space-y-3">
                                    <label htmlFor="title" className="text-sm font-semibold text-[#586064] uppercase tracking-widest">
                                        Product Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={productData.title}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-[#abb3b7]/30 rounded-xl px-6 py-4 text-xl font-medium focus:ring-4 focus:ring-[#dae2ff]/50 focus:border-[#525e7f] transition-all outline-none text-[#2b3437] placeholder:text-[#abb3b7]/50"
                                        placeholder="e.g., Hand-Knotted Silk Tapestry"
                                        required
                                    />
                                </div>

                                {/* Description Field */}
                                <div className="space-y-3">
                                    <label htmlFor="description" className="text-sm font-semibold text-[#586064] uppercase tracking-widest">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={productData.description}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full bg-white border border-[#abb3b7]/30 rounded-xl px-6 py-4 text-base focus:ring-4 focus:ring-[#dae2ff]/50 focus:border-[#525e7f] transition-all outline-none text-[#2b3437] placeholder:text-[#abb3b7]/50 resize-none font-sans"
                                        placeholder="Describe the craftsmanship, heritage, and unique textures of this piece..."
                                        required
                                    ></textarea>
                                </div>

                                {/* Media Upload */}
                                <div className="space-y-3">
                                    <label htmlFor="images" className="text-sm font-semibold text-[#586064] uppercase tracking-widest">
                                        Product Images
                                    </label>
                                    <div className="relative group cursor-pointer">
                                        <div className="w-full h-64 border-2 border-dashed border-[#abb3b7]/40 rounded-xl bg-[#f1f4f6] flex flex-col items-center justify-center gap-4 group-hover:bg-[#eaeff1] transition-colors">
                                            <div className="w-16 h-16 rounded-full bg-[#dae2ff] flex items-center justify-center text-[#525e7f]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-[#2b3437]">Drop your files here or click to browse</p>
                                                <p className="text-sm text-[#586064] mt-1">High-resolution JPEG or PNG up to 20MB</p>
                                                {productData.images.length > 0 && (
                                                    <p className="text-sm text-[#525e7f] mt-2 font-medium">{productData.images.length} file(s) selected</p>
                                                )}
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
                                </div>

                                {/* Pricing Section */}
                                <div className="pt-6">
                                    <h3 className="text-2xl font-bold mb-6 text-[#2b3437]">Pricing</h3>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-grow space-y-3">
                                            <label htmlFor="amount" className="text-sm font-semibold text-[#586064] uppercase tracking-widest">
                                                Amount
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#586064] font-bold text-lg">
                                                    {productData.price.currency === 'USD' ? '$' : productData.price.currency === 'EUR' ? '€' : productData.price.currency === 'GBP' ? '£' : '₹'}
                                                </span>
                                                <input
                                                    type="number"
                                                    id="amount"
                                                    name="amount"
                                                    value={productData.price.amount}
                                                    onChange={handleChange}
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full bg-white border border-[#abb3b7]/30 rounded-xl pl-12 pr-6 py-4 text-xl font-medium focus:ring-4 focus:ring-[#dae2ff]/50 focus:border-[#525e7f] transition-all outline-none text-[#2b3437]"
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:w-1/3 space-y-3">
                                            <label htmlFor="currency" className="text-sm font-semibold text-[#586064] uppercase tracking-widest">
                                                Currency
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="currency"
                                                    name="currency"
                                                    value={productData.price.currency}
                                                    onChange={handleChange}
                                                    className="w-full bg-white border border-[#abb3b7]/30 rounded-xl px-6 py-4 text-base font-medium focus:ring-4 focus:ring-[#dae2ff]/50 focus:border-[#525e7f] transition-all outline-none text-[#2b3437] appearance-none cursor-pointer"
                                                >
                                                    <option value="USD">USD - Dollars</option>
                                                    <option value="EUR">EUR - Euros</option>
                                                    <option value="GBP">GBP - Pounds</option>
                                                    <option value="INR">INR - Rupees</option>
                                                </select>
                                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-[#586064]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-16">
                                    <button
                                        type="submit"
                                        className="w-full bg-[#525e7f] hover:bg-[#465272] text-[#f8f7ff] font-bold text-lg py-5 rounded-xl shadow-[0_8px_24px_rgba(82,94,127,0.15)] transition-all active:scale-[0.98] uppercase tracking-widest"
                                    >
                                        Publish Product
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Sidebar Info/Preview Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Preview Card */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(82,94,127,0.04)] border border-[#dbe4e7]/40">
                            <div className="aspect-square bg-[#f1f4f6] relative flex items-center justify-center">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm_xvYPyz0-STFaDDvtHqgAorpVa-_yceNGIcdRtIX2AO225920RITHeBHGYA1xKUmA9vn7RpU7zAI02-Niplws6tXh1sKkoP8ohc0q8drPNq7xV9K04b6PhUSXancYtnxa8DD6mt0SbnZVwPOSDnagb-EMQ11MTDmaidYnT2RBMrQq5oPU3Dfs0be5CXFIg9UK3RDJYNl1mb05e0L2w2kSXKYohcnJMA-uP_V8Yanw7WpS3J-R4pwC8lhn68PhNAnHGZVN_e7ic0"
                                    alt="Product Preview"
                                    className="object-cover w-full h-full opacity-50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#2b3437] shadow-sm">
                                        Live Preview
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 space-y-2">
                                <div className="h-4 w-2/3 bg-[#eaeff1] rounded-full"></div>
                                <div className="h-8 w-1/2 bg-[#e3e9ec] rounded-full"></div>
                                <div className="pt-4 flex justify-between items-center">
                                    <div className="h-6 w-20 bg-[#dae2ff] rounded-full"></div>
                                    <div className="h-4 w-4 rounded-full bg-[#abb3b7]/50"></div>
                                </div>
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="bg-[#525e7f] text-[#f8f7ff] rounded-xl p-8 space-y-6 shadow-lg shadow-[#525e7f]/20">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <h4 className="font-bold text-lg tracking-wide">Curator's Tip</h4>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Listings with high-contrast, professional photography and a minimum of 300 words in description see a <span className="text-white font-bold">45% higher engagement</span> rate in the gallery.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateProduct;