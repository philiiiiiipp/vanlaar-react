import React, { Component } from 'react';
import { connect } from 'react-redux';
import { robotsArrived } from './reducer';

import Robot from './Robot.jsx';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      robots: [],
      filteredRobots: [],
      search: '',
      loading: true
    };
  }

  componentWillMount = () => {
    fetch('/api/robots')
    .then((data) => data.json())
    .then((json) => {
      this.props.robotsArrived(json);
      this.setState({ loading: false });
    });
  }

  onSearch = ({ target: { value } }) => {
    const filteredRobots = this.state.robots.filter((robot) => robot.name.toLowerCase().startsWith(value.toLowerCase()));
    this.setState({ filteredRobots, search: value});
  }

  render() {
    const { filteredRobots, loading } = this.state;
    const { robots } = this.props;
    const robotElement = robots.map((robot, index) => {
      return <Robot key={index} robot={robot} />
    });

    return (
      <div>
        <h1>Robots</h1>
        <div>
          <input value={this.state.search} onChange={this.onSearch} /> {filteredRobots.length}
        </div>
        { loading ? 'Loading' : null}
        {robotElement}
      </div>
    );
  }
}

export default connect(state => {
  const { robots } = state;
  return { robots };
}, (dispatch: Function) => ({
  robotsArrived: (robots) => dispatch(robotsArrived(robots))
}))(Main);
