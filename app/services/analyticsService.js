import { AMPLITUDE_ANALYTICS_KEY } from '@app/constants/constant';
import amplitude from 'amplitude-js';
import VersionNumber from 'react-native-version-number';

const analytics = amplitude.getInstance();
analytics.init(AMPLITUDE_ANALYTICS_KEY);

/**
 * @desc init analytics
 */
export const initAnalytics = () => {
  try {
    if (__DEV__) {
      console.log('initAnalytics');
      return;
    }
    analytics.init(AMPLITUDE_ANALYTICS_KEY);
    analytics.setVersionName(VersionNumber.appVersion);
  } catch (e) {
    console.log(e);
  }
};

/**
 * @desc set userid and email for analytics
 */
export const setUser = (user) => {
  try {
    if (__DEV__) {
      console.log('setAnalyticUser', user?.User_Detail?.UserMobileNo);
      return;
    }
    if (user) {
      const UserMobileNo = user?.User_Detail?.UserMobileNo;
      analytics.setUserId(UserMobileNo);
    } else {
      clearUser();
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * @desc clear user information for analytics
 */
export const clearUser = () => {
  try {
    if (__DEV__) {
      console.log('clearUser');
      return;
    }
    analytics.setUserId(null);
  } catch (e) {
    console.log(e);
  }
};

/**
 * @desc track activity in analytics
 */
export const trackActivity = (name, params) => {
  try {
    if (__DEV__) {
      console.log('trackActivity', name, params);
      return;
    }
    analytics.logEvent(name, params);
  } catch (e) {
    console.log(e);
  }
};

/**
 * @desc set user identify
 */
export const setUserIdentify = (key, value) => {
  try {
    if (__DEV__) {
      console.log('setUserIdentify', key, value);
      return;
    }
    var identify = new amplitude.Identify().set(key, value);
    amplitude.getInstance().identify(identify);
  } catch (e) {
    console.log(e);
  }
};

/**
 * @desc unset user identify
 */
export const unsetUserIdentify = (key) => {
  try {
    if (__DEV__) {
      console.log('unsetUserIdentify', key);
      return;
    }
    var identify = new amplitude.Identify().unset(key);
    amplitude.identify(identify);
  } catch (e) {
    console.log(e);
  }
};
