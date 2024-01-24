const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js', // Adjust this path to your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // Add loaders for other file types as needed
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Add plugins, devServer config, etc., as needed
};