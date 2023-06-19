import AppAvtar from '@app/components/Avtar/AppAvtar';
import Button from '@app/components/Button';
import ConfirmationModal from '@app/components/ConfirmationModal';
import HeaderButton from '@app/components/HeaderButton';
import Icon from '@app/components/Icon';
import DatePicker from '@app/components/molecules/DatePicker';
import TextView from '@app/components/TextView';
import screens from '@app/constants/screens';
import { getDateDifference, toastNotification } from '@app/helpers/helpers';
import { updateUserProfile } from '@app/services/userService';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Platform, ScrollView } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import { USER_STATUS } from '@app/constants/constant';
import { translate } from '@app/helpers/appInitHelpers';

const StartPregnancyScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { currentUser, loading } = userSelector;
  const [EDDDate, setEDDDate] = useState();
  const [LMPDate, setLMPDate] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerRight: () => (
        <View style={s.headerIcons}>
          <AppAvtar Imgsrc={currentUser?.User_Detail?.UserImage} Name={currentUser?.User_Detail?.UserName} Size={28} />
        </View>
      ),
      headerLeft: () => (
        <View style={s.headerIcons}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.Dashboard)}
            color={colors.dimGray}
            style={s.backicon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <SvgIcon svgs={svgs} name={'dreamchild-name'} width={104} height={15} style={s.headtext} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [currentUser?.User_Detail?.UserImage, currentUser?.User_Detail?.UserName, navigation]);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const onSubmit = useCallback(async () => {
    if (EDDDate && LMPDate) {
      onCloseModal();
      const payload = {
        ...currentUser?.User_Detail,
        IsStartPregnancy: 1,
        EDDDate,
        LMPDate,
        UserStatus: USER_STATUS.PREGNANT,
      };
      const result = await dispatch(updateUserProfile(payload));
      if (result) {
        navigation.navigate(screens.Dashboard);
      }
    } else {
      toastNotification('Please select LMP Date or EDD Date');
    }
  }, [EDDDate, LMPDate, currentUser?.User_Detail, dispatch, navigation, onCloseModal]);

  const onChangeLMPDate = useCallback((date) => {
    const today = new Date();
    const days = getDateDifference(today, date);
    if (days < -28) {
      if (days > -280) {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 280);
        setLMPDate(date);
        setEDDDate(newDate);
      } else {
        toastNotification('LMP should not be more than 280 day old');
      }
    } else {
      toastNotification('LMP date should be 28 day older then today.');
    }
  }, []);

  const onChangeEDDDate = useCallback((date) => {
    const today = new Date();
    const days = getDateDifference(today, date);
    if (days > 0) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 280);
      setEDDDate(date);
      setLMPDate(newDate);
    } else {
      toastNotification('EDD date should be greater then today.');
    }
  }, []);

  const onPressSubmit = useCallback(() => {
    if (LMPDate && EDDDate) {
      onOpenModal();
    } else {
      toastNotification('Please select EDD or LMP date');
    }
  }, [EDDDate, LMPDate, onOpenModal]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={s.bgWhite}>
        <View style={s.rootscreen}>
          <View style={s.imgBg}>
            <Image style={s.imgscreen} source={require('../../../assets/img/startday.png')} resizeMode='contain' />
          </View>
          <View style={s.textview}>
            <TextView text={'Start Your Course !'} type={'head-line'} style={s.titleScreen} />
            <TextView text={translate('is_pregnancy_confirmed_by_doctor')} type={'body-head'} style={s.captiontext} />
            <TextView text={translate('start_course_pre_planing_text')} type={'body-head'} style={s.captiontext} />
          </View>
          <View style={s.inputview}>
            <DatePicker
              labelText={'LMP(Last Menstrual Period Date)'}
              value={LMPDate}
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
              value={EDDDate}
              onChange={(date) => {
                if (date) onChangeEDDDate(date);
              }}
            />
            <TextView text={translate('edd_date_input_text')} type={'caption-two'} style={s.lmptext} />
          </View>
        </View>
      </ScrollView>

      <View style={s.buttonWrap}>
        <Button style={s.btn} onPress={onPressSubmit} isLoading={loading}>
          <TextView style={s.btntext} type={'body-head'} text='Submit' />
          <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
        </Button>
      </View>

      <ConfirmationModal
        isOpen={isOpenModal}
        onClosed={onCloseModal}
        headerTitle={'Are you sure?'}
        successText={'Confirm'}
        cancelText={'Cancel'}
        onPressCancel={onCloseModal}
        onPressConfirm={onSubmit}>
        <TextView text={'You can change this date only at once.'} type={'body-head'} style={s.newcaptiontext} />
        <TextView text={translate('only_one_time_date_change_message')} type={'body-head'} style={s.newcaptiontext} />
      </ConfirmationModal>
    </>
  );
};

export default StartPregnancyScreen;
