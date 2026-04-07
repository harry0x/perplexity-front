import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    try {
      await handleLogin(payload);
      // Only navigate if login is totally successful
      navigate("/");
    } catch (error) {
      alert(
        "Login Failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-900 via-black to-neutral-950 text-zinc-200 selection:bg-indigo-500/30">
      <div className="max-w-md w-full mx-4 p-8 bg-[#27272a]/80 rounded-2xl border border-zinc-700/50 shadow-xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-400">Welcome Back</h2>
          <p className="mt-3 text-sm text-zinc-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#18181b]/50 border border-zinc-700/80 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all placeholder:text-zinc-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#18181b]/50 border border-zinc-700/80 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all placeholder:text-zinc-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-lg text-white font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transform transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-900/20 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
