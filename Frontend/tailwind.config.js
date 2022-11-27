module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          dark: "#0BB8D3",
          darker:"#000",
        },
        green: {
          light: "#6EE7B7",
          lighter: "#F1FEFF",
        },
        black: {
          dark: "#404040",
        },
      },
      screens: {
        xl: "1440px", 
        lg: "1024px",
        md: "768px",
        sm: "540px",
        xs: "320px",
      },
      dropShadow: {
        'md2': '0px 4px 10px 0px rgba(0, 0, 0, 0.07)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
