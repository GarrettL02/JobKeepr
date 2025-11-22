import { useState } from "react";
import { useTheme } from "../../Themes/ThemeContextType";

interface SideBarOptionProps {
  title: string;
  onClick?: () => void;
}

export function SideBarOption({ title, onClick }: SideBarOptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "35px",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div>{title}</div>
      <div style={{ transform: "translate(15px, 0px)" }}>
        <svg
          width={30}
          height={30}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Inventory"
        >
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            rx="5"
            ry="5"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <path
            fill={theme.text}
            d="M3 7l9-5 9 5v10l-9 5-9-5V7zm2 .6v8.3l7 3.9v-8.2L5 7.6zm14 0l-7 4v8.2l7-3.9V7.6zM12 3.5L5.3 7 12 10.5 18.7 7 12 3.5z"
          />
        </svg>
      </div>
    </div>
  );
}
