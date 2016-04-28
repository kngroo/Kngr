import React, { Component } from 'react';

require('./styles/docSection.scss');

export default class Docsection extends Component {
  constructor(props) {
    super(props);
    this.number = 1;
  }
  render() {
    return (
      <section className="doc-section">
        <h6 className="doc-header">section {this.props.number}</h6>
        <p>
          Some words
        </p>
        <p>
          Some more words
        </p>
      </section>    
    )
  }
}
