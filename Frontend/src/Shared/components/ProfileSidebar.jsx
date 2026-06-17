import React from 'react';
import useAuth from '../../Features/Authentication/Hook/useAuth';

const ProfileSidebar = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;
    const { logoutHandler } = useAuth();

    return (
        <div className="fixed inset-0 z-[100] flex" id="profile-sidebar">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#0c0f10]/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>
            {/* Sidebar Panel */}
            <aside className="relative w-80 h-full bg-[#F7F4F0] shadow-2xl flex flex-col border-r border-[#abb3b7]/15 animate-[slideIn_0.3s_ease-out]">
                {/* Header with Close Button */}
                <div className="p-6 flex justify-between items-center border-b border-[#abb3b7]/15">
                    <span className="text-[13px] font-light text-[#1a1a1a] leading-relaxed uppercase tracking-widest">Profile</span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e3e9ec] transition-colors"
                    >
                        <svg className="w-5 h-5 text-[#586064]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Profile Content */}
                <div className="p-8 flex-grow space-y-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-24 h-24 rounded-full bg-[#dbe4e7] border-2 border-[#525e7f]/20 flex items-center justify-center overflow-hidden">
                            <svg className="w-12 h-12 text-[#586064]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-dm text-xl font-extrabold text-[#2b3437]">{user?.fullname || 'Loading...'}</h2>
                            <p className="text-[#525e7f] font-dm text-xs font-bold uppercase tracking-widest mt-1">
                                {user?.role === 'isSeller' ? 'Seller' : user?.role === 'isBuyer' ? 'Buyer' : user?.role || ''}
                            </p>
                        </div>
                    </div>
                    {/* Info List */}
                    <div className="space-y-6 pt-4">
                        <div className="space-y-1">
                            <label className="font-dm text-[10px] font-bold uppercase tracking-widest text-[#586064] opacity-60">Email Address</label>
                            <p className="font-dm text-sm font-medium text-[#2b3437]">{user?.email || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="font-dm text-[10px] font-bold uppercase tracking-widest text-[#586064] opacity-60">Contact Number</label>
                            <p className="font-dm text-sm font-medium text-[#2b3437]">{user?.contact || '-'}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="font-dm text-[10px] font-bold uppercase tracking-widest text-[#586064] opacity-60">User ID</label>
                            <p className="font-dm text-sm font-medium text-[#2b3437] font-mono">{user?._id || '-'}</p>
                        </div>
                    </div>
                </div>
                {/* Footer Branding + Logout */}
                <div className="p-8 flex flex-col gap-4">
                    <button
                        type="button"
                        className="w-full py-3 px-4 bg-[#1a1612] text-[#f7f4f0] font-dm text-[11px] uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#2e2620] transition-colors"
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                    <div className="flex border-t border-[#abb3b7]/45 items-center gap-2 opacity-40">
                        <span className="not-italic italic text-[14px] tracking-widest font-light text-[#8a6e52]">Snitch</span>
                    </div>
                </div>
            </aside>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default ProfileSidebar;
