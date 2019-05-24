const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
