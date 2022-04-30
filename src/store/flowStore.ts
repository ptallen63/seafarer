/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { FC } from 'react';
import { Action, ActionsParams } from '../../types/Actions';
import { State } from '../../types/State';

/**
 * ===================================
 *               STATE
 * ===================================
 */

export type Screen = FC


export type FlowState = {
    screens: Screen[];
    currenScreenIndex: number;
};

export const defaultState: FlowState = {
    screens: [],
    currenScreenIndex: 0
};

/**
 * ===================================
 *               ACTIONS
 * ===================================
 */

export enum ActionTypes {
    INIT_FLOW = 'INIT_FLOW',
    NEXT_SCREEN = 'NEXT_SCREEN'
}

// Action Interfaces: Should be included in Action type in 'types/Actions'
export type InitFlow = {
    type: ActionTypes.INIT_FLOW;
};

export type NextScreen ={
    type: ActionTypes.NEXT_SCREEN;
    index?: number;
}


// Actions to be exposed on useAppState(), should be included in 'types/State'
export type FlowActions = {
    initFlow: () => void;
    nextScreen: (index?: number) => void;
};

/**
 * This function will take in dispatch, state, router, and will return
 * a list of actions that will be used in useAppState()
 *
 * ex: ...appActions({dispatch}),
 */
export function actions({ dispatch, state }: ActionsParams): FlowActions {
    return {
        initFlow() {
            dispatch({ type: ActionTypes.INIT_FLOW });
        },
        nextScreen(index){
            dispatch({ type: ActionTypes.NEXT_SCREEN, index,})
        }
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
        case ActionTypes.INIT_FLOW:
            return { ...state};
        case ActionTypes.NEXT_SCREEN:
            const newIndex = action.index ?? state.currenScreenIndex + 1
            return { ...state, currenScreenIndex: newIndex };
        default:
            return state;
    }
}