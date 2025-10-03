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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <form
          className="bg-white dark:bg-gray-800 p-6 rounded shadow"
          onSubmit={handleGenerate}
        >
          <h3 className="font-semibold mb-2">AI Content Generator</h3>
          <input
            type="text"
            placeholder="Prompt or topic"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <div className="flex gap-2 mb-2">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
            </select>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        <form
          className="bg-white dark:bg-gray-800 p-6 rounded shadow"
          onSubmit={handleSummarize}
        >
          <h3 className="font-semibold mb-2">AI Summarizer</h3>
          <textarea
            placeholder="Paste text to summarize"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            rows={3}
          />
          <input
            type="url"
            placeholder="Or paste article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="p-2 border rounded mb-2"
          >
            <option value="paragraph">Paragraph</option>
            <option value="bullets">Bullet Points</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </form>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search content"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="generated">Generated</option>
          <option value="summarized">Summarized</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="grid gap-4">
        {history.map((content) => (
          <ContentCard
            key={content._id}
            content={content}
            fetchHistory={fetchHistory}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
