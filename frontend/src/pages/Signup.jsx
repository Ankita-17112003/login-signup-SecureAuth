import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    useremail: "",
    userphone: "",
    userpassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.signup(form);
      navigate("/otppage");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: "username", label: "Username", type: "text", placeholder: "your_username" },
    { id: "useremail", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "userphone", label: "Phone", type: "tel", placeholder: "98XXXXXXXX" },
    { id: "userpassword", label: "Password", type: "password", placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-bg-deep bg-grid bg-[length:48px_48px] bg-center text-text-primary p-4 md:p-6">
      <div className="w-full max-w-[440px] md:max-w-[880px] bg-bg-panel border border-border rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.15fr]">
        <div className="hidden md:flex flex-col justify-between bg-bg-panel-2 border-r border-border p-9">
          <div className="flex items-center gap-2.5 font-display font-bold text-lg tracking-wide">
            <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center font-mono text-[13px] font-bold text-bg-deep">
              SA
            </span>
            SecurAuth
          </div>
          <div>
            <h2 className="font-display text-[26px] leading-tight mb-3">
              One OTP
              <br />
              stands between
              <br />
              you and access.
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              We'll email a 4-digit code to confirm it's really you before your account goes live.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_theme(colors.success)]"></span>
            Auth service online
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-11">
          <h1 className="font-display text-xl md:text-2xl mb-1.5">Create your account</h1>
          <p className="text-text-muted text-[13.5px] mb-7">
            Fill in your details — we'll send a verification code next.
          </p>

          {error && <p className="text-danger text-[13px] mb-3.5">{error}</p>}

          <form onSubmit={handleSubmit}>
            {fields.map((f) => (
              <div className="mb-4" key={f.id}>
                <label htmlFor={f.id} className="block text-xs text-text-muted mb-1.5 tracking-wide">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  id={f.id}
                  name={f.id}
                  placeholder={f.placeholder}
                  value={form[f.id]}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-3 bg-bg-deep border border-border rounded-lg text-text-primary text-sm outline-none transition focus:border-accent focus:ring-[3px] focus:ring-accent/15"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1.5 py-3 rounded-lg bg-accent text-bg-deep font-display font-bold text-sm transition hover:bg-accent-dim active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? "Sending code..." : "Send verification code"}
            </button>
          </form>

          <div className="mt-5 text-sm text-text-muted text-center">
            Already have an account?{" "}
            <Link to="/" className="text-accent hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
