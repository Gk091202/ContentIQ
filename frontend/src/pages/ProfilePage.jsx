import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function ProfilePage() {
  const [user, setUser] = useState({ username: "", email: "" });
  const [stats, setStats] = useState({ generatedCount: 0, summarizedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
      setStats(res.data.usageStats);
      setLoading(false);
    } catch (err) {
      setError("Failed to load profile");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleExportStats = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("ContentIQ Usage Statistics", 20, 20);
    doc.setFontSize(12);
    doc.text(`Username: ${user.username}`, 20, 40);
    doc.text(`Email: ${user.email}`, 20, 50);
    doc.text(`Generated Content: ${stats.generatedCount}`, 20, 60);
    doc.text(`Summarized Content: ${stats.summarizedCount}`, 20, 70);
    doc.text(
      `Total Content: ${stats.generatedCount + stats.summarizedCount}`,
      20,
      80
    );
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);
    doc.save("contentiq-stats.pdf");
  };

  if (loading)
    return (
      <div className="min-h-screen gradient-bg animate-gradient flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center space-x-3">
            <svg
              className="animate-spin h-8 w-8 text-purple-600"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-xl font-semibold gradient-text">
              Loading your profile...
            </span>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen gradient-bg animate-gradient flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-xl font-semibold text-red-500">{error}</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen gradient-bg animate-gradient p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">👤</div>
          <h2 className="text-5xl font-black gradient-text mb-3">
            Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Track your AI content creation journey
          </p>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl card-3d mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <span className="mr-3">ℹ️</span>
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm">
                <span className="text-2xl mr-4">👤</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    Username
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    {user.username}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm">
                <span className="text-2xl mr-4">📧</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    Email
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl card-3d mb-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-green-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <span className="mr-3">📊</span>
              Usage Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl card-3d relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2">✨</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stats.generatedCount}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Generated Content
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl card-3d relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2">📝</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                    {stats.summarizedCount}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Summarized Content
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl card-3d relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {stats.generatedCount + stats.summarizedCount}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Total Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 button-3d flex items-center space-x-2"
          >
            <span>🏠</span>
            <span>Dashboard</span>
          </button>
          <button
            onClick={handleExportStats}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 button-3d flex items-center space-x-2"
          >
            <span>📄</span>
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 button-3d flex items-center space-x-2"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
