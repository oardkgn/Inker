/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "priwhi" : "#eeeeee",
        "pribla" : "#252422",
      },
      screens:{
        "exl":"2100px"
      }
    },
  },
  plugins: [],
}

