import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function ContentCard({ content, fetchHistory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [outputText, setOutputText] = useState(content.outputText);
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
    if (!confirm("Are you sure you want to delete this content?")) return;
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
    alert("Content copied to clipboard!");
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">
          {content.type === "generated" ? "Generated" : "Summarized"}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(content.createdAt).toLocaleString()}
        </span>
      </div>
      {isEditing ? (
        <textarea
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
      ) : (
        <div className="mb-2 whitespace-pre-line">{outputText}</div>
      )}
      <div className="flex gap-2 flex-wrap">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-300 dark:bg-gray-600 dark:text-white px-3 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleCopy}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Copy
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
        >
          Export PDF
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContentCard;
