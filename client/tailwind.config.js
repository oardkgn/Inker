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
        "exl":"2100px",
        "2xl":"1640px",
        "sl":"850px"
      },
      backgroundImage: {
        'sticky1': "url('src/assets/sticky1.png')",
      }
    },
  },
  plugins: [],
}

