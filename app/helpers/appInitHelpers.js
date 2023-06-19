import * as Sentry from '@sentry/react-native';
import _ from 'lodash';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { APP_ENV, SENTRY_DSN } from '@app/constants/environmentConstants';
import analyticsHelpers from '@app/helpers/analyticsHelpers';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import { getContactTypeList, getPopupList, getUpsellCard, getUserProfileDetail } from '@app/services/userService';
import { getAuthUser } from '@app/utils/localStorage';
import { captureException, setErrorLogUser } from '@app/services/errorLogService';
import { handleAxiosRequestHeaders, setupToken } from '@app/utils/authTokenHelpers';
import { setUser } from '@app/services/analyticsService';

export const appInit = () => async (dispatch) => {
  try {
    if (APP_ENV === 'development') {
      console.log('development');
    }
    handleAxiosRequestHeaders();
    //set language
    const authUser = await getAuthUser();
    const languageId = authUser?.User_Detail?.LanguageId;
    let languageCode = 'gu';
    if (languageId) {
      if (Number(languageId) === 1) languageCode = 'gu';
      else if (Number(languageId) === 2) languageCode = 'hi';
    }
    await setI18nConfig(languageCode);

    const token = await setupToken();
    if (!token) return;

    dispatch(getPopupList());
    dispatch(getUpsellCard());
    const result = await dispatch(getUserProfileDetail());
    if (result) setUser(result);
    dispatch(getContactTypeList());
    analyticsHelpers.useNativeConfiguration();

    const user = await getAuthUser();

    if (!__DEV__) {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: APP_ENV,
      });
      setErrorLogUser(user);
    }
  } catch (error) {
    console.log('error', error);
    captureException(error);
  }
};

const translationGetters = {
  en: () => require('@app/locales/en.json'),
  hi: () => require('@app/locales/hi.json'),
  gu: () => require('@app/locales/gu.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = async (language) => {
  if (!language || _.isNull(language)) language = 'gu';
  translate.cache.clear();
  i18n.translations = { [language]: translationGetters[language]() };
  i18n.locale = language;
};

export const onSelectLanguage = async (languageId) => {
  try {
    let languageCode = languageId === 2 || languageId === 'hi' ? 'hi' : 'gu';
    await asyncStorageHelpers.setLanguage(languageCode);
    analyticsHelpers.track('language: select', { language: languageCode });
    await setI18nConfig(languageCode);
  } catch (error) {
    console.log('error', error);
  }
};
