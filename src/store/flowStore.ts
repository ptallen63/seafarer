/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { FC } from 'react';
import { Action, ActionsParams, Actions } from '../../types/Actions';
import { State } from '../../types/State';

/**
 * ===================================
 *               STATE
 * ===================================
 */

export type Screen = {
    name: string;
    component: FC;
}
export type FlowData = {
    [key: string]: unknown
}


export type FlowState = {
    screens: Screen[];
    currenScreenIndex: number;
    data: FlowData
    onSubmit?: (data?: FlowData, state?: State) => void
};

export const defaultState: FlowState = {
    screens: [],
    currenScreenIndex: 0,
    data: {}
};

/**
 * ===================================
 *               ACTIONS
 * ===================================
 */

export enum ActionTypes {
    INIT_FLOW = 'INIT_FLOW',
    NEXT_SCREEN = 'NEXT_SCREEN',
    SAVE_AND_CONTINUE = 'SAVE_AND_CONTINUE',
    SUBMIT = 'SUBMIT',
}

// Action Interfaces: Should be included in Action type in 'types/Actions'
export type InitFlow = {
    type: ActionTypes.INIT_FLOW;
};

export type NextScreen ={
    type: ActionTypes.NEXT_SCREEN;
    index?: number;
}

export type SaveAndContinue = {
    type: ActionTypes.SAVE_AND_CONTINUE;
    // TODO update to have a generic data type
    data: FlowData;
}

export type Submit = {
    type: ActionTypes.SUBMIT;
}


// Actions to be exposed on useFlow(), should be included in 'types/State'
export type FlowActions = {
    initFlow: () => void;
    nextScreen: (index?: number) => void;
    saveAndContinue: (data: FlowData) => void;
    submit: () => void;
};

/**
 * This function will take in dispatch, state, router, and will return
 * a list of actions that will be used in useFlow()
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
        },
        saveAndContinue(data){
            dispatch({type: ActionTypes.SAVE_AND_CONTINUE, data})
        },
        submit(){
            dispatch({type: ActionTypes.SUBMIT});
            if (state?.onSubmit){
                state.onSubmit(state.data, state)
            }
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
        case ActionTypes.SAVE_AND_CONTINUE:
            const newData = { ...state.data, ...action.data}
            return { ...state, data: newData}
        default:
            return state;
    }
}