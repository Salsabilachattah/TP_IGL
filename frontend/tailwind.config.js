/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Assure-toi que Tailwind scanne tous les fichiers HTML et TypeScript
  ],
  theme: {
    extend: { keyframes: {
      btn1: {
        '0%': { left: '-100%' },
        '50%, 100%': { left: '100%' },
      },
      btn2: {
        '0%': { top: '-100%' },
        '50%, 100%': { top: '100%' },
      },
      btn3: {
        '0%': { right: '-100%' },
        '50%, 100%': { right: '100%' },
      },
      btn4: {
        '0%': { bottom: '-100%' },
        '50%, 100%': { bottom: '100%' },
      },
    },
    animation: {
      btn1: 'btn1 1.5s linear infinite',
        btn2: 'btn2 1.5s linear infinite 0.375s', // Retard de 0.375s
        btn3: 'btn3 1.5s linear infinite 0.75s',  // Retard de 0.75s
        btn4: 'btn4 1.5s linear infinite 1.125s', // Retard de 1.125s
       },
},
  },
  plugins: [],
};
