/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0F1E',
        'bg-secondary': '#0F1629',
        'gold': '#C9A84C',
        'gold-light': '#E8C97A',
        'gold-dim': 'rgba(201,168,76,0.15)',
        'rose': '#E8B4A0',
        'glass': 'rgba(255,255,255,0.06)',
        'glass-border': 'rgba(201,168,76,0.2)',
        'text-primary': '#F5F0E8',
        'text-muted': '#8A8FA8',
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        urdu: ["var(--font-urdu)", "serif"],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
      boxShadow: {
        'gold-glow': '0 0 30px -4px rgba(201, 168, 76, 0.4)',
        'gold-intense': '0 0 45px -10px rgba(201, 168, 76, 0.65)',
      }
    },
  },
  plugins: [],
}
