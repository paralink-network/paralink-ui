module.exports = {
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--color-primary)',
        light: 'var(--color-primary-light)',
      },
      secondary: {
        DEFAULT: 'var(--color-secondary)',
        light: 'var(--color-secondary-light)',
        lightest: 'var(--color-secondary-lightest)',
        darkest: 'var(--color-secondary-darkest)',
      },
      dark: 'var(--color-dark)',
      light: 'var(--color-light)',
    },
    fontFamily: {
      sans: ['Poppins'],
      serif: ['Georgia'],
      mono: ['Roboto'],
    },
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
};
