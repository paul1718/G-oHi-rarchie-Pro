/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#bcddff",
          300: "#8ec6ff",
          400: "#59a5ff",
          500: "#3383f9",
          600: "#1d65ed",
          700: "#174fd9",
          800: "#1840af",
          900: "#19398a",
        },
      },
    },
  },
  plugins: [],
};
