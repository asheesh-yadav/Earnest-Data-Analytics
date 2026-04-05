"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ← add this

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // ← tracks route changes

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    setMounted(true);
  }, [pathname]); // ← re-run on every route change

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 24px",
      height: "56px",
      background: "#111",
      borderBottom: "1px solid #1f1f1f",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: "14px",
          fontWeight: 600,
          color: "#f0f0f0",
          letterSpacing: "0.05em",
        }}>
          Task Manager
        </span>
      </Link>

      {mounted && (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {!isLoggedIn ? (
            <>
              <Link href="/login" style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                padding: "7px 16px",
                borderRadius: "5px",
                border: "1px solid #2a2a2a",
                color: "#999",
                textDecoration: "none",
              }}>
                Login
              </Link>
              <Link href="/register" style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                padding: "7px 16px",
                borderRadius: "5px",
                background: "#f0f0f0",
                color: "#111",
                textDecoration: "none",
              }}>
                Get started
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                padding: "7px 16px",
                borderRadius: "5px",
                border: "1px solid #2a2a2a",
                color: "#999",
                textDecoration: "none",
              }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                padding: "7px 16px",
                borderRadius: "5px",
                border: "1px solid #2a2a2a",
                background: "transparent",
                color: "#888",
                cursor: "pointer",
              }}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}