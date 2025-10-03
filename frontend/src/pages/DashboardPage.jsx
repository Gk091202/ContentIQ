import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "../components/ContentCard";

function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState("medium");
  const [inputText, setInputText] = useState("");
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("paragraph");
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/content/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, type: typeFilter, startDate: dateFilter },
      }
    );
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [search, typeFilter, dateFilter]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/content/generate`,
        { prompt, tone, length },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPrompt("");
      fetchHistory();
    } catch (err) {
      alert("Content generation failed");
    }
    setLoading(false);
  };

  const handleSummarize = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/content/summarize`,
        { inputText, url, format },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInputText("");
      setUrl("");
      fetchHistory();
    } catch (err) {
      alert("Summarization failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8 animate-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-black gradient-text mb-3">
            🚀 AI Content Studio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create, summarize, and manage your content with AI magic
          </p>
        </div>

        {/* Generator Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Content Generator */}
          <form
            className="glass-card p-8 rounded-3xl shadow-2xl card-3d relative overflow-hidden"
            onSubmit={handleGenerate}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-3">✨</span>
                <h3 className="text-2xl font-bold gradient-text">
                  AI Content Generator
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    💭 What do you want to create?
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Write about AI in healthcare"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🎭 Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 transition-all duration-300 outline-none"
                    >
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📏 Length
                    </label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 transition-all duration-300 outline-none"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 button-3d disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
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
                      Generating Magic...
                    </span>
                  ) : (
                    "✨ Generate Content"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Summarizer */}
          <form
            className="glass-card p-8 rounded-3xl shadow-2xl card-3d relative overflow-hidden"
            onSubmit={handleSummarize}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-green-500 rounded-full filter blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-3">📝</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  AI Summarizer
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    📄 Text to summarize
                  </label>
                  <textarea
                    placeholder="Paste your long text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    🔗 Or paste article URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    📋 Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 transition-all duration-300 outline-none"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="bullets">Bullet Points</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 button-3d disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
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
                      Summarizing...
                    </span>
                  ) : (
                    "📝 Summarize"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Search & Filter */}
        <div className="glass-card p-6 rounded-2xl shadow-xl mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search your content..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 transition-all duration-300 outline-none"
            >
              <option value="">📚 All Types</option>
              <option value="generated">✨ Generated</option>
              <option value="summarized">📝 Summarized</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 transition-all duration-300 outline-none"
            />
          </div>
        </div>

        {/* Content History */}
        <div>
          <h3 className="text-3xl font-bold gradient-text mb-6">
            📚 Your Content Library
          </h3>
          {history.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h4 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No content yet!
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Start creating or summarizing content to see it here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {history.map((content) => (
                <ContentCard
                  key={content._id}
                  content={content}
                  fetchHistory={fetchHistory}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
