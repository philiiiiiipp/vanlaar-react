import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      this.setState({ filteredRobots: json, robots: json, loading: false });
    });
  }

  onSearch = ({ target: { value } }) => {
    const filteredRobots = this.state.robots.filter((robot) => robot.name.toLowerCase().startsWith(value.toLowerCase()));
    this.setState({ filteredRobots, search: value});
  }

  render() {
    const { filteredRobots, loading } = this.state;
    const robotElement = filteredRobots.map((robot, index) => {
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

export default connect(state => ({
}), (dispatch: Function) => ({
}))(Main);
