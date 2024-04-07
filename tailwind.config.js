/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
        colors:{
            "background": "#f7e8d3",
            "button":"#ff6289",
            "button-hvr":"#fc3468"
        }
    },
  },
  plugins: [require("daisyui")],
}

