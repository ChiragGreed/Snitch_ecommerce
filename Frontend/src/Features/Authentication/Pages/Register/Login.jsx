import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import { useNavigate } from 'react-router-dom';

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    await loginHandler(formData);
    navigate('/');
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

          {/* Heading */}
          <h1 className="font-cormorant text-[42px] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-1.5">
            Welcome<br />
            <em className="not-italic italic font-light text-[#8a6e52]">back.</em>
          </h1>
          <p className="text-[13px] font-light text-[#9a9089] leading-relaxed mb-10">
            Sign in to your Snitch account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-[22px]">
              <label className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b6059] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-0 border-b-[1.5px] border-[#d4cdc6] rounded-none outline-none transition-colors duration-200 w-full py-[10px] font-dm text-[15px] font-light text-[#1a1612] placeholder:text-[#c0b8b0] focus:border-b-[#8a6e52]"
              />
            </div>

            {/* Password */}
            <div className="mb-[22px]">
              <label className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b6059] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-transparent border-0 border-b-[1.5px] border-[#d4cdc6] rounded-none outline-none transition-colors duration-200 w-full py-[10px] font-dm text-[15px] font-light text-[#1a1612] placeholder:text-[#c0b8b0] focus:border-b-[#8a6e52]"
              />
            </div>

            {/* Google */}
            <a
              href="http://localhost:6060/api/auth/google"
              className="flex items-center justify-center gap-2.5 w-full px-5 py-[13px] mb-4
                         bg-white border border-[#e0d9d2] rounded text-[13px] font-medium
                         text-[#1a1612] tracking-[0.02em] no-underline
                         transition-colors duration-200 hover:border-[#8a6e52] hover:bg-[#fdf9f5]"
            >
              <GoogleIcon />
              Continue with Google
            </a>

            {/* Divider */}
            <div className="flex items-center gap-3.5 my-2 mb-6 text-[11px] tracking-[0.08em] text-[#c0b8b0]">
              <span className="flex-1 h-px bg-[#e0d9d2]" />
              or
              <span className="flex-1 h-px bg-[#e0d9d2]" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="font-dm w-full py-4 px-5 mt-2 bg-[#1a1612] text-[#f0ebe4] rounded
                         text-[12px] font-medium uppercase tracking-[0.2em] cursor-pointer
                         transition-colors duration-200 hover:bg-[#2e2620] active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[12.5px] font-light text-[#9a9089] mt-8">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-[#8a6e52] font-medium no-underline border-b border-[rgba(138,110,82,0.3)]
                         pb-px transition-colors duration-200 hover:border-[#8a6e52]"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;