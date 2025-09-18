import React, { useEffect, useState } from "react";

interface BannerAlertProps {
  message: string;
  duration?: number;
}

export default function BannerAlert({ message, duration = 4000 }: BannerAlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "#FFD600",
          color: "#222",
          fontWeight: 600,
          borderRadius: "0 0 12px 12px",
          padding: "14px 32px",
          margin: "12px auto 0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          fontSize: "1.1rem",
          pointerEvents: "auto",
        }}
      >
        {message}
      </div>
    </div>
  );
}
