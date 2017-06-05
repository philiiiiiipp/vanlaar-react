import React, { Component } from 'react';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      robots: []
    };
  }

  componentWillMount = () => {
    fetch('/api/robots')
    .then((data) => data.json())
    .then((json) => {
      this.setState({ robots: json });
    });
  }

  render() {
    const { robots } = this.state;

    return (
      <div>Main Container</div>
    );
  }
}
