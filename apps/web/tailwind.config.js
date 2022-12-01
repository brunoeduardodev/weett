/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "modal-open": "modal-open 0.3s ease-in-out",
      },
      keyframes: {
        "modal-open": {
          "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
