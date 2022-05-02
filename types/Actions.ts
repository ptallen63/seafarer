import { State, Dispatch } from './State';


import {
    FlowActions,
    InitFlow,
    NextScreen,
    PreviousScreen,
    SaveAndContinue,
    Submit,
    UpdateScreenHistory,
    ValidateScreen,
} from '../src/store/flowStore';



export type ActionsParams = {
    dispatch: Dispatch,
    state: State,
};

export type Action =
    // Flow Actions
    | InitFlow
    | NextScreen
    | PreviousScreen
    | SaveAndContinue
    | Submit
    | UpdateScreenHistory
    | ValidateScreen

export type Actions = & FlowActions;