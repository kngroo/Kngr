import React, { Component } from 'react';

require('./styles/header.scss');

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="title">Welcome, you</h1>
      </header> 
    )
  }
}
