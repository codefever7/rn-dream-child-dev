import * as Actions from '@app/actions/types';
import { createReducer } from '@app/helpers/reduxHelpers';
import { combineReducers } from 'redux';
import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_USER_LOADER,
});

const initialUserState = {
  LanguageId: '',
  UserName: '',
  Village: '',
  UserStatus: undefined,
  termsAndConditions: false,
  LMPDate: undefined,
  EDDDate: undefined,
  StateId: undefined,
  CountryId: undefined,
  UserEmail: '',
};
const createUserReducer = createReducerOrig(initialUserState, (builder) => {
  builder
    .addCase(Actions.SET_USER_INFO, (state = initialUserState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_USER_INFO, (state, action) => {
      let info = JSON.parse(JSON.stringify(current(state)));
      info[action.payload.propsName] = action.payload.value;
      return info;
    })
    .addCase(Actions.CLEAR_USER_INFO, () => {
      const initialUser = JSON.parse(JSON.stringify(initialUserState));
      return initialUser;
    });
});

const currentUserReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CURRENT_USER,
});

const languageListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_LANGUAGE_LIST,
});

const userStatusListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_USER_STATUS_LIST,
});

const userSocialListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_USER_SOCIAL_LIST,
});

const setAppDetailReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_APP_DETAIL,
});

const setContactTypeListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CONTACT_TYPE_LIST,
});

const setCountryListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_COUNTRY_LIST,
});

const setUpsellCardReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_UPSELL_CARD,
});

const setPopupListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_POPUP_LIST,
});

const setFaqReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_FAQ,
});

const initialUserFeedbackListState = {};
const userFeedbackListReducer = createReducerOrig(initialUserFeedbackListState, (builder) => {
  builder
    .addCase(Actions.SET_USER_FEEDBACK_LIST, (state = initialUserFeedbackListState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_USER_FEEDBACK_LIST_ITEM, (state, action) => {
      let initialState = JSON.parse(JSON.stringify(current(state)));
      const list = initialState?.FeedbackList || [];
      list?.push(action.payload.item);
      initialState.FeedbackList = list;
      return initialState;
    })
    .addCase(Actions.CLEAR_USER_FEEDBACK_LIST, () => {
      const initialUserFeedback = JSON.parse(JSON.stringify(initialUserFeedbackListState));
      return initialUserFeedback;
    });
});

const userReducers = combineReducers({
  loading: loadingReducer,
  currentUser: currentUserReducer,
  user: createUserReducer,
  languages: languageListReducer,
  statusList: userStatusListReducer,
  socialList: userSocialListReducer,
  appDetail: setAppDetailReducer,
  contactTypeList: setContactTypeListReducer,
  countries: setCountryListReducer,
  upsellCard: setUpsellCardReducer,
  popupList: setPopupListReducer,
  faq: setFaqReducer,
  userFeedbackList: userFeedbackListReducer,
});

export default userReducers;
