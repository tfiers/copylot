// craco = create-react-app config override
// Needed to use TailwindCSS with cra
// (See https://tailwindcss.com/docs/guides/create-react-app)
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
