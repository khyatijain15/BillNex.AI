import React from "react";

export default function BillNexLogo({ iconSize = 36, showText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* ICON MARK */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <rect width="46" height="46" rx="10" fill="#B5622A" />
        <rect x="10" y="12" width="18" height="2" rx="1" fill="#FAF8F4" />
        <rect x="10" y="18" width="26" height="2" rx="1" fill="#FAF8F4" opacity="0.7" />
        <rect x="10" y="24" width="14" height="2" rx="1" fill="#FAF8F4" opacity="0.5" />
        <circle cx="32" cy="32" r="8" fill="#FAF8F4" />
        <path
          d="M29 32l2 2 4-4"
          stroke="#B5622A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* WORDMARK */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div style={{ fontFamily: "var(--font-display)", lineHeight: 1 }}>
            <span style={{ color: "#1C1A17", fontWeight: 400, fontSize: "1.4rem" }}>Bill</span>
            <span style={{ color: "#B5622A", fontWeight: 400, fontStyle: "italic", fontSize: "1.4rem" }}>Nex</span>
            <span style={{ color: "#9A9188", fontWeight: 400, fontSize: "1.12rem" }}>.Ai</span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#9A9188",
              marginTop: "2px",
            }}
          >
            Smart Invoice Platform
          </span>
        </div>
      )}
    </div>
  );
}
