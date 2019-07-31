const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-react",
              "@babel/preset-env"
            ],
            "plugins": [
              "@babel/plugin-transform-async-to-generator"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7777'
      }
    }
  }
}
