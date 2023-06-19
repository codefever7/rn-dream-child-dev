import {
  setAppDetail,
  setContactTypeList,
  setCountryList,
  setCurrentUser,
  setFaq,
  setLanguageList,
  setPopupList,
  setUpsellCard,
  setUserFeedbackList,
  setUserLoader,
  setUserSocialList,
  setUserStatusList,
} from '@app/actions/userActions';
import { DEMO_PLAN_STATUS, RESPONSE_STATUS, USER_STATUS, USER_STATUS_TYPE } from '@app/constants/constant';
import { API_BASE_URL } from '@app/constants/environmentConstants';
import { getAPIErrorReason, isEmpty, toastNotification, validateUnautorizedRequestError } from '@app/helpers/helpers';
import { saveAuthUser, getAuthUser } from '@app/utils/localStorage';
import axios from 'axios';
import { setUserIdentify, unsetUserIdentify } from './analyticsService';
import { captureException } from './errorLogService';

/**
 * @desc User - Get User Profile Detail
 * @param {*} payload
 */
export const getUserProfileDetail = () => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UserProfileDetail`);
    const { data } = response.data;
    if (data) dispatch(setUserLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      const item = {
        ...data,
        User_Detail: {
          ...data.User_Detail,
          UserId: data?.User_Detail?.user_id,
          CountryId: data?.User_Detail?.country_id,
          StateId: data?.User_Detail?.state_id,
          UserName: data?.User_Detail?.user_name,
          UserLastName: data?.User_Detail?.user_lname,
          UserMiddleName: data?.User_Detail?.user_mname,
          UserEmail: data?.User_Detail?.user_email,
          Village: data?.User_Detail?.village,
          UserImage: data?.User_Detail?.user_image,
          LanguageId: data?.User_Detail?.language_id,
          LMPDate: data?.User_Detail?.user_lmp_date === '' ? '0000-00-00' : data?.User_Detail?.user_lmp_date,
          EDDDate: data?.User_Detail?.user_edd_date === '' ? '0000-00-00' : data?.User_Detail?.user_edd_date,
          UserStatus: data?.User_Detail?.user_status,
          UserMobileNo: data?.User_Detail?.user_mobile,
          UserHusbandMobile:
            data?.User_Detail?.user_husband_mobile !== '0' ? data?.User_Detail?.user_husband_mobile : '',
          UserWhatsapp: data?.User_Detail?.user_whatsapp !== '0' ? data?.User_Detail?.user_whatsapp : '',
        },
      };
      setUserIdentify('First Name', item?.User_Detail?.UserName);
      setUserIdentify('Last Name', item?.User_Detail?.UserLastName);
      setUserIdentify('Status', USER_STATUS_TYPE[item?.User_Detail?.UserStatus]);
      if (item?.User_Detail?.UserStatus === USER_STATUS.PREGNANT) {
        setUserIdentify('LMP Date', item?.User_Detail?.LMPDate);
      }
      if (!isEmpty(item?.plan_demo_master)) {
        const list = [];
        item?.plan_demo_master?.map((i) => {
          if (Number(i?.user_plan_status_demo) === DEMO_PLAN_STATUS.ACTIVE) {
            list?.push(i?.plan_name);
          }
        });
        if (!isEmpty(list)) {
          const type = list?.join(',');
          setUserIdentify('Demo', type);
        } else {
          unsetUserIdentify('Demo');
        }
      }
      dispatch(setCurrentUser(item));
      const auth_user = await getAuthUser();
      if (auth_user) {
        auth_user.IsNew = item?.IsNew;
        auth_user.User_Detail = item?.User_Detail;
        await saveAuthUser(auth_user);
      }
      return item;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getUserProfileDetail', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc Language - Get Language List
 * @param {*} payload
 */
export const getLanguageList = (payload) => async (dispatch, getState) => {
  try {
    const languages = getState().user?.languages;
    if (languages?.length > 0) return true;

    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/LanguageList`, payload);
    const { data } = response.data;
    if (data) dispatch(setUserLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setLanguageList(data?.LanguageList));
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getLanguageList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc Status - Get User Status List
 * @param {*} payload
 */
export const getUserStatusList = () => async (dispatch, getState) => {
  try {
    const statusList = getState().user?.statusList;
    if (statusList?.length > 0) return true;

    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UserStatusList`);
    const { data } = response.data;
    if (data) dispatch(setUserLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setUserStatusList(data?.status_list));
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getUserStatusList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User Profile - Update User Profile
 * @param {*} payload
 */
export const updateUserProfile = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UserProfileUpdate`, payload);
    const { data } = response;
    if (data) dispatch(setUserLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      await dispatch(getUserProfileDetail());
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR updateUserProfile', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User Profile - get Country List
 * @param {*}
 */
export const getCountryList = () => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/CountryList`);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (response?.data?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setCountryList(data?.CountryList));
      return data?.CountryList;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getCountryList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User Profile - get State List
 * @param {*}
 */
export const getStateList = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/StateList`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (response?.data?.status === RESPONSE_STATUS.SUCCESS) {
      return data?.StateList;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getStateList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User Profile - Get City List
 * @param {*}
 */
export const getCityList = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/CityList`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (response?.data?.status === RESPONSE_STATUS.SUCCESS) {
      return data?.CityList;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getCityList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - Get Social List
 * @param {*}
 */
export const getSocialList = () => async (dispatch, getState) => {
  try {
    const socialList = getState().user?.socialList;
    if (socialList?.length > 0) return true;

    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/SocialList`);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (response?.data?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setUserSocialList(data?.SocialList));
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('ERROR getSocialList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get App Version
 * @param {*} payload
 */
export const getAppVersion = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/MainScreen`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setAppDetail(data));
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR getAppVersion', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get Contact Type List
 * @param {*} payload
 */
export const getContactTypeList = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ContactTypeList`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setContactTypeList(data));
    } else if (Number(response.data?.status) === Number(RESPONSE_STATUS.FAIL)) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR getContactTypeList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - Add Contact Inquiry
 * @param {*} payload
 */
export const addContactInquiry = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddContactInquiry`, payload);
    const { data } = response;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.FAIL)) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR AddContactInquiry', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get Upsell Card
 * @param {*} payload
 */
export const getUpsellCard = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UpsellCard`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setUpsellCard(data));
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR getUpsellCard', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get Popup List
 * @param {*} payload
 */
export const getPopupList = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/PopupList`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setPopupList(data));
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR getPopupList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get App Version
 * @param {*} payload
 */
export const getFaq = () => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/Faq`);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setFaq(data));
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR getFaq', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - get User Feedback List
 * @param {*} payload
 */
export const getUserFeedbackList = () => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UserFeedbackList`);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setUserFeedbackList(data));
    }
    //  else if (response.data?.status === RESPONSE_STATUS.FAIL) {
    //   toastNotification(response.data?.message);
    // }
    return data;
  } catch (e) {
    console.log('ERROR getUserFeedbackList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};

/**
 * @desc User - add User Feedback
 * @param {*} payload
 */
export const addUserFeedback = (payload) => async (dispatch) => {
  try {
    dispatch(setUserLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddUserFeedback`, payload);
    const { data } = response.data;
    if (response?.data) dispatch(setUserLoader(false));
    if (Number(response.data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
      getUserFeedbackList();
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
    return data;
  } catch (e) {
    console.log('ERROR addUserFeedback', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setUserLoader(false));
  }
};
