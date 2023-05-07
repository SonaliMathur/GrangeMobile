const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "www"),
    compress: true,
    https: true, // Enable HTTPS
    port: 8201,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
  },
};
