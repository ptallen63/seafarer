/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import * as store from './store/index';
import {
  TFlowContext,
  FlowProviderProps,
  Dispatch,
  State,
  UseFlowType,
} from '../types/State';
import { withDevTools } from './utils/withDevtools';
import * as FlowStore from './store/flowStore';

// Export Screen types so they can be used
export const ScreenTypes = FlowStore.ScreenTypes;

const FlowContext = createContext<TFlowContext>([
  {} as State,
  // eslint-disable-next-line no-console
  () => console.log('dispatcher not set up'),
]);

// Default state as set by the flowStore
const defaultState: State = {
  ...store.defaultState(),
};

/**
 * Main provider to be used. Must be present for the useFlow hook to work properly
 *
 * ex: <FlowProvider config={... someConfig }> <App/> </FlowProvider>
 */
export const FlowProvider = ({
  config,
  ...props
}: FlowProviderProps): ReactElement => {

  const baseState = {
    ...defaultState,
    ...config,
  };

  // TODO: this should be cleaned up, is this the right place?
  // Set initial Screen history
  if (baseState?.screenHistory?.length ===  0) {
    baseState?.screenHistory?.push({
      index: 0,
      name: baseState.screens[0].name,
    });
  }

  const reducer = store.reducer();
  const [state, baseDispatch]: [State, Dispatch] = useReducer(
    reducer,
    baseState,
  );


  const { dispatch: devDispatch } = withDevTools(baseDispatch, reducer, baseState);

  const dispatch = config.settings?.enableDevTools ? devDispatch : baseDispatch;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value: TFlowContext = useMemo(() => [state, dispatch], [state]);


  return <FlowContext.Provider value={ value } {...props } />;
};

/**
 * Main hook that exposes the flow state and the flow actionsn
 *
 * ex const { flowState, flowActions } = useFlow()
 *
 */
export const useFlow = (): UseFlowType => {
  if (FlowContext === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  const [state, dispatch]: [State, Dispatch] = useContext(FlowContext);
  return {
    flowState: state,
    flowActions: store.actions({ dispatch, state }),
  };
};

export default { useFlow, FlowProvider };

