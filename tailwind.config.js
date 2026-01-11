/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4600F2',
        'primary-dark': '#3800C2',
      },
    },
  },
  plugins: [],
}

