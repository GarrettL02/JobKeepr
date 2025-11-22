import { useState } from "react";
import { SideBarOption } from "./SideBarOption";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../Themes/themes";
import { useTheme } from "../../Themes/ThemeContextType";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideBar({ isOpen }: SideBarProps) {
  const sections: string[] = ["JobsKeepr", "PartsKeepr", "Documentation"];
  const [sectionSelected, setSectionSelected] = useState<number>(0);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSectionClick = (section: string, index: number) => {
    setSectionSelected(index);
    // Convert section name to lowercase for URL and remove 'Keepr'
    const route = section.toLowerCase().replace("keepr", "");
    navigate(`/${route}`);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? 0 : "-200px",
          height: "100%",
          width: "200px",
          backgroundColor: theme.sideBar,
          color: theme.text,
          fontFamily: "'Valera Round', sans-serif",
          fontWeight: 550,
          padding: "24px",
          paddingTop: "80px",
          boxShadow: isOpen ? "-4px 0 10px rgba(0, 0, 0, 0.54)" : "none",
          transition: "left 0.3s ease",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          gap: "40px",
          zIndex: 1,
        }}
      >
        {sections.map((section, index) => (
          <SideBarOption
            title={section}
            onClick={() => handleSectionClick(section, index)}
          />
        ))}
        <div
          onClick={() => navigate("/settings")}
          style={{
            position: "fixed",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: "40px",
            cursor: "pointer",
            transform: "translate(15px, 0px)",
          }}
        >
          Settings
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="false"
            role="img"
          >
            <title>Settings</title>
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export const SIDEBAR_WIDTH = 200;
