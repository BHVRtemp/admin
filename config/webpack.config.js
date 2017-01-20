const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
        path.resolve('node_modules')
    ]
  },
  // plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        //test: /\.(ts|ngfactory.js)$/,
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};