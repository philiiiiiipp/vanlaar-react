import React, { Component } from 'react';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount = () => {
    fetch('/api/robots')
    .then((data) => data.json())
    .then((json) => {
      
    });
  }

  render() {

    return (
      <div>Main Container</div>
    );
  }
}
