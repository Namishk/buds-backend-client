/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["dark"],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },

  theme: {
    extend: {
      fontFamily: {
        averia: ["Averia Sans Libre", "cursive"],
      },
      colors: {
        "dark-blue": "#000066",
        blue: "#0000FF",
        "blue-grotto": "#00A0F3",
      },
      aspectRatio: {
        "3/2": "3 / 2",
      },
      dropShadow: {
        card: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
