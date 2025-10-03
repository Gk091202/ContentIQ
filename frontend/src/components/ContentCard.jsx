import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function ContentCard({ content, fetchHistory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [outputText, setOutputText] = useState(content.outputText);
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/content/${content._id}`,
      { outputText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setIsEditing(false);
    fetchHistory();
  };

  const handleDelete = async () => {
    if (!confirm("🗑️ Are you sure you want to delete this content?")) return;
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/content/${content._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchHistory();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(
      `ContentIQ - ${
        content.type === "generated" ? "Generated" : "Summarized"
      } Content`,
      20,
      20
    );
    doc.setFontSize(10);
    doc.text(`Date: ${new Date(content.createdAt).toLocaleString()}`, 20, 30);

    if (content.prompt) {
      doc.text(`Prompt: ${content.prompt}`, 20, 40);
    }
    if (content.tone) {
      doc.text(`Tone: ${content.tone}`, 20, 50);
    }
    if (content.length) {
      doc.text(`Length: ${content.length}`, 20, 60);
    }

    doc.setFontSize(12);
    const lines = doc.splitTextToSize(outputText, 170);
    doc.text(lines, 20, 70);
    doc.save(`contentiq-${content.type}-${Date.now()}.pdf`);
  };

  return (
    <div className="glass-card p-6 rounded-2xl shadow-xl card-3d relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">
              {content.type === "generated" ? "✨" : "📝"}
            </span>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {content.type === "generated" ? "Generated" : "Summarized"}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <span>📅</span>
            <span>{new Date(content.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Content Metadata */}
        {(content.prompt ||
          content.tone ||
          content.length ||
          content.format) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {content.prompt && (
              <div className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1 rounded-full text-purple-700 dark:text-purple-300 font-semibold">
                💭 {content.prompt.slice(0, 50)}
                {content.prompt.length > 50 ? "..." : ""}
              </div>
            )}
            {content.tone && (
              <div className="text-xs bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-semibold">
                🎭 {content.tone}
              </div>
            )}
            {content.length && (
              <div className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-3 py-1 rounded-full text-green-700 dark:text-green-300 font-semibold">
                📏 {content.length}
              </div>
            )}
            {content.format && (
              <div className="text-xs bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 px-3 py-1 rounded-full text-orange-700 dark:text-orange-300 font-semibold">
                📋 {content.format}
              </div>
            )}
          </div>
        )}

        {/* Content Text */}
        {isEditing ? (
          <textarea
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            className="w-full p-4 border-2 border-purple-300 dark:border-purple-700 rounded-xl mb-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none resize-none"
            rows={6}
          />
        ) : (
          <div className="mb-4 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed">
            {outputText}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 button-3d transition-all duration-300 flex items-center space-x-1"
              >
                <span>💾</span>
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setOutputText(content.outputText);
                  setIsEditing(false);
                }}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg button-3d transition-all duration-300 flex items-center space-x-1"
              >
                <span>❌</span>
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 button-3d transition-all duration-300 flex items-center space-x-1"
              >
                <span>✏️</span>
                <span>Edit</span>
              </button>
              <button
                onClick={handleCopy}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 button-3d transition-all duration-300 flex items-center space-x-1"
              >
                <span>{copied ? "✅" : "📋"}</span>
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={handleExportPDF}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 button-3d transition-all duration-300 flex items-center space-x-1"
              >
                <span>📄</span>
                <span>PDF</span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 button-3d transition-all duration-300 flex items-center space-x-1"
              >
                <span>🗑️</span>
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
