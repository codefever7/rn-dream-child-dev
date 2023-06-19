import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import TextView from '@app/components/TextView';
import screens from '@app/constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguageList } from '@app/services/userService';
import { updateUserInfo } from '@app/actions/userActions';
import ConfirmationModal from '@app/components/ConfirmationModal';
import Loading from '@app/components/Loading';
import { setI18nConfig } from '@app/helpers/appInitHelpers';
import { trackActivity } from '@app/services/analyticsService';

const SelectLanguageScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { user, currentUser, languages, loading } = userSelector;
  const [openMenu, setOpenMenu] = useState(false);
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
    const loadData = async () => {
      const payload = {
        UserId: currentUser?.user_id,
      };
      await dispatch(getLanguageList(payload));
    };
    loadData();
  }, [currentUser, currentUser?.User_Detail?.user_id, dispatch]);

  useEffect(() => {
    trackActivity('view: onboarding select language');
  }, []);

  const onCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateUserInfo({ propsName, value }));
    },
    [dispatch],
  );

  const onOpenMenu = useCallback(
    async (LanguageId) => {
      setOpenMenu(true);
      onChangeUserInfo('LanguageId', LanguageId);
    },
    [onChangeUserInfo],
  );

  const onPressSetLanguage = useCallback(async () => {
    let languageCode = 'gu';
    if (Number(user?.LanguageId) === 1) languageCode = 'gu';
    else if (Number(user?.LanguageId) === 2) languageCode = 'hi';
    await setI18nConfig(languageCode);

    onCloseMenu();

    if (Platform.OS === 'ios') {
      setTimeout(() => {
        navigation.navigate(screens.BasicInformations);
      }, 300);
    } else {
      navigation.navigate(screens.BasicInformations);
    }
  }, [navigation, onCloseMenu, user?.LanguageId]);

  const onPressNotSetLanguage = useCallback(async () => {
    onCloseMenu();
  }, [onCloseMenu]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <View style={s.mainscreen}>
        <TextView text={'Select Language'} type={'sub-title'} style={s.headtext} />
        <View style={s.selectview}>
          {languages?.map((item, index) => {
            return (
              <TouchableOpacity
                key={`language_${item?.language_id}_index_${index}`}
                style={item?.language_id === user?.LanguageId ? s.focusview : s.unfocusview}
                onPress={() => {
                  onOpenMenu(item?.language_id);
                }}>
                <TextView
                  text={item?.language_name}
                  type={'sub-title'}
                  style={item?.language_id === user?.LanguageId ? s.ltext : s.rtext}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ConfirmationModal
        isOpen={openMenu}
        onClosed={onCloseMenu}
        headerTitle={'Are you sure?'}
        onPressCancel={onPressNotSetLanguage}
        onPressConfirm={onPressSetLanguage}>
        <TextView
          text={'You can’t change Language Easily. Select it Carefully.'}
          type={'body-head'}
          style={s.captiontext}
        />
        <TextView
          text={'આપ​ સરળતાથી ભાષા બદલી શકશો નહીં. કાળજીપૂર્વક ભાષા પસંદ કરો.'}
          type={'body-head'}
          style={s.captiontext}
        />
      </ConfirmationModal>
    </>
  );
};

export default SelectLanguageScreen;
