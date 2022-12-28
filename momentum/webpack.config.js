const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = () => {
    const base = [
      new HTMLWebpackPlugin({
        template: './index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
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
        ]
      }
}