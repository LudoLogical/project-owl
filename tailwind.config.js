/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        ludo: {
          primary: '#0569F3',
          secondary: '#8AE9C1',
          accent: '#FFEF14',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBDD23',
          error: '#F87272',
          '--btn-text-case': 'normal-case', // set default text transform for buttons
        },
      },
    ],
  },
};
