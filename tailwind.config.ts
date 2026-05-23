import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#f5f2ed",
          dark: "#e8e4df",
          light: "#faf8f5",
        },
        entity: {
          shadow: "#a0988c",
          highlight: "#ffffff",
          accent: "#c47b5a",
          glow: "#c9a690",
          ink: "#3d3832",
          muted: "#7a746c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        entity: "1.25rem",
      },
      transitionTimingFunction: {
        entity: "cubic-bezier(0.2, 0.9, 0.4, 1.1)",
      },
    },
  },
  plugins: [],
};

export default config;
