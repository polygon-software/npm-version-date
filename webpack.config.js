const path = require("path");

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
};
