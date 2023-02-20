const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const plugins = () => {
    const base = [
      new HTMLWebpackPlugin({
        template: './index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new FaviconsWebpackPlugin({
        logo: './assets/favicon.png',
        prefix: 'assets/',
      }),
    ]
    return base
  }
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '/index.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[path][name][ext]'
    },
    plugins: plugins(),
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
          {
            test: /\.(png|jpg|svg|gif)$/,
            type: 'asset/resource',
          },
          {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'file-loader',
          },
          {
            test: /\.json$/i,
            type: 'asset/resource',
            generator: {
              filename: 'data.json' 
            }
          }
        ]
      }
}