import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4 animate-gradient relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <form
        className="glass-card p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 card-3d"
        onSubmit={handleLogin}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black gradient-text mb-2">
            ✨ Welcome Back!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in to continue your AI journey
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-6 rounded-lg animate-shake">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📧 Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              🔒 Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 button-3d glow-effect"
        >
          🚀 Sign In
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-bold gradient-text hover:underline"
            >
              Sign up here! ✨
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
