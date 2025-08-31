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
        fontSize: {
          'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', '1rem'],
          'sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', '1.25rem'],
          'base': ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', '1.5rem'],
          'lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', '1.75rem'],
          'xl': ['clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem)', '1.75rem'],
          '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', '2rem'],
          '3xl': ['clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)', '2.25rem'],
          '4xl': ['clamp(2.25rem, 1.9rem + 1.75vw, 3rem)', '2.5rem'],
          '5xl': ['clamp(3rem, 2.5rem + 2.5vw, 4rem)', '1'],
          '6xl': ['clamp(3.75rem, 3rem + 3.75vw, 5rem)', '1'],
        },
        spacing: {
          'fluid-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
          'fluid-sm': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',
          'fluid-md': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
          'fluid-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
          'fluid-xl': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
          'fluid-2xl': 'clamp(2.5rem, 2rem + 2.5vw, 4rem)',
          'fluid-3xl': 'clamp(3rem, 2.5rem + 2.5vw, 5rem)',
        },
        screens: {
          'xs': '475px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
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