const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

module.exports = {
  mode: mode,
  entry: path.join(__dirname, 'public', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[fullhash].js' : 'bundle.js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]?[fullhash]',
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join('public', 'index.html') }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[fullhash].css' : '[name].css',
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: 'dist',
  },
};
