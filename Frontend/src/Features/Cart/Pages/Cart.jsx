import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useCart from '../hook/useCart';

const Cart = () => {
    const { getCartItemsHandler } = useCart();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch cart items on mount
    useEffect(() => {
        const fetchCartItems = async () => { await getCartItemsHandler(); }
        fetchCartItems();

    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f4f0] flex items-center justify-center font-dm antialiased">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#1a1612] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#9a9089] text-[13px] uppercase tracking-[0.2em]">Loading Cart...</p>
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
                        className="group flex items-center gap-2 text-[#1a1612] transition-colors hover:opacity-70"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Back</span>
                    </button>
                    <span className="font-cormorant text-[13px] font-semibold tracking-[0.3em] text-[#1a1612] uppercase">
                        Snitch
                    </span>
                    <div className="w-10" />
                </div>
            </nav>

            {/* ── MAIN CONTENT ── */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="font-cormorant text-5xl font-light tracking-widest text-[#1a1612] uppercase">
                        Your Cart
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-[#9a9089] text-sm tracking-[0.1em] mb-6">YOUR CART IS EMPTY</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-8 py-3 bg-[#1a1612] text-[#f7f4f0] text-[11px] uppercase tracking-[0.2em] font-medium transition-all hover:opacity-80"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ── CART ITEMS ── */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.items.map((item) => {
                                const variant = item.productId.variants?.find(v => v._id === item.variantId);
                                const price = variant?.price || item.price;
                                const image = variant?.images?.[0] || item.images?.[0];
                                const attributes = variant?.attribute || {};



                                return (
                                    <div
                                        key={item._id}
                                        className="flex gap-6 pb-6 border-b border-[#e8e2db] group"
                                    >
                                        {/* Product Image */}
                                        <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-sm bg-[#e8e2db]">
                                            {image ? (
                                                <img
                                                    src={image}
                                                    alt={item.productId.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#9a9089]">
                                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-cormorant text-lg font-semibold text-[#1a1612] mb-3">
                                                    {item.productId.title}
                                                </h3>

                                                {/* Attributes */}
                                                <div className="space-y-2 mb-4">
                                                    {Object.entries(attributes).map(([key, value]) => (
                                                        <p key={key} className="text-[11px] text-[#9a9089] uppercase tracking-[0.1em]">
                                                            <span className="font-medium capitalize">{key}:</span> {value}
                                                        </p>
                                                    ))}
                                                </div>

                                                {/* Price */}
                                                <p className="font-cormorant text-2xl font-semibold text-[#1a1612]">
                                                    ₹{price?.amount}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3 border border-[#e8e2db] p-2">
                                                    <button
                                                        disabled
                                                        className="w-5 h-5 flex items-center justify-center text-[#9a9089] cursor-not-allowed opacity-50"
                                                        title="Backend functionality coming soon"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-medium text-[#1a1612]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        disabled
                                                        className="w-5 h-5 flex items-center justify-center text-[#9a9089] cursor-not-allowed opacity-50"
                                                        title="Backend functionality coming soon"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    disabled
                                                    className="w-5 h-5 flex items-center justify-center text-[#d45454] cursor-not-allowed opacity-50"
                                                    title="Backend functionality coming soon"
                                                >
                                                    <svg fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── ORDER SUMMARY ── */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <h2 className="font-cormorant text-2xl font-semibold text-[#1a1612] uppercase tracking-wide">
                                    Order Summary
                                </h2>

                                {/* Summary Items */}
                                <div className="space-y-4 pb-6 border-b border-[#e8e2db]">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] uppercase tracking-[0.1em] text-[#9a9089]">Subtotal</span>
                                        <span className="font-cormorant text-lg font-semibold text-[#1a1612]">
                                            subtotal.toFixed
                                        </span>
                                    </div>

                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-sm uppercase tracking-[0.15em] font-medium text-[#1a1612]">Total</span>
                                    <span className="font-cormorant text-3xl font-semibold text-[#1a1612]">
                                        total
                                    </span>
                                </div>

                                {/* Promo Code */}
                                <div className="space-y-3 pb-6 border-b border-[#e8e2db]">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add promo code"
                                            disabled
                                            className="flex-1 px-4 py-2 bg-white border border-[#e8e2db] text-[#1a1612] placeholder-[#9a9089] text-sm focus:outline-none cursor-not-allowed opacity-60"
                                        />
                                        <button
                                            disabled
                                            className="px-6 py-2 bg-[#1a1612] text-[#f7f4f0] text-[11px] uppercase tracking-[0.15em] font-medium opacity-60 cursor-not-allowed"
                                            title="Backend functionality coming soon"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    className="w-full py-4 bg-[#1a1612] text-[#f7f4f0] font-medium uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    Go to Checkout
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* ── NEWSLETTER SECTION ── */}
            <section className="mt-20 py-16 px-6 bg-[#f0ebe4]">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl">
                        <h3 className="font-cormorant text-3xl font-light tracking-widest text-[#1a1612] uppercase mb-6">
                            Stay Connected About Our Latest Offers
                        </h3>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-3 bg-white border border-[#e8e2db] text-[#1a1612] placeholder-[#9a9089] text-sm focus:outline-none focus:border-[#1a1612] transition-colors"
                            />
                            <button className="px-8 py-3 bg-[#1a1612] text-[#f7f4f0] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#2e2620] transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
