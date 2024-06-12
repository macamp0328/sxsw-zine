import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'bonus-text': colors.zinc[600],
        'button-background': 'var(--button-background)',
        'button-text': 'var(--button-text)',
        'main-text': colors.slate[900],
        'sub-background': colors.slate[300],
        'sub-text': colors.stone[700],
      },
    },
  },
  darkMode: 'class',
};
export default config;
