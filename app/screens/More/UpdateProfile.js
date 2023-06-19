import { View, Platform, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import s from './styles';
import { TextInput } from 'react-native-paper';
import { colors } from '@app/styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import Button from '@app/components/Button';
import TextView from '@app/components/TextView';
import Icon from '@app/components/Icon';
import HeaderButton from '@app/components/HeaderButton';
import AppStyles from '@app/styles/AppStyles';
import { getCountryList, getStateList, getUserStatusList, updateUserProfile } from '@app/services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, updateUserInfo } from '@app/actions/userActions';
import { getDateDifference, isEmail, isEmpty, isNumber, isStirng, toastNotification } from '@app/helpers/helpers';
import { RESPONSE_STATUS, USER_STATUS } from '@app/constants/constant';
import { appInit, translate } from '@app/helpers/appInitHelpers';
import DatePicker from '@app/components/molecules/DatePicker';
import SearchModal from '@app/components/SearchModal/SearchModal';
import ScrollableAvoidKeyboard from '@app/components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const UpdateProfileScreens = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { currentUser, user, statusList, loading: isLoading } = userSelector;
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const hasPaidUser = useMemo(() => {
    return currentUser?.User_Plan_Master?.length > 0;
  }, [currentUser?.User_Plan_Master?.length]);

  const isDemoExist = useMemo(() => {
    let demo = false;
    currentUser?.User_Plan_Master?.map((item) => {
      if (Number(item?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS)) {
        demo = true;
      }
    });
    return demo;
  }, [currentUser?.User_Plan_Master]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.goBack()}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Update Profile'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      dispatch(setUserInfo(currentUser?.User_Detail));
      let payload = {
        CountryId: currentUser?.User_Detail?.CountryId,
      };
      await dispatch(getUserStatusList());
      const countries = await dispatch(getCountryList());
      setCountryList(countries);
      const states = await dispatch(getStateList(payload));
      setStateList(states);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.User_Detail, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateUserInfo({ propsName, value }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    async (country_id) => {
      if (!country_id) return;
      onChangeUserInfo('CountryId', country_id);
      let payload = {
        CountryId: country_id,
      };
      const states = await dispatch(getStateList(payload));
      setStateList(states);
    },
    [dispatch, onChangeUserInfo],
  );

  const onPressSubmit = useCallback(async () => {
    let message;
    if (!user?.UserName || user?.UserName?.trim() === '') {
      message = 'First Name is required';
    } else if (user?.UserName && !isStirng(user?.UserName)) {
      message = 'Please enter only english alphabet';
    } else if (!user?.UserLastName || user?.UserLastName?.trim() === '') {
      message = 'Last Name is required';
    } else if (user?.UserLastName && !isStirng(user?.UserLastName)) {
      message = 'Please enter only english alphabet';
    } else if (!user?.UserMiddleName || user?.UserMiddleName?.trim() === '') {
      message = 'Middle Name is required';
    } else if (user?.UserMiddleName && !isStirng(user?.UserMiddleName)) {
      message = 'Please enter only english alphabet';
    } else if (user?.UserHusbandMobile && !isNumber(user?.UserHusbandMobile)) {
      message = 'Please enter valid husband mobile number';
    } else if (isEmpty(user?.UserWhatsapp) || Number(user?.UserWhatsapp) === 0) {
      message = 'Whatsapp number is required';
    } else if (user?.UserWhatsapp && !isNumber(user?.UserWhatsapp)) {
      message = 'Please enter valid whatsapp number';
    } else if (!user?.UserEmail || user?.UserEmail?.trim() === '') {
      message = 'Email is required';
    } else if (!isEmail(user?.UserEmail)) {
      message = 'Please enter valid email';
    } else if (!user?.CountryId) {
      message = 'Country is required';
    } else if (!user?.StateId) {
      message = 'State is required';
    } else if (!user?.Village || user?.Village?.trim() === '') {
      message = 'Village is required';
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
    const payload = {
      ...user,
      IsImageUpdate: 0,
      LMPDate: user?.UserStatus === USER_STATUS.PREGNANT ? user?.LMPDate : undefined,
      EDDDate: user?.UserStatus === USER_STATUS.PREGNANT ? user?.EDDDate : undefined,
    };
    console.log('payload', payload);
    const result = await dispatch(updateUserProfile(payload));
    if (result) {
      if (user?.LanguageId !== currentUser?.User_Detail?.LanguageId) {
        if (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.FAIL)) {
          dispatch(appInit());
        }
      }
      navigation.goBack();
    }
  }, [currentUser?.User_Detail?.LanguageId, currentUser?.User_Detail?.is_paid_user, dispatch, navigation, user]);

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
    <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={s.mainbg}>
      <View style={s.updateroot}>
        <View style={s.inputprofile}>
          <TextInput
            disabled={loading}
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='First Name *'
            placeholder='Enter your first name'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserName}
            onChangeText={(text) => {
              onChangeUserInfo('UserName', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            disabled={loading}
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Middle Name *'
            placeholder='Enter your middle name'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserMiddleName}
            onChangeText={(text) => {
              onChangeUserInfo('UserMiddleName', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            disabled={loading}
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Last Name *'
            placeholder='Enter your last name'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserLastName}
            onChangeText={(text) => {
              onChangeUserInfo('UserLastName', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            disabled={true}
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Wife Number *'
            placeholder='Enter your wife number'
            keyboardType='phone-pad'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserMobileNo}
            onChangeText={(text) => {
              onChangeUserInfo('UserMobileNo', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            disabled={loading}
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Husband Number'
            keyboardType='numeric'
            placeholder='Enter your husband number'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserHusbandMobile}
            onChangeText={(text) => {
              onChangeUserInfo('UserHusbandMobile', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            disabled={loading}
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Whatsapp Number *'
            keyboardType='numeric'
            placeholder='Enter your whatsapp number'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserWhatsapp}
            onChangeText={(text) => {
              onChangeUserInfo('UserWhatsapp', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            disabled={loading}
            theme={{ roundness: 6 }}
            style={s.Emailinputstyle}
            mode='outlined'
            label='Email *'
            placeholder='Enter your email'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.UserEmail}
            onChangeText={(text) => {
              onChangeUserInfo('UserEmail', text);
            }}
          />
          <SvgIcon svgs={svgs} name={'emailright-icon'} width={18} height={18} style={s.emailRight} />
        </View>
        <View style={s.inputprofile}>
          <SearchModal
            style={[s.pickerstyle, { backgroundColor: colors.disabledBackground }]}
            options={countryList || []}
            selectedValue={user?.CountryId}
            placeholder={'Select Country *'}
            isDisabled={!isEmpty(user.CountryId)}
            itemLabelField={'country_name'}
            onValueChange={onChangeCountry}
            itemValueField={'country_id'}
          />
        </View>
        <View style={s.inputprofile}>
          <SearchModal
            style={s.pickerstyle}
            options={stateList || []}
            selectedValue={user?.StateId}
            placeholder={'Select State *'}
            itemLabelField={'state_name'}
            itemValueField={'state_id'}
            onValueChange={(state_id) => {
              if (state_id) onChangeUserInfo('StateId', state_id);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            disabled={loading}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='City/Village *'
            placeholder='Enter your city/Village'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={user?.Village}
            onChangeText={(text) => {
              onChangeUserInfo('Village', text);
            }}
          />
        </View>

        <View style={s.inputview}>
          <TextView text={'Status *'} type={'body-head'} style={s.labelinput} />
          <View style={s.statusview}>
            {statusList?.map((item, index) => {
              const iconName = getIconName(item?.relation_type_id);
              return (
                <TouchableOpacity
                  key={`status_${item?.relation_type_id}_index_${index}`}
                  style={user?.UserStatus === item?.relation_type_id ? s.focusstatus : s.notfocus}
                  onPress={
                    !isDemoExist &&
                    (!hasPaidUser || Number(currentUser?.User_Detail?.UserStatus) !== Number(USER_STATUS.PREGNANT))
                      ? () => {
                          onChangeUserInfo('UserStatus', item?.relation_type_id);
                        }
                      : null
                  }>
                  <SvgIcon svgs={svgs} name={iconName} width={32} height={32} />
                  <TextView text={item?.relation_type_name} type={'caption-two'} style={s.statustext} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {user?.UserStatus === USER_STATUS.PREGNANT && (
          <>
            <View style={s.dateinputview}>
              <DatePicker
                disabled={currentUser?.User_Detail?.LMPDate !== '0000-00-00'}
                labelText={'LMP (Last Menstrual Period)Date'}
                value={user?.LMPDate !== '0000-00-00' ? new Date(user?.LMPDate) : undefined}
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
            <View style={s.dateinputview}>
              <DatePicker
                disabled={currentUser?.User_Detail?.EDDDate !== '0000-00-00'}
                labelText={'EDD (Estimated Due Date)'}
                value={user?.EDDDate !== '0000-00-00' ? new Date(user?.EDDDate) : undefined}
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
      <View style={AppStyles.footerWrapper}>
        <Button style={s.btn} onPress={onPressSubmit} isLoading={loading || isLoading}>
          <TextView style={s.btntext} type={'body-head'} text='Submit' />
          <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
        </Button>
      </View>
    </ScrollableAvoidKeyboard>
  );
};

export default UpdateProfileScreens;
