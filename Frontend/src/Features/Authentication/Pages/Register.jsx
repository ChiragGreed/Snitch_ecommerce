import React, { useState } from 'react';
import useAuth from '../Hook/useAuth';
import { useNavigate } from 'react-router-dom';

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const { registerHandler } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
    role: 'buyer',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname || formData.fullname.length < 3) {
      newErrors.fullname = 'Fullname must be at least 3 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain a number';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.contact || !phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Contact number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fields = [
    { label: 'Full Name', name: 'fullname', type: 'text', placeholder: 'John Doe' },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'hello@example.com' },
    { label: 'Contact Number', name: 'contact', type: 'tel', placeholder: '98765 43210' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
  ];

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < fields.length - 1) {
        const nextInput = document.getElementsByName(fields[index + 1].name)[0];
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        handleSubmit(e);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, role: checked ? 'isSeller' : 'isBuyer' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Form Submitted:', formData);
    await registerHandler(formData);
    navigate('/');
  };

  const perks = [
    'Early access to new drops',
    'Members-only pricing & offers',
    'Free express delivery on orders',
    'Curated style recommendations',
  ];

  return (
    <div className="font-dm min-h-screen flex bg-[#f7f4f0] antialiased">
      {/* ── LEFT PANEL ── */}
      <div className="grain hidden lg:flex w-[52%] relative flex-col justify-end p-12 bg-[#1a1612] overflow-hidden shrink-0">
        {/* Photo overlay gradient */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1626386699888-b8865823b279?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
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
          Exclusive Access
        </div>

        {/* Headline */}
        <h2 className="font-cormorant text-[clamp(38px,4vw,58px)] leading-[1.12] font-light text-white tracking-[-0.01em] mb-5 relative z-[2] [text-shadow:0_2px_20px_rgba(0,0,0,0.6),0_1px_4px_rgba(0,0,0,0.8)]">
          Dress the<br />
          <em className="not-italic italic font-light text-[#e8c99a] [text-shadow:0_2px_20px_rgba(0,0,0,0.5),0_0_40px_rgba(196,160,120,0.3)]">culture.</em>
        </h2>

        {/* Subtext */}
        <p className="relative z-[2] text-[13px] font-light leading-[1.7] text-white/70 max-w-[320px] mb-10 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
          Join over a million people who trust Snitch for premium streetwear that speaks before you do.
        </p>


        {/* Divider */}
        <div className="relative z-[2] w-12 h-px bg-[rgba(196,160,120,0.4)] mb-8" />

        {/* Perks — frosted glass card */}
        <div className="relative z-[2] flex flex-col gap-3.5 px-6 py-5 rounded-md
                        bg-white/[0.06] backdrop-blur-xl border border-white/10">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-3 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8c99a] shrink-0" />
              <span className="text-[13px] font-light text-white/[0.82]">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="relative flex flex-1 items-center justify-center px-6 pt-10 bg-[#f7f4f0] overflow-y-auto
                      before:content-['SNITCH'] before:absolute before:top-[36px] before:left-1/2 before:-translate-x-1/2 before:font-cormorant before:text-[13px] before:font-semibold before:tracking-[0.3em] before:text-[#1a1612]">
        <div className="w-full max-w-[380px] pt-6">

          {/* Heading */}
          <h1 className="font-cormorant text-[42px] font-light text-[#1a1612] leading-[1.1] tracking-[-0.01em] mb-1.5">
            Create your<br />
            <em className="not-italic italic text-[#8a6e52]">account.</em>
          </h1>
          <p className="text-[13px] font-light text-[#9a9089] leading-relaxed mb-9">
            Join the Snitch community today
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {fields.map((field, index) => {
              const isPasswordField = field.name === 'password';
              const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : field.type;

              return (
                <div key={field.name} className="mb-5">
                  <label className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#6b6059] mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={inputType}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      required
                      className={`bg-transparent border-0 border-b-[1.5px] rounded-none outline-none transition-colors duration-200 w-full py-[10px] pr-10 font-dm text-[15px] font-light text-[#1a1612] placeholder:text-[#c0b8b0] ${errors[field.name] ? 'border-b-[#d9383a] focus:border-b-[#d9383a]' : 'border-[#d4cdc6] focus:border-b-[#8a6e52]'
                        }`}
                    />
                    {isPasswordField && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9a9089] hover:text-[#1a1612] focus:outline-none transition-colors p-1"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  {errors[field.name] && (
                    <span className="text-[11px] text-[#d9383a] font-light mt-1 block">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Seller Checkbox */}
            <div className="mb-5 flex items-center gap-2.5">
              <input
                type="checkbox"
                id="role"
                name="role"
                checked={formData.role === 'isSeller'}
                onChange={handleChange}
                className="w-4 h-4 accent-[#1a1612] bg-transparent border-[1.5px] border-[#d4cdc6] rounded-[2px] cursor-pointer outline-none focus:ring-1 focus:ring-[#8a6e52] transition-colors"
              />
              <label htmlFor="role" className="text-[13px] font-light text-[#6b6059] cursor-pointer select-none">
                Create a seller account
              </label>
            </div>

            {/* Google */}
            <a
              href="https://snitch-ecommerce.onrender.com/api/auth/google"
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
              Get Started
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[12.5px] font-light text-[#9a9089] mt-7">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-[#8a6e52] font-medium no-underline border-b border-[rgba(138,110,82,0.3)]
                         pb-px transition-colors duration-200 hover:border-[#8a6e52]"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;