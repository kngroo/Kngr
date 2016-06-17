const Server = require('./server.heroku.js')
const port = (process.env.PORT || 8080)
const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.config.js')

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(port, 'localhost', function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:', port)
  })
} else {
  app.listen(port)
  console.log('Listening at http://localhost:', port)
}

