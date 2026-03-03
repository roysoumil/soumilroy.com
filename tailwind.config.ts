import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "hero-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(90px, -70px) scale(1.06)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "hero-drift-alt": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-80px, 78px) scale(1.1)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
      },
      animation: {
        "hero-drift": "hero-drift 18s ease-in-out infinite",
        "hero-drift-slow": "hero-drift-alt 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
