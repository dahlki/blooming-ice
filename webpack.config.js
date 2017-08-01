const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');

module.exports = {
  entry: './client/bloomingice.js',
  output: {
    path: __dirname + '/public/dist', // the absolute path for the directory where we want the output to be placed
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react-loader'
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin({appendScriptTag: true})
  ]
};
