import React, { Component } from 'react';

require('./styles/navbar.scss');

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar-spacer"></div>
        <nav className="navbar">
          <div className="container">
            <ul className="navbar-list">
              <li className="navbar-item">
                <a className="navbar-link" href="/">Home</a>
              </li>
              <li className="navbar-item">
                <a className="navbar-link" href="#projects">Projects</a>
              </li>
              <li className="navbar-item">
                <a className="navbar-link" href="#about">About</a>
              </li>
              <li className="navbar-item">
                <a className="navbar-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

