const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = () => {
    const base = [
      new HTMLWebpackPlugin({
        template: './src/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ]
    return base
  }

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: 'images/[hash][ext][query]'
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
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader']
          }
        ]
      }
}