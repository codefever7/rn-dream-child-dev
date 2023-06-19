import * as Sentry from '@sentry/react-native';

export const setErrorLogUser = (user) => {
  try {
    if (!user || !user?.User_Detail?.user_mobile) return false;
    const userPayload = {
      id: user?.User_Detail?.UserId,
      username: user?.User_Detail?.user_mobile,
      name: user?.User_Detail?.user_name,
      last_name: user?.User_Detail?.user_lname,
    };
    if (user?.User_Detail?.email) userPayload.email = user?.User_Detail?.email;
    if (user?.User_Detail?.country_name) userPayload.country = user?.User_Detail?.country_name;
    if (user?.User_Detail?.timezone) userPayload.country = user?.User_Detail?.timezone;

    if (__DEV__) return;
    Sentry.setUser(userPayload);
    return true;
  } catch (e) {
    return false;
  }
};

export const captureException = (error) => {
  try {
    if (__DEV__) return;
    Sentry.captureException(error);
    return true;
  } catch (e) {
    return false;
  }
};

export const captureMessage = (message) => {
  try {
    if (__DEV__) return;
    Sentry.captureMessage(message);
    return true;
  } catch (e) {
    return false;
  }
};
