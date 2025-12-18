/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{ts,tsx,css}", "./stories/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'severity-low': 'hsl(var(--oui-severity-low))',
        'severity-med': 'hsl(var(--oui-severity-med))',
        'severity-high': 'hsl(var(--oui-severity-high))',
        'severity-critical': 'hsl(var(--oui-severity-critical))'
      }
    }
  },
}