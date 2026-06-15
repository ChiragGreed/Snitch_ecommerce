import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOrder from '../Hooks/useOrder';

const STATUS_FILTERS = ['All', 'Placed', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_CONFIG = {
    placed: {
        label: 'Placed',
        dotColor: 'bg-amber-500',
        badgeBg: 'bg-amber-50',
        badgeText: 'text-amber-700',
        badgeBorder: 'border-amber-200',
    },
    shipped: {
        label: 'Shipped',
        dotColor: 'bg-blue-500',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-700',
        badgeBorder: 'border-blue-200',
    },
    delivered: {
        label: 'Delivered',
        dotColor: 'bg-emerald-500',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700',
        badgeBorder: 'border-emerald-200',
    },
    cancelled: {
        label: 'Cancelled',
        dotColor: 'bg-red-500',
        badgeBg: 'bg-red-50',
        badgeText: 'text-red-700',
        badgeBorder: 'border-red-200',
    },
};

const formatDate = (id) => {
    // Extract date from MongoDB ObjectId (first 8 hex chars = timestamp)
    try {
        const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return 'N/A';
    }
};

const formatOrderId = (id) => {
    if (!id) return '';
    return `#${id.slice(-8).toUpperCase()}`;
};

const MyOrders = () => {
    const { getOrderHandler } = useOrder();
    const orderDets = useSelector((state) => state.order.orderDets);
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                setError(false);
                await getOrderHandler();
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    // Filter orders by status
    const filteredOrders = useMemo(() => {
        if (!Array.isArray(orderDets)) return [];
        if (activeFilter === 'All') return orderDets;
        return orderDets.filter(
            (order) => order.status?.toLowerCase() === activeFilter.toLowerCase()
        );
    }, [orderDets, activeFilter]);

    // ── Loading State ──
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f4f0] flex items-center justify-center font-dm antialiased">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#1a1612] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#9a9089] text-[13px] uppercase tracking-[0.2em]">
                        Loading Orders...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f4f0] font-dm antialiased">
            {/* ── Back Navigation ── */}
            <nav className="max-w-7xl mx-auto px-6 pt-8 pb-2 flex items-center">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-[#1a1612] hover:text-[#8a6e52] text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </nav>

            {/* ── Main Content ── */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* ── Page Header ── */}
                <div className="mb-10">
                    <h1 className="font-cormorant text-5xl font-light tracking-widest text-[#1a1612] uppercase">
                        My Orders
                    </h1>
                    <p className="font-dm text-[13px] text-[#9a9089] mt-3 tracking-wide">
                        Track, review and manage your purchases
                    </p>
                </div>

                {/* ── Filter Bar ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap items-center gap-2">
                        {STATUS_FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-full font-dm text-[11px] uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer
                                    ${activeFilter === filter
                                        ? 'bg-[#1a1612] text-white shadow-md'
                                        : 'bg-white border border-[#e8e2db] text-[#9a9089] hover:border-[#8a6e52] hover:text-[#1a1612]'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Order Count */}
                    <span className="font-dm text-[11px] text-[#9a9089] uppercase tracking-[0.1em]">
                        {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'}
                    </span>
                </div>

                {/* ── Orders List ── */}
                {error || !Array.isArray(orderDets) || orderDets.length === 0 ? (
                    /* ── Empty State ── */
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#f0ebe4] border border-[#e0d9d2] flex items-center justify-center mb-8">
                            <svg className="w-8 h-8 text-[#c0b8b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h2 className="font-cormorant text-[28px] font-light text-[#1a1612] mb-2">
                            No orders <em className="not-italic italic text-[#8a6e52]">yet.</em>
                        </h2>
                        <p className="font-dm text-[13px] font-light text-[#9a9089] max-w-xs leading-relaxed">
                            Your order history will appear here once you make your first purchase.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-8 font-dm px-8 py-3.5 bg-[#1a1612] text-[#f0ebe4] rounded-sm
                                       text-[11px] uppercase tracking-[0.18em] cursor-pointer
                                       transition-all duration-200 hover:bg-[#2e2620] active:scale-[0.98]"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    /* ── No Results for Filter ── */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#f0ebe4] border border-[#e0d9d2] flex items-center justify-center mb-6">
                            <svg className="w-7 h-7 text-[#c0b8b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        <h2 className="font-cormorant text-[24px] font-light text-[#1a1612] mb-2">
                            No <em className="not-italic italic text-[#8a6e52]">{activeFilter.toLowerCase()}</em> orders
                        </h2>
                        <p className="font-dm text-[13px] font-light text-[#9a9089]">
                            Try selecting a different filter.
                        </p>
                    </div>
                ) : (
                    /* ── Order Cards ── */
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </main>

            {/* ── Footer ── */}
            <footer className="border-t border-[#e8e2db] mt-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex items-center justify-between">
                    <span className="font-dm text-[11px] font-light text-[#c0b8b0] tracking-[0.04em]">
                        © 2026 Snitch. All rights reserved.
                    </span>
                    <span className="font-dm text-[11px] font-light text-[#c0b8b0] tracking-[0.04em]">
                        {Array.isArray(orderDets) ? orderDets.length : 0} total orders
                    </span>
                </div>
            </footer>
        </div>
    );
};


/* ─────────────────── ORDER CARD COMPONENT ─────────────────── */
const OrderCard = ({ order }) => {
    const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
    const items = order.items || [];
    const firstItem = items[0];
    const remainingCount = items.length - 1;

    // Get product info from the first item
    const productTitle = firstItem?.productId?.title || 'Product';
    const productImage = getProductImage(firstItem);

    // Build item names summary
    const itemNames = items
        .map((item) => item.productId?.title || 'Product')
        .filter(Boolean);

    // Calculate total price from all items
    const totalPrice = items.reduce((sum, item) => {
        const product = item.productId;
        if (!product) return sum;

        // Try to find matching variant price first
        const variant = product.variants?.find(
            (v) => v._id === item.variantId || v._id?.toString() === item.variantId?.toString()
        );
        const price = variant?.price?.amount || product.price?.amount || 0;
        return sum + price * (item.quantity || 1);
    }, 0);

    const currency = firstItem?.productId?.price?.currency || 'INR';

    return (
        <div className="bg-white border border-[#e8e2db] rounded-lg p-5 md:p-6 
                        hover:border-[#c0b8b0] hover:shadow-[0_8px_24px_rgba(26,22,18,0.04)]
                        transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Side: Status + Product Info */}
                <div className="flex gap-4 md:gap-5 items-start flex-1 min-w-0">
                    {/* Product Thumbnail */}
                    <div className="w-[68px] h-[68px] flex-shrink-0 bg-[#f0ebe4] rounded-md overflow-hidden">
                        {productImage ? (
                            <img
                                src={productImage}
                                alt={productTitle}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#c0b8b0]">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        )}
                        {/* Multi-item badge */}
                        {items.length > 1 && (
                            <div className="relative">
                                <span className="absolute -top-[68px] left-0 bg-[#1a1612]/70 backdrop-blur-sm text-white text-[9px] font-medium px-1.5 py-0.5 rounded-br-md rounded-tl-md">
                                    +{items.length - 1}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Order Details */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                        {/* Status Badge + Date */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.08em] font-medium border
                                ${statusConfig.badgeBg} ${statusConfig.badgeText} ${statusConfig.badgeBorder}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                                {statusConfig.label}
                            </span>
                            <span className="text-[11px] text-[#9a9089] tracking-wide">
                                {formatDate(order._id)}
                            </span>
                        </div>

                        {/* Order ID */}
                        <p className="font-dm text-[13px] font-medium text-[#8a6e52]">
                            Order ID: {formatOrderId(order._id)}
                        </p>

                        {/* Product Names */}
                        <p className="font-dm text-[13px] text-[#1a1612] truncate max-w-md">
                            {itemNames.length > 0
                                ? itemNames.length <= 2
                                    ? itemNames.join(' | ')
                                    : `${itemNames.slice(0, 2).join(' | ')} `
                                : 'Order items'}
                            {remainingCount > 1 && (
                                <span className="text-[#8a6e52]">&amp; {remainingCount - 1} more items</span>
                            )}
                        </p>

                        {/* Price */}
                        <p className="font-cormorant text-lg font-semibold text-[#1a1612] mt-0.5">
                            {currency === 'INR' ? '₹' : currency} {totalPrice.toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>

                {/* Right Side: Chevron Arrow */}
                <div className="hidden md:flex items-center self-center pl-4">
                    <div className="w-9 h-9 rounded-full bg-[#f0ebe4] flex items-center justify-center
                                    group-hover:bg-[#1a1612] transition-all duration-300">
                        <svg className="w-4 h-4 text-[#9a9089] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Helper: get first image for the product/variant ── */
function getProductImage(item) {
    if (!item) return null;
    const product = item.productId;
    if (!product) return null;

    // Try to find matching variant image first
    const variant = product.variants?.find(
        (v) => v._id === item.variantId || v._id?.toString() === item.variantId?.toString()
    );

    if (variant?.images?.length > 0) return variant.images[0];
    if (product.images?.length > 0) return product.images[0];
    return null;
}

export default MyOrders;
