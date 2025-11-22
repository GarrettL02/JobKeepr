import { useState } from "react";
import { InfoCard } from "../../Components/Jobs/Information/InfoCard";
import { ToggleSwitch } from "../../Components/ToggleSwitch/ToggleSwitch";
import { themeColors } from "../../Themes/themes";
import { useTheme } from "../../Themes/ThemeContextType";

export function SettingsPage() {
  const { darkMode, toggleTheme, theme } = useTheme();

  return (
    <div
      style={{
        paddingTop: "100px",
        backgroundColor: theme.background1,
        color: "white",
        width: "97.5%",
        minHeight: "100vh",
        boxSizing: "border-box",
        margin: 0,
        position: "absolute",
        paddingLeft: "10px",
        overflow: "hidden",
        fontFamily: "'Valera Round', sans-serif",
        zIndex: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 30,
            marginLeft: "20px",
            marginBottom: "10px",
          }}
        >
          Settings
        </div>
        <InfoCard
          sectionLabel="Visual"
          data={
            <>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                }}
              >
                Change Theme:
                <ToggleSwitch initial={darkMode} onToggle={toggleTheme} />
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}
