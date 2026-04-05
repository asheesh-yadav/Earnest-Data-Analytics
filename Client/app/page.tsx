"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) router.push("/dashboard");
  }, []);

  return (
    <>
      <style>{`
    
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #111;
          color: #e5e5e5;
          font-family: 'Geist', sans-serif;
          font-weight: 300;
          min-height: 100vh;
        }

        .wrapper {
          max-width: 860px;
          margin: 0 auto;
          padding: 80px 24px 60px;
        }

        /* ── Header ── */
        .logo {
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 64px;
        }

        .logo span {
          color: #e5e5e5;
        }

        /* ── Hero ── */
        .title {
          font-size: 28px;
          font-weight: 500;
          color: #f0f0f0;
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 15px;
          color: #666;
          line-height: 1.7;
          margin-bottom: 36px;
        }

        /* ── Buttons ── */
        .btn-row {
          display: flex;
          gap: 10px;
          margin-bottom: 64px;
        }

        .btn {
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.15s;
        }

        .btn:hover { opacity: 0.85; }

        .btn-primary {
          background: #f0f0f0;
          color: #111;
          border: 1px solid #f0f0f0;
        }

        .btn-ghost {
          background: transparent;
          color: #888;
          border: 1px solid #2a2a2a;
        }

        .btn-ghost:hover {
          border-color: #444;
          color: #e5e5e5;
          opacity: 1;
        }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: #1f1f1f;
          margin-bottom: 40px;
        }

        .section-label {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          color: #444;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        /* ── Feature list ── */
        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 48px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid #1a1a1a;
        }

        .feature-item:last-child {
          border-bottom: none;
        }

        .feature-key {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #888;
          background: #1a1a1a;
          border: 1px solid #252525;
          padding: 3px 8px;
          border-radius: 3px;
          white-space: nowrap;
          margin-top: 1px;
          min-width: 72px;
          text-align: center;
        }

        .feature-desc {
          font-size: 14px;
          color: #888;
          line-height: 1.6;
        }

        .feature-desc strong {
          color: #ccc;
          font-weight: 500;
        }

        /* ── Footer ── */
        .footer {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          color: #333;
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid #1a1a1a;
        }

        @media (max-width: 480px) {
          .wrapper { padding: 48px 20px 40px; }
          .title { font-size: 22px; }
          .btn-row { flex-direction: column; }
          .btn { text-align: center; }
          .footer { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="wrapper">

        {/* Hero */}
        <h1 className="title">A simple place to<br />manage your tasks.</h1>
        <p className="subtitle">
          Sign in to access your dashboard. Add, organize, and track
          everything in one place — no clutter, no bloat.
        </p>

        <div className="btn-row">
          <a href="/login" className="btn btn-primary">Login</a>
          <a href="/register" className="btn btn-ghost">Create account</a>
        </div>

        <div className="divider" />

        {/* What you can do */}
        <div className="section-label">What you can do</div>

        <ul className="feature-list">
          {[
            { key: "Add",    desc: <><strong>Create tasks</strong> with a title, description, priority, etc.</> },
            { key: "Edit",   desc: <><strong>Update any task</strong> — change details, adjust priorities, etc..</> },
            { key: "Delete", desc: <><strong>Remove tasks</strong> you no longer need. Keeps your list clean.</> },
            { key: "Filter", desc: <><strong>Filter by status</strong> — view All, Pending, or Completed tasks instantly.</> },
            { key: "Search", desc: <><strong>Find any task</strong> by typing a keyword. Works across titles and descriptions.</> },
          ].map((f) => (
            <li className="feature-item" key={f.key}>
              <span className="feature-key">{f.key}</span>
              <span className="feature-desc">{f.desc}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="footer" style={{color:"white"}}>
          <span>© 2026 Task Management</span>
          <span>Built by Ashish</span>
        </div>

      </div>
    </>
  );
}