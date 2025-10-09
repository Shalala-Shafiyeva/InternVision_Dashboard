/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'leaves-bg': "url('./assets/imgs/leaves.jpg')",
      },
      boxShadow: {
        'menu-glow': '0 4px 6px -1px rgba(40, 83, 19, 0.4), 0 2px 4px -2px rgba(168, 224, 99, 0.4)',
        'red-glow': '0 4px 6px -1px rgba(127, 29, 29, 0.5), 0 2px 4px -2px rgba(239, 68, 68, 0.4)',
      }
    },
  },
  plugins: [],
};
