import axios from 'axios';
import jwt_decode from 'jwt-decode';
import localStorage, { saveAuthUser, getAuthUser } from './localStorage';
import moment from 'moment';

export const setupToken = async () => {
  const authData = await getAuthUser();
  if (authData) {
    const decoded = jwt_decode(authData?.access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      setAuthToken(authData?.access_token);
      return authData?.access_token;
    }
  }
  return false; // if no token or expired token, return false
};

export const saveToken = async (data) => {
  setAuthToken(data?.access_token);
  await saveAuthUser(data);
};

export const saveUser = (user) => {
  setAuthToken(user?.access_token);
  localStorage.setCurrentUser(user);
};

export const clearToken = () => {
  clearAuthToken();
};

export const clearLocalData = async () => {
  await localStorage.deleteAllLocalData();
};

// header methods
export const setAuthToken = (access_token) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
  } catch (e) {
    console.log('Error while settup token', e);
  }
};

const clearAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const handleAxiosRequestHeaders = () => {
  axios.interceptors.request.use(
    async (config) => {
      try {
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        config.headers['Current_Date'] = date;
      } catch (e) {
        console.log('ERROR at axios.interceptors.request', e);
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
};
