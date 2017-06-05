
const ROBOT_REQUESTED = 'robots/ARRIVED';
const ROBOT_ARRIVED = 'robots/ARRIVED';
const ROBOT_FILTER = 'robots/FILTER';

const defaultState = {
  robots: [],
  filteredRobots: [],
  filter: '',
  loading: true
};
export default (state = { ...defaultState }, action) => {

  switch (action.type) {
    case ROBOT_ARRIVED:
      return {
        ...state,
        loading: false,
        robots: action.robots,
        filteredRobots: action.robots
      }
    case ROBOT_FILTER: {
      const filteredRobots = state.robots.filter(
        (robot) => robot.name.toLowerCase().startsWith(action.filter.toLowerCase())
      );

      return {
        ...state,
        filter: action.filter,
        filteredRobots
      }
    }
  }


  return state;
}

export const filterRobots = (filter) => ({ type: ROBOT_FILTER, filter });
export const robotsArrived = (robots) => ({ type: ROBOT_ARRIVED, robots });
export const requestRobots = () => {
  return (dispatch) => {

    fetch('/api/robots')
    .then((data) => data.json())
    .then((json) => {
      return dispatch(robotsArrived(json));
    });
  }
}
