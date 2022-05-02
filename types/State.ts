import { Action, Actions } from './Actions';
import { FlowState } from '../src/store/flowStore';


export type State = & FlowState;

export type Reducer = (state: State, action: Action) => State;
export type Dispatch = (action: Action) => void;

export type TFlowContext = [State, Dispatch];

export type UseFlowType = {
    state: State
    actions: Actions
};

export type FlowProviderProps = {
    initialState: State;
    children: React.ReactNode;
};