import { State, Dispatch } from './State';

import {
    SetSanityString,
    SanityActions
} from '../src/store/sanityStore';

import {
    FlowActions,
    InitFlow,
    NextScreen,
    PreviousScreen,
    SaveAndContinue,
    Submit
} from '../src/store/flowStore';



export type ActionsParams = {
    dispatch: Dispatch,
    state: State,
};

export type Action =
    // Sanity Actions
    | SetSanityString
    // Flow Actions
    | InitFlow
    | NextScreen
    | PreviousScreen
    | SaveAndContinue
    | Submit

export type Actions = & SanityActions & FlowActions;