import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(174, 75%, 97%)",
          100: "hsl(174, 75%, 92%)",
          200: "hsl(174, 75%, 82%)",
          300: "hsl(174, 75%, 72%)",
          400: "hsl(174, 75%, 57%)",
          500: "hsl(174, 75%, 37%)", // Main primary #1AB3A6
          600: "hsl(174, 75%, 32%)",
          700: "hsl(174, 75%, 27%)",
          800: "hsl(174, 75%, 22%)",
          900: "hsl(174, 75%, 17%)",
          950: "hsl(174, 75%, 12%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(262, 60%, 97%)",
          100: "hsl(262, 60%, 92%)",
          200: "hsl(262, 60%, 82%)",
          300: "hsl(262, 60%, 72%)",
          400: "hsl(262, 60%, 60%)",
          500: "hsl(262, 60%, 50%)", // Main secondary #7B42D6
          600: "hsl(262, 60%, 45%)",
          700: "hsl(262, 60%, 40%)",
          800: "hsl(262, 60%, 35%)",
          900: "hsl(262, 60%, 30%)",
          950: "hsl(262, 60%, 25%)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(21, 90%, 97%)",
          100: "hsl(21, 90%, 92%)",
          200: "hsl(21, 90%, 82%)",
          300: "hsl(21, 90%, 72%)",
          400: "hsl(21, 90%, 65%)",
          500: "hsl(21, 90%, 55%)", // Main accent #F76E2A
          600: "hsl(21, 90%, 50%)",
          700: "hsl(21, 90%, 45%)",
          800: "hsl(21, 90%, 40%)",
          900: "hsl(21, 90%, 35%)",
          950: "hsl(21, 90%, 30%)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(142, 72%, 45%)", // #28D15C
          foreground: "hsl(0, 0%, 100%)",
          50: "hsl(142, 72%, 97%)",
          100: "hsl(142, 72%, 92%)",
          200: "hsl(142, 72%, 82%)",
          300: "hsl(142, 72%, 72%)",
          400: "hsl(142, 72%, 60%)",
          500: "hsl(142, 72%, 45%)", // Main success
          600: "hsl(142, 72%, 40%)",
          700: "hsl(142, 72%, 35%)",
          800: "hsl(142, 72%, 30%)",
          900: "hsl(142, 72%, 25%)",
          950: "hsl(142, 72%, 20%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "gradient-card":
          "linear-gradient(to right bottom, var(--primary-light), var(--primary-dark))",
        "gradient-success":
          "linear-gradient(135deg, hsl(142, 72%, 45%) 0%, hsl(174, 75%, 37%) 100%)",
        "gradient-accent":
          "linear-gradient(135deg, hsl(21, 90%, 55%) 0%, hsl(262, 60%, 50%) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
