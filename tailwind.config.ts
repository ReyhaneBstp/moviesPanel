/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A84FF", 
          light: "#5AC8FA",
          dark: "#0066CC",
          50: "#EAF4FF",
          100: "#D5E9FF",
        },
        secondary: {
          DEFAULT: "#8E8E93",
          light: "#C7C7CC",
          dark: "#636366",
        },
        neutral: {
          bg: "#F5F5F7", 
          surface: "#FFFFFF",
        },
      },
      fontFamily: {
        vazir: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      borderRadius: {
        ios: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.06)",
        glass: "0 4px 24px rgba(0, 0, 0, 0.08)",
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
