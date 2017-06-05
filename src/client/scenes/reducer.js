/* @flow */
import { combineReducers } from 'redux';

const ACTION_PREFIX = `scenes/Main/`;
export const PROPERTY_REQUESTED = `${ACTION_PREFIX}/pdf_property/REQUESTED`;

export type State = {}
const initialState: State = {};

export default (state: State = { ...initialState }, action: any) => {
  switch (action.type) {
  }

  return state;
}
