import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  ShieldCheck,
  Clock,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";
import { api } from "../api.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .dashboard()
      .then((data) => setUsername(data.username))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    await api.logout();
    navigate("/");
  };

  if (loading) return null;

  const navItemClass = (active) =>
    `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] whitespace-nowrap transition-colors ${
      active
        ? "bg-accent/10 text-accent"
        : "text-text-muted hover:bg-accent/10 hover:text-accent"
    }`;

  const stats = [
    {
      icon: ShieldCheck,
      label: "Account status",
      value: "Verified",
      hint: "OTP confirmed at signup",
    },
    {
      icon: Clock,
      label: "Session started",
      value: "Just now",
      hint: "Active on this device",
    },
    {
      icon: KeyRound,
      label: "Password",
      value: "Encrypted",
      hint: "Hashed with bcrypt",
    },
  ];

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-bg-deep bg-grid bg-[length:48px_48px] bg-center text-text-primary p-4 md:p-6">
      <div className="w-full max-w-[440px] md:max-w-[1000px] min-h-0 md:min-h-[560px] bg-bg-panel border border-border rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Sidebar — desktop only */}
        <div className="hidden md:flex flex-col justify-between bg-bg-panel-2 border-r border-border p-6">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-lg tracking-wide mb-9">
              <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center font-mono text-[13px] font-bold text-bg-deep">
                SA
              </span>
              SecurAuth
            </div>
            <div className="flex flex-col gap-1">
              <Link to="/dashboard" className={navItemClass(true)}>
                <LayoutDashboard size={16} strokeWidth={2} />
                Dashboard
              </Link>
              <Link to="/messeges" className={navItemClass(false)}>
                <MessageSquare size={16} strokeWidth={2} />
                Messages
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`${navItemClass(false)} bg-transparent border-none cursor-pointer w-full`}
          >
            <LogOut size={16} strokeWidth={2} />
            Log out
          </button>
        </div>

        <div>
          {/* Mobile top nav */}
          <div className="flex md:hidden items-center justify-between gap-1.5 px-4 py-3.5 border-b border-border bg-bg-panel-2 overflow-x-auto">
            <Link to="/dashboard" className={navItemClass(true)}>
              <LayoutDashboard size={15} strokeWidth={2} />
              Dashboard
            </Link>
            <Link to="/messeges" className={navItemClass(false)}>
              <MessageSquare size={15} strokeWidth={2} />
              Messages
            </Link>
            <button
              onClick={handleLogout}
              className={`${navItemClass(false)} bg-transparent border-none cursor-pointer`}
            >
              <LogOut size={15} strokeWidth={2} />
              Log out
            </button>
          </div>

          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success font-mono text-[11px] tracking-wide uppercase mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                  Session verified
                </div>
                <h1 className="font-display text-2xl md:text-3xl mb-1.5">
                  Welcome back, <span className="text-accent">{username}</span>
                </h1>
                <p className="text-text-muted text-sm">
                  You're logged in with an active, OTP-verified session.
                </p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
              {stats.map(({ icon: Icon, label, value, hint }) => (
                <div
                  key={label}
                  className="bg-bg-deep border border-border rounded-xl p-4 hover:border-accent/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Icon size={16} strokeWidth={2} className="text-accent" />
                  </div>
                  <p className="text-text-muted text-xs mb-1">{label}</p>
                  <p className="font-display text-base font-bold mb-1">
                    {value}
                  </p>
                  <p className="text-text-muted text-xs">{hint}</p>
                </div>
              ))}
            </div>

            {/* Quick action */}
            <Link
              to="/messeges"
              className="group flex items-center justify-between gap-4 bg-bg-deep border border-border rounded-xl p-4 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageSquare
                    size={16}
                    strokeWidth={2}
                    className="text-accent"
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-bold">
                    Check your messages
                  </p>
                  <p className="text-text-muted text-xs">
                    No unread messages right now
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                className="text-text-muted group-hover:text-accent transition-colors shrink-0"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
