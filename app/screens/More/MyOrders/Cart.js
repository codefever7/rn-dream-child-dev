import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Platform, RefreshControl, ScrollView, View } from 'react-native';
import TextView from '@app/components/TextView';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import Button from '@app/components/Button';
import { currencyWithDecimal, getFormattedAddress, isEmpty, toastNotification } from '@app/helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressList, getOrderSummary, getViewCart } from '@app/services/orderService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { trackActivity } from '@app/services/analyticsService';

const CartScreen = ({ route, navigation }) => {
  const { params } = route;
  const orderSelector = useSelector((state) => state.order);
  const { loading } = orderSelector;

  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [plan, setPlan] = useState();
  const [product, setProduct] = useState();

  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState();

  const formated_address = useMemo(() => {
    const address = getFormattedAddress(cart?.AddressDetail);
    return address;
  }, [cart?.AddressDetail]);

  const currency_symbol = useMemo(() => {
    return product?.currency_symbol || plan?.currency_symbol;
  }, [plan?.currency_symbol, product?.currency_symbol]);

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
          <TextView text={'Cart'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const loadAddressList = useCallback(async () => {
    const payload = {
      PageNo: 1,
    };
    await dispatch(getAddressList(payload));
  }, [dispatch]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const payload = {
        PlanId: params?.plan ? params?.plan?.plan_id : undefined,
        ProductId: params?.product ? params?.product?.product_id : undefined,
      };
      const result = await dispatch(getViewCart(payload));
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
        if (isEmpty(result?.AddressDetail)) {
          loadAddressList();
        }
        setCart(result);
        let SubTotal = 0;
        if (params?.product) {
          result?.ProductDetail?.ProductList?.forEach((item) => {
            SubTotal = Number(item?.discount_price) + Number(SubTotal);
          });
        } else {
          result?.PlanList?.forEach((item) => {
            SubTotal = Number(item?.Summary?.SubTotal) + Number(item?.Summary?.DeliveryCharges) + Number(SubTotal);
          });
        }
        setTotalAmount(Number(SubTotal));
      }
    },
    [dispatch, loadAddressList, params?.plan, params?.product],
  );

  useEffect(() => {
    if (params?.product) {
      setProduct(params?.product);
    } else if (params?.plan) {
      setPlan(params?.plan);
    }
    trackActivity('upgrade: view cart');
    loadData();
  }, [loadData, params?.plan, params?.product]);

  const onPressPay = useCallback(async () => {
    if (isEmpty(cart?.AddressDetail)) {
      toastNotification('Please Add Your Address Before Pay');
      return;
    }
    const payload = {
      CartData: JSON.stringify({
        PlanList: !isEmpty(cart?.PlanList) ? cart?.PlanList : [],
        ProductList: product ? cart?.ProductDetail?.ProductList : [],
      }),
    };
    const params = {};
    if (plan) {
      params.plan = plan?.status;
    } else if (product) {
      params.product = product?.product_title;
    }
    trackActivity('upgrade: process to pay clicked', params);
    const result = await dispatch(getOrderSummary(payload));
    if (result) {
      navigation.navigate(screens.OrderSummary);
    }
  }, [cart?.AddressDetail, cart?.PlanList, cart?.ProductDetail?.ProductList, dispatch, navigation, plan, product]);

  const product_img = useMemo(() => {
    return product?.product_image_list ? product?.product_image_list[0].product_image : '';
  }, [product?.product_image_list]);

  const hasTax = (Number(plan?.cgst || 0) || Number(plan?.igst || 0)) > 0;

  return (
    <View style={s.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
        <View style={s.mainroot}>
          {isEmpty(cart?.AddressDetail) ? (
            <TouchableOpacity
              style={s.firstView}
              onPress={() => {
                navigation.navigate(screens.SelectAddress, {
                  onChangeAddress: () => {
                    loadData();
                  },
                });
              }}>
              <Button ButtonText='Add Address' style={s.addressbtn} textStyle={s.textBtn} />
            </TouchableOpacity>
          ) : (
            <View style={s.boxview}>
              <View style={s.rowlist}>
                <View style={s.leftTextView}>
                  <TextView
                    text={`Deliver to ${cart?.AddressDetail?.billing_name}`}
                    type={'body-head'}
                    style={s.headText}
                  />
                  <TextView text={formated_address} type={'caps-one'} style={s.capsText} />
                </View>
                <Button
                  ButtonText='Change'
                  textStyle={s.btnChangeText}
                  style={s.btnChange}
                  onPress={() => {
                    trackActivity('upgrade: change address clicked');
                    navigation.navigate(screens.SelectAddress, {
                      onChangeAddress: () => {
                        loadData();
                      },
                    });
                  }}
                />
              </View>
              <View style={s.phoneView}>
                <TextView text={'Phone Number'} type={'caps-one'} style={s.phoneNum} />
                <TextView
                  text={`+${cart?.AddressDetail?.billing_country_phone_code} ${cart?.AddressDetail?.billing_mobile_no}`}
                  type={'caps-one'}
                  style={s.phoneText}
                />
              </View>
            </View>
          )}
          {plan ? (
            <View style={{ ...s.boxWrap, borderColor: plan?.bg_color }}>
              <View style={{ ...s.planHead, backgroundColor: plan?.bg_color }}>
                <TextView text={plan?.plan} type={'body-one'} style={{ ...s.PlanName, color: plan?.text_color }} />
              </View>
              <View style={s.containWrap}>
                <View style={s.firstContain}>
                  <View>
                    <TextView text={plan?.name} type={'body-head'} style={s.palnActivitiy} />
                    <View style={s.ListWrap}>
                      {plan?.details?.map((point, index) => {
                        return (
                          <View style={s.ListRow} key={`point_${index}_index`}>
                            <SvgIcon svgs={svgs} name={plan?.check_mark_icon} width={12} height={12} />
                            <TextView text={point?.text} type={'caps'} style={s.listText} />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={s.prizeList}>
                    <TextView
                      text={`${plan?.currency_symbol}${plan?.old_price}`}
                      type={'caps'}
                      style={s.discountPrize}
                    />
                    <TextView
                      text={`${plan?.currency_symbol}${plan?.final_price}`}
                      type={'sub-title'}
                      style={s.prizeAmount}
                    />
                    {hasTax && <TextView text={'+TAX'} style={s.tax} />}
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={s.bookBoxWrap}>
              <View style={s.BookHead}>
                <TextView text={product?.product_title} type={'body-one'} style={s.BookText} />
              </View>
              <View style={s.containBookWrap}>
                <View style={s.rowBook}>
                  <View style={s.bookView}>
                    <Image source={{ uri: product_img }} resizeMode='cover' style={s.bookImg} />
                  </View>
                  <View style={s.rightBook}>
                    {product?.extra?.details?.map((point, i) => {
                      return (
                        <View style={s.ListRow} key={`product_${i}_index`}>
                          <SvgIcon svgs={svgs} name={'black-mark'} width={12} height={12} />
                          <TextView text={point} type={'caps'} style={s.listText} />
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={[AppStyles.footerWrapper, s.footBlock]}>
        <Button style={s.btn} onPress={onPressPay} isLoading={loading}>
          <TextView
            style={s.btntext}
            type={'body-head'}
            text={`Process to pay ${currency_symbol}${currencyWithDecimal(totalAmount)}`}
          />
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
