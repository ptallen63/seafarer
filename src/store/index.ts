/* eslint-disable import/prefer-default-export */
import { Reducer, State } from '../../types/State';
import { ActionsParams, Actions } from '../../types/Actions';
import * as flowStore from './flowStore';
import * as sanityStore from './sanityStore';
import combineReducers from './combineReducers';

/**
 * root reducer is responsible for combining all the reducers into a single reducer
 */
export const reducer = (): Reducer => combineReducers(
    sanityStore.reducer,
    flowStore.reducer,
);

/**
 * Build one object of all the actions available for the app
 * @param actionsParams
 * @returns Actions
 */
export const actions = (actionsParams: ActionsParams): Actions => ({
    ...sanityStore.actions(actionsParams),
    ...flowStore.actions(actionsParams),
});

/**
 * Build one object of all the default state available for the app
 * @returns State
 */
export const defaultState = (): State => ({
    ...sanityStore.defaultState,
    ...flowStore.defaultState,
});