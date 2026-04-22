import { useState } from "react";
import { useSelector } from "react-redux";
import useProduct from "../Hook/useProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SellerProtected from "../../Authentication/components/sellerProtected";
import ProductCard from "../components/ProductCard";

const SellerProductsPage = () => {
    const { SellerProductsHandler } = useProduct();
    const sellerProducts = useSelector((state) => state.products.SellerProducts);
    const navigate = useNavigate();

    useEffect(() => {
        SellerProductsHandler();
    }, []);

    useEffect(() => {
        console.log(sellerProducts);
    }, [sellerProducts]);



    return (
        <SellerProtected>
            <div className="font-dm min-h-screen bg-[#f7f4f0] antialiased">

                {/* ── HEADER BAR ── */}
                <header className="sticky top-0 z-30 bg-[#f7f4f0]/80 backdrop-blur-xl border-b border-[#e8e2db]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                        <span className="font-cormorant text-[13px] font-semibold tracking-[0.3em] text-[#1a1612] uppercase">
                            Snitch
                        </span>
                        <button
                            onClick={() => navigate("/product/createProduct")}
                            className="font-dm flex items-center gap-2 px-5 py-2.5 bg-[#1a1612] text-[#f0ebe4] rounded-sm
                                       text-[11px] font-medium uppercase tracking-[0.18em] cursor-pointer
                                       transition-all duration-200 hover:bg-[#2e2620] active:scale-[0.98]"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            New Product
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
                                Seller Dashboard
                            </span>
                        </div>
                        <h1 className="font-cormorant text-[clamp(36px,4.5vw,52px)] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-3">
                            Your{' '}
                            <em className="not-italic italic font-light text-[#8a6e52]">Products</em>
                        </h1>
                        <p className="font-dm text-[13.5px] font-light text-[#9a9089] leading-relaxed max-w-md">
                            Manage, curate, and showcase your collection. Each piece tells a story.
                        </p>

                        {/* Divider */}
                        <div className="w-12 h-px bg-[rgba(138,110,82,0.3)] mt-8" />
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-8 mb-10 pb-8 border-b border-[#e8e2db]">
                        <div>
                            <span className="font-cormorant block text-[28px] font-semibold text-[#1a1612] leading-none mb-1">
                                {sellerProducts.length}
                            </span>
                            <span className="block text-[10px] uppercase tracking-[0.12em] font-normal text-[#9a9089]">
                                Total Products
                            </span>
                        </div>
                        <div className="w-px h-10 bg-[#e0d9d2]" />
                        <div>
                            <span className="font-cormorant block text-[28px] font-semibold text-[#1a1612] leading-none mb-1">
                                {sellerProducts.filter(p => p.images?.length > 0).length}
                            </span>
                            <span className="block text-[10px] uppercase tracking-[0.12em] font-normal text-[#9a9089]">
                                With Images
                            </span>
                        </div>
                        <div className="w-px h-10 bg-[#e0d9d2]" />
                        <div>
                            <span className="font-cormorant block text-[28px] font-semibold text-[#8a6e52] leading-none mb-1">
                                Live
                            </span>
                            <span className="block text-[10px] uppercase tracking-[0.12em] font-normal text-[#9a9089]">
                                Status
                            </span>
                        </div>
                    </div>

                    {/* Product Grid / Empty State */}
                    {sellerProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sellerProducts.map((product, idx) => (
                                <ProductCard key={idx} product={product} />

                            ))}
                        </div>
                    ) : (
                        /* ── EMPTY STATE ── */
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-full bg-[#f0ebe4] border border-[#e0d9d2]
                                            flex items-center justify-center mb-8">
                                <svg className="w-8 h-8 text-[#c0b8b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>

                            <h2 className="font-cormorant text-[28px] font-light text-[#1a1612] mb-2">
                                No products <em className="not-italic italic text-[#8a6e52]">yet.</em>
                            </h2>
                            <p className="font-dm text-[13px] font-light text-[#9a9089] mb-8 max-w-xs leading-relaxed">
                                Start building your collection by adding your first product to the catalogue.
                            </p>
                            <button
                                onClick={() => navigate("/product/createProduct")}
                                className="font-dm flex items-center gap-2.5 px-6 py-3.5 bg-[#1a1612] text-[#f0ebe4] rounded-sm
                                           text-[11px] font-medium uppercase tracking-[0.18em] cursor-pointer
                                           transition-all duration-200 hover:bg-[#2e2620] active:scale-[0.98]"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Create First Product
                            </button>
                        </div>
                    )}
                </main>

                {/* ── FOOTER ── */}
                <footer className="border-t border-[#e8e2db] mt-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex items-center justify-between">
                        <span className="font-dm text-[11px] font-light text-[#c0b8b0] tracking-[0.04em]">
                            © 2026 Snitch. All rights reserved.
                        </span>
                        <span className="font-dm text-[11px] font-light text-[#c0b8b0] tracking-[0.04em]">
                            Seller Portal
                        </span>
                    </div>
                </footer>
            </div>
        </SellerProtected>
    );
};

export default SellerProductsPage;