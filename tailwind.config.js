export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          hover: '#FF5252',
          light: '#FFE3E3'
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          hover: '#45B8B0',
          light: '#E0F7F6'
        }
      }
    },
  },
  plugins: [],
}
