import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#F7F7F5",
          dark: "#0B0D12",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#12151C",
        },
        elevated: {
          DEFAULT: "#F1F1EE",
          dark: "#1A1E29",
        },
        line: {
          DEFAULT: "#E4E4E0",
          dark: "#262B38",
        },
        ink: {
          DEFAULT: "#14161C",
          dark: "#F4F5F7",
        },
        muted: {
          DEFAULT: "#5B5F6B",
          dark: "#9AA1B2",
        },
        accent: {
          DEFAULT: "#6D5EF8",
          soft: "#EDEBFE",
          darksoft: "#211D3B",
        },
        highlight: {
          DEFAULT: "#F2A93B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(109,94,248,0.25), 0 8px 30px -8px rgba(109,94,248,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
