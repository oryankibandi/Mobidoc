//const stylesResourcesLoader = require("craco-style-resources-loader");
// plugins: [
//   {
//     plugin: stylesResourcesLoader,
//     options: {
//       patterns: ["node_modules/video-react/dist/video-react.css"],
//     },
//   },
// ],
module.exports = {
    style: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  };
