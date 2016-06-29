import React, { Component } from 'react';
import { Link } from 'react-router';
import Gfycat from './gfycat';

require('./styles/projects.scss');

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      title: props.data.title,
      description: props.data.description
    }
  }

/*  componentDidMount() {
    this.setState({
      id: 
    })
  }*/

  render() {
    var link = '/projects/' + this.state.id;
    return(
      <li className="project-item">
        <Link className="project-link" to={link}>{this.state.title}</Link>
        <p>{this.state.description}</p>
      </li>
    )
  }
}

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    var projects = [
      {
        id: 0,
        title: 'Gfycat Top 20',
        description: 'Angular app for viewing trending gifs on Gfycat'
      },
      {
        id: 1,
        title: '360 Video Player',
        description: 'Video player made with WebGl for viewing 360 video on the web'
      }
    ];
    this.setState({
      projects: projects
    });
  }

  render() {
    var projects = [];
    for (let i = 0; i < this.state.projects.length; i++) {
      var project = this.state.projects[i];
      projects.push(
        <Project data={project}></Project>    
      )
    }
    return (
      <section className="projects">
        <ul className="projects-list">{projects}</ul>
      </section>    
    )
  }
}
