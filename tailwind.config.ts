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
        // Royal-blue / indigo / cyan premium education palette
        brand: {
          50:  '#eef4ff',
          100: '#dbe6ff',
          200: '#bcd0ff',
          300: '#8eaeff',
          400: '#5982ff',
          500: '#3257f5',
          600: '#1e3a8a', // Modern Indigo
          700: '#1a2eb0',
          800: '#162067',
          900: '#0f172a', // Deep Royal Blue
          950: '#020617', // Premium Dark Navy
        },
        cyan: {
          50:  '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#06b6d4', // Elegant Cyan Accent
          600: '#0891b2',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b', // Gold Accent
          600: '#d97706',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981', // Emerald Success
          600: '#059669',
        },
        ink: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        // Cinematic mesh gradient for hero / section backdrops
        'mesh-blue':
          'radial-gradient(at 12% 18%, rgba(30,58,138,0.55) 0px, transparent 50%),' +
          'radial-gradient(at 86% 22%, rgba(6,182,212,0.35) 0px, transparent 50%),' +
          'radial-gradient(at 50% 90%, rgba(245,158,11,0.18) 0px, transparent 50%)',
        'mesh-light':
          'radial-gradient(at 10% 0%, rgba(30,58,138,0.10) 0px, transparent 50%),' +
          'radial-gradient(at 90% 10%, rgba(6,182,212,0.10) 0px, transparent 50%),' +
          'radial-gradient(at 50% 100%, rgba(245,158,11,0.08) 0px, transparent 50%)',
        'mesh-dark':
          'radial-gradient(at 10% 0%, rgba(30,58,138,0.35) 0px, transparent 50%),' +
          'radial-gradient(at 90% 10%, rgba(6,182,212,0.20) 0px, transparent 50%),' +
          'radial-gradient(at 50% 100%, rgba(2,6,23,0.85) 0px, transparent 50%)',
        // Subtle dot grid
        'grid-light':
          'radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)',
        'grid-dark':
          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        // Premium gradient utilities
        'gradient-brand':
          'linear-gradient(135deg, #1e3a8a 0%, #3257f5 45%, #06b6d4 100%)',
        'gradient-night':
          'linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e3a8a 100%)',
        'gradient-gold':
          'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      boxShadow: {
        // Glassmorphism
        glass: '0 8px 32px 0 rgba(2, 6, 23, 0.18)',
        'glass-lg': '0 20px 60px -10px rgba(2, 6, 23, 0.25)',
        // Soft neumorphism (light)
        neu:
          '8px 8px 24px rgba(15,23,42,0.06), -8px -8px 24px rgba(255,255,255,0.9)',
        'neu-inset':
          'inset 6px 6px 12px rgba(15,23,42,0.06), inset -6px -6px 12px rgba(255,255,255,0.9)',
        // Neumorphism (dark)
        'neu-dark':
          '8px 8px 24px rgba(0,0,0,0.45), -8px -8px 24px rgba(255,255,255,0.03)',
        // Elevated card / hover
        soft: '0 4px 20px -2px rgba(15,23,42,0.06)',
        elevated: '0 25px 50px -12px rgba(15,23,42,0.25)',
        glow: '0 0 0 1px rgba(6,182,212,0.30), 0 8px 30px -8px rgba(6,182,212,0.45)',
        'glow-gold': '0 0 0 1px rgba(245,158,11,0.30), 0 8px 30px -8px rgba(245,158,11,0.45)',
      },
      letterSpacing: {
        'tighter-2': '-0.035em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        marquee: 'marquee 35s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 12s ease infinite',
        blob: 'blob 16s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-30px) scale(1.08)' },
          '66%':     { transform: 'translate(-30px,20px) scale(0.95)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
