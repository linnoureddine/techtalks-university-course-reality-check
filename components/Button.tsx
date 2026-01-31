"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md bg-[#6155F5] px-16 py-3 text-xl font-medium text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:bg-indigo-700 active:scale-[0.99] ${className}`}
    >
      {children}
    </button>
  );
}
