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
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Profile
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 dark:text-gray-400 w-32">
                  Username:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {user.username}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 dark:text-gray-400 w-32">
                  Email:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Usage Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  {stats.generatedCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Generated Content
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded">
                <div className="text-2xl font-bold text-green-600 dark:text-green-300">
                  {stats.summarizedCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Summarized Content
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  {stats.generatedCount + stats.summarizedCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Content
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={handleExportStats}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Export Stats as PDF
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
