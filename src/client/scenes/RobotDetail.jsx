import React, { Component } from 'react';

export default class RobotDetail extends Component {

  constructor() {
    super();

    this.state = { robot: null };
  }

  componentWillMount = () => {
    const { routeParams } = this.props;

    fetch('/api/getRobot?id=' +routeParams.id)
    .then((data) => data.json())
    .then((json) => this.setState({ robot: json }));
  }

  render() {
    if (this.state.robot == null) return <p>'Loading'</p>
    const { robot: { name, origin, picture, catchphrase } } = this.state;

    return (
      <div>
        <img src={picture} />
        <h1>{name}</h1>
        <p>{origin}</p>
        <p>{catchphrase}</p>
      </div>
    );
  }
}
