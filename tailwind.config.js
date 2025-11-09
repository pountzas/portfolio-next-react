/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // graph colors
        "blue_custom": "#0094FF",
        "lightBlue_custom": "#2DD1E7",
        "green_custom": "#00A590",
        "red_custom": "#FF6A6A",
        "yellow_custom": "#FFD86E",
        "purple_custom": "#FFD0E1",
        // sensors animation gradient lines
        "gradFrom": "#333333/20%",
        "gradVia": "#967af3",
        "gradTo": "#7165e3",
        //sensors status text color
        "grid": "#c83838", //red
        "active": "#256494", //blue
        "inactive": "#afbac3", //grey
        "secondary": "#256494", //blue
        // UI colors
        "primary": "#16191B", // full black
        "secondary": "#1A1D1F", // dark grey
        "tertiary": "#222629",// mid grey
        "quaternary": "#2A2F32",
        "buttonsPrimary": "#101314", // dark grey
        "buttonsSecondary": "#373D42",
        "textPrimary": "#FFFFFF",
        "textSecondary": "#373D42", // light grey
        "textTertiary": "#9C98B0", // light grey
        "textQuaternary": "#70C3FF", // light blue
        "borderPrimary": "#373D42", //dark 
        "borderSecondary": "#50626A", //mid grey
        "borderTertiary": "#373D42",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
};
