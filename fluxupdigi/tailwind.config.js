/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA'
        },
        secondary: {
          DEFAULT: '#EC4899',
          dark: '#DB2777',
          light: '#F472B6'
        },
        dark: {
          DEFAULT: '#0F0B1F',
          light: '#1A1333',
          lighter: '#2D2551'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Exo 2', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }
        }
      }
    }
  },
  plugins: []
}