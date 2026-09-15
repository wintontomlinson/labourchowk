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
        // Deep charcoal / near-black — primary
        ink: {
          DEFAULT: "#171412",
          900: "#171412",
          800: "#242019",
          700: "#3a342c",
          600: "#5a5248",
          500: "#7a7266",
        },
        // Warm off-white / ivory — secondary background
        ivory: {
          DEFAULT: "#faf7f2",
          50: "#fdfcf9",
          100: "#faf7f2",
          200: "#f2ede4",
          300: "#e7e0d3",
        },
        // Confident amber/orange — accent
        amber: {
          DEFAULT: "#e8792b",
          50: "#fdf4ec",
          100: "#fbe6d3",
          200: "#f6c79b",
          300: "#f0a662",
          400: "#ec8f42",
          500: "#e8792b",
          600: "#cf6318",
          700: "#a94e14",
          800: "#853e13",
          900: "#6d3413",
        },
        // Muted green — verified / success
        verified: {
          DEFAULT: "#3f8f5f",
          50: "#eef6f0",
          100: "#d6ebdd",
          500: "#3f8f5f",
          600: "#347a4f",
          700: "#2a6340",
        },
        // Muted red — errors
        danger: {
          DEFAULT: "#c1493f",
          50: "#f9ecea",
          100: "#f2d3cf",
          500: "#c1493f",
          600: "#a73a31",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(23,20,18,0.04), 0 4px 16px rgba(23,20,18,0.06)",
        "card-hover": "0 4px 8px rgba(23,20,18,0.06), 0 12px 32px rgba(23,20,18,0.10)",
        nav: "0 1px 0 rgba(23,20,18,0.06)",
      },
      borderRadius: {
        card: "14px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "check-pop": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.4s ease both",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16,1,0.3,1) both",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "check-pop": "check-pop 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
