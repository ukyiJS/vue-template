const path = require('path');
const validateEnv = require('./src/assets/js/validateEnv');

validateEnv();

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        img: path.resolve(__dirname, './src/assets/img'),
        css: path.resolve(__dirname, './src/assets/css'),
        font: path.resolve(__dirname, './src/assets/font')
      }
    }
  }
};
