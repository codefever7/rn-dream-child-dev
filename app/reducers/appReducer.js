import { APP__SET_LOADING } from '@app/actions/types';
import { createReducer } from '@app/helpers/reduxHelpers';
import { combineReducers } from 'redux';

const loadingReducer = createReducer({
  initialState: false,
  actionType: APP__SET_LOADING,
});

export default combineReducers({
  loading: loadingReducer,
});
