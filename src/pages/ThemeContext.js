// src/pages/ThemeContext.js
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const bgColor = theme === "light" ? "#f9fafb" : "#1f2937";
  const textColor = theme === "light" ? "#111827" : "#f3f4f6";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, bgColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
