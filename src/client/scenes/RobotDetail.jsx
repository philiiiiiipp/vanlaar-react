import React, { Component } from 'react';

export default class RobotDetail extends Component {

  constructor() {
    super();

    this.state = { robot: null };
  }

  componentWillMount = () => {
    const { routeParams } = this.props;
    console.log(routeParams);

    // fetch('/api/getRobot')
    // .then((data) => data.json())
    // .then((json) => this.state({ robot: json }));
  }

  render() {

    return (
      <div>
        Loaded
      </div>
    );
  }
}
