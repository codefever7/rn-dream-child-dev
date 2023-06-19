import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Auth Loader
 */
export const setAuthLoader = createAction(Actions.SET_AUTH_LOADER);
/**
 * @desc Update Login User
 */
export const updateLoginUser = createAction(Actions.UPDATE_LOGIN_USER);
/**
 * @desc clear Login User
 */
export const clearLoginUser = createAction(Actions.CLEAR_LOGIN_USER);

/**
 * @desc Clear Auth Data
 */
export const clearAuthData = () => (dispatch) => {
  dispatch(setAuthLoader(false));
  dispatch(clearLoginUser());
};
