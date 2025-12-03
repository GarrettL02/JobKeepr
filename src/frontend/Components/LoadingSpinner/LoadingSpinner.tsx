import React from "react";
import { useTheme } from "../../Themes/ThemeContextType";

export function LoadingSpinner() {
  const { theme } = useTheme();
  return (
    <div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div
        style={{
          border: "4px solid #ffffffff",
          borderLeftColor: theme.background1,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
        }}
      ></div>
    </div>
  );
}
