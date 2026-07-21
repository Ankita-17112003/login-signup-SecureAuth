import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Otp() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const tick = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(tick);
  }, [seconds]);

  const handleChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "").slice(0, 1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.verifyOtp(digits);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      await api.resendOtp();
      setSeconds(60);
      setDigits(["", "", "", ""]);
      setInfo("New OTP sent successfully");
      inputsRef.current[0]?.focus();
    } catch (err) {
      setError(err.message);
    }
  };

  const fillPercent = Math.max((seconds / 60) * 100, 0);

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
            <h2 className="font-display text-[26px] leading-tight mb-3">Check your inbox.</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              We sent a 4-digit code to your email. It expires in 60 seconds — enter it before the bar runs out.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_theme(colors.success)]"></span>
            Code dispatched
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-11">
          <h1 className="font-display text-xl md:text-2xl mb-1.5">Enter verification code</h1>
          <p className="text-text-muted text-[13.5px] mb-7">Didn't get it? Use resend below.</p>

          {error && <p className="text-danger text-[13px] mb-2.5">{error}</p>}
          {info && <p className="text-success text-[13px] mb-2.5">{info}</p>}

          <div className="mb-5">
            <div className="flex justify-between font-mono text-[11.5px] text-text-muted mb-1.5">
              <span>Code expires</span>
              <span>{Math.max(seconds, 0)}s</span>
            </div>
            <div className="h-1 rounded bg-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-dim to-accent"
                style={{ width: `${fillPercent}%`, transition: "width 1s linear" }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 md:gap-2.5 mb-5">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  required
                  className="w-full max-w-[54px] h-[52px] md:h-[60px] text-center font-mono text-lg md:text-2xl font-semibold bg-bg-deep border border-border rounded-lg text-accent outline-none transition focus:border-accent focus:ring-[3px] focus:ring-accent/15"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent text-bg-deep font-display font-bold text-sm transition hover:bg-accent-dim active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify & continue"}
            </button>
          </form>

          <button
            onClick={handleResend}
            className="w-full mt-2.5 py-3 rounded-lg border border-border text-text-primary font-display font-bold text-sm transition hover:border-accent hover:text-accent"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
}
