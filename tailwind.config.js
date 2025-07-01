// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        brandOrange: '#F9751C',
         primaryBlue: '#204C80',
         customGray: '#FFFCFA',
         gray:'#6B717F',
         lightGray:'#F1F1F166',
         borderGray:'#D1D5DC',
         primaryBlack:'#10233E',
         success:'#177D3F',
         success400:'#3BE379',
         error:'#CE1C17',
         secondryOrange:'#FFE1CD',
         secondryOrange100:'#FFE1CD',
         buttonBlue:'#255C9C',
        buttonBlueHover: '#1E477D', 
        nav:'#15305259'
      },
      borderRadius: {
  '40': '40px',
},
      
    },
  },
  plugins: [],
}
