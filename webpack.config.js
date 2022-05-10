const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");



module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Development"
    }),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", {
          loader: "css-loader",
          options: {

            importLoaders: 1,
            modules: {

              mode: "local",
              localIdentName: "[path][name]_[local]_[hash].css"
            }
          }
        }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"

      }
    ]
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,

  },
  devtool: 'source-map'

}