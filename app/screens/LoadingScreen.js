import TextView from '@app/components/TextView';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View, StatusBar, Image, Platform } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import screens from '../constants/screens';
import { colors } from '../styles';
import s from './styles';
import svgs from '../assets/svg';
import { getModel, getSystemVersion, getUniqueId } from 'react-native-device-info';
import { setupToken } from '@app/utils/authTokenHelpers';
import { useDispatch } from 'react-redux';
import { getAppVersion, getCountryList } from '@app/services/userService';
import { isAndroid, isIOS, RESPONSE_STATUS, WIN_WIDTH } from '@app/constants/constant';
import VersionNumber from 'react-native-version-number';
import { getAuthUser } from '@app/utils/localStorage';
import { isUnautorized } from '@app/helpers/helpers';
import { initAnalytics, trackActivity } from '@app/services/analyticsService';

let isNotification = false;
export const setIsNotification = (value) => {
  isNotification = value;
};

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const checkAppUpdate = useCallback(async () => {
    const AppVersion = VersionNumber.appVersion;
    const payload = {
      DeviceModel: getModel(),
      DeviceVersion: getSystemVersion(),
      AppVersion,
      DeviceType: Platform.OS,
    };
    const result = await dispatch(getAppVersion(payload));

    if (result) {
      setTimeout(async () => {
        if (Number(result?.AppDetail?.is_maintenance) === Number(RESPONSE_STATUS.SUCCESS)) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: screens.UnderMaintenance,
                },
              ],
            }),
          );
        }
      }, 2000);

      const androidIosAppVersion = isAndroid
        ? result.AppDetail?.android_app_version
        : result?.AppDetail?.ios_app_version;

      if (androidIosAppVersion !== AppVersion) {
        setTimeout(async () => {
          const compulsory_update = isAndroid
            ? result?.AppDetail?.is_android_app_compulsory_update
            : result?.AppDetail?.is_ios_app_compulsory_update;

          const forceUpdate = Number(compulsory_update) === Number(RESPONSE_STATUS.SUCCESS);

          if (forceUpdate) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: screens.NewUpdate,
                    params: { forceUpdate },
                  },
                ],
              }),
            );
          } else {
            navigation.navigate(screens.NewUpdate, { forceUpdate: forceUpdate });
          }
        }, 10000);
      }
    }
  }, [dispatch, navigation]);

  const loadData = useCallback(async () => {
    await initAnalytics();
    const token = await setupToken();
    const user = await getAuthUser();
    if (!token) {
      dispatch(getCountryList());
    }
    const deviceId = await asyncStorageHelpers.getDeviceId();
    if (!deviceId) {
      const id = getUniqueId();
      await asyncStorageHelpers.setDeviceId(id);
    }
    setTimeout(async () => {
      if (isUnautorized) return;
      const isUserLoggedInBefore = await asyncStorageHelpers.getIsLoggedInBefore();
      let params={ is_new_user : 'No' }
      if(!isUserLoggedInBefore){
        params.is_new_user = 'Yes'
      }
      trackActivity('view: splash',params);
      if (isNotification) {
        return;
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: token
                ? Number(user?.IsNew) === Number(RESPONSE_STATUS.SUCCESS)
                  ? screens.SelectLanguage
                  : screens.Welcome
                : isUserLoggedInBefore
                ? screens.AddNumber
                : screens.Welcome,
            },
          ],
        }),
      );
    }, 1000);
  }, [dispatch, navigation]);

  useEffect(() => {
    loadData();
    checkAppUpdate();
  }, [checkAppUpdate, loadData]);

  return (
    <>
      <View style={s.mainView}>
        <StatusBar
          backgroundColor={isIOS ? colors.transparent : colors.primary}
          barStyle={'dark-content'}
          translucent={true}
        />
        <View style={s.contentWrapper}>
          <View style={s.womanWrapper}>
            <Image style={s.gfxWoman} source={require('../assets/img/gfx-woman.png')} />
            <SvgIcon svgs={svgs} name='women-linear-gradient' width={WIN_WIDTH} height={WIN_WIDTH + 46} />
          </View>

          <View style={s.contentBlock}>
            <View style={s.brandWithTagline}>
              <View style={s.logoview}>
                <Image style={s.logodream} source={require('../assets/img/Logo.png')} />
              </View>
              <View>
                <TextView style={s.weltext} type={'body'} text='India’s Most trusted' />
                <TextView style={s.weltext} type={'body'} text='Online Garbhsanskar Community ' />
              </View>
            </View>

            <View style={s.madeContent}>
              <View style={s.lovedByWrap}>
                <TextView style={s.subtext} type={'head-line'} text='Loved by' />
                <TextView style={s.subnum} type={'head-line'} text='1,50,000+' />
                <TextView style={s.subtext} type={'head-line'} text='Mothers!' />
              </View>
              <View style={s.madeind}>
                <SvgIcon svgs={svgs} name={'india-icon'} width={22} height={22} style={s.indicon} />
                <TextView style={s.weltext} type={'body-head'} text='Made in India' />
              </View>
            </View>
          </View>
        </View>
        <Image style={s.purpleBg} source={require('../assets/img/purplebg.png')} />
      </View>
    </>
  );
};

export default LoadingScreen;
