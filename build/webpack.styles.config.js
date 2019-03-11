/*** styles bundling ***/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean');


module.exports = env => {
  return {
    entry: './src/assets/thisvui.sass',
    plugins: [
      new MiniCssExtractPlugin({
        filename: env && env.production ? "thisvui.min.css" : "thisvui.css",
        chunkFilename: "[id].css"
      }),
      new CopyPlugin([
        {from: './src/assets', to: 'sass', ignore: ['*.png'],},
      ]),
      new WebpackCleanPlugin([
        '../dist/main.js',
        '../dist/main.js.map'
      ])
    ],
    resolve: {
      extensions: [".css", ".sass"]
    },
    devtool: 'source-map',
    optimization: {
      minimize: env && env.production,
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true }}],
          },
          canPrint: true
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        }
      ]
    },
    mode: env && env.production ? 'production' : 'development'
  }
};
