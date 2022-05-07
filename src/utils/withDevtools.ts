/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action } from '../../types/Actions';
import { Dispatch, Reducer, State } from '../../types/State';

const win = typeof window !== 'undefined' ? window : null;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect: () => any;
    };
  }
}

type DevTools = {
  dispatch: (action: Action) => any;
};
type DevToolsMessagePayload = {
  type?: string;
  state?: any;
};
type DevToolsMessageType = 'DISPATCH' | string;
type DevToolsMessage = {
  type?: DevToolsMessageType;
  payload?: DevToolsMessagePayload;
};
type ReduxDevTools = {
  init: () => void;
  connect: () => any;
  subscribe: (message: DevToolsMessage) => any;
  send: (action: { type: string;[state: string]: any }, newState?: any) => any;
  unsubscribe: () => any;
  dispatch: (action: Action) => any;
  disconnect: () => any;
} | null;

let state: State;
let initializedDevTools: ReduxDevTools = null;
/**
 * if we have redux dev tools installed,
 * connect and init
 */
export const getDevTools = (): ReduxDevTools => {
  if (initializedDevTools) return initializedDevTools;
  // eslint-disable-next-line no-underscore-dangle
  if (win?.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    initializedDevTools = win?.__REDUX_DEVTOOLS_EXTENSION__.connect();
    initializedDevTools?.init();

    // adding support for using devtools without sending current state
    // this allows devtools.send to be used without
    // knowledge of current state (outside the scope of react context)
    // @ts-ignore
    const originalSend = initializedDevTools.send;
    // @ts-ignore
    initializedDevTools.send = (action, newState = state) => {
      originalSend(action, newState);
    };
  }
  return initializedDevTools;
};

/**
 * withDevTools is a higher order function that
 * sends all dispatches and state updates to redux
 * dev tools, if it's installed
 *
 * @param dispatch Dispatch
 * @param reducer Reducer
 */
export const withDevTools = (
  dispatch: Dispatch,
  reducer: Reducer,
  baseState: State,
): DevTools => {
  const devTools = getDevTools();
  return {
    dispatch: (action: Action) => {
      // first dispatch the actions so the app can continue
      dispatch(action);

      if (!devTools) {
        return;
      }

      try {
        // create a new state
        const newState = reducer(state || baseState, action);
        state = newState;
        const actionToSend = {
          ...action,
          type: action.type,
        };
        devTools.send(
          actionToSend,
          newState,
        );

        // only it its verbose
        if (state.settings?.verbose) console.log(`ACTION: ${actionToSend.type}`, { payload: actionToSend });
      } catch (e) {
        console.error('error in withDevTools', e);
      }
    },
  };
};