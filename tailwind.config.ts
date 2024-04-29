import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

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
        'bonus-text': 'var(--bonus-text)',
        'button-background': 'var(--button-background)',
        'button-text': 'var(--button-text)',
        'main-text': 'var(--main-text)',
        'sub-background': 'var(--sub-background)',
        'sub-text': 'var(--sub-text)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
