import HeaderButton from '@app/components/HeaderButton';
import moment from 'moment';
import TextView from '@app/components/TextView';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Platform, Text, TouchableOpacity } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import s from './styles';
import svgs from '../../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { toastNotification, validFirebaseErrorMessage } from '@app/helpers/helpers';
import Loading from '@app/components/Loading';
import auth from '@react-native-firebase/auth';
import { login } from '@app/services/authService';
import { RESPONSE_STATUS } from '@app/constants/constant';
import { CommonActions } from '@react-navigation/native';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import { setAuthToken } from '@app/utils/authTokenHelpers';
import { appInit } from '@app/helpers/appInitHelpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { trackActivity } from '@app/services/analyticsService';

const CELL_COUNT = 6;
let timer;
const EnterOtpScreen = ({ route, navigation }) => {
  const { result } = route.params;
  const [seconds, setSeconds] = useState();
  const [countDown, setCountDown] = useState(true);
  const [loading, setLoading] = useState(false);
  const authSelector = useSelector((state) => state.auth);
  const { loginUser } = authSelector;
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      // headerRight: () => (
      //   <View style={s.headerIcons}>
      //     <HeaderButton
      //       type={1}
      //       iconName={'help-circle'}
      //       // onPress={() => navigation.navigate(screens.Dashboard)}
      //       color={colors.dimGray}
      //       style={s.addIcon}
      //       isFeather={Platform.OS === 'ios' ? false : true}
      //     />
      //   </View>
      // ),
      headerLeft: () => (
        <HeaderButton
          type={1}
          iconName={'chevron-left'}
          onPress={() => navigation.navigate(screens.AddNumber)}
          color={colors.dimGray}
          style={s.addIcon}
          isFeather={Platform.OS === 'ios' ? false : true}
        />
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  useEffect(() => {
    if (!countDown) return;
    var duration = moment.duration({
      minutes: 1,
      seconds: 59,
    });
    var timestamp = new Date(0, 0, 0, 2, 10, 30);
    var interval = 1;
    timer = setInterval(function () {
      timestamp = new Date(timestamp.getTime() + interval * 1000);
      duration = moment.duration(duration.asSeconds() - interval, 'seconds');
      var min = duration.minutes();
      var sec = duration.seconds();
      sec -= 1;
      if (min < 0) return clearInterval(timer);
      if (min < 10 && min.length != 2) min = '0' + min;
      if (sec < 0 && min != 0) {
        min -= 1;
        sec = 59;
      } else if (sec < 10 && sec.length != 2) sec = '0' + sec;
      let time = `${min}:${sec}`;
      setSeconds(time);
      if (min === '00' && sec === '00') {
        clearInterval(timer);
        setCountDown(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countDown]);

  const userLogin = useCallback(async () => {
    const idTokenResult = await auth().currentUser.getIdTokenResult();
    await setAuthToken(idTokenResult?.token);
    const payload = {
      ...loginUser,
      CountryCode: loginUser?.Country?.country_phone_code,
      CountryShortCode: loginUser?.Country?.country_code,
    };
    const response = await dispatch(login(payload));
    setValue('');
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
  }, [dispatch, loginUser, navigation]);

  const onSubmit = useCallback(async () => {
    try {
      if (result && value?.length) {
        setLoading(true);
        await result
          .confirm(value)
          .then(async () => {
            toastNotification('User verified successfully');
            await userLogin();
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(JSON.stringify(error.message));
            validFirebaseErrorMessage(error);
          });
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [result, userLogin, value]);

  useEffect(() => {
    if (value.length !== CELL_COUNT) return;
    onSubmit();
  }, [onSubmit, value.length]);

  const onPressResendOtp = useCallback(async () => {
    setCountDown(true);
    try {
      setLoading(true);
      const Phone = `+${loginUser?.Country?.country_phone_code} ${loginUser?.UserMobileNo}`;
      console.log('Phone', Phone);
      await auth()
        .signInWithPhoneNumber(Phone)
        .then(() => {
          setLoading(false);
          toastNotification('OTP sent successfully');
        })
        .catch((error) => {
          setLoading(false);
          console.log('error', error);

          toastNotification(JSON.stringify(error.message));
        });
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify('error', error));
    } finally {
      setLoading(false);
      console.log('finally');
    }
  }, [loginUser]);

  useEffect(() => {
    trackActivity('view: otp verification');
  }, []);

  return (
    <View style={s.wrapper}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={s.container}
        contentContainerStyle={s.contentContainer}>
        <View style={s.contentBlock}>
          <TextView text={'Verify your Phone number'} type={'sub-title'} style={s.headText} />
          <View>
            <TextView text={'Enter your OTP code here'} type={'body'} style={s.summary} />
          </View>
        </View>

        <View style={s.otpfield}>
          <CodeField
            autoFocus={true}
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={(text) => {
              setValue(text);
            }}
            cellCount={CELL_COUNT}
            rootStyle={s.codeFieldRoot}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={({ index, symbol, isFocused }) => (
              <View style={s.cellBox}>
                <Text
                  key={index}
                  style={[s.cell, (isFocused || value.length > index) && s.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={s.timeview}>
          <SvgIcon svgs={svgs} name={'time-icon'} width={20} height={20} />
          <TextView text={`${seconds || '01:59'}`} type={'body-head'} style={s.timetext} />
        </View>
        {!countDown && (
          <View style={s.bottomview}>
            <TextView text={'Didn’t you receive any code ?'} type={'body'} style={s.bottomcap} />
            <TouchableOpacity onPress={onPressResendOtp}>
              <TextView text={'Resend New Code'} type={'body'} style={s.btntext} />
            </TouchableOpacity>
          </View>
        )}
        {loading ? <Loading /> : null}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EnterOtpScreen;
