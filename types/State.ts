import { Action, Actions } from './Actions';
import { IFlowState } from '../src/store/flowStore';


export type State = & IFlowState;

export type Reducer = (state: State, action: Action) => State;
export type Dispatch = (action: Action) => void;

export type TFlowContext = [State, Dispatch];

export type UseFlowType = {
  flowState: State
  flowActions: Actions
};

export type FlowProviderProps = {
  initialState: State;
  children: React.ReactNode;
};

export interface IbaseOptions {
  dispatch: Dispatch,
  state: State,
}