/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { Action, ActionsParams } from '../../types/Actions';
import { State } from '../../types/State';

/**
 * ===================================
 *               STATE
 * ===================================
 */


export type SanityState = {
    sanityString: string;
};

export const defaultState: SanityState = {
    sanityString: 'hello,world',
};

/**
 * ===================================
 *               ACTIONS
 * ===================================
 */

export enum ActionTypes {
    SET_SANITY_STRING = 'SET_SANITY_STRING',
}

// Action Interfaces: Should be included in Action type in 'types/Actions'
export type SetSanityString = {
    type: ActionTypes.SET_SANITY_STRING;
    sanityString: string;
};


// Actions to be exposed on useAppState(), should be included in 'types/State'
export type SanityActions = {
    setSanityString: (sanityString: string) => void;
};

/**
 * This function will take in dispatch, state, router, and will return
 * a list of actions that will be used in useAppState()
 *
 * ex: ...appActions({dispatch}),
 */
export function actions({ dispatch, state }: ActionsParams): SanityActions {
    return {
        setSanityString(sanityString) {
            dispatch({ type: ActionTypes.SET_SANITY_STRING, sanityString });
        },
    };
}

/**
 * ===================================
 *               REDUCER
 * ===================================
 */

/**
 * User reducer is responsible for all user related state mutations
 * @param state State
 * @param action Action
 */
export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionTypes.SET_SANITY_STRING:
            return { ...state, sanityString: action.sanityString };

        default:
            return state;
    }
}