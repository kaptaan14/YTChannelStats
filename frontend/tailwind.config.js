/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        grad: "linear-gradient(180deg, #fbfbfd, #E795B7 20%, #935893 45%, #224D88)",
      },
      colors: {
        customGradient: {
          start: "#FF0000",
          middle: "#FFAAAA",
          end: "#282828",
        },
        grey: "rgba(245,245,247,1)",
      },
    },
  },
  plugins: [],
};
