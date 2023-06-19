import { setNotificationList, setNotificationLoader } from '@app/actions/notificationActions';
import { RESPONSE_STATUS } from '@app/constants/constant';
import { API_BASE_URL } from '@app/constants/environmentConstants';
import { getAPIErrorReason, toastNotification, validateUnautorizedRequestError } from '@app/helpers/helpers';
import axios from 'axios';
import { captureException } from './errorLogService';

/**
 * @desc Notification - Get Notification List
 * @param {*} payload
 */
export const getNotificationList = () => async (dispatch) => {
  try {
    dispatch(setNotificationLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UserNotificationList`);
    const { data } = response.data;
    if (response?.data) dispatch(setNotificationLoader(false));
    if (Number(response?.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      const list = data?.NotificationList?.filter((x) => x?.redirect_screen_id === '6');
      const newData = [];
      if (list && list.length !== 0) {
        const lastItem = list[0];
        const index = data?.NotificationList?.findIndex(
          (x) => x.user_notification_id === lastItem?.user_notification_id,
        );
        data?.NotificationList?.map((item) => {
          if (item?.redirect_screen_id !== '6') {
            newData.push(item);
          }
        });
        newData.splice(index, 0, lastItem);
        data.NotificationList = newData;
      }
      dispatch(setNotificationList(data));
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('getNotificationList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setNotificationLoader(false));
  }
};

/**
 * @desc Notification - Change Notification Status
 * @param {*} payload
 */
export const changeNotificationStatus = (payload) => async (dispatch) => {
  try {
    dispatch(setNotificationLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ChangeNotificationStatus`, payload);
    if (response?.data) dispatch(setNotificationLoader(false));
    if (Number(response?.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ChangeNotificationStatus', e);
    captureException(e);
    dispatch(setNotificationLoader(false));
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setNotificationLoader(false));
  }
};
