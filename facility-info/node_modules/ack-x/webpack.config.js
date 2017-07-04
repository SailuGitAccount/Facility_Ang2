var webpack = require('webpack');
var path = require('path')

module.exports = [{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x.js"
  }
},{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'dist'),
    filename: "ack-x-min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
},/*{
  entry: "./entry.js",
  output: {
    path: path.join(__dirname,'test'),
    filename: "ack-x.js",
    library:'ack',
    libraryTarget:'this'
  }
},*/{
  entry: "mocha!./entry-test.js",
  output: {
    path: path.join(__dirname,'test'),
    filename: "ack-x-test.js"
  }
}]