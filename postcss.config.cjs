const path = require('path');

module.exports = {
    plugins: {
      'postcss-url': {
        // Copy all images referenced in stylesheets within `src` to the `dist` folder
        url: 'copy',
        // Specify the base path for the images
        basePath: path.join(__dirname, 'src'),
        // Specify the assets path in the `dist` folder
        assetsPath: 'dist/assets',
        // Update the URL in the CSS to reflect the new image location
        useHash: true
      }
    }
  };