/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {

      keyframes: {
        open: {
          '0%': {
            opacity: 1,
            transform: 'translateX(100%)',
          },
        },
        close: {
          to: {
            opacity: 0,
            transform: 'translateX(100%)',
          },
        },
        waving: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        moveUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },

    animation: {
        'moveUpDown' : 'moveUpDown 5s ease-in-out infinite',
        'drawer-open': 'open 0.5s ease-in-out',
        'drawer-close': 'close 0.5s ease-in-out',
        'waving-hand': 'waving 3s linear 5',
      },
    },
  },
  plugins: [],
}

