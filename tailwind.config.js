module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        ashy: "#fdfbfb",
        metal: "#9c7443",
        
       }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")]
};
