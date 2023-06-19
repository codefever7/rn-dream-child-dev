import { View, Platform, TextInput } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import Button from '@app/components/Button';
import ConfirmationModal from '@app/components/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, applyPromoCode } from '@app/services/orderService';
import deviceInfoModule from 'react-native-device-info';
import { CommonActions } from '@react-navigation/native';
import { currencyWithDecimal, isEmpty, toastNotification } from '@app/helpers/helpers';
import { trackActivity } from '@app/services/analyticsService';
import ScrollableAvoidKeyboard from '@app/components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const OrderSummaryScreen = ({ navigation }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [PromoCode, setPromoCode] = useState('');

  const orderSelector = useSelector((state) => state.order);
  const { loading, orderSummary } = orderSelector;

  const dispatch = useDispatch();

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
          <TextView text={'Order Summary'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  useEffect(() => {
    trackActivity('upgrade: view order summary');
  }, []);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const currency_symbol = useMemo(() => {
    let item;
    if (orderSummary?.PlanList && orderSummary?.PlanList.length > 0) {
      item = orderSummary?.PlanList[0];
    } else if (orderSummary?.ProductList && orderSummary?.ProductList?.length > 0) {
      item = orderSummary?.ProductList[0];
    }
    return item?.currency_symbol ? item?.currency_symbol : '₹';
  }, [orderSummary?.PlanList, orderSummary?.ProductList]);

  const activity_params = useMemo(() => {
    let plan, product;
    const params = {};
    if (!isEmpty(orderSummary?.PaymentSummary?.PlanSummary)) {
      let plans = orderSummary?.PaymentSummary?.PlanSummary?.map((item) => item?.title);
      plan = String(plans);
    } else if (!isEmpty(orderSummary?.PaymentSummary?.ProductSummary)) {
      let products = orderSummary?.PaymentSummary?.ProductSummary?.map((item) => item?.title);
      product = String(products);
    }
    if (plan) {
      params.plan = plan;
    } else if (product) {
      params.product = product;
    }
    return params;
  }, [orderSummary?.PaymentSummary?.PlanSummary, orderSummary?.PaymentSummary?.ProductSummary]);

  const onPressApply = useCallback(async () => {
    if (isEmpty(PromoCode)) {
      toastNotification('Promo code is required');
      return;
    }
    const payload = {
      CartLogId: orderSummary?.user_cart_log_id,
      PromoCode,
    };
    const params = activity_params;
    params.promocode = PromoCode;
    const result = await dispatch(applyPromoCode(payload));
    if (result) {
      trackActivity('upgrade: discount appled', params);
    }
  }, [PromoCode, activity_params, dispatch, orderSummary?.user_cart_log_id]);

  const onPressConfirm = useCallback(async () => {
    onCloseModal();
    const amount = `${currency_symbol}${orderSummary?.PaymentSummary?.OrderAmount}`;
    trackActivity('upgrade: process to pay clicked', { amount });
    let IpAddress;
    await deviceInfoModule.getIpAddress().then((ip) => {
      IpAddress = ip;
    });
    const payload = {
      CartLogId: orderSummary?.user_cart_log_id,
      OrderNote: '',
      PromoCodeDetail: orderSummary?.PaymentSummary?.PromoCodeDetail
        ? JSON.stringify(orderSummary?.PaymentSummary?.PromoCodeDetail)
        : '',
      DeviceIPAddress: IpAddress,
    };
    const result = await dispatch(addOrder(payload));
    if (result) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: screens.NavigationRoot,
            },
            {
              name: screens.Payment,
            },
          ],
        }),
      );
    }
  }, [
    currency_symbol,
    dispatch,
    navigation,
    onCloseModal,
    orderSummary?.PaymentSummary?.OrderAmount,
    orderSummary?.PaymentSummary?.PromoCodeDetail,
    orderSummary?.user_cart_log_id,
  ]);

  const totalAmount = useMemo(() => {
    let total = Number(orderSummary?.PaymentSummary?.SubTotal) - Number(orderSummary?.PaymentSummary?.Discount);
    return currencyWithDecimal(total);
  }, [orderSummary?.PaymentSummary?.Discount, orderSummary?.PaymentSummary?.SubTotal]);
  console.log('orderSummary?.PaymentSummary?.DeliveryCharges,', orderSummary?.PaymentSummary?.DeliveryCharges);

  return (
    <>
      <ScrollableAvoidKeyboard
        style={s.mainbg}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'>
        <View style={s.updateroot}>
          <View>
            <TextInput
              autoCapitalize='characters'
              placeholder='Type a promo code here'
              placeholderTextColor={colors.grey}
              style={s.inputCoupon}
              onChangeText={(text) => {
                setPromoCode(text);
              }}
              value={PromoCode}
            />
            <SvgIcon svgs={svgs} name={'coupan-icon'} width={20} height={20} style={s.couponIcon} />
            <View style={s.IosBtn}>
              <Button ButtonText='Apply' style={s.btnInput} textStyle={s.applytext} onPress={onPressApply} />
            </View>
          </View>
          <View style={s.borderDetail}>
            <View style={s.bgprimary}>
              <TextView text={'Order Summary'} type={'body-head'} style={s.titleText} />
            </View>
            <View style={s.summarylist}>
              <View style={s.summaryRow}>
                <TextView text={'Plan Charge'} type={'caption-two'} style={s.capsText} />
                <TextView
                  text={`${currency_symbol} ${orderSummary?.PaymentSummary?.SubTotal}`}
                  type={'body-head'}
                  style={s.capsText}
                />
              </View>
              <View style={s.summaryRow}>
                <TextView text={'Discount'} type={'caption-two'} style={s.capsText} />
                <TextView
                  text={`- ${currency_symbol} ${orderSummary?.PaymentSummary?.Discount}`}
                  type={'body-head'}
                  style={s.discountText}
                />
              </View>
              {orderSummary?.PaymentSummary?.DeliveryCharges > 0 && (
                <View style={s.summaryRow}>
                  <TextView text={'Delivery Charge'} type={'caption-two'} style={s.capsText} />
                  <TextView
                    text={`+ ${currency_symbol} ${orderSummary?.PaymentSummary?.DeliveryCharges}`}
                    type={'body-head'}
                    style={s.capsText}
                  />
                </View>
              )}
              <View style={s.summaryRow}>
                <TextView text={'Sub Total'} type={'caption-two'} style={s.prize} />
                <TextView text={`${currency_symbol} ${totalAmount}`} type={'body-head'} style={s.prize} />
              </View>
              <View style={s.summaryRow}>
                <TextView text={'Tax'} type={'caption-two'} style={s.capsText} />
                <TextView
                  text={`+ ${currency_symbol} ${orderSummary?.PaymentSummary?.TotalGST}`}
                  type={'body-head'}
                  style={s.capsText}
                />
              </View>
            </View>
            <View style={s.btmview}>
              <TextView text={'Total Amount'} type={'body-head'} style={s.prize} />
              <TextView
                text={`${currency_symbol} ${orderSummary?.PaymentSummary?.OrderAmount}`}
                type={'body-head'}
                style={s.prize}
              />
            </View>
          </View>
        </View>
        <View style={AppStyles.footerWrapper}>
          <Button style={s.btn} onPress={onOpenModal} isLoading={loading}>
            <TextView
              text={`Process to pay ${currency_symbol} ${orderSummary?.PaymentSummary?.OrderAmount}`}
              style={s.btntext}
              type={'body-head'}
            />
          </Button>
        </View>
      </ScrollableAvoidKeyboard>
      <ConfirmationModal
        isOpen={isOpenModal}
        onClosed={onCloseModal}
        headerTitle={'DreamChild'}
        successText={'Confirm'}
        cancelText={'Cancel'}
        onPressCancel={onCloseModal}
        onPressConfirm={onPressConfirm}>
        <TextView text={'Are you sure you want to place this order?'} type={'body-head'} style={s.newcaptiontext} />
      </ConfirmationModal>
    </>
  );
};

export default OrderSummaryScreen;
