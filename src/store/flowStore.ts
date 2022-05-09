/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { FC } from 'react';
import { Action, ActionsParams } from '../../types/Actions';
import { State } from '../../types/State';
import pkg from '../../package.json';

/**
 * ===================================
 *               Helpers
 * ===================================
 */

/**
 * check to see if the index is indeed in the screens array
 *
 * @param index
 * @param screens
 * @returns boolean
 */
const screenIndexIsValid = (index: number, screens: Screen[]) => {
  console.log('screindexvalid', screens[index], screens[index] !== undefined);
  return screens[index] !== undefined;
};

const getNextIndex = (data: FlowData, state: State, index?: number) => {
  let nextIndex = state.currenScreenIndex + 1;
  // Check to see if it should be skipped
  const nextScreen = state.screens[nextIndex];
  if (nextScreen?.shouldSkip && nextScreen.shouldSkip(data, state)) {
    nextIndex++;
  }

  // if there is an explicit index, use that
  if (index) nextIndex = index;

  if (!screenIndexIsValid(nextIndex, state.screens)) {
    return -1;
  }

  return nextIndex;

};

const getPrevIndex = (data: FlowData, state: State, index?: number) => {
  let prevIndex = state.currenScreenIndex - 1;
  const previousScreen = state.screens[prevIndex];
  if (previousScreen?.shouldSkip && previousScreen.shouldSkip(data, state)) {
    prevIndex--;
  }
  if (!screenIndexIsValid(prevIndex, state.screens)) {
    return -1;
  }
  return prevIndex;
};


/**
 * ===================================
 *               STATE
 * ===================================
 */

export enum ScreenTypes {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  SUBMIT = 'SUBMIT',
  DISPLAY = 'DISPLAY',
}

export interface Screen {
  name: string;
  type: ScreenTypes;
  component?: FC;
  data?: {
    [key: string]: unknown;
  }
  isValid?: boolean;
  isDirty?: boolean;
  shouldSkip?: (data?: FlowData, state?: State) => boolean;
  validate?: (data?: FlowData) => boolean;

}
export type FlowData = {
  [key: string]: unknown
};

export interface FlowSettings {
  // A flag to think about logging things to the console for debug perboses
  verbose?: boolean;

  // current version of the flow - recieved from package JSON
  version?: string;

  // Enforce validation before a screen can advance - defaults to true?
  strictValidation?: boolean
}

export type ScreenHistoryRecord = {
  index: number;
  name: string;
};


export interface FlowState {
  screens: Screen[];
  currenScreenIndex: number;
  previousScreenIndex?: number;
  screenHistory?: ScreenHistoryRecord[];
  settings?: FlowSettings;
  data: FlowData
  onSubmit?: (data?: FlowData, state?: State) => void
  onNext?: (data?: FlowData, state?: State) => void
  onPrevious?: (data?: FlowData, state?: State) => void
  onSave?: (data?: FlowData, state?: State) => void
}

export const defaultState: FlowState = {
  screens: [],
  screenHistory: [],
  currenScreenIndex: 0,
  previousScreenIndex: 0,
  data: {},
  settings: {
    verbose: false,
    version: pkg.version,
    strictValidation: false,
  },
};

/**
 * ===================================
 *               ACTIONS
 * ===================================
 */

export enum ActionTypes {
  INIT_FLOW = 'INIT_FLOW',
  NEXT_SCREEN = 'NEXT_SCREEN',
  PREVIOUS_SCREEN = 'PREVIOUS_SCREEN',
  SAVE_AND_CONTINUE = 'SAVE_AND_CONTINUE',
  SUBMIT = 'SUBMIT',
  UPDATE_SCREEN_HISTORY = 'UPDATE_SCREEN_HISTORY',
  VALIDATE_SCREEN = 'VALIDATE_SCREEN',
  //  TODO: add update screen action #13

}

// Action Interfaces: Should be included in Action type in 'types/Actions'
export type InitFlow = {
  type: ActionTypes.INIT_FLOW;
  config: FlowState
};

export type NextScreen = {
  type: ActionTypes.NEXT_SCREEN;
  index: number;
};

export type PreviousScreen = {
  type: ActionTypes.PREVIOUS_SCREEN;
  index: number;
};

export type SaveAndContinue = {
  type: ActionTypes.SAVE_AND_CONTINUE;
  // TODO update to have a generic data type
  data: FlowData;
};

export type Submit = {
  type: ActionTypes.SUBMIT;
};

export type UpdateScreenHistory = {
  type: ActionTypes.UPDATE_SCREEN_HISTORY;
  screenHistory: ScreenHistoryRecord[];
};

export type ValidateScreen = {
  type: ActionTypes.VALIDATE_SCREEN;
  screen: Screen;
};


// Actions to be exposed on useFlow(), should be included in 'types/State'
export type FlowActions = {
  initFlow: (config: FlowState) => void;
  nextScreen: (index?: number) => void;
  previousScreen: () => void;
  saveAndContinue: (data: FlowData) => void;
  submit: () => void;
  updateScreenHistory: (record: ScreenHistoryRecord) => void;
  validateScreen: (screen: Screen, data: FlowData) => void;
};

/**
 * This function will take in dispatch, state, router, and will return
 * a list of actions that will be used in useFlow()
 *
 * ex: ...appActions({dispatch}),
 */
export function actions({ dispatch, state }: ActionsParams): FlowActions {
  return {
    initFlow(config) {
      dispatch({ type: ActionTypes.INIT_FLOW, config });
    },
    nextScreen(index) {
      const nextIndex = getNextIndex(state.data, state, index);

      // check to see if index is valid
      if (nextIndex === -1) {
        // TODO set up error dispatching
        return console.error('invalid index');
      }

      dispatch({ type: ActionTypes.NEXT_SCREEN, index: nextIndex });

      // TODO: make this more robust, it will break of someone does not use an arrow function to call it
      // Update the screen history
      this.updateScreenHistory({ index: nextIndex, name: state.screens[nextIndex].name });

      // Fire a lifecyle function if it is present
      if (state.onNext) state.onNext(state.data, state);


    },
    previousScreen() {
      const prevIndex = getPrevIndex(state.data, state);
      if (prevIndex === -1) {
        return console.error('invalid index');
      }

      dispatch({ type: ActionTypes.PREVIOUS_SCREEN, index: prevIndex });

      // TODO: make this more robust, it will break of someone does not use an arrow function to call it
      // Update the screen history
      this.updateScreenHistory({ index: prevIndex, name: state.screens[prevIndex].name });

      // Fire a lifecyle function if it is present
      if (state.onPrevious) state.onPrevious(state.data, state);
    },
    saveAndContinue(data) {
      // Validate
      if (state.settings?.strictValidation) {
        const currentScreen = state.screens[state.currenScreenIndex];
        if (!currentScreen.isValid) return;
      }

      // Save Data
      dispatch({ type: ActionTypes.SAVE_AND_CONTINUE, data });

      // Navigate to next screen
      const nextIndex = getNextIndex(data, state);

      // check to see if index is valid
      if (nextIndex === -1) {
        // TODO set up error dispatching
        return console.error('invalid index');
      }

      dispatch({ type: ActionTypes.NEXT_SCREEN, index: nextIndex });

      // TODO: make this more robust, it will break of someone does not use an arrow function to call it
      // Update the screen history
      this.updateScreenHistory({ index: nextIndex, name: state.screens[nextIndex].name });

      // Fire a lifecyle function if it is present
      if (state.onSave) state.onSave(state.data, state);
    },
    submit() {
      dispatch({ type: ActionTypes.SUBMIT });
      if (state?.onSubmit) {
        state.onSubmit(state.data, state);
      }
    },
    updateScreenHistory(record) {
      const newScreenHistory = state.screenHistory || [record];
      if (newScreenHistory) {
        newScreenHistory.push(record);
      }
      dispatch({ type: ActionTypes.UPDATE_SCREEN_HISTORY, screenHistory: newScreenHistory });
    },
    validateScreen(screen, data) {
      const newScreen = screen;
      if (screen.validate) {
        newScreen.isValid =  screen.validate(data);
      }

      dispatch({ type: ActionTypes.VALIDATE_SCREEN, screen: newScreen });
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
    case ActionTypes.INIT_FLOW:
      return { ...state, ...action.config };
    case ActionTypes.NEXT_SCREEN:
      return { ...state, currenScreenIndex: action.index };
    case ActionTypes.PREVIOUS_SCREEN:
      return { ...state, currenScreenIndex: action.index };
    case ActionTypes.SAVE_AND_CONTINUE:
      const newData = { ...state.data, ...action.data };
      return { ...state, data: newData };
    case ActionTypes.UPDATE_SCREEN_HISTORY:
      return { ...state, screenHistory: action.screenHistory };
    case ActionTypes.VALIDATE_SCREEN:
      const screenIndex = state.screens.findIndex(s => s.name === action.screen.name);
      const screens = [
        ...state.screens.slice(0, screenIndex),
        action.screen,
        ...state.screens.slice(screenIndex + 1),
      ];
      return { ...state, screens };
    default:
      return state;
  }
}