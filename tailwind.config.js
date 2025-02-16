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
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 2s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
