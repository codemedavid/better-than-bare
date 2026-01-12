/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Better Than Bare - Soft Pink Luxury Theme
        'theme-bg': '#FAFAFB',           // Warm White
        'theme-text': '#3D3D3D',         // Soft Charcoal
        
        // Primary - Blush Pink
        'blush': {
          DEFAULT: '#F8C8D8',
          50: '#FEFAFB',
          100: '#FDF5F7',
          200: '#FCEAEF',
          300: '#FAD9E3',
          400: '#F9D0DC',
          500: '#F8C8D8', // Primary
          600: '#F0A3BC',
          700: '#E87FA0',
          800: '#E05A84',
          900: '#D83668',
        },

        // Secondary - Dusty Rose (Accent)
        'rose': {
          DEFAULT: '#E8A4B8',
          50: '#FDF7F9',
          100: '#FAEEF2',
          200: '#F5DCE4',
          300: '#F0CBD7',
          400: '#ECB7C7',
          500: '#E8A4B8', // Secondary
          600: '#DE8099',
          700: '#D45C7A',
          800: '#C4385B',
          900: '#9F2D4A',
        },

        // Neutral - Soft Charcoal
        'charcoal': {
          DEFAULT: '#3D3D3D',
          50: '#F7F7F7',
          100: '#EFEFEF',
          200: '#DFDFDF',
          300: '#CFCFCF',
          400: '#9F9F9F',
          500: '#6F6F6F',
          600: '#5F5F5F',
          700: '#4F4F4F',
          800: '#3D3D3D', // Primary Text
          900: '#2D2D2D',
        },
        
        // Backgrounds
        'cream': '#FFFCFA',
        'blush-light': '#FDF5F7',
        'warm-white': '#FAFAFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft': '0 2px 8px rgba(248, 200, 216, 0.15), 0 4px 16px rgba(248, 200, 216, 0.1)',
        'luxury': '0 4px 20px rgba(232, 164, 184, 0.15)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
