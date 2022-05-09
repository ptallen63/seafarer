/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useReducer } from 'react';
import { jest } from '@jest/globals';

import { renderHook } from '@testing-library/react';
import { State } from '../../types/State';
import mockOptions from '../../mocks/state/flow';
import { ActionTypes, reducer, defaultState, actions, ScreenTypes } from './flowStore';

describe('FlowStore Default State', () => {
  test('Sanity', () => {
    Object.keys(defaultState).forEach((prop) => {
      expect(mockOptions).toHaveProperty(prop);
    });
  });
});

describe('Options Reducer', () => {
  test('INIT_FLOW', () => {
    const state: State = reducer(
    // @ts-ignore
      {},
      {
        type: ActionTypes.INIT_FLOW,
        config: mockOptions,
      },
    );

    expect(state).toMatchObject(mockOptions);
  });
  describe('NEXT_SCREEN', () => {
    const { result } = renderHook(() => useReducer(reducer, {
      ...mockOptions,
      screens: [
        { name: 'sreen 1' },
        { name: 'sreen 3' },
      ],
    }));
    const [state] = result.current;
    const dispatch = jest.fn();
    const { nextScreen } = actions({ dispatch, state });

    test('Set the index', () => {
      const state: State = reducer(
        // @ts-ignore
        mockOptions,
        {
          type: ActionTypes.NEXT_SCREEN,
          index: mockOptions.currenScreenIndex + 1,
        },
      );
      expect(state.currenScreenIndex).toBe(mockOptions.currenScreenIndex + 1);
    });

    test('Dont Increment if its not possible', () => {
      nextScreen(-1);
      expect(dispatch).not.toBeCalled();
    });
    test.skip('Test advancing to next screen', () => {
      // TODO
    });
  });
  describe('PREVIOUS_SCREEN', () => {
    const { result } = renderHook(() => useReducer(reducer, mockOptions));
    const [state] = result.current;
    const dispatch = jest.fn();
    const { previousScreen } = actions({ dispatch, state });
    test('Goes to whatever index you give it in the reducer', () => {
      const state: State = reducer(
        // @ts-ignore
        {},
        {
          type: ActionTypes.PREVIOUS_SCREEN,
          index: 1,
        },
      );
      expect(state.currenScreenIndex).toBe(1);
    });
    test('Dont go to a previous screen if you cant', () => {
      expect(previousScreen(-1)).toBe(undefined);
      expect(previousScreen()).toBe(undefined);
      expect(dispatch).not.toHaveBeenCalled();

    });
  });
  test('SAVE_AND_COUNTINUE', () => {
    const state: State = reducer(
      // @ts-ignore
      {},
      {
        type: ActionTypes.SAVE_AND_CONTINUE,
        data: {
          foo:'bar',
        },
      },
    );
    expect(state.data).toMatchObject({ foo: 'bar' });
  });
  test('UPDATE_SCREEN_HISTORY', () => {
    const testHistoryRecord = { index: 3, name: 'bloop' };
    const state: State = reducer(
      // @ts-ignore
      {},
      {
        type: ActionTypes.UPDATE_SCREEN_HISTORY,
        screenHistory: [testHistoryRecord],
      },
    );
    expect(state.screenHistory?.length).toBe(1);
    expect(state.screenHistory?.[0]).toMatchObject(testHistoryRecord);
  });
  test('SUBMIT', () => {
    const state: State = reducer(
      // @ts-ignore
      {},
      {
        type: ActionTypes.SUBMIT,
      },
    );
    expect(state).toEqual({});
  });
  describe('VALIDATE_SCREEN', () => {
    const { result } = renderHook(() => useReducer(reducer, mockOptions));
    const [state] = result.current;
    const dispatch = jest.fn();
    const { validateScreen } = actions({ dispatch, state });

    test('test the reducer', () => {
      const state: State = reducer(
        // @ts-ignore
        mockOptions,
        {
          type: ActionTypes.VALIDATE_SCREEN,
          screen: { name: 'name', type: ScreenTypes.INPUT, isValid: true },
        },
      );
      expect(state.screens[0].isValid).toEqual(true);
    });
    test('should add isValid', () => {
      const testScreen = {
        name: 'test',
        type: ScreenTypes.INPUT,
        validate: () => true,
      };
      validateScreen(testScreen, { foo: 'bar' });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.VALIDATE_SCREEN,
        screen: {
          ...testScreen,
          isValid: true,
        },
      });
    });
    test('should add false isValid', () => {
      const testScreen = {
        name: 'test',
        type: ScreenTypes.INPUT,
        validate: () => false,
      };
      validateScreen(testScreen, { foo: 'bar' });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.VALIDATE_SCREEN,
        screen: {
          ...testScreen,
          isValid: false,
        },
      });
    });
    test('should add false isValid base on data', () => {
      const testScreen = {
        name: 'test',
        type: ScreenTypes.INPUT,
        validate: (data) => data.foo === 'bar',
      };
      validateScreen(testScreen, { foo: 'bar' });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.VALIDATE_SCREEN,
        screen: {
          ...testScreen,
          isValid: true,
        },
      });
    });

  });
});