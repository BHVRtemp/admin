var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
        path.resolve('modules'),
        path.resolve('node_modules')
    ]
  }
};