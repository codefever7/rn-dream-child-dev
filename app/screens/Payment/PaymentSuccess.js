import { View, Platform, BackHandler, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppStyles from '@app/styles/AppStyles';
import { scale } from '@app/utils/scale';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import TextView from '@app/components/TextView';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import { RESPONSE_STATUS } from '@app/constants/constant';
import s from './styles';
import Button from '@app/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '@app/services/orderService';
import Loading from '@app/components/Loading';
import ConfirmationModal from '@app/components/ConfirmationModal';
import screens from '@app/constants/screens';
import { appInit } from '@app/helpers/appInitHelpers';
import { CommonActions } from '@react-navigation/native';
import { isEmpty } from '@app/helpers/helpers';
import { setUserIdentify, trackActivity } from '@app/services/analyticsService';

const PaymentSuccessScreen = ({ route, navigation }) => {
  const { status, OrderId } = route.params;
  const orderSelector = useSelector((state) => state.order);
  const { loading, orderDetail } = orderSelector;
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [instruction, setInstruction] = useState();

  const isSuccess = useMemo(() => {
    return Number(status) === Number(RESPONSE_STATUS.SUCCESS);
  }, [status]);

  const loadData = useCallback(async () => {
    const payload = {
      OrderId,
      IsOrderStatusChange: status,
    };
    const result = await dispatch(getOrderDetail(payload));
    if (result) {
      const params = {};
      if (!isEmpty(result?.data?.OrderDetail?.order_product_list)) {
        const item = result?.data?.OrderDetail?.order_product_list[0];
        if (isSuccess) {
          setUserIdentify('Plan', item?.product_title);
        }
        params.plan = item?.product_title;
        params.amount = item?.final_total_price;
        params.order_amount = result?.data?.OrderDetail?.order_amount;
        params.discount = result?.data?.OrderDetail?.discount_amount;
        params.status = result?.data?.OrderDetail?.order_status_name;
      }
      trackActivity('upgrade: payment', params);
      setInstruction(result?.instruction);
      await dispatch(appInit());
    }
  }, [OrderId, dispatch, isSuccess, status]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    let backHandler;
    backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      backHandler.remove();
    };
  }, [backAction, navigation]);

  const backAction = useCallback(() => {
    onPressContinue();
    return true;
  }, [onPressContinue]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => backAction()}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={`Payment ${isSuccess ? 'Success' : 'Fail'}`} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [backAction, isSuccess, navigation, status]);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const onPressConfirm = useCallback(() => {
    onCloseModal();
    navigation.navigate(screens.UpdateProfile);
  }, [navigation, onCloseModal]);

  const onPressContinue = useCallback(() => {
    if (isSuccess) {
      let isUpdateProfile = false;
      if (!currentUser?.User_Detail?.UserName || currentUser?.User_Detail?.UserName?.trim() === '') {
        isUpdateProfile = true;
      } else if (!currentUser?.User_Detail?.UserWhatsapp || Number(currentUser?.User_Detail?.UserWhatsapp) === 0) {
        isUpdateProfile = true;
      } else if (
        !currentUser?.User_Detail?.UserHusbandMobile ||
        Number(currentUser?.User_Detail?.UserHusbandMobile) === 0
      ) {
        isUpdateProfile = true;
      } else if (!currentUser?.User_Detail?.UserEmail || currentUser?.User_Detail?.UserEmail?.trim() === '') {
        isUpdateProfile = true;
      } else if (!currentUser?.User_Detail?.CountryId) {
        isUpdateProfile = true;
      } else if (!currentUser?.User_Detail?.StateId) {
        isUpdateProfile = true;
      } else if (!currentUser?.User_Detail?.Village || currentUser?.User_Detail?.Village?.trim() === '') {
        isUpdateProfile = true;
      } else if (!currentUser?.User_Detail?.UserStatus) {
        isUpdateProfile = true;
      }
      if (isUpdateProfile) {
        onOpenModal();
      } else {
        navigation.goBack();
      }
    } else {
      navigation.navigate(screens.PremiumPlan);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: screens.NavigationRoot,
            },
            {
              name: screens.PremiumPlan,
            },
          ],
        }),
      );
    }
  }, [
    currentUser?.User_Detail?.CountryId,
    currentUser?.User_Detail?.StateId,
    currentUser?.User_Detail?.UserEmail,
    currentUser?.User_Detail?.UserHusbandMobile,
    currentUser?.User_Detail?.UserName,
    currentUser?.User_Detail?.UserStatus,
    currentUser?.User_Detail?.UserWhatsapp,
    currentUser?.User_Detail?.Village,
    isSuccess,
    navigation,
    onOpenModal,
  ]);

  if (loading) {
    <Loading />;
  }
  return (
    <View style={AppStyles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.iconDone}>
          <SvgIcon
            svgs={svgs}
            name={isSuccess ? 'success-icon' : 'fail-icon'}
            fill={'none'}
            width={scale(160)}
            height={scale(160)}
            style={s.iconsvg}
          />
          <View style={s.doneView}>
            <TextView
              text={`${isSuccess ? 'Your Payment is Successful' : 'Payment Fail'}`}
              type={'body-two'}
              style={s.doneText}
            />
            {isSuccess ? (
              <>
                <View>
                  <View style={s.rowOrder}>
                    <TextView text={'Order ID:'} type={'body-head'} style={s.leftHead} />
                    <TextView text={`#${OrderId}`} type={'body-head'} style={s.rightHead} />
                  </View>
                  {orderDetail?.OrderDetail?.order_date && (
                    <View style={s.rowOrder}>
                      <TextView text={'Order Date:'} type={'body-head'} style={s.leftHead} />
                      <TextView text={orderDetail?.OrderDetail?.order_date} type={'body-head'} style={s.rightHead} />
                    </View>
                  )}
                  {/* <View style={s.rowOrder}>
                <TextView text={'Transaction ID:'} type={'body-head'} style={s.leftHead} />
                <TextView text={'#3743'} type={'body-head'} style={s.rightHead} />
              </View> */}
                </View>
                {instruction && (
                  <View style={s.knowCard}>
                    <TextView text={'Attention!'} type={'body-head'} style={s.didknow} />
                    <TextView text={`${instruction}`} type={'caption-two'} style={s.didcaption} />
                  </View>
                )}
              </>
            ) : (
              <TextView
                text={`Unfortunately, we couldn't collect payment on your purchase.`}
                type={'body-head'}
                style={s.failText}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={[AppStyles.footerWrapper, s.footBlock]}>
        <Button style={s.btn} onPress={onPressContinue}>
          <TextView style={s.btntext} type={'body-head'} text={isSuccess ? 'Continue' : 'Try again'} />
        </Button>
      </View>
      <ConfirmationModal
        isOpen={isOpenModal}
        onClosed={onCloseModal}
        headerTitle={'DreamChild'}
        successText={'Ok'}
        cancelText={'Cancel'}
        onPressCancel={onCloseModal}
        onPressConfirm={onPressConfirm}>
        <TextView text={'Now, you need to update your profile'} type={'body-head'} style={s.newcaptiontext} />
      </ConfirmationModal>
    </View>
  );
};

export default PaymentSuccessScreen;
