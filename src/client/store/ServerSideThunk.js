/* @flow */

export default function createServerSideThunk(promises: Array<Object>) {
  return ({ dispatch, getState }: any) => {
    return (next: any) => {
      return (action: any) => {
        if (typeof action === 'function') {
          promises.push(action(dispatch, getState));
          return null;
        }

        return next(action);
      };
    };
  };
}
