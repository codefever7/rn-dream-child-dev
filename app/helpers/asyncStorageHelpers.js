import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import moment from 'moment';
const APP_AUTH_TOKEN = 'DCToken';
const APP_FCM_TOKEN = 'FCMToken';
const APP_LANGUAGE = 'DCLanguage';
const IS_LOGGEDIN_KEY = 'dreamChild_isLoggedInBefore';
const DEVICE_ID = 'deviceId';
const OPEN_APP_FIRST_TIME_TODAY = 'open_app_first_app_today';

class AsyncStorageHelpers {
  removeUserData = async () => {
    await AsyncStorage.removeItem(APP_AUTH_TOKEN);
  };

  removeAuthToken = async () => {
    await AsyncStorage.removeItem(APP_AUTH_TOKEN);
  };

  setAuthToken = async (token) => {
    await AsyncStorage.setItem(APP_AUTH_TOKEN, token);
  };

  getAuthToken = async () => {
    return AsyncStorage.getItem(APP_AUTH_TOKEN);
  };

  setLanguage = async (value) => {
    await AsyncStorage.setItem(APP_LANGUAGE, value);
  };

  getLanguage = async () => {
    return AsyncStorage.getItem(APP_LANGUAGE);
  };

  setFCMToken = async (token) => {
    await AsyncStorage.setItem(APP_FCM_TOKEN, token);
  };

  getFCMToken = async () => {
    return AsyncStorage.getItem(APP_FCM_TOKEN);
  };

  removeLanguage = async () => {
    await AsyncStorage.removeItem(APP_LANGUAGE);
  };

  setValue = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  getValue = async (key) => {
    const result = await AsyncStorage.getItem(key);
    if (result && !_.isNull(result)) {
      return JSON.parse(result);
    }
    return null;
  };

  saveIsLoggedInBefore = async (value) => {
    var jsonOfItem = await this.setValue(IS_LOGGEDIN_KEY, JSON.stringify(value));
    return jsonOfItem;
  };

  getIsLoggedInBefore = async () => {
    const value = await this.getValue(IS_LOGGEDIN_KEY);
    if (value) return value;
    return undefined;
  };

  setDeviceId = async (value) => {
    var jsonOfItem = await this.setValue(DEVICE_ID, JSON.stringify(value));
    return jsonOfItem;
  };

  getDeviceId = async () => {
    const value = await this.getValue(DEVICE_ID);
    if (value) return value;
    return undefined;
  };

  setIsAppOpenFirstTimeToday = async () => {
    const today = new Date();
    const jsonOfItem = await this.setValue(OPEN_APP_FIRST_TIME_TODAY, today);
    return jsonOfItem;
  };

  getIsAppOpenFirstTimeToday = async () => {
    const open_app_date = await this.getValue(OPEN_APP_FIRST_TIME_TODAY);
    if (open_app_date) {
      const date = moment(open_app_date);
      const current_date = moment(current_date);
      let diff = current_date.diff(date, 'days');
      if (diff > 0) {
        return true;
      } else if (diff === 0) {
        return false;
      }
    } else {
      return true;
    }
    return undefined;
  };

  removeDeviceId = async () => {
    await AsyncStorage.removeItem(DEVICE_ID);
  };
}

export default new AsyncStorageHelpers();
