import { useState } from "react";

export interface ToggleSwitchProps {
  initial?: boolean;
  onToggle?: (state: boolean) => void;
}

export function ToggleSwitch({ initial = false, onToggle }: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(initial);

  const handleClick = () => {
    setIsOn(!isOn);
    if (onToggle) onToggle(!isOn);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "50px",
        height: "25px",
        borderRadius: "25px",
        background: isOn ? "black" : "#ccc",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          width: "21px",
          height: "21px",
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "2px",
          left: isOn ? "27px" : "2px",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}
