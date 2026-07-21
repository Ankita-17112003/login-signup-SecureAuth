import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Messages() {
  const navigate = useNavigate();

  useEffect(() => {
    api.messages().catch(() => navigate("/"));
  }, [navigate]);

  const navItemClass = (active) =>
    `block px-3 py-2.5 rounded-lg text-[13.5px] whitespace-nowrap ${
      active ? "bg-accent/10 text-accent" : "text-text-muted hover:bg-accent/10 hover:text-accent"
    }`;

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-bg-deep bg-grid bg-[length:48px_48px] bg-center text-text-primary p-4 md:p-6">
      <div className="w-full max-w-[440px] md:max-w-[960px] min-h-0 md:min-h-[480px] bg-bg-panel border border-border rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 md:grid-cols-[220px_1fr]">
        <div className="hidden md:flex flex-col justify-between bg-bg-panel-2 border-r border-border p-6">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-lg tracking-wide mb-8">
              <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center font-mono text-[13px] font-bold text-bg-deep">
                SA
              </span>
              SecurAuth
            </div>
            <Link to="/dashboard" className={navItemClass(false)}>
              Dashboard
            </Link>
            <Link to="/messeges" className={navItemClass(true)}>
              Messages
            </Link>
          </div>
          <Link to="/" className={navItemClass(false)}>
            Log out
          </Link>
        </div>

        <div>
          <div className="flex md:hidden items-center justify-between gap-1.5 px-4 py-3.5 border-b border-border bg-bg-panel-2 overflow-x-auto">
            <Link to="/dashboard" className={navItemClass(false) + " !mb-0"}>
              Dashboard
            </Link>
            <Link to="/messeges" className={navItemClass(true) + " !mb-0"}>
              Messages
            </Link>
            <Link to="/" className={navItemClass(false) + " !mb-0"}>
              Log out
            </Link>
          </div>

          <div className="p-6 md:p-10">
            <h1 className="font-display text-xl md:text-2xl mb-1.5">Messages</h1>
            <p className="text-text-muted text-sm">
              No messages yet — this space is ready when you are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
