import { Action } from '../../types/Actions';
import { Reducer, State } from '../../types/State';

/**
 * combine reducers takes in n number of reducers and combines them into a single reducer
 * @param reducers
 */
const combineReducers = (...reducers: Reducer[]) => (
  prevState: State,
  action: Action,
): State => reducers.reduce((newState, reducer) => reducer(newState, action), prevState);
export default combineReducers;