import { clearAuthData, setAuthLoader } from '@app/actions/authActions';
import { clearNotificationData } from '@app/actions/notificationActions';
import { clearOrderData } from '@app/actions/orderActions';
import { clearPlanData } from '@app/actions/planActions';
import { clearUserData, setCurrentUser } from '@app/actions/userActions';
import { RESPONSE_STATUS } from '@app/constants/constant';
import { API_BASE_URL } from '@app/constants/environmentConstants';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import { clearIsAutorizedUser, getAPIErrorReason, toastNotification } from '@app/helpers/helpers';
import { clearLocalData, clearToken, saveToken } from '@app/utils/authTokenHelpers';
import axios from 'axios';
import deviceInfoModule from 'react-native-device-info';
import { setUser, setUserIdentify, trackActivity, unsetUserIdentify } from './analyticsService';
import { captureException } from './errorLogService';

/**
 * @desc Login - Get User Token
 * @param {*} payload
 */
export const login =
  (payload, isLoginWithPassword = false) =>
  async (dispatch) => {
    try {
      let IpAddress;
      const FCMtoken = await asyncStorageHelpers.getFCMToken();
      await deviceInfoModule.getIpAddress().then((ip) => {
        IpAddress = ip;
      });
      payload = {
        ...payload,
        IpAddress,
        FCMtoken,
      };
      setUserIdentify('Phone', `+${payload?.CountryCode} ${payload?.UserMobileNo}`);
      dispatch(setAuthLoader(true));

      const Api_Url = isLoginWithPassword ? `${API_BASE_URL}/UserLogin` : `${API_BASE_URL}/UserLoginFirebase`;

      const response = await axios.post(`${Api_Url}`, payload);
      const { data } = response;
      if (data) dispatch(setAuthLoader(false));
      if (data?.status === RESPONSE_STATUS.SUCCESS) {
        let details = data?.UserDetail;
        if (data?.User_Detail) {
          details = data?.User_Detail;
        }
        const item = {
          ...data,
          User_Detail: {
            ...details,
            UserId: details?.user_id,
            UserImage: details?.user_image,
            UserName: details?.user_name,
            UserMobileNo: details?.user_mobile,
            LanguageId: details?.language_id,
          },
        };
        setUser(item);
        trackActivity('login: user login', { UserMobileNumber: item?.User_Detail?.UserMobileNo });
        await dispatch(setCurrentUser(item));
        clearIsAutorizedUser();
        setLoginDetails(item);
        return item;
      } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
        toastNotification(response.data?.message);
      }
    } catch (e) {
      console.log('e', e);
      captureException(e);
      toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    } finally {
      dispatch(setAuthLoader(false));
    }
  };

/**
 * @desc Login - Get User Token
 * @param {*} obj Data Obj
 */
export const forgotPassword = async (obj) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, obj);
    const { data } = response;
    return data;
  } catch (e) {
    captureException(e);
    console.log('e', getAPIErrorReason(e));
    throw getAPIErrorReason(e) || 'Unable to Login, please try again later';
  }
};

/**
 * @desc set login token and set user
 */
export const setLoginDetails = async (data) => {
  // save auth deteils and set token in header for request
  await saveToken(data);
};

/**
 * @desc Log user out
 */
export const logout = () => async (dispatch) => {
  try {
    dispatch(setAuthLoader(true));
    //Clear Redux Data
    dispatch(clearAuthData());
    dispatch(clearUserData());
    dispatch(clearPlanData());
    dispatch(clearNotificationData());
    dispatch(clearOrderData());

    //unset amplitude user identify
    unsetUserIdentify('Phone');
    unsetUserIdentify('Plan');
    unsetUserIdentify('LMP Date');
    unsetUserIdentify('Status');
    unsetUserIdentify('First Name');
    unsetUserIdentify('Last Name');
    unsetUserIdentify('Demo');

    //Clear Local Data
    await clearLocalData();

    const response = await axios.post(`${API_BASE_URL}/Logout`);
    const { data } = response;
    if (data) dispatch(setAuthLoader(false));
    if (Number(data.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      //clear access token
      clearToken();
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('logout', JSON.parse(JSON.stringify(e)));
    captureException(e);
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setAuthLoader(false));
  }
};
