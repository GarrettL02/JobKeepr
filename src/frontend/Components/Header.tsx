import { useState } from "react";
import { themeColors } from "../Themes/themes";
import { useTheme } from "../Themes/ThemeContextType";

interface HeaderProps {
  sideBarOpen?: boolean;
  setSideBarOpen: (open: boolean) => void;
}

export function Header({ sideBarOpen, setSideBarOpen }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <div
      style={{
        backgroundColor: theme.header,
        color: theme.text,
        display: "flex",
        alignItems: "center",
        fontSize: "20px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "1rem",
        height: "30px",
        zIndex: 1000,
      }}
    >
      {/* Sidebar is controlled at the app root; toggle via onToggleSidebar */}
      <div>
        <button
          onClick={() => handleSideBar()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            fill="white"
          >
            <rect x="2.5" y="4" width="19" height="2.8" rx="1.4" />
            <rect x="2.5" y="10.6" width="19" height="2.8" rx="1.4" />
            <rect x="2.5" y="17.2" width="19" height="2.8" rx="1.4" />
          </svg>
        </button>
      </div>
      <img
        src="/fastecServicesLogo.png"
        alt="Fastec Services"
        style={{
          width: 170,
          mixBlendMode: "multiply" as any,
          marginLeft: "10px",
        }}
      />
      <div
        style={{
          marginLeft: "20px",
          fontFamily: "'Valera Round', sans-serif",
          fontWeight: 600,
          fontSize: "30px",
        }}
      >
        ShopKeepr
      </div>
    </div>
  );
}
