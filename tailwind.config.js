module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  media: false,
  theme: {
    extend: {
      fontFamily: {
        ibm: ['IBM Plex Mono', 'font-mono'],
      },
      height: {
        '1/10': '10%',
        '9/10': '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
