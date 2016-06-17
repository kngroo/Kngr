import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

require('./styles/navbar.scss');

export default class Navbar extends Component {
  render() {
    return (
      <div id="navbar">
        <div className="navbar-spacer"></div>
        <nav className="navbar">
          <div className="container">
            <ul className="navbar-list">
              <li className="navbar-item">
                <IndexLink className="navbar-link" to="/">Home</IndexLink>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/projects">Projects</Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/about">About</Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

