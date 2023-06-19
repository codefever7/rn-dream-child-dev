import { Platform, Image, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import s from './styles';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { getLanguageList, updateUserProfile } from '@app/services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, updateUserInfo } from '@app/actions/userActions';
import Loading from '@app/components/Loading';
import { RESPONSE_STATUS } from '@app/constants/constant';
import ConfirmationModal from '@app/components/ConfirmationModal';
import { setI18nConfig } from '@app/helpers/appInitHelpers';
import { getPlanList } from '@app/services/planService';
import { captureException } from '@app/services/errorLogService';
import SearchModal from '@app/components/SearchModal/SearchModal';

const ChangeLanguageScreens = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { currentUser, loading: isLoading, languages, user } = userSelector;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState();
  const [isOpenLanguageAlertModal, setIsOpenLanguageAlertModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      dispatch(setUserInfo(currentUser?.User_Detail));
      const languagePayload = {
        UserId: currentUser?.User_Detail?.UserId,
      };
      await dispatch(getLanguageList(languagePayload));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.User_Detail, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
          <TextView text={'Change Language'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const onCloseLanguageAlertModal = useCallback(() => {
    setIsOpenLanguageAlertModal(false);
  }, []);

  const onOpenLanguageAlertModal = useCallback(() => {
    setIsOpenLanguageAlertModal(true);
  }, []);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateUserInfo({ propsName, value }));
    },
    [dispatch],
  );

  const onChangeLanguage = useCallback(
    (language_id) => {
      if (!language_id) return;
      if (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.SUCCESS)) {
        setSelectedLanguageId(language_id);
        onOpenLanguageAlertModal();
      } else {
        onChangeUserInfo('LanguageId', language_id);
      }
    },
    [currentUser?.User_Detail?.is_paid_user, onChangeUserInfo, onOpenLanguageAlertModal],
  );

  const onSubmit = useCallback(async () => {
    try {
      if (user?.LanguageId === currentUser?.User_Detail?.LanguageId) {
        navigation.goBack();
        return;
      }
      setLoading(true);
      const payload = {
        ...user,
        IsImageUpdate: 0,
      };
      const result = await dispatch(updateUserProfile(payload));
      if (result) {
        let languageCode = 'gu';
        if (Number(user?.LanguageId) === 1) languageCode = 'gu';
        else if (Number(user?.LanguageId) === 2) languageCode = 'hi';
        await setI18nConfig(languageCode);
        await dispatch(getPlanList());
        navigation.goBack();
      }
    } catch (e) {
      console.log('ERROR', e);
      captureException(e);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.User_Detail?.LanguageId, dispatch, navigation, user]);

  if (loading && !languages) {
    return <Loading />;
  }

  return (
    <View style={s.mainbg}>
      <View style={s.padview}>
        <Image style={s.langimg} resizeMode='contain' source={require('../../assets/img/language.png')} />
        <View style={s.textlanview}>
          <TextView text={'Choose your'} type={'head-line'} style={s.langtitle} />
          <TextView text={'Preferred Language'} type={'head-line'} style={s.langtitle} />
        </View>
        <SearchModal
          style={s.pickerstyle}
          options={languages || []}
          selectedValue={user?.LanguageId}
          placeholder={'Select Language'}
          itemLabelField={'language_name'}
          itemValueField={'language_id'}
          onValueChange={(language_id) => {
            if (language_id) onChangeLanguage(language_id);
          }}
        />
        <View style={s.btnview}>
          <Button style={s.btn} isLoading={isLoading || loading} onPress={onSubmit}>
            <TextView style={s.btntext} type={'body-head'} text='Save' />
            <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
          </Button>
        </View>
      </View>
      <ConfirmationModal
        isOpen={isOpenLanguageAlertModal}
        onClosed={onCloseLanguageAlertModal}
        headerTitle={'Are you sure?'}
        successText={'Confirm'}
        cancelText={'Cancel'}
        onPressCancel={onCloseLanguageAlertModal}
        onPressConfirm={() => {
          onChangeUserInfo('LanguageId', selectedLanguageId);
          onCloseLanguageAlertModal();
        }}>
        <TextView
          text={'You are not able to change your language after plan purchase so please select language carefully.'}
          type={'body-head'}
          style={s.captiontext}
        />
      </ConfirmationModal>
    </View>
  );
};

export default ChangeLanguageScreens;
