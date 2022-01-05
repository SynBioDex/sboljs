// webpack.config.js
const path = require('path');
module.exports = {
   context: __dirname,
   entry: './lib/SBOLDocument.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
   },
   stats: {
      errorDetails: true,
      children: true
   },
   resolve: {
      fallback: {
         "fs": false,
         "tls": false,
         "net": false,
         "stream": false,
         "crypto": false,
         "crypto-browserify": false,
         "buffer": false,
         "util": false,
         "assert": false,
         "url": false,
         "https": false,
         "http": false
      },
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         }
      ]
   }
};