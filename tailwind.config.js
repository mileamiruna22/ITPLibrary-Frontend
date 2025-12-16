/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  corePlugins: {
    preflight: false, 
  },

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
    base: false, 
    styled: true,
    themes: ['light'],
    utils: true,
    // prefix: 'daisy-', 
  },
};
