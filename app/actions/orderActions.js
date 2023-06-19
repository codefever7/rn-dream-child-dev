import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Order Loader
 */
export const setOrderLoader = createAction(Actions.SET_ORDER_LOADER);
/**
 * @desc Set Order List
 */
export const setOrderList = createAction(Actions.SET_ORDER_LIST);
/**
 * @desc Set Order Detail
 */
export const setOrderDetail = createAction(Actions.SET_ORDER_DETAIL);

/**
 * @desc Set Payment Structure
 */
export const setPaymentStructure = createAction(Actions.SET_PAYMENT_STRUCTURE);

/**
 * @desc Set Address List
 */
export const setAddressList = createAction(Actions.SET_ADDRESS_LIST);

/**
 * @desc Set Address
 */
export const setAddressItem = createAction(Actions.SET_ADDRESS);

/**
 * @desc Update Address
 */
export const updateAddressItem = createAction(Actions.UPDATE_ADDRESS);

/**
 * @desc Clear Address
 */
export const clearAddressItem = createAction(Actions.CLEAR_ADDRESS);
/**
 * @desc set Order Summary
 */
export const setOrderSummary = createAction(Actions.SET_ORDER_SUMMARY);

/**
 * @desc set New Order
 */
export const setNewOrder = createAction(Actions.SET_NEW_ORDER);

/**
 * @desc set Product List
 */
export const setProductList = createAction(Actions.SET_PRODUCT_LIST);

/**
 * @desc Clear Order Data
 */
export const clearOrderData = () => (dispatch) => {
  dispatch(setOrderLoader(false));
  dispatch(setOrderList(null));
  dispatch(setOrderDetail(null));
  dispatch(setPaymentStructure(null));
  dispatch(clearAddressItem());
  dispatch(setAddressList(null));
};
