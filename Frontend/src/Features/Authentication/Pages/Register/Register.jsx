import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';

const Register = () => {
  const { registerHandler } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    registerHandler(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join the Snitch community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Contact Number</label>
              <input
                type="tel"
                name="contact"
                placeholder="+1 234 567 890"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white hover:opacity-90 transition-all transform active:scale-[0.98] shadow-lg shadow-purple-500/20 mt-4"
            >
              Get Started
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{' '}
            <a href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
