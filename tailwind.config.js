module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '768px',
        md: '940px',
        lg: '1200px',
        xl: '1600px',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        metalch: ['var(--font-metalch)'],
      },
      letterSpacing: {
        tightest: '-.075em',
         tighter: '-.05em',
        tight: '-.025em',
         normal: '0',
        wide: '.025em',
         wider: '.05em',
         widesta: '.07em',
        widest: '.1em',
     
       },
      colors: { 
        ashy: "#fdfbfb",
        metal: "#9c7443",
       }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")]
};
