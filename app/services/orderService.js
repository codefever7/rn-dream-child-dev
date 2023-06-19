import {
  setAddressList,
  setNewOrder,
  setOrderDetail,
  setOrderList,
  setOrderLoader,
  setOrderSummary,
  setPaymentStructure,
  setProductList,
} from '@app/actions/orderActions';
import { RESPONSE_STATUS } from '@app/constants/constant';
import { API_BASE_URL } from '@app/constants/environmentConstants';
import { getAPIErrorReason, toastNotification, validateUnautorizedRequestError } from '@app/helpers/helpers';
import axios from 'axios';
import { setUserIdentify, trackActivity } from './analyticsService';
import { captureException } from './errorLogService';
import { getUserProfileDetail } from './userService';

/**
 * @desc Order - Get Order List
 * @param {*} payload
 */
export const getOrderList = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/OrderList`, payload);
    const { data, message, status } = response?.data;
    if (response.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setOrderList(data));
      return true;
    } else toastNotification(message);
  } catch (e) {
    console.log('getOrderList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Get Order Detail
 * @param {*} payload
 */
export const getOrderDetail = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/SingleOrderDetail`, payload);
    const { data, message, status } = response?.data;
    if (response.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setOrderDetail(data));
      return response?.data;
    } else toastNotification(message);
  } catch (e) {
    console.log('getOrderDetail', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Payment - Payment Gate way
 * @param {*} payload
 */
export const paymentGateway = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/PaymentGateway`, payload);
    const { data } = response;
    if (response.data) {
      dispatch(setPaymentStructure(data));
      return true;
    }
  } catch (e) {
    console.log('paymentGateway', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Get Address List
 * @param {*} payload
 */
export const getAddressList = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddressList`, payload);
    const { data, status } = response?.data;
    const { AddressList } = data;
    if (data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setAddressList(AddressList));
      return AddressList;
    } else {
      return false;
    }
  } catch (e) {
    console.log('getAddressList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Change Address
 * @param {*} payload
 */
export const changeAddress = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ChangeAddress`, payload);
    const { message, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      return true;
    } else toastNotification(message);
  } catch (e) {
    console.log('changeAddress', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Add Address
 * @param {*} payload
 */
export const addAddress = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddAddress`, payload);
    const { message, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      return true;
    } else toastNotification(message);
  } catch (e) {
    console.log('addAddress', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Add Address
 * @param {*} payload
 */
export const updateAddress = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/UpdateAddress`, payload);
    const { message, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      return true;
    } else toastNotification(message);
  } catch (e) {
    console.log('updateAddress', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Get View Cart
 * @param {*} payload
 */
export const getViewCart = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ViewCart`, payload);
    const { data, message, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      return data;
    } else {
      toastNotification(message);
    }
  } catch (e) {
    console.log('getViewCart', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Get Order Summary
 * @param {*} payload
 */
export const getOrderSummary = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/OrderSummary`, payload);
    const { data, message, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      const newPayload = {
        ...data,
        user_cart_log_id: response?.data?.user_cart_log_id,
      };
      dispatch(setOrderSummary(newPayload));
      return true;
    } else toastNotification(message);
  } catch (e) {
    console.log('getOrderSummary', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Apply Promo Code
 * @param {*} payload
 */
export const applyPromoCode = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ApplyPromoCode`, payload);
    const { data, message, status } = response?.data;
    toastNotification(message);
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setOrderSummary(data));
      return true;
    }
  } catch (e) {
    console.log('applyPromoCode', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Add Order
 * @param {*} payload
 */
export const addOrder = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddOrder`, payload);
    const { data, message, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setNewOrder(data));
      return true;
    } else toastNotification(message);
  } catch (e) {
    console.log('AddOrder', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Get Product List
 * @param {*}
 */
export const getProductList = () => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ProductList`);
    const { data, status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      dispatch(setProductList(data));
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
    return true;
  } catch (e) {
    console.log('ProductList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Add Seven Day Demo
 * @param {*}
 */
export const addSevenDayDemo = (payload) => async (dispatch) => {
  try {
    dispatch(setOrderLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddDemo`, payload);
    const { status } = response?.data;
    if (response?.data) dispatch(setOrderLoader(false));
    if (Number(status) === Number(RESPONSE_STATUS.SUCCESS)) {
      await dispatch(getUserProfileDetail());
      toastNotification(response.data?.message);
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('addSevenDayDemo', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};

/**
 * @desc Order - Start Trial
 * @param {*}
 */
export const startTrial = (type) => async (dispatch, getState) => {
  try {
    dispatch(setOrderLoader(true));
    const state = getState();
    const currentUser = state.user?.currentUser;
    const plan = state.plan?.plan;
    const planItem = plan?.PlanList?.find((x) => x?.marketing_plan_name === type);
    if (planItem) {
      const payload = {
        PlanId: planItem?.plan_id,
      };
      const result = await dispatch(addSevenDayDemo(payload));
      if (result) {
        trackActivity('demo activated', { type: planItem?.plan_name });
        setUserIdentify('Demo', planItem?.plan_name);
        const item = {
          PlanId: planItem?.plan_id,
          LanguageId: currentUser?.User_Detail?.LanguageId,
          name: planItem?.plan_name,
        };
        dispatch(setOrderLoader(false));
        return { item, plan: planItem };
      }
    }
  } catch (e) {
    console.log('startTrial', e);
    return false;
  } finally {
    dispatch(setOrderLoader(false));
  }
};
