import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);
      alert("Registration successful! Please check your email to verify if required, or sign in directly.");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-900 via-black to-neutral-950 text-neutral-200 selection:bg-indigo-500/30">
      <div className="max-w-md w-full mx-4 p-8 bg-neutral-900 rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-400">Create Account</h2>
          <p className="mt-3 text-sm text-neutral-400">
            Join us today to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-neutral-300 mb-1.5"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-neutral-500"
              placeholder="Your username"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-neutral-300 mb-1.5"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-neutral-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-neutral-300 mb-1.5"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-neutral-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 mt-6 rounded-lg text-white font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transform transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-900/20 active:translate-y-0"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
