/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Nunito", "sans-serif"],
        secondary: ["Playfair Display", "serif"],
      },
      colors: { primary: "#9f224e" },
    },
  },
  plugins: [],
};
