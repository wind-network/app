/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
          mono: ['var(--font-mono)', 'Menlo', 'Monaco', 'monospace'],
        },
        colors: {
          slate: {
            950: '#0a0e1a',
          },
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'float-delayed': 'float 6s ease-in-out infinite 2s',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'slide-up': 'slideInUp 0.6s ease-out forwards',
          'slide-left': 'slideInLeft 0.6s ease-out forwards',
          'slide-right': 'slideInRight 0.6s ease-out forwards',
          'fade-in': 'fadeIn 0.8s ease-out forwards',
          'noise': 'noise 8s steps(10) infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          glow: {
            '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
            '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
          },
          slideInUp: {
            '0%': {
              opacity: '0',
              transform: 'translateY(30px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          slideInLeft: {
            '0%': {
              opacity: '0',
              transform: 'translateX(-30px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateX(0)',
            },
          },
          slideInRight: {
            '0%': {
              opacity: '0',
              transform: 'translateX(30px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateX(0)',
            },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          noise: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '10%': { transform: 'translate(-5%, -5%)' },
            '20%': { transform: 'translate(-10%, 5%)' },
            '30%': { transform: 'translate(5%, -10%)' },
            '40%': { transform: 'translate(-5%, 15%)' },
            '50%': { transform: 'translate(-10%, 5%)' },
            '60%': { transform: 'translate(15%, 0%)' },
            '70%': { transform: 'translate(0%, 15%)' },
            '80%': { transform: 'translate(-15%, 10%)' },
            '90%': { transform: 'translate(10%, 5%)' },
          },
        },
        backdropBlur: {
          xs: '2px',
        },
        backgroundImage: {
          'grid-pattern': 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        },
        backgroundSize: {
          'grid': '50px 50px',
        },
      },
    },
    plugins: [],
  }