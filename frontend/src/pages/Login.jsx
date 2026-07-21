import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", userpassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-bg-deep bg-grid bg-[length:48px_48px] bg-center text-text-primary p-4 md:p-6">
      <div className="w-full max-w-[440px] md:max-w-[880px] bg-bg-panel border border-border rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.15fr]">
        {/* Rail — hidden on mobile */}
        <div className="hidden md:flex flex-col justify-between bg-bg-panel-2 border-r border-border p-9">
          <div className="flex items-center gap-2.5 font-display font-bold text-lg tracking-wide">
            <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center font-mono text-[13px] font-bold text-bg-deep">
              SA
            </span>
            SecurAuth
          </div>
          <div>
            <h2 className="font-display text-[26px] leading-tight mb-3">
              Every login,
              <br />
              verified.
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              OTP-secured accounts with a session that only trusts what it has checked.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_theme(colors.success)]"></span>
            Auth service online
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center p-7 md:p-11">
          <h1 className="font-display text-xl md:text-2xl mb-1.5">Welcome back</h1>
          <p className="text-text-muted text-[13.5px] mb-7">
            Sign in with your username and password.
          </p>

          {error && <p className="text-danger text-[13px] mb-3.5">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-xs text-text-muted mb-1.5 tracking-wide">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="your_username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-3 bg-bg-deep border border-border rounded-lg text-text-primary text-sm outline-none transition focus:border-accent focus:ring-[3px] focus:ring-accent/15"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userpassword" className="block text-xs text-text-muted mb-1.5 tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="userpassword"
                name="userpassword"
                placeholder="••••••••"
                value={form.userpassword}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-3 bg-bg-deep border border-border rounded-lg text-text-primary text-sm outline-none transition focus:border-accent focus:ring-[3px] focus:ring-accent/15"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1.5 py-3 rounded-lg bg-accent text-bg-deep font-display font-bold text-sm transition hover:bg-accent-dim active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-5 text-sm text-text-muted text-center">
            New here?{" "}
            <Link to="/signup" className="text-accent hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
