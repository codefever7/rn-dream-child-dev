import { createReducer } from '@app/helpers/reduxHelpers';
import { combineReducers } from 'redux';
import * as Actions from '@app/actions/types';
import { createReducer as createReducerOrig, current } from '@reduxjs/toolkit';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_ORDER_LOADER,
});

const orderListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ORDER_LIST,
});

const orderDetailReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ORDER_DETAIL,
});

const paymentGatewayReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_PAYMENT_STRUCTURE,
});

const addressListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ADDRESS_LIST,
});

const initialAddressState = {
  BillingName: '',
  BillingMobileNo: '',
  BillingCountryId: undefined,
  BillingStateId: undefined,
  BillingPincode: '',
  BillingAddress: '',
  BillingHouse: '',
  BillingArea: '',
  BillingCityVillage: '',
};
const addAddressReducer = createReducerOrig(initialAddressState, (builder) => {
  builder
    .addCase(Actions.SET_ADDRESS, (state = initialAddressState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_ADDRESS, (state, action) => {
      let address = JSON.parse(JSON.stringify(current(state)));
      address[action.payload.propsName] = action.payload.value;
      return address;
    })
    .addCase(Actions.CLEAR_ADDRESS, () => {
      const initialAddress = JSON.parse(JSON.stringify(initialAddressState));
      return initialAddress;
    });
});

const setOrderSummaryReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ORDER_SUMMARY,
});

const newOrderReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_NEW_ORDER,
});

const productListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_PRODUCT_LIST,
});

const orderReducers = combineReducers({
  loading: loadingReducer,
  orders: orderListReducer,
  orderDetail: orderDetailReducer,
  payment: paymentGatewayReducer,
  addresses: addressListReducer,
  address: addAddressReducer,
  orderSummary: setOrderSummaryReducer,
  order: newOrderReducer,
  products: productListReducer,
});
export default orderReducers;
