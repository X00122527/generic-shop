/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'


  ],
  theme: {
    extend: {
      fontFamily: {
        'shadows': ['Shadows Into Light', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [

    require('flowbite/plugin')
  ],
}

