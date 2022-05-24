module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      outsideSun: '#ffd4a4',
      outsideNight: '#0e1234',
      pretzelBlue: '#0077ff',
      pretzelRed: '#ff1654',
      pretzelTeal: '#00e0ac',
      pretzelYellow: '#fcfc62',
      pretzelBabyBlue: '#99e3ff',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
