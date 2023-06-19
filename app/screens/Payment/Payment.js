import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import { getParameters, isEmpty } from '../../helpers/helpers';
import screens from '@app/constants/screens';
import { CommonActions } from '@react-navigation/native';
import { API_BASE_URL } from '@app/constants/environmentConstants';
import { paymentGateway } from '@app/services/orderService';
import Loading from '@app/components/Loading';
import ConfirmationModal from '@app/components/ConfirmationModal';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';

const PaymentScreen = ({ navigation }) => {
  const [isOpenBackAlertModal, setIsOpenBackAlertModal] = useState(false);
  const orderSelector = useSelector((state) => state.order);
  const { payment, order, loading } = orderSelector;
  const dispatch = useDispatch();

  const onPayment = useCallback(
    (url) => {
      const parameter = getParameters(url);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: screens.NavigationRoot,
            },
            {
              name: screens.PaymentSuccess,
              params: { status: parameter?.status, OrderId: order?.order_id },
            },
          ],
        }),
      );
    },
    [navigation, order?.order_id],
  );

  const onOpenBackAlertModal = useCallback(() => {
    setIsOpenBackAlertModal(true);
  }, []);

  const onCloseBackAlertModal = useCallback(() => {
    setIsOpenBackAlertModal(false);
  }, []);

  const backAction = useCallback(() => {
    onOpenBackAlertModal();
    return true;
  }, [onOpenBackAlertModal]);

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
          <TextView text={'Payment'} numberOfLines={2} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [backAction, navigation]);

  const loadData = useCallback(async () => {
    const payload = {
      OrderId: order?.order_id,
    };
    await dispatch(paymentGateway(payload));
  }, [dispatch, order?.order_id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [backAction, navigation]);

  const onPressConfirm = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return loading || isEmpty(payment) ? (
    <Loading />
  ) : (
    <>
      {payment && (
        <View style={s.container}>
          <WebView
            source={{ html: payment }}
            setBuiltInZoomControls={false}
            javaScriptEnabled={true}
            onNavigationStateChange={(state) => {
              if (state.url?.startsWith(API_BASE_URL)) {
                onPayment(state.url);
              }
            }}
          />
        </View>
      )}
      <ConfirmationModal
        isOpen={isOpenBackAlertModal}
        onClosed={onCloseBackAlertModal}
        headerTitle={'Payment'}
        successText={'Ok'}
        cancelText={'Cancel'}
        onPressCancel={onCloseBackAlertModal}
        onPressConfirm={onPressConfirm}>
        <TextView
          text={'Are you sure you want to cancel this transaction?'}
          type={'body-head'}
          style={s.newcaptiontext}
        />
      </ConfirmationModal>
    </>
  );
};
export default PaymentScreen;
