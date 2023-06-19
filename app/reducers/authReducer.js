import * as Actions from '@app/actions/types';
import { createReducer } from '@app/helpers/reduxHelpers';
import { combineReducers } from 'redux';
import { createReducer as createReducerOrig } from '@reduxjs/toolkit';
import { getModel, getSystemVersion, getUniqueId } from 'react-native-device-info';
import VersionNumber from 'react-native-version-number';
import { Platform } from 'react-native';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_AUTH_LOADER,
});

const initialState = {
  UserMobileNo: '',
  DeviceModel: getModel(),
  DeviceVersion: getSystemVersion(),
  AppVersion: VersionNumber.appVersion,
  DeviceType: Platform.OS,
  FCMtoken: '',
  Country: {
    country_id: '101',
    country_phone_code: '91',
    country_code: 'IN',
    country_name: 'India',
    shortcode: 'IND',
  },
  DeviceId: getUniqueId(),
};
const loginUserReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.UPDATE_LOGIN_USER, (state, action) => {
      const info = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_LOGIN_USER, () => {
      const initialLogin = JSON.parse(JSON.stringify(initialState));
      return initialLogin;
    });
});

const authReducers = combineReducers({
  loading: loadingReducer,
  loginUser: loginUserReducer,
});

export default authReducers;
