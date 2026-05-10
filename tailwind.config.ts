import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brass: {
          50: "#fdf9ed",
          100: "#faf0c8",
          200: "#f5dd8d",
          300: "#efc44e",
          400: "#e9ad26",
          500: "#d28e16",
          600: "#a86810",
          700: "#864c11",
          800: "#6d3d14",
          900: "#5b3215",
          950: "#341a07",
        },
        midnight: {
          50: "#f5f6fa",
          100: "#e7e9f1",
          200: "#c8cce0",
          300: "#9aa2c6",
          400: "#6b75a8",
          500: "#4a548d",
          600: "#3a4374",
          700: "#30385e",
          800: "#1f2440",
          900: "#141729",
          950: "#0a0c19",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "jazz-gradient":
          "radial-gradient(circle at 20% 0%, rgba(233,173,38,0.15), transparent 40%), radial-gradient(circle at 80% 100%, rgba(168,104,16,0.18), transparent 50%), linear-gradient(180deg, #0a0c19 0%, #141729 100%)",
        "brass-shine":
          "linear-gradient(135deg, #efc44e 0%, #d28e16 35%, #a86810 65%, #efc44e 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
