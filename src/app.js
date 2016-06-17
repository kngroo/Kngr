import React, { Component } from 'react';
import Header from './header';
import Navbar from './navbar';

require('./styles/normalize.scss');
require('./styles/skeleton.scss');

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.navOffsetTop = document.getElementById('navbar').getBoundingClientRect().top;
    this.hasDockedNav = document.body.classList.contains('has-docked-nav');
    if (this.navOffsetTop < 0  && !this.hasDockedNav) {
      document.body.classList.add('has-docked-nav');
    }
    if (this.navOffsetTop >= 0  && this.hasDockedNav) {
      document.body.classList.remove('has-docked-nav');
    }
  }

  render() {
    return (
      <div className="container">
        <Header /> 
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
