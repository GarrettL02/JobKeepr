import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  buttonText: string;
  to: string;
}

export function BackButton({ buttonText, to }: BackButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // use navigate(-1) to go back in history instead:
    // navigate(-1);
    navigate(to);
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        background: "transparent",
        border: "none",
        color: isHovered ? "#691414ff" : "white",
        cursor: "pointer",
        fontFamily: "'Valera Round', sans-serif",
        padding: "10px",
        fontWeight: "600",
        fontSize: "16px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="false"
        role="img"
        color="white"
      >
        <title>Go Back</title>
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </g>
      </svg>
      {buttonText}
    </button>
  );
}
