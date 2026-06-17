import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Features/Authentication/Hook/useAuth';
import ProfileSidebar from './ProfileSidebar';

const NavigationBar = () => {

    const User = useSelector((state) => state.auth.User);
    const [search, setSearch] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { getMeHandler } = useAuth();

    useEffect(() => {
        if (isSidebarOpen && User) {
            getMeHandler();
        }
    }, [isSidebarOpen]);

    return (
        <>
            <ProfileSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                user={User} 
            />
            <nav className="sticky top-0 z-30 bg-[#f7f4f0]/80 backdrop-blur-xl border-b border-[#e8e2db]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {User && (
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e8e2db] hover:bg-[#d1ccc6] transition-colors"
                            >
                                <svg className="w-5 h-5 text-[#1a1612]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        )}
                        <span className="font-cormorant text-[13px] font-semibold tracking-[0.3em] text-[#1a1612] uppercase">
                            Snitch
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
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

                        {/* Seller Dashboard Button */}
                        {User?.role === "isSeller" && (
                            <button
                                onClick={() => navigate("/product/sellerProducts/")}
                                className="group flex items-center gap-2 text-[#1a1612] transition-colors hover:opacity-70"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] font-medium">Seller</span>
                            </button>
                        )}

                        {/* Cart and Orders Buttons or Auth Buttons */}
                        {User ? (
                            <>
                                <button
                                    onClick={() => navigate("/myOrders")}
                                    className="group flex items-center gap-2 text-[#1a1612] transition-colors hover:opacity-70"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] font-medium">Orders</span>
                                </button>
                                <button
                                    onClick={() => navigate("/cart")}
                                    className="group flex items-center gap-2 text-[#1a1612] transition-colors hover:opacity-70"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
                                    </svg>
                                    <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] font-medium">Cart</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-[#1a1612] font-dm text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-70 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="px-4 py-2 bg-[#1a1612] text-[#f7f4f0] font-dm text-[11px] uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#2e2620] transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigationBar
