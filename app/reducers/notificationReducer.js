import { createReducer } from '@app/helpers/reduxHelpers';
import { combineReducers } from 'redux';
import * as Actions from '@app/actions/types';
import { createReducer as createReducerOrig } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_NOTIFICATION_LOADER,
});

const initialState = {};
const notificationListReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.SET_NOTIFICATION_LIST, (state = initialState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_NOTIFICATION_ITEM, (state, action) => {
      let notification = { ...state };
      const list = JSON.parse(JSON.stringify(notification?.NotificationList));
      const index = list?.findIndex((x) => x?.user_notification_id === action.payload.id);
      if (index !== -1) {
        list[index][action.payload.propsName] = action.payload.value;
      }
      notification = {
        ...notification,
        NotificationList: list,
      };
      return notification;
    });
});

const notificationReducers = combineReducers({
  loading: loadingReducer,
  notifications: notificationListReducer,
});
export default notificationReducers;
