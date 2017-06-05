
const ROBOT_ARRIVED = 'robots/ARRIVED';

const defaultState = {
  robots: []
};
export default (state = { ...defaultState }, action) => {

  switch (action.type) {
    case ROBOT_ARRIVED:
      return {
        ...state,
        robots: action.robots
      }
  }


  return state;
}


export const robotsArrived = (robots) => ({ type: ROBOT_ARRIVED, robots });
