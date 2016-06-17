import React, { Component } from 'react';

require('./styles/gfycat.scss');

export default class Gfycat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Initial'
    }
  }

  componentDidMount() {
    this.apiUrl = 'https://api.gfycat.com/v1test/gfycats/trending';
    fetch(this.apiUrl, {method: 'GET', mode: 'CORS'}).then(res => {
      res.json().then(json => {
        this.setState({
          data: json.gfycats
        });
      });
    });
  }

  render() {
    var gfycats = [];
    for (let i = 0; i < this.state.data.length; i++) {
      var gif = this.state.data[i];
      gfycats.push(
        <div className="gif-container">
          <img className="gif-poster" src={gif.posterUrl}></img>
          <h6>{gif.title}</h6>
        </div>
      )
    }
    return (
      <div>
        <h2>Gfycat Top 20</h2>
        {gfycats}
      </div>
    )
  }
}
