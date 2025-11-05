import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvasbg: '#f8fafc',
      },
    },
  },
  plugins: [],
} satisfies Config
