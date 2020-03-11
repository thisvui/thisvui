/*** js bundling ***/
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
  return {
    entry: "./src/main.js",
    output: {
      library: "thisvui",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "../dist"),
      filename: env && env.production ? "thisvui.min.js" : "thisvui.js",
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
      extensions: [".js", ".vue", ".css"]
    },
    devtool: "source-map",
    devServer: {
      port: 3001
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ecma: 6,
            mangle: true
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          use: "vue-loader"
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"]
        }
      ]
    },
    mode: env && env.production ? "production" : "development"
  };
};
