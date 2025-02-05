import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "",
        secondary: "",
        neutral: "",
        accent: "",
        base: "",
      },
      fontFamily: {
        serif: ["var(--font-bodoni-moda)", "Bodoni Moda", "serif"],
      },
      screens: {
        sm: "200px",
        md: "768px",
        lg: "1074px",
      },
    },
  },
  plugins: [],
} satisfies Config;
