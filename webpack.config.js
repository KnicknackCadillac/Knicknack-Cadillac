module.exports = {
  entry: './app/components/App.jsx',
  output: {
    // path: 'dist', // `path` is a path to the directory where your bundle will be written.
    /**
    `publicPath` is optional. It allows you to set a separate path that will
    be used by any lazy-loading in your Webpack scripts to load more chunks
    from the server. Basically, `path` sets where in your project's file structure
    your bundle will be written, while `publicPath` tells your Webpack modules
    where your bundle can be requested from the server. In this repo, `publicPath`
    tells the webpack-dev-server that it's ok to serve the files in the dist folder.
    **/
    // publicPath: 'dist',
    filename: './public/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        }
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
    ]
  }

};
