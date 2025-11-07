/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        tropical: {
          pink: '#ff6b9d',
          orange: '#ff8f5e',
          yellow: '#ffd93d',
          green: '#6bcf7f',
          blue: '#4db8ff',
          purple: '#c471ed',
        },
        sand: {
          light: '#f5e6d3',
          DEFAULT: '#e8d5b7',
          dark: '#d4c5a9',
        }
      },
      fontFamily: {
        'display': ['"Comic Neue"', 'cursive', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'sunset': 'linear-gradient(135deg, #ff6b9d 0%, #ff8f5e 25%, #ffd93d 50%, #4dd0e1 100%)',
        'ocean-wave': 'linear-gradient(180deg, #00bcd4 0%, #0097a7 100%)',
        'tropical': 'linear-gradient(135deg, #ff6b9d 0%, #c471ed 100%)',
      },
      animation: {
        'wave': 'wave 2s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
        'bounce-subtle': 'bounce-subtle 1s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(10deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }
    },
  },
  plugins: [],
}
