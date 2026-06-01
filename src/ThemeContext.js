import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [textColor, setTextColor] = useState("black"); // default

  return (
    <ThemeContext.Provider value={{ textColor, setTextColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
