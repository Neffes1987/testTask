const webpack = require('webpack');

const path = require('path');

const dir = './dist';
const main = 'app';
const entryArr = [
  'babel-polyfill',
  'webpack-hot-middleware/client',
  './app.js'
];

module.exports = {
  entry: {
    [main]: entryArr
  },

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: false,
    port: 9000,
    hot: true,
    historyApiFallback: true
  },

  output: {
    path: path.resolve(dir),
    filename: 'bundle.js',
    chunkFilename: `${main}.[id].chank.js`,
    publicPath: '/',
  },
  node: {
    net: 'empty',
    dgram: 'empty',
    dns: 'empty',
    fs: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /\/node_modules\//,
        enforce: 'pre'
      },
      {
        test: /_css_module.css/,
        use: ['style', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]__[local]'
          },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }],
        enforce: 'pre'
      },
      {
        test: /\.scss|\.css$/,
        exclude: /_css_module.css/,
        use: ['style', 'css', 'sass', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }],
        enforce: 'pre'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|png|jpg)$/,
        loader: 'file?name=[path][name].[ext]',
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname)
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
    descriptionFiles: ['package.json'],
    mainFields: ['main'],
    aliasFields: ['browser'],
    enforceExtension: false,
    moduleExtensions: ['-module'],
    enforceModuleExtension: false,
    unsafeCache: true
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      PropTypes: 'prop-types'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
