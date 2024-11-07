/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'], // Add your desired font here
      },
      colors:{
        // colors used in the project
        primary:"#2B85FF",
        secondary:"#EF863E"
      },
    },
  },
  plugins: [],
}

