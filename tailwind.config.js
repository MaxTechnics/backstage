const brand = {
  100: '#c5f1dd',
  200: '#c5f1dd',
  300: '#9fe7c7',
  400: '#65d9a5',
  500: '#24b47e',
  600: '#38bc81',
  700: '#1c8656',
  800: '#10633e',
  900: '#10633e',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },


        brand: { ...brand },
        brand: {
          50: '#82dab0',
          100: '#82dab0',
          200: '#69d3a0',
          300: '#50cb90',
          400: '#C5F1DD',
          500: '#9FE7C7',
          600: '#65D9A5',
          700: '#3ECF8E',
          800: '#24b47e', // green-500 in dashboard
          900: '#2c9c6a',
        },

      },
    },
  },
  plugins: [
    require('preline/plugin')
  ],
};
