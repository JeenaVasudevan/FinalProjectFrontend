import React, { useState, useEffect } from "react";

export const DarkMode = () => {
  // Check initial theme from localStorage or fallback to light theme
  const storedTheme = localStorage.getItem("theme") || "light";
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark");

  useEffect(() => {
    // Update the HTML element's data-theme attribute based on isDarkMode state
    document.querySelector("html").setAttribute("data-theme", isDarkMode ? "dark" : "light");

    // Save the current theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]); // Re-run this effect when `isDarkMode` changes

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle the theme
  };

  return (
    <label className="flex cursor-pointer gap-2">
      {/* Dark mode icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${isDarkMode ? "hidden" : "block"}`} // Show only when dark mode is off
      >
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        />
      </svg>

      {/* Toggle checkbox */}
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        className="toggle theme-controller"
        aria-label="Toggle dark mode"
      />

      {/* Light mode icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${!isDarkMode ? "hidden" : "block"}`} // Show only when dark mode is on
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
};
