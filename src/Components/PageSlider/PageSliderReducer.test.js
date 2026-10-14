import reducer, { initialState } from './PageSliderReducer';
import { renderHook, act } from '@testing-library/react';
import useNavigator from './hooks/useNavigator';

const pages = [{ direction: 'vertical', slides: ['a'] }, { direction: 'horizontal', slides: ['b', 'c'] }, { direction: 'vertical', slides: ['d'] }];
test('navigation visits horizontal slides and stops at boundaries', () => {
  let state = initialState;
  const states = [{pageIndex:1,horizontalIndex:0},{pageIndex:1,horizontalIndex:1},{pageIndex:2,horizontalIndex:0}];
  states.forEach(expected => { state = reducer(state, {type:'NEXT',pages}); expect(state).toEqual(expected); });
  expect(reducer(state,{type:'NEXT',pages})).toBe(state);
  [states[1], states[0], initialState].forEach(expected => { state = reducer(state,{type:'PREV',pages}); expect(state).toEqual(expected); });
  expect(reducer(state,{type:'PREV',pages})).toBe(state);
  expect(reducer(state,{type:'UNKNOWN'})).toBe(state);
});
test('navigator clamps horizontal indices and rejects invalid pages', () => {
  const dispatch = jest.fn();
  const {result} = renderHook(() => useNavigator(initialState, dispatch, pages));
  act(() => result.current.goTo(1,99));
  expect(dispatch).toHaveBeenLastCalledWith({type:'GOTO',pageIndex:1,horizontalIndex:1});
  act(() => result.current.goTo(0,99));
  expect(dispatch).toHaveBeenLastCalledWith({type:'GOTO',pageIndex:0,horizontalIndex:0});
  dispatch.mockClear();
  [-1,3,'1',NaN,0.5,Infinity].forEach(index => act(() => result.current.goTo(index)));
  expect(dispatch).not.toHaveBeenCalled();
});
