const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
        path.resolve('node_modules')
    ]
  }
};