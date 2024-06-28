/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',

  content: [
    "./dist/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",


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

