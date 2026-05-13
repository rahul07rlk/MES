import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e4ff',
          200: '#bccfff',
          300: '#8eaeff',
          400: '#5982ff',
          500: '#3257f5',
          600: '#1f39db',
          700: '#1a2eb0',
          800: '#1b2c8c',
          900: '#1d2c6e',
          950: '#141a40',
        },
        accent: {
          500: '#d4a017',
          600: '#b88812',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern':
          'radial-gradient(at 20% 30%, rgba(50,87,245,0.15) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(212,160,23,0.12) 0px, transparent 50%)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        soft: '0 4px 20px -2px rgba(0,0,0,0.06)',
        elevated: '0 20px 50px -12px rgba(0,0,0,0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        marquee: 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
