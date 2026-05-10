import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Apple-inspired neutrals
        ink: {
          50: "#f8f8f7",
          100: "#f0efed",
          200: "#e5e3df",
          300: "#c9c6bf",
          400: "#999590",
          500: "#6b6862",
          600: "#4a4844",
          700: "#33312e",
          800: "#1f1d1b",
          900: "#141311",
          950: "#0a0908",
        },
        // Single warm accent (saxophone brass tone, but subtle)
        amber: {
          50: "#fdf8ed",
          100: "#faecc6",
          200: "#f4d488",
          300: "#edb649",
          400: "#e69f24",
          500: "#c97c12",
          600: "#a25c0d",
          700: "#83440f",
          800: "#6a3611",
          900: "#582d12",
          950: "#321606",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
