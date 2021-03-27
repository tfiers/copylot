module.exports = {
  purge: ['./src/**/*.{js,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      cursor: {
        resize: "nwse-resize"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
