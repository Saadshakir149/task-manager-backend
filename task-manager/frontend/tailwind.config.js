/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          100: '#f3e8ff',
          500: '#a855f7',
          600: '#9333ea',
        },
        accent: {
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        softBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.45s ease-out',
        'scale-in': 'scaleIn 0.25s ease-out',
        'soft-bounce': 'softBounce 1.8s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
        'spin-slow': 'spinSlow 0.9s linear infinite',
      },
      boxShadow: {
        neon: '0 0 0.75rem rgba(99,102,241,0.55), 0 0 1.5rem rgba(168,85,247,0.35)',
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};
