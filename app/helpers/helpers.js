import moment from 'moment';
import { Buffer } from 'buffer';
// eslint-disable-next-line react-native/split-platform-components
import { Platform, ToastAndroid } from 'react-native';
import asyncStorageHelpers from './asyncStorageHelpers';
import RNFetchBlob from 'react-native-blob-util';
import screens from '@app/constants/screens';
/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isStirng(value) {
  var myRegEx = /^[a-zA-Z\s]*$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isAlphaNumeric(value) {
  var myRegEx = /^[ A-Za-z0-9_@.,/#&+-]*$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

//Get file Name
export const getFileName = (path) => {
  let split = path.split('/');
  if (split && split.length > 0) {
    return split[split.length - 1];
  }
  return;
};

let timeout;
/**
 * @desc for toast notification
 * @param {*} message // Accepts string
 */
export function toastNotification(message, isShowInIOS = true) {
  if (Platform.OS == 'ios') {
    if (isShowInIOS) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        alert(message);
      }, 300);
    }
  } else {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
}

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isEmail(value) {
  var myRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc: Check valid date
 */
export function isValidDate(d) {
  return d instanceof Date;
}

export function getDate(date) {
  if (!date) date = new Date();
  else date = new Date(date);

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function formatCurrency(num) {
  try {
    if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } catch (e) {
    console.log('Error', e);
  }
  return num;
}

export function currencyWithDecimal(num) {
  try {
    if (num) return Number(num).toFixed(2);
    else return Number(0).toFixed(2);
  } catch (e) {
    console.log('Error', e);
  }
  return;
}

export function toTitleCase(str) {
  if (!str) return str;

  str = str.trim();
  if (str.length == 0) return str;

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function toSentenseCase(str) {
  if (!str) return str;

  str = str.trim();
  if (str.length == 0) return str;

  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

export const getAPIResponseError = (e) => {
  if (e) {
    if (e.response && e.response.data) {
      if (e.response.data.message) {
        return e.response.data.message;
      }
    }
  }
  return;
};

export const getGraphQlErrorMessage = (error) => {
  if (error?.networkError?.result?.errors?.length > 0) {
    return error?.networkError?.result?.errors[0]?.message;
  }
  return;
};

export const displayRelativeDate = (date) => {
  if (!date) {
    return '';
  }
  let diff = moment().diff(date, 'days');
  if (diff === 0) {
    return 'Today';
  } else if (diff === 1) {
    return 'Yesterday';
  } else if (diff === -1) {
    return 'Tomorrow';
  } else {
    return moment(date).fromNow();
  }
};
export const getCount = (list) => {
  if (list) {
    let filteredlist = list.filter((x) => x.type == 1 || x.type == 2);
    if (filteredlist) return filteredlist.length;
  }
  return 0;
};

export const getGreetingsText = () => {
  let date = new Date();
  let hours = date.getHours();
  // let minutes = date.getMinutes();
  if (hours < 12) return 'Good Morning,';
  else if (hours == 12) return 'Good Noon,';
  else if (hours > 12 && hours < 18) return 'Good Afternoon,';
  else if (hours >= 18) return 'Good Evening,';
  return 'Hello';
};

export function getAPIErrorReason(e) {
  if (e) {
    if (e.response && e.response.data) return e.response.data.reason || e.response.data.message;
    else if (e.message) return e.message;
  }
  return;
}

export function dateTime(dateTime) {
  let date = getDate(dateTime);
  let now = getDate();

  if (date < now) return moment(dateTime).format('ddd MMM yyyy');
  else return moment(dateTime).format('h:mm a');
}

export const getLocalDeviceId = async () => {
  try {
    const deviceId = await asyncStorageHelpers.getDeviceId();
    return JSON.parse(deviceId);
  } catch (e) {
    console.log('e', e);
  }
};

export const getParameters = (urlString) => {
  if (!urlString) return;
  let paramString = urlString?.split('?')[1];
  let params_arr = paramString?.split('&');
  let params = {};
  for (let i = 0; i < params_arr?.length; i++) {
    let pair = params_arr[i].split('=');
    params = {
      ...params,
      [pair[0]]: pair[1],
    };
  }
  return params;
};

export const getDateDifference = (startDate, endDate) => {
  try {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays) return diffDays;
  } catch (error) {
    console.log('getDateDifference error', error);
  }
};

export const getFormattedAddress = (item) => {
  if (isEmpty(item)) return '';
  let formattedAdd = '';
  let address = [];
  if (!isEmpty(item?.billing_house)) {
    address.push(item?.billing_house);
  }
  if (!isEmpty(item?.billing_area)) {
    address.push(item?.billing_area);
  }
  if (!isEmpty(item?.billing_address)) {
    address.push(item?.billing_address);
  }
  if (!isEmpty(item?.billing_city_village)) {
    address.push(item?.billing_city_village);
  }
  if (!isEmpty(item?.billing_state_name)) {
    address.push(item?.billing_state_name);
  }
  if (!isEmpty(item.shipping_country_name)) {
    address.push(item.shipping_country_name);
  }
  if (!isEmpty(item.billing_pincode)) {
    address.push(item.billing_pincode);
  }
  formattedAdd = address.join(', ');
  return formattedAdd;
};

export function fromBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

export const downloadFile = async (url) => {
  try {
    toastNotification('download started please wait...');
    // Image URL which we want to download
    let fileURL = url;
    // Getting the extention of the file
    let fileName = url?.substring(url?.lastIndexOf('/') + 1);
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    const download = fs.dirs.DownloadDir.toString();
    let downloadPath = download.replace('Android/data/com.weapplinse.dreamchild/files/Download', 'Download');
    RNFetchBlob.fs
      .exists(downloadPath)
      .then((exist) => {
        console.log(exist);
        if (!exist) {
          downloadPath = fs.dirs.DownloadDir;
        }
      })
      .catch(() => {});
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: `${downloadPath}/${fileName}`,
      },
    };
    config(options)
      .fetch('GET', fileURL)
      .then((res) => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        toastNotification('File Downloaded Successfully.');
      });
  } catch (error) {
    console.log('error', error);
  }
};

export let isUnautorized = false;

export const clearIsAutorizedUser = () => {
  isUnautorized = false;
};

export const validateUnautorizedRequestError = (e) => async (dispatch) => {
  if (!e || isUnautorized) return;
  const error = JSON.parse(JSON.stringify(e));
  if (error?.status === 401) {
    isUnautorized = true;
    const { navigationReset } = require('../navigation/navigators/AppNavigator');
    const { logout } = require('../services/authService');
    await dispatch(logout());
    navigationReset(screens.AddNumber);
  }
};

export const validFirebaseErrorMessage = (e) => {
  if (!e) return;
  const code = JSON.parse(JSON.stringify(e.code));
  let message = '';
  switch (code) {
    case 'auth/invalid-phone-number':
      message = 'Please enter a valid number';
      break;
    case 'auth/invalid-verification-code':
      message = 'Invalid verification code';
      break;
    case 'auth/too-many-requests':
      message = 'You have attempt too many rerequests. Please try again later.';
      break;
    default:
      message = JSON.stringify(e.message);
      break;
  }
  toastNotification(message);
};

export const displayNotificationRelativeDate = (date) => {
  if (!date) {
    return '';
  }
  let diff = moment().diff(date, 'days');
  if (diff === 0) {
    return moment(date).format('hh:mm');
  }
  //  else if (diff === 1) {
  // return 'Yesterday';
  // }
  else {
    return moment(date).format('DD MMM');
  }
};

/**
 * @desc it return unique GUID string
 */
export const getUniqueId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
};
