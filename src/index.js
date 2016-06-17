import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, Link, browserHistory } from 'react-router';
import App from './app';
import About from './about';
import Contact from './contact';
import Gfycat from './gfycat';
import Projects from './projects';
import Project from './projects';
import Home from './home';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='projects' component={Projects} />
      <Route path='projects/:id' component={Gfycat} />
      <Route path='contact' component={Contact} />
    </Route>
  </Router>
), document.getElementById('root'));

