import { View, Platform, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import AppStyles from '@app/styles/AppStyles';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import s from './styles';
import TextView from '@app/components/TextView';
import { TextInput } from 'react-native-paper';
import svgs from '../../../assets/svg';
import DatePicker from '@app/components/molecules/DatePicker';
import CheckBox from '@app/components/molecules/CheckBox';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { USER_STATUS, USER_STATUS_TYPE } from '@app/constants/constant';
import { CommonActions } from '@react-navigation/native';
import { getDateDifference, isStirng, toastNotification } from '@app/helpers/helpers';
import { getCountryList, getUserStatusList, updateUserProfile } from '@app/services/userService';
import { updateUserInfo } from '@app/actions/userActions';
import { getLoginData } from '@app/utils/localStorage';
import { appInit, translate } from '@app/helpers/appInitHelpers';
import { setUserIdentify, trackActivity } from '@app/services/analyticsService';
import ScrollableAvoidKeyboard from '@app/components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const BasicInformationScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { user, statusList, currentUser, loading } = userSelector;
  const [countryList, setCountryList] = useState([]);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    await dispatch(getUserStatusList());
    const countries = await dispatch(getCountryList());
    setCountryList(countries);
  }, [dispatch]);

  useEffect(() => {
    trackActivity('view: onboarding basic information');
    loadData();
  }, [loadData]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerIcons}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={navigation.goBack}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Basic Informations'} type={'body-two'} style={s.screenhead} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      if (propsName === 'UserStatus') {
        if (value !== USER_STATUS.PREGNANT) {
          dispatch(updateUserInfo({ propsName: 'EDDDate', value: undefined }));
          dispatch(updateUserInfo({ propsName: 'LMPDate', value: undefined }));
        }
      }
      dispatch(updateUserInfo({ propsName, value }));
    },
    [dispatch],
  );

  const onPressContinue = useCallback(async () => {
    let message;
    const loginData = await getLoginData();
    const country = countryList?.find((x) => x?.country_phone_code === loginData?.Country?.country_phone_code);
    if (!user?.UserName || user?.UserName?.trim() === '') {
      message = 'Name is required';
    } else if (user?.UserName && !isStirng(user?.UserName)) {
      message = 'Please enter only english alphabet';
    } else if (!user?.Village || user?.Village?.trim() === '') {
      message = 'City or village is required';
    } else if (user?.Village && !isStirng(user?.Village)) {
      message = 'Please enter only english alphabet';
    } else if (!user?.UserStatus) {
      message = 'Status is required';
    } else if (user?.UserStatus === USER_STATUS.PREGNANT) {
      if ((!user?.EDDDate || user?.EDDDate === '0000-00-00') && (!user?.LMPDate || user?.LMPDate === '0000-00-00')) {
        message = 'LMP date or EDD date is required';
      }
    }

    if (message) {
      toastNotification(message);
      return;
    }
    const id = currentUser?.User_Detail ? currentUser?.User_Detail?.user_id : currentUser?.user_id;
    const payload = {
      ...user,
      UserId: id,
      CountryId: country?.country_id,
    };

    setUserIdentify('First Name', user?.UserName);
    setUserIdentify('Status', USER_STATUS_TYPE[user?.UserStatus]);
    setUserIdentify('Plan', 'Basic');

    if (user?.UserStatus === USER_STATUS.PREGNANT) {
      setUserIdentify('LMP Date', user?.LMPDate);
    }

    const result = await dispatch(updateUserProfile(payload));
    if (result) {
      await dispatch(appInit());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screens.NavigationRoot }],
        }),
      );
    }
  }, [countryList, currentUser?.User_Detail, currentUser?.user_id, dispatch, navigation, user]);

  const getIconName = useCallback((id) => {
    switch (id) {
      case USER_STATUS.PLANNING:
        return 'couple-icon';
      case USER_STATUS.PREGNANT:
        return 'pregnancy-icon';
      case USER_STATUS.EXPLORE_APP:
        return 'phone-icon';
      default:
        break;
    }
  }, []);

  const onChangeLMPDate = useCallback(
    (date) => {
      const today = new Date();
      const days = getDateDifference(today, date);
      if (days < -28) {
        if (days > -280) {
          let newDate = new Date(date);
          newDate.setDate(newDate.getDate() + 280);
          onChangeUserInfo('EDDDate', newDate);
          onChangeUserInfo('LMPDate', date);
        } else {
          toastNotification('LMP should not be more than 280 day old');
        }
      } else {
        toastNotification('LMP date should be less then 28 days from today.');
      }
    },
    [onChangeUserInfo],
  );

  const onChangeEDDDate = useCallback(
    (date) => {
      const today = new Date();
      const days = getDateDifference(today, date);
      if (days > 0) {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 280);
        onChangeUserInfo('EDDDate', date);
        onChangeUserInfo('LMPDate', newDate);
      } else {
        toastNotification('EDD date should be greater then today.');
      }
    },
    [onChangeUserInfo],
  );

  return (
    <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={s.wrapper}>
      <View style={s.mainroot}>
        <View style={s.formGroup}>
          <View style={s.inputview}>
            <TextInput
              onChangeText={(name) => {
                onChangeUserInfo('UserName', name);
              }}
              disabled={loading}
              value={user?.UserName}
              dense={true}
              theme={{ roundness: 6 }}
              style={s.inputstyle}
              mode='outlined'
              label='Name'
              placeholder='Enter your Full Name'
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
            />
          </View>
        </View>

        <View style={s.formGroup}>
          <View style={s.inputview}>
            <TextInput
              disabled={loading}
              onChangeText={(city) => {
                onChangeUserInfo('Village', city);
              }}
              value={user?.Village}
              dense={true}
              theme={{ roundness: 6 }}
              style={s.inputstyle}
              mode='outlined'
              label='City/Village'
              placeholder='Enter your city or village'
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
            />
          </View>
          <View style={s.inputview}>
            <TextView text={'Status'} type={'body-head'} style={s.labelinput} />
            <View style={s.statusview}>
              {statusList?.map((item, index) => {
                const iconName = getIconName(item?.relation_type_id);
                return (
                  <TouchableOpacity
                    key={`status_${item?.relation_type_id}_index_${index}`}
                    style={user?.UserStatus === item?.relation_type_id ? s.focusstatus : s.notfocus}
                    onPress={() => {
                      onChangeUserInfo('UserStatus', item?.relation_type_id);
                    }}>
                    <SvgIcon svgs={svgs} name={iconName} width={32} height={32} />
                    <TextView text={item?.relation_type_name} type={'caption-two'} style={s.statustext} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {user?.UserStatus === USER_STATUS.PREGNANT && (
            <>
              <View style={s.inputview}>
                <DatePicker
                  labelText={'LMP (Last Menstrual Period)Date'}
                  value={user?.LMPDate ? new Date(user?.LMPDate) : undefined}
                  onChange={(date) => {
                    if (date) onChangeLMPDate(date);
                  }}
                />
                <TextView text={translate('lmp_date_input_text')} type={'caption-two'} style={s.lmptext} />
              </View>
              <View style={s.dividerview}>
                <View style={s.leftDivider}></View>
                <TextView text={'OR'} type={'caption'} style={s.ortext} />
                <View style={s.rightDivider}></View>
              </View>
              <View style={s.inputview}>
                <DatePicker
                  labelText={'EDD (Estimated Due Date)'}
                  value={user?.EDDDate ? new Date(user?.EDDDate) : undefined}
                  onChange={(date) => {
                    if (date) onChangeEDDDate(date);
                  }}
                />
                <TextView text={translate('edd_date_input_text')} type={'caption-two'} style={s.lmptext} />
              </View>
              <View style={s.extraMargin}></View>
            </>
          )}
        </View>

        <View style={s.checkview}>
          <View style={s.checkbox}>
            <CheckBox
              onClick={() => onChangeUserInfo('termsAndConditions', !user?.termsAndConditions)}
              isChecked={user?.termsAndConditions}
            />
          </View>
          <View style={s.textview}>
            <TextView text={'I agree to Dream Child Life Science LLP'} type={'caption-two'} style={s.agreetext} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.TermsCondition);
              }}>
              <TextView text={'Terms & Conditions'} type={'caption-two'} style={s.termtext} />
            </TouchableOpacity>
            <TextView text={' and '} type={'caption-two'} style={s.agreetext} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.PrivacyPolicy);
              }}>
              <TextView text={'Privacy Policy'} type={'caption-two'} style={s.termtext} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={AppStyles.footerWrapper}>
        <Button
          style={s.btn}
          onPress={() => onPressContinue()}
          isLoading={loading}
          disabled={!user?.termsAndConditions}>
          <TextView style={s.btntext} type={'body-head'} text='Continue' />
          <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
        </Button>
      </View>
    </ScrollableAvoidKeyboard>
  );
};

export default BasicInformationScreen;
