/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xtsm: { max: '425px' },

      minsm: { min: '640px' },
      minmd: { min: '768px' },
      minlg: { min: '1024px' },
      minxl: { min: '1280px' },
      min2xl: { min: '1536px' },
    },
    extend: {   
      colors:{
        'web-blue': '#151d42',
        'web-green': '#60ad9b',
        'success':'#008a00',
        'success-border':'#005700',
        'warning':'#e3c800',
        'warning-border':'#B09500',
        'danger':'#e51400',
        'danger-border':'#B20000',
        'danger-hover':'#f1877d',
        'hover':'#FFFFFF7D',
      },
      transitionProperty: {
        height: 'height'
      }
    },
  },
  plugins: [],
};