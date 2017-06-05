import React, { Component } from 'react';
import { connect } from 'react-redux';
import { robotsArrived, filterRobots, requestRobots } from './reducer';

import Robot from './Robot.jsx';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    if (this.props.robots == null || this.props.robots.length === 0) {
      this.props.requestRobots()
    }
  }

  onSearch = ({ target: { value } }) => {
    this.props.filterRobots(value);
  }

  render() {
    const { filteredRobots, loading } = this.props;
    const robotElement = filteredRobots.map((robot, index) => {
      return <Robot key={index} robot={robot} />
    });

    return (
      <div>
        <h1>Robots</h1>
        <div>
          <input value={this.props.filter} onChange={this.onSearch} /> {filteredRobots.length}
        </div>
        { loading ? 'Loading' : null}
        {robotElement}
      </div>
    );
  }
}

export default connect(state => {
  const { robots, filter, filteredRobots } = state;
  return { robots, filter, filteredRobots };
}, (dispatch: Function) => ({
  robotsArrived: (robots) => dispatch(robotsArrived(robots)),
  filterRobots: (filter) => dispatch(filterRobots(filter)),
  requestRobots: () => dispatch(requestRobots())
}))(Main);
