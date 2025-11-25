import React from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: React.ReactNode;
  options: React.ReactNode;
}

export function Modal({ open, onClose, label, options }: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        fontFamily: "'Valera Round', sans-serif",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
      onClick={onClose} // click outside closes
    >
      <div
        style={{
          backgroundColor: "#1b1b1b",
          padding: "24px",
          borderRadius: "12px",
          height: "200px",
          width: "600px",
          color: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onClick={(e) => e.stopPropagation()} // <-- prevent closing when clicking inside
      >
        <div
          style={{
            margin: "40px",
            fontSize: 20,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderBottom: "2px solid white",
          }}
        >
          {options}
        </div>
      </div>
    </div>,
    document.body
  );
}
