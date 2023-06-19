import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set User Loader
 */
export const setUserLoader = createAction(Actions.SET_USER_LOADER);
/**
 * @desc set Current User
 */
export const setCurrentUser = createAction(Actions.SET_CURRENT_USER);
/**
 * @desc set Login Info
 */
export const setUserInfo = createAction(Actions.SET_USER_INFO);
/**
 * @desc Update User Info
 */
export const updateUserInfo = createAction(Actions.UPDATE_USER_INFO);
/**
 * @desc clear User Info
 */
export const clearUserInfo = createAction(Actions.CLEAR_USER_INFO);
/**
 * @desc set Language List
 */
export const setLanguageList = createAction(Actions.SET_LANGUAGE_LIST);
/**
 * @desc set User Status List
 */
export const setUserStatusList = createAction(Actions.SET_USER_STATUS_LIST);
/**
 * @desc set User Social List
 */
export const setUserSocialList = createAction(Actions.SET_USER_SOCIAL_LIST);
/**
 * @desc set App Detail
 */
export const setAppDetail = createAction(Actions.SET_APP_DETAIL);
/**
 * @desc set Contact Type List
 */
export const setContactTypeList = createAction(Actions.SET_CONTACT_TYPE_LIST);
/**
 * @desc set Country List
 */
export const setCountryList = createAction(Actions.SET_COUNTRY_LIST);
/**
 * @desc set Upsell Card
 */
export const setUpsellCard = createAction(Actions.SET_UPSELL_CARD);
/**
 * @desc set Popup List
 */
export const setPopupList = createAction(Actions.SET_POPUP_LIST);
/**
 * @desc set Faq
 */
export const setFaq = createAction(Actions.SET_FAQ);

/**
 * @desc set User Feedback List
 */
export const setUserFeedbackList = createAction(Actions.SET_USER_FEEDBACK_LIST);

/**
 * @desc Update User Feedback List
 */
export const updateUserFeedbackListItem = createAction(Actions.UPDATE_USER_FEEDBACK_LIST_ITEM);

/**
 * @desc Clear User Feedback List
 */
export const clearUserFeedbackList = createAction(Actions.CLEAR_USER_FEEDBACK_LIST);

/**
 * @desc Clear User Data
 */
export const clearUserData = () => (dispatch) => {
  dispatch(setUserLoader(false));
  dispatch(clearUserInfo());
  dispatch(setLanguageList(null));
  dispatch(setUserStatusList(null));
  dispatch(setUserSocialList(null));
  dispatch(setUpsellCard(null));
  dispatch(setPopupList(null));
  dispatch(clearUserFeedbackList());
};
