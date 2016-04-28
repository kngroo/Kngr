import React, { Component } from 'react';
import Header from './header';
import Navbar from './navbar';
import Docsection from './docsection';

require('./styles/normalize.scss');
require('./styles/skeleton.scss');

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header /> 
        <Navbar />
        <Docsection number="1"/>
        <Docsection number="2"/>
        <Docsection number="3"/>
        <Docsection number="4"/>
        <Docsection number="5"/>
        <Docsection number="6"/>
      </div>
    );
  }
}
