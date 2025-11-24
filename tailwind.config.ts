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
        mars: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc7c7',
          300: '#ff9d9d',
          400: '#ff6b6b',
          500: '#ff3d3d',
          600: '#ed1c24',
          700: '#c41e1e',
          800: '#a31d1d',
          900: '#871f1f',
          950: '#4a0d0d',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
