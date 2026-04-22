import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useProduct from '../Hook/useProduct';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
    { label: 'A – Z', value: 'az' },
];

const Dashboard = () => {
    const products = useSelector((state) => state.products.AllProducts);
    const { ProductsHandler } = useProduct();

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);
    const [hasImages, setHasImages] = useState(false);

    useEffect(() => {
        ProductsHandler();
    }, []);

    // ── Derived: filter + sort ──
    const filtered = useMemo(() => {
        let list = [...(products || [])];

        // search
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (p) =>
                    p?.title?.toLowerCase().includes(q) ||
                    p?.description?.toLowerCase().includes(q)
            );
        }

        // has images filter
        if (hasImages) {
            list = list.filter((p) => p?.images?.length > 0);
        }

        // sort
        switch (sortBy) {
            case 'price_asc':
                list.sort((a, b) => (a?.price?.amount || 0) - (b?.price?.amount || 0));
                break;
            case 'price_desc':
                list.sort((a, b) => (b?.price?.amount || 0) - (a?.price?.amount || 0));
                break;
            case 'az':
                list.sort((a, b) => (a?.title || '').localeCompare(b?.title || ''));
                break;
            default:
                break; // newest = server order
        }

        return list;
    }, [products, search, sortBy, hasImages]);



    return (
        <div className="font-dm min-h-screen bg-[#f7f4f0] antialiased">

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-30 bg-[#f7f4f0]/80 backdrop-blur-xl border-b border-[#e8e2db]">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <span className="font-cormorant text-[13px] font-semibold tracking-[0.3em] text-[#1a1612] uppercase">
                        Snitch
                    </span>
                    <div className="flex items-center gap-4">
                        {/* Search bar */}
                        <div className="relative hidden md:flex items-center">
                            <svg className="absolute left-3 w-3.5 h-3.5 text-[#9a9089]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="font-dm pl-9 pr-4 py-2 bg-white border border-[#e8e2db] rounded-sm
                                           text-[12px] text-[#1a1612] placeholder-[#c0b8b0]
                                           focus:outline-none focus:border-[#8a6e52] transition-colors duration-200 w-56"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-3 text-[#9a9089] hover:text-[#1a1612] transition-colors cursor-pointer"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">

                {/* ── PAGE TITLE ── */}
                <div className="mb-10 lg:mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm
                                         text-[9px] font-medium uppercase tracking-[0.16em] text-[#8a6e52]
                                         border border-[rgba(138,110,82,0.25)] bg-[rgba(138,110,82,0.06)]">
                            <span className="w-[5px] h-[5px] rounded-full bg-[#8a6e52]" />
                            All Products
                        </span>
                    </div>
                    <h1 className="font-cormorant text-[clamp(34px,4.5vw,52px)] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-3">
                        Discover the{' '}
                        <em className="not-italic italic font-light text-[#8a6e52]">Collection</em>
                    </h1>
                    <p className="font-dm text-[13.5px] font-light text-[#9a9089] leading-relaxed max-w-md">
                        Browse every piece — curated, styled, and ready to shop.
                    </p>
                    <div className="w-12 h-px bg-[rgba(138,110,82,0.3)] mt-8" />
                </div>



                {/* ── FILTER & SORT BAR ── */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    {/* Filter chips */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Mobile search */}
                        <div className="relative flex md:hidden items-center">
                            <svg className="absolute left-3 w-3.5 h-3.5 text-[#9a9089]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="font-dm pl-9 pr-4 py-2 bg-white border border-[#e8e2db] rounded-sm
                                           text-[12px] text-[#1a1612] placeholder-[#c0b8b0]
                                           focus:outline-none focus:border-[#8a6e52] transition-colors w-44"
                            />
                        </div>

                        {/* Has images chip */}
                        <button
                            onClick={() => setHasImages(!hasImages)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm cursor-pointer
                                        font-dm text-[10px] uppercase tracking-[0.12em] transition-all duration-200
                                        ${hasImages
                                    ? 'bg-[#1a1612] text-[#f0ebe4]'
                                    : 'bg-white border border-[#e8e2db] text-[#9a9089] hover:border-[#c0b8b0] hover:text-[#1a1612]'
                                }`}
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                            </svg>
                            With Images
                        </button>

                        {/* Clear filters */}
                        {(search || hasImages) && (
                            <button
                                onClick={() => { setSearch(''); setHasImages(false); }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm cursor-pointer
                                           font-dm text-[10px] uppercase tracking-[0.12em]
                                           text-[#8a6e52] border border-[rgba(138,110,82,0.3)]
                                           hover:bg-[rgba(138,110,82,0.06)] transition-all duration-200"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#e8e2db] rounded-sm
                                       font-dm text-[10px] uppercase tracking-[0.12em] text-[#9a9089]
                                       hover:border-[#c0b8b0] hover:text-[#1a1612] transition-all duration-200 cursor-pointer"
                        >
                            Sort By
                            <svg className={`w-3 h-3 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {sortOpen && (
                            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#e8e2db] rounded-sm
                                            shadow-[0_8px_24px_rgba(26,22,18,0.08)] z-20 py-1">
                                {SORT_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 font-dm text-[11px] tracking-[0.04em] cursor-pointer
                                                    transition-colors duration-150
                                                    ${sortBy === opt.value
                                                ? 'text-[#8a6e52] bg-[rgba(138,110,82,0.06)]'
                                                : 'text-[#9a9089] hover:text-[#1a1612] hover:bg-[#f7f4f0]'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── PRODUCT GRID ── */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((product, idx) => (
                            <ProductCard key={product?._id || idx} product={product} />
                        ))}
                    </div>
                ) : (
                    /* ── EMPTY STATE ── */
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#f0ebe4] border border-[#e0d9d2]
                                        flex items-center justify-center mb-8">
                            {search ? (
                                <svg className="w-8 h-8 text-[#c0b8b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8 text-[#c0b8b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            )}
                        </div>
                        <h2 className="font-cormorant text-[28px] font-light text-[#1a1612] mb-2">
                            {search
                                ? <>No results for <em className="not-italic italic text-[#8a6e52]">"{search}"</em></>
                                : <>No products <em className="not-italic italic text-[#8a6e52]">yet.</em></>
                            }
                        </h2>
                        <p className="font-dm text-[13px] font-light text-[#9a9089] max-w-xs leading-relaxed">
                            {search
                                ? 'Try a different search term or clear your filters.'
                                : 'The catalogue is empty. Check back soon.'
                            }
                        </p>
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="mt-8 font-dm px-6 py-3 bg-[#1a1612] text-[#f0ebe4] rounded-sm
                                           text-[11px] uppercase tracking-[0.18em] cursor-pointer
                                           transition-all duration-200 hover:bg-[#2e2620] active:scale-[0.98]"
                            >
                                Clear Search
                            </button>
                        )}
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
                        {filtered.length} of {products?.length || 0} products
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
