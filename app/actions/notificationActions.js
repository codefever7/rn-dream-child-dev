import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Notification Loader
 */
export const setNotificationLoader = createAction(Actions.SET_NOTIFICATION_LOADER);
/**
 * @desc Set Notification List
 */
export const setNotificationList = createAction(Actions.SET_NOTIFICATION_LIST);
/**
 * @desc Update Notification Item
 */
export const updateNotificationItem = createAction(Actions.UPDATE_NOTIFICATION_ITEM);

/**
 * @desc Clear Notification Data
 */
export const clearNotificationData = () => (dispatch) => {
  dispatch(setNotificationLoader(false));
  dispatch(setNotificationList({}));
};
