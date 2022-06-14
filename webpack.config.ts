import path from 'path';
import TerserJSPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const config = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.m?js$/,
        // exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.less|\.css$/,
        use: [
          // {
          //     loader: 'style-loader',
          //     options: {injectType: "styleTag"}
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname, './public/lib/jquery.stub/main.js'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css',
    }),
  ],
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**'],
  },
  mode: 'production',
};

const exportables: any = [];
const items = [
  { name: 'app', path: 'views/__shared/app.js' },
  { name: 'modules/home', path: 'views/home/index.js' },
];
items.map((x) => {
  exportables.push({
    ...config,
    name: x.name,
    entry: { [x.name]: path.join(__dirname, x.path) },
    output: { path: path.join(__dirname, 'public/assets'), filename: x.name + '.min.js' },
  });
});

module.exports = [...exportables];
