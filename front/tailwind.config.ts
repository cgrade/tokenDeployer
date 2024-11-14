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
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(10px, -10px) rotate(2deg)',
          },
          '75%': {
            transform: 'translate(-10px, 10px) rotate(-2deg)',
          },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
