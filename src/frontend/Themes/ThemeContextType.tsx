import React, { createContext, useContext, useState, ReactNode } from "react";
import { themeColors } from "./themes";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
  theme: typeof themeColors.darkMode; // current active colors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = darkMode ? themeColors.darkMode : themeColors.lightMode;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
