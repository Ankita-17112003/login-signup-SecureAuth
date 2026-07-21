const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // session cookie bhejne/receive karne ke liye zaroori
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  signup: (payload) =>
    request("/api/auth/signup", { method: "POST", body: payload }),
  login: (payload) =>
    request("/api/auth/login", { method: "POST", body: payload }),
  verifyOtp: (userotp) =>
    request("/api/auth/verify-otp", { method: "POST", body: { userotp } }),
  resendOtp: () => request("/api/auth/resend-otp", { method: "POST" }),
  dashboard: () => request("/api/auth/dashboard"),
  messages: () => request("/api/auth/messages"),
  logout: () => request("/api/auth/logout"),
};
