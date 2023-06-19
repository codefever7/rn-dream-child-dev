import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Linking } from 'react-native';
import { TextInput as PaperTestInput } from 'react-native-paper';
import TextView from '@app/components/TextView';
import s from './styles';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import screens from '@app/constants/screens';
import {
  clearIsAutorizedUser,
  isEmpty,
  isNumber,
  isUnautorized,
  toastNotification,
  validFirebaseErrorMessage,
} from '@app/helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginUser } from '@app/actions/authActions';
import auth from '@react-native-firebase/auth';
import { setLoginData } from '@app/utils/localStorage';
import { RESPONSE_STATUS } from '@app/constants/constant';
import { login } from '@app/services/authService';
import { appInit } from '@app/helpers/appInitHelpers';
import { CommonActions } from '@react-navigation/native';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryModal from '@app/components/CountryModal/CountryModal';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { getCountryList } from '@app/services/userService';
import { trackActivity } from '@app/services/analyticsService';

const AddNumberScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const passwordInput = useRef();
  const { loginUser } = authSelector;
  const userSelector = useSelector((state) => state.user);
  const { countries } = userSelector;
  const [loading, setLoading] = useState(false);
  const [isLoginWithPassword, setIsLoginWithPassword] = useState(false);
  const [UserPassword, setUserPassword] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      // headerRight: () => (
      //   <View style={s.headerIcons}>
      //     <HeaderButton
      //       type={1}
      //       iconName={'help-circle'}
      //       color={colors.dimGray}
      //       style={s.addIcon}
      //       isFeather={Platform.OS === 'ios' ? false : true}
      //     />
      //   </View>
      // ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  useEffect(() => {
    if (!isUnautorized) return;
    setTimeout(() => {
      clearIsAutorizedUser();
    }, 2000);
  }, []);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateLoginUser({ propsName, value }));
    },
    [dispatch],
  );

  const onSelect = useCallback(
    (country) => {
      onChangeUserInfo('Country', country);
    },
    [onChangeUserInfo],
  );

  const loadData = useCallback(async () => {
    const result = await dispatch(getCountryList());
    if (result) {
      const country = result?.find((x) => x?.country_code === 'IN');
      onChangeUserInfo('Country', country);
    }
  }, [dispatch, onChangeUserInfo]);

  useEffect(() => {
    trackActivity('view: login');
    loadData();
  }, [loadData]);

  const onPressSendOtp = useCallback(async () => {
    try {
      if (isEmpty(loginUser?.Country)) {
        toastNotification('Please select country');
        return;
      } else if (!loginUser?.UserMobileNo || loginUser?.UserMobileNo?.trim() === '') {
        toastNotification('Mobile number is required');
        return;
      }
      setLoading(true);
      const Phone = `+${loginUser?.Country?.country_phone_code} ${loginUser?.UserMobileNo}`;
      await auth()
        .signInWithPhoneNumber(Phone)
        .then(async (otpResult) => {
          await setLoginData(loginUser);
          setLoading(false);
          trackActivity('login: otp sent');
          toastNotification('OTP sent successfully');
          navigation.navigate(screens.EnterOtp, { result: otpResult });
        })
        .catch((error) => {
          console.log(JSON.stringify(error.message));
          validFirebaseErrorMessage(error);
        });
    } catch (error) {
      setLoading(false);
      toastNotification(error);
    } finally {
      setLoading(false);
    }
  }, [loginUser, navigation]);

  const onPressLoginwithPassword = useCallback(() => {
    setIsLoginWithPassword(!isLoginWithPassword);
  }, [isLoginWithPassword]);

  const onSubmit = useCallback(async () => {
    try {
      if (isEmpty(loginUser?.Country)) {
        toastNotification('Please select country');
        return;
      } else if (!loginUser?.UserMobileNo || loginUser?.UserMobileNo?.trim() === '') {
        toastNotification('Mobile number is required');
        return;
      } else if (!isNumber(loginUser?.UserMobileNo)) {
        toastNotification('Please enter valid mobile number');
        return;
      } else if (!UserPassword || UserPassword?.trim() === '') {
        toastNotification('Password is required');
        return;
      }
      setLoading(true);
      const payload = {
        ...loginUser,
        UserPassword,
        CountryCode: loginUser?.Country?.country_phone_code,
        CountryShortCode: loginUser?.Country?.country_code,
      };
      const response = await dispatch(login(payload, isLoginWithPassword));

      if (response) {
        if (Number(response?.IsNew) === Number(RESPONSE_STATUS.SUCCESS)) navigation.navigate(screens.SelectLanguage);
        else {
          await dispatch(appInit());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: screens.NavigationRoot,
                },
              ],
            }),
          );
        }
        const isUserLoggedInBefore = await asyncStorageHelpers.getIsLoggedInBefore();
        if (!isUserLoggedInBefore) await asyncStorageHelpers.saveIsLoggedInBefore(true);
      }
    } catch (error) {
      setLoading(false);
      toastNotification(error);
    } finally {
      setLoading(false);
    }
  }, [UserPassword, dispatch, isLoginWithPassword, loginUser, navigation]);

  const onPressHelplineNumber = useCallback(() => {
    trackActivity('login: help clicked');
    Linking.openURL(
      'http://api.whatsapp.com/send?phone=916356563262&text=I+am+facing+the+issue+of+getting+OTP,+Can+you+help+me?+',
    );
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.contentContainer}>
      <View style={s.wrapper}>
        <View style={s.contentBlock}>
          <TextView text={'Get Started'} type={'sub-title'} style={s.headText} />
          <View>
            <TextView text={'Add your mobile number.'} type={'body'} style={s.summary} />
            <TextView
              text={'We’ll send you a verification code so we know you’re real.'}
              type={'body'}
              style={s.summary}
            />
          </View>
        </View>

        <View style={s.countryBoxWrap}>
          <CountryModal
            options={countries}
            onValueChange={(data) => {
              onSelect(data);
            }}
            value={loginUser?.Country}
          />
          <TextInput
            value={loginUser?.UserMobileNo}
            onChangeText={(number) => {
              onChangeUserInfo('UserMobileNo', number);
            }}
            style={s.inputstyle}
            keyboardType='numeric'
            placeholder='Enter Your Mobile Number'
            placeholderTextColor={colors.blackHalfOpacity}
            returnKeyType={isLoginWithPassword ? 'next' : 'done'}
            onSubmitEditing={
              isLoginWithPassword
                ? () => {
                    passwordInput.current.focus();
                  }
                : onPressSendOtp
            }
          />
        </View>
        {isLoginWithPassword && (
          <View style={s.passwordWrapper}>
            <PaperTestInput
              ref={passwordInput}
              value={UserPassword}
              dense={true}
              onChangeText={(password) => {
                setUserPassword(password);
              }}
              theme={{ roundness: 8 }}
              style={s.inputpasswordstyle}
              placeholder='Enter Your Password'
              mode='outlined'
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
              returnKeyType={'done'}
              onSubmitEditing={onSubmit}
              secureTextEntry={true}
            />
          </View>
        )}

        <View style={s.buttonWrap}>
          <Button
            isLoading={loading}
            style={AppStyles.buttonWithIcon}
            onPress={isLoginWithPassword ? onSubmit : onPressSendOtp}>
            <TextView style={AppStyles.btnText} type={'body'} text={isLoginWithPassword ? 'Submit' : 'Send OTP'} />
            <Icon name='chevron-right' size={24} color={colors.white} />
          </Button>
        </View>
        <View style={s.dividerview}>
          <View style={s.leftDivider}></View>
          <TextView text={'OR'} type={'caption'} style={s.ortext} />
          <View style={s.rightDivider}></View>
        </View>
        <Button
          onPress={onPressLoginwithPassword}
          style={s.btnWi}
          textStyle={s.textBtn}
          ButtonText={`Login With ${isLoginWithPassword ? 'OTP' : 'Password'}`}
        />
        <View style={s.helpRow}>
          <SvgIcon svgs={svgs} name={'help-icon'} width={20} height={18} style={s.smileicon} />
          <TextView text={`Didn't get OTP? click here `} type={'caps-one'} style={s.helptext} />
          <TouchableOpacity onPress={onPressHelplineNumber}>
            <TextView text={'+91 63 5656 3262'} type={'caps-one'} style={s.numtex} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddNumberScreen;
