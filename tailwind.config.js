/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        sans: ['Lexend', 'sans-serif'], // Make Lexend the default sans font
      },
      fontWeight: {
        normal: '400',   // Regular
        medium: '500',   // Medium
        semibold: '600', // SemiBold
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Additional semantic colors that work with your theme
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 10px 2px #00d9ff66, 0 0 20px 3px #bf40bf44, 0 0 8px 1px #00ffaa88',
          },
          '50%': {
            boxShadow: '0 0 18px 7px #00d9ffcc, 0 0 40px 10px #bf40bfee, 0 0 16px 6px #00ffaaee',
          },
          '100%': {
            boxShadow: '0 0 8px 2px #00d9ff44, 0 0 16px 2px #bf40bf33, 0 0 3px 0px #00ffaa44',
          },
        },
      },
      animation: {
        glow: 'glow 3s linear infinite alternate',
      },
    },
  },
  plugins: [],
};
