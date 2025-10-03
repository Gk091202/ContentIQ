import React, { useEffect, useState } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
