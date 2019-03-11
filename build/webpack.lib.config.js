/*** js bundling ***/
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
  return {
    entry: './src/main.js',
    output: {
      library: 'thisvui',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, '../dist'),
      filename: env && env.production ? 'thisvui.min.js': 'thisvui.js'
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: [".js", ".vue", ".css"]
    },
    devtool: 'source-map',
    devServer: {
      port: 3001
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 6,
          mangle: true
        }
      })]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env'],
            "plugins": [
              [
                "@babel/transform-runtime",
                {
                  "corejs": false,
                  "helpers": false,
                  "regenerator": true,
                  "useESModules": false
                }
              ]
            ]
          }
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ],
        }
      ]
    },
    mode: env && env.production ? 'production' : 'development'
  }
};
