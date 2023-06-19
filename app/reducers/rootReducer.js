import { combineReducers } from 'redux';
import appReducer from '@app/reducers/appReducer';
import authReducers from './authReducer';
import userReducers from './userReducer';
import planReducers from './planReducer';
import orderReducers from './orderReducer';
import notificationReducers from './notificationReducer';

export default combineReducers({
  app: appReducer,
  auth: authReducers,
  user: userReducers,
  plan: planReducers,
  order: orderReducers,
  notification: notificationReducers,
});
