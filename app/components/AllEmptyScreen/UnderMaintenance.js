import { View, Image, Platform, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import AppStyles from '@app/styles/AppStyles';
import TextView from '../TextView';
import s from './styles';
import VersionNumber from 'react-native-version-number';
import { getModel, getSystemVersion } from 'react-native-device-info';
import { getAppVersion } from '@app/services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { RESPONSE_STATUS } from '@app/constants/constant';
import { CommonActions } from '@react-navigation/native';
import screens from '@app/constants/screens';
import { setupToken } from '@app/utils/authTokenHelpers';
import { getAuthUser } from '@app/utils/localStorage';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import Loading from '../Loading';

const UnderMaintenance = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { loading } = userSelector;
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    const AppVersion = VersionNumber.appVersion;
    const payload = {
      DeviceModel: getModel(),
      DeviceVersion: getSystemVersion(),
      AppVersion,
      DeviceType: Platform.OS,
    };
    const result = await dispatch(getAppVersion(payload));
    if (Number(result?.AppDetail?.is_maintenance) === Number(RESPONSE_STATUS.FAIL)) {
      const token = await setupToken();
      const user = await getAuthUser();
      const isUserLoggedInBefore = await asyncStorageHelpers.getIsLoggedInBefore();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: token
                ? Number(user?.IsNew) === Number(RESPONSE_STATUS.SUCCESS)
                  ? screens.SelectLanguage
                  : screens.NavigationRoot
                : isUserLoggedInBefore
                ? screens.AddNumber
                : screens.Welcome,
            },
          ],
        }),
      );
    }
  }, [dispatch, navigation]);

  return loading ? (
    <Loading />
  ) : (
    <View style={AppStyles.root}>
      <View style={s.EmptyWrap}>
        <Image style={s.EmptyImg} source={require('../../assets/img/undermaintence.png')} resizeMode='contain' />
        <View style={s.doneView}>
          <TextView text={'Under Maintenance'} type={'body-two'} style={s.doneText} />
          <TextView text={'Our app is in under maintenance'} type={'body-one'} style={s.textcaption} />
        </View>
      </View>
      <TouchableOpacity style={s.btnview} onPress={loadData}>
        <View style={s.btn}>
          <TextView style={s.btntext} type={'body'} text='Refresh' />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UnderMaintenance;
