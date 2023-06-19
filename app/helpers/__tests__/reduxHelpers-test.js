import { createReducer } from '@app/helpers/reduxHelpers';

const INIT = 'INIT';
const SET_COUNTER = 'SET_COUNTER';
const UNKNOWN = 'UNKNOWN';

it('should initialize reducer', async () => {
  const reducer = createReducer({
    initialState: 0,
    actionType: SET_COUNTER,
  });
  const result = reducer(undefined, { type: INIT, payload: 1 });
  expect(result).toBe(0);
});

it('should set value', async () => {
  const reducer = createReducer({
    initialState: 0,
    actionType: SET_COUNTER,
  });
  const result = reducer(1, { type: SET_COUNTER, payload: 2 });
  expect(result).toBe(2);
});

it('should ignore unknown action type', async () => {
  const reducer = createReducer({
    initialState: 0,
    actionType: SET_COUNTER,
  });
  const result = reducer(1, { type: UNKNOWN, payload: 2 });
  expect(result).toBe(1);
});
