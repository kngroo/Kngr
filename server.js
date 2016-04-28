console.log('NODE_ENV: ', process.env.NODE);
if (process.env.NODE !== 'production') {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:3000');
  });
} else {
  const path = require('path');
  const port = (process.env.PORT || 3000);
  const express = require('express');
  const app = express();
  const indexPath = path.join(__dirname, 'index.html');
  const ampIndexPath = path.join(__dirname, 'ampIndex.html');
  const publicPath = express.static(path.join(__dirname, '/static'));

  app.use('/static', publicPath);
  app.get('/', function(request, response) {
    response.sendFile(indexPath);
  });
  app.get('/amp', function(request, response) {
    response.sendFile(ampIndexPath);
  });
  app.listen(port, 'production', function(err, res) {
    if (err) return console.log(err);
    console.log('DEV: Listening at http://localhost:', port);
  });
}
