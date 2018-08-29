const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
module.exports = {
  output: {
    filename: 'main.js',
    library: 'DPSNav',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader?presets[]=preact"
        }
      },{
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },{
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {test: /\.(png|jpg)$/, use: 'url-loader'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, use: 'url-loader'}
    ]
  },
  plugins: [htmlWebpackPlugin, new CopyWebpackPlugin([{ from: 'src/assets/images', to: 'assets/images' }])]
};
