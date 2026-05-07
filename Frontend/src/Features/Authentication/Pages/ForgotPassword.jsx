import React, { useState } from 'react'
import useAuth from '../Hook/useAuth'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { forgotPasswordHandler } = useAuth();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Forgot password email:', email);
        await forgotPasswordHandler(email);
        setIsSubmitted(true);
    };

    return (
        <div className="font-dm min-h-screen flex bg-[#f7f4f0] antialiased">
            {/* ── LEFT PANEL ── */}
            <div className="grain hidden lg:flex w-[52%] relative flex-col justify-end p-12 bg-[#1a1612] overflow-hidden shrink-0">
                {/* Photo overlay gradient */}
                <div
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        backgroundImage: `url('https://ik.imagekit.io/lfqmv9rcq/h-ng-nguy-n-HhQFk_5vbxE-unsplash.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Ambient glows */}
                <div
                    className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full pointer-events-none z-[1]"
                    style={{ background: 'radial-gradient(circle, rgba(196,160,120,0.18) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute -left-[60px] bottom-[120px] w-[280px] h-[280px] rounded-full pointer-events-none z-[1]"
                    style={{ background: 'radial-gradient(circle, rgba(196,160,120,0.1) 0%, transparent 70%)' }}
                />

                {/* Tag pill */}
                <div
                    className="relative z-[2] inline-flex items-center gap-2 mb-7 w-fit px-[14px] py-[7px] rounded-sm
                              text-[10px] font-medium uppercase tracking-[0.18em] text-[#e8c99a]
                              backdrop-blur-md border border-[rgba(196,160,120,0.45)] bg-[rgba(196,160,120,0.18)]
                              [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
                >
                    <span className="w-[5px] h-[5px] rounded-full bg-[#e8c99a] shrink-0" />
                    New Collection 2026
                </div>

                {/* Headline */}
                <h2 className="font-cormorant text-[clamp(38px,4vw,58px)] leading-[1.12] font-light text-white tracking-[-0.01em] mb-5 relative z-[2] [text-shadow:0_2px_20px_rgba(0,0,0,0.6),0_1px_4px_rgba(0,0,0,0.8)]">
                    Street style,<br />
                    <em className="not-italic italic font-light text-[#e8c99a] [text-shadow:0_2px_20px_rgba(0,0,0,0.5),0_0_40px_rgba(196,160,120,0.3)]">redefined.</em>
                </h2>

                {/* Subtext */}
                <p className="relative z-[2] text-[13px] font-light leading-[1.7] text-white/70 max-w-[320px] mb-10 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                    Premium streetwear crafted for those who lead culture, not follow it.
                </p>

                {/* Divider */}
                <div className="relative z-[2] w-12 h-px bg-[rgba(196,160,120,0.4)] mb-8" />

                {/* Stats — frosted glass card */}
                <div className="relative z-[2] flex gap-10 w-fit px-6 py-[18px] rounded-md
                              bg-white/[0.06] backdrop-blur-xl border border-white/10">
                    {[['200+', 'Brands'], ['1.2M', 'Customers'], ['4.9★', 'Rating']].map(([val, lbl]) => (
                        <div key={lbl}>
                            <span
                                className="font-cormorant block text-[28px] font-semibold text-white leading-none mb-1 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]"
                            >
                                {val}
                            </span>
                            <span className="block text-[10px] uppercase tracking-[0.12em] font-normal text-white/55">
                                {lbl}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="relative flex flex-1 items-center justify-center px-6 py-10 bg-[#f7f4f0]
                          before:content-['SNITCH'] before:absolute before:top-[36px] before:left-1/2 before:-translate-x-1/2 before:font-cormorant before:text-[13px] before:font-semibold before:tracking-[0.3em] before:text-[#1a1612]">
                <div className="w-full max-w-[380px] pt-5">

                    {!isSubmitted ? (
                        <>
                            {/* Heading */}
                            <h1 className="font-cormorant text-[42px] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-1.5">
                                Reset<br />
                                <em className="not-italic italic font-light text-[#8a6e52]">password.</em>
                            </h1>
                            <p className="text-[13px] font-light text-[#9a9089] leading-relaxed mb-10">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit}>
                                {/* Email */}
                                <div className="mb-[22px]">
                                    <label className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b6059] mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="hello@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-transparent border-0 border-b-[1.5px] border-[#d4cdc6] rounded-none outline-none transition-colors duration-200 w-full py-[10px] font-dm text-[15px] font-light text-[#1a1612] placeholder:text-[#c0b8b0] focus:border-b-[#8a6e52]"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="font-dm w-full py-4 px-5 mt-8 bg-[#1a1612] text-[#f0ebe4] rounded
                                             text-[12px] font-medium uppercase tracking-[0.2em] cursor-pointer
                                             transition-colors duration-200 hover:bg-[#2e2620] active:scale-[0.99]"
                                >
                                    Receive  Email
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3.5 my-6 text-[11px] tracking-[0.08em] text-[#c0b8b0]">
                                <span className="flex-1 h-px bg-[#e0d9d2]" />
                                or
                                <span className="flex-1 h-px bg-[#e0d9d2]" />
                            </div>

                            {/* Footer */}
                            <p className="text-center text-[12.5px] font-light text-[#9a9089] mt-8">
                                Remember your password?{' '}
                                <a
                                    href="/login"
                                    className="text-[#8a6e52] font-medium no-underline border-b border-[rgba(138,110,82,0.3)]
                                             pb-px transition-colors duration-200 hover:border-[#8a6e52]"
                                >
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#f0ebe4]">
                                    <svg className="w-8 h-8 text-[#8a6e52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="font-cormorant text-[38px] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-2">
                                    Check your<br />
                                    <em className="not-italic italic font-light text-[#8a6e52]">email.</em>
                                </h2>
                                <p className="text-[13px] font-light text-[#9a9089] leading-relaxed mb-8">
                                    We've sent a password reset link to <br />
                                    <span className="text-[#8a6e52] font-medium">{email}</span>
                                </p>
                                <p className="text-[12px] font-light text-[#c0b8b0] leading-relaxed mb-8">
                                    Check your spam folder if you don't see it in the next few minutes.
                                </p>
                            </div>

                            {/* Back Button */}
                            <button
                                onClick={() => navigate('/login')}
                                className="font-dm w-full py-4 px-5 mt-2 bg-[#1a1612] text-[#f0ebe4] rounded
                                         text-[12px] font-medium uppercase tracking-[0.2em] cursor-pointer
                                         transition-colors duration-200 hover:bg-[#2e2620] active:scale-[0.99]"
                            >
                                Back to Sign In
                            </button>

                            <p className="text-center text-[12.5px] font-light text-[#9a9089] mt-8">
                                Didn't receive the email?{' '}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-[#8a6e52] font-medium no-underline border-b border-[rgba(138,110,82,0.3)]
                                             pb-px transition-colors duration-200 hover:border-[#8a6e52] bg-none cursor-pointer"
                                >
                                    Try again
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
