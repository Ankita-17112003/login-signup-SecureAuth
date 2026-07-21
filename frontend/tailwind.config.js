/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#0e1420",
        "bg-panel": "#161e2e",
        "bg-panel-2": "#1c2436",
        accent: "#f2a65a",
        "accent-dim": "#c77f3b",
        "text-primary": "#edeff4",
        "text-muted": "#8892a6",
        success: "#4ade80",
        danger: "#f2745a",
        border: "#26304a",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        drain: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        drain: "drain 60s linear forwards",
      },
      backgroundImage: {
        grid: "linear-gradient(#26304a 1px, transparent 1px), linear-gradient(90deg, #26304a 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};
