/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#0c0806', // Warm deep brown-black
          900: '#140f0c', // Dark warm charcoal
          800: '#1e1713', // Warm medium border/bg
          700: '#2b211a', // Muted highlight border
          600: '#3c3027', // Active highlighted brown
          500: '#8c7d71', // Light warm gray text
        },
        accent: {
          copper: '#e07a5f', // Elegant editorial copper-orange
          orange: '#f97316', // High visibility active orange
          gold: '#f4f1de',   // Muted cream for titles
          emerald: '#10b981',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-slow': 'glow 8s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.15 },
          '50%': { transform: 'scale(1.2)', opacity: 0.35 },
        }
      }
    },
  },
  plugins: [],
}
