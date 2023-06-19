import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  ImageBackground,
  Image,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanList } from '@app/services/planService';
import { getProductList } from '@app/services/orderService';
import Loading from '@app/components/Loading';
import { pricing } from '@app/data/row';
import { PALN_TYPE, RESPONSE_STATUS } from '@app/constants/constant';
import screens from '@app/constants/screens';
import { translate } from '@app/helpers/appInitHelpers';
import { isEmpty, toastNotification } from '@app/helpers/helpers';
import { trackActivity } from '@app/services/analyticsService';
import { setSelectedPlan, setSelectedProduct } from '@app/actions/planActions';

const PremiumPlanScreen = ({ route, navigation }) => {
  const { params } = route;
  const planSelector = useSelector((state) => state.plan);
  const { plan,selectedPlan,selectedProduct } = planSelector;
  const orderSelector = useSelector((state) => state.order);
  const { products } = orderSelector;
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;

  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
          <TextView text={'Pricing'} numberOfLines={2} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      let payload = { refere_page: 'PlanListPage' };
      const list = [dispatch(getPlanList(payload))];
      list.push(dispatch(getProductList()));
      setLoading(true);
      await Promise.all(list).then((response)=>{
        if(response){
          let plans = response[0].PlanList;
          const pricing_plan = plans?.find(
            (x) =>
              Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && params?.plan?.plan_work_type === x?.plan_work_type,
          );
          let planItem
          if(params?.plan){
            if(pricing_plan){
              const pricingplan = pricing?.find((x) => params?.plan?.plan_work_type === x?.plan_work_type);
              planItem = {
                ...pricingplan,
                ...params?.plan,
              };
            }else{
              const index = pricing?.findIndex((x) => params?.plan?.plan_work_type === x?.plan_work_type);
              let nextplan =pricing[index + 1]
              const planIndex = plans?.findIndex(
                (x) =>
                Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && nextplan?.plan_work_type === x?.plan_work_type,
                );
                planItem = {
                  ...nextplan,
                  ...plans[planIndex]
                };
              }
            }else{
              const defaultPlan = plans?.find(
                (x) =>
                  Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS)
              );
              const defaultpricingplan = pricing?.find((x) => defaultPlan?.plan_work_type === x?.plan_work_type);
              planItem = {
                ...defaultPlan,
                ...defaultpricingplan
              };
            }
              dispatch(setSelectedPlan(planItem));
        }
      });
      setLoading(false);
      if (isrefreshing) setIsRefreshing(false);
    },
    [dispatch, params?.plan],
  );

  useEffect(() => {
    trackActivity('upgrade: view pricing plan list');
    loadData();
    return()=>{
      dispatch(getPlanList())
      dispatch(setSelectedProduct(null))
      dispatch(setSelectedPlan(null))
    }
  }, [dispatch, loadData]);

  const onPressPay = useCallback(() => {
    let message;
    const product = selectedPlan || selectedProduct;
    if (isEmpty(product)) {
      message = 'Please select atleast one plan or product';
    }
    if (message) {
      toastNotification(message);
      return;
    }
    const params = {};
    if (selectedPlan) {
      params.plan = selectedPlan?.status;
    } else if (selectedProduct) {
      params.product = selectedProduct?.product_title;
    }
    trackActivity('upgrade: pay clicked', params);
    navigation.navigate(screens.Cart, { plan: selectedPlan, product: selectedProduct });
  }, [navigation, selectedPlan, selectedProduct]);

  const onPressProduct = useCallback(
    (product) => {
      const newProduct = {
        ...product,
        currency_symbol: '₹',
      };
      if (selectedPlan) {
        dispatch(setSelectedPlan(null));
      }
      dispatch(setSelectedProduct(newProduct));
    },
    [dispatch, selectedPlan],
  );

  const price = useMemo(() => {
    let price = 0;
    if (selectedPlan) {
      price = selectedPlan?.final_price;
    } else if (selectedProduct) {
      price = selectedProduct?.discount_price;
    }
    const symbol = selectedPlan?.currency_symbol || selectedProduct?.currency_symbol || '₹';
    return `${symbol}${price}`;
  }, [selectedPlan, selectedProduct]);

  const PricingPlan = useMemo(() => {
    return pricing?.map((item, index) => {
      const pricing_plan = plan?.PlanList?.find(
        (x) =>
          Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && item?.plan_work_type === x?.plan_work_type,
      );
      const purchase_plan = { ...pricing_plan, ...item };
      const is_Selected = item?.plan_work_type === selectedPlan?.plan_work_type;
      const hasTax = (Number(pricing_plan?.cgst || 0) || Number(pricing_plan?.igst || 0)) > 0;
      let isPurchasedPlan = false;
      let UserPlanMaster, isDemo;
      if (pricing_plan) {
        const index = currentUser?.User_Plan_Master?.findIndex((x) => x?.plan_id === pricing_plan?.plan_id);
        UserPlanMaster = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === pricing_plan?.plan_id);
        isDemo = Number(UserPlanMaster?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
        if (index !== -1) isPurchasedPlan = true;
      }
      let learnScreen = '';
      if (pricing_plan) {
        if (pricing_plan?.plan_work_type === PALN_TYPE.DAILY) {
          learnScreen = screens.DailyActivityPurchase;
        } else if (pricing_plan?.plan_work_type === PALN_TYPE.MONTHLY) {
          learnScreen = screens.WorkShopPurchase;
        } else if (pricing_plan?.plan_work_type === PALN_TYPE.WEEKLY) {
          learnScreen = screens.ClassPurchase;
        }
      }
      return (
        pricing_plan && (
          <TouchableOpacity
            style={{
              ...s.boxWrap,
              borderColor: is_Selected ? item?.border_color : colors.borderColor,
              opacity: isPurchasedPlan && !isDemo ? 0.5 : 1,
            }}
            key={`plan_${index}_index_${index}`}
            onPress={() => {
              if (!isPurchasedPlan || isDemo) {
                dispatch(setSelectedPlan(purchase_plan))
                if (selectedProduct) {
                  dispatch(setSelectedProduct(null));
                }
              } else {
                toastNotification('Already Purchased');
              }
            }}>
            <View style={{ ...s.planHead, backgroundColor: item?.bg_color }}>
              <TextView text={item?.plan} type={'body-one'} style={{ ...s.PlanName, color: item?.text_color }} />
              {is_Selected && <Icon name='check' size={18} color={item?.text_color} />}
            </View>
            <View style={s.containWrap}>
              <View style={s.firstContain}>
                <View>
                  <TextView text={item?.name} type={'body-head'} style={s.palnActivitiy} />
                  <View style={s.ListWrap}>
                    {item?.details?.map((point, i) => {
                      return (
                        <View style={s.ListRow} key={`point_${i}_index`}>
                          <SvgIcon svgs={svgs} name={item?.check_mark_icon} width={12} height={12} />
                          <TextView text={point?.text} type={'caps'} style={s.listText} />
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={s.prizeList}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextView text={`${pricing_plan?.currency}`} type={'caps'} style={s.discountPrizeCurrency} />
                    <TextView
                      text={`${pricing_plan?.currency_symbol}${pricing_plan?.old_price}`}
                      type={'caps'}
                      style={s.discountPrize}
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextView text={`${pricing_plan?.currency}`} type={'sub-title'} style={s.prizeCurrency} />
                    <TextView
                      text={`${pricing_plan?.currency_symbol}${pricing_plan?.final_price}`}
                      type={'sub-title'}
                      style={s.prizeAmount}
                    />
                  </View>
                  {hasTax && <TextView text={'+TAX'} style={s.tax} />}
                </View>
              </View>
              <View style={s.lernWrap}>
                <Button
                  style={{ ...s.btnWrap, backgroundColor: item?.bg_color }}
                  onPress={
                    !isPurchasedPlan || isDemo
                      ? () => {
                          navigation.navigate(learnScreen, { plan: pricing_plan });
                        }
                      : null
                  }>
                  <TextView text={'Learn More'} type={'caps'} style={{ ...s.learnText, color: item?.text_color }} />
                  <Icon name='chevron-right' size={10} color={item?.text_color} style={s.btnicon} />
                </Button>
                <View style={s.TimeView}>
                  <SvgIcon svgs={svgs} name={'time-watch'} width={11} height={11} />
                  <TextView text={item?.duration} type={'caps'} style={s.listText} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      );
    });
  }, [currentUser?.User_Plan_Master, dispatch, navigation, plan?.PlanList, selectedPlan?.plan_work_type, selectedProduct]);

  const productList = useMemo(() => {
    if (products?.ProductList?.length > 0) {
      return (
        <View>
          <View style={s.rowlisttwo}>
            <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
            <TextView text={'Other Products'} type={'body'} style={s.headerText} />
          </View>
          {products?.ProductList?.map((product, index) => {
            const isSelected = product?.product_id === selectedProduct?.product_id;
            const product_img = product?.product_image_list ? product?.product_image_list[0].product_image : '';
            return (
              <TouchableOpacity
                style={[s.bookBoxWrap, { borderColor: isSelected ? product?.border_color : colors.borderColor }]}
                key={`product_${product?.product_id}_index_${index}`}
                onPress={() => {
                  onPressProduct(product);
                }}>
                <View style={s.BookHead}>
                  <TextView text={product?.product_title} type={'body-one'} style={s.BookText} />
                  {isSelected && <Icon name='check' size={18} color={colors.black} />}
                </View>
                <View style={s.containBookWrap}>
                  <View style={s.rowBook}>
                    <View style={s.bookView}>
                      <Image source={{ uri: product_img }} resizeMode='cover' style={s.bookImg} />
                    </View>
                    <View style={s.rightBook}>
                      {product?.extra?.details?.map((point, i) => {
                        return (
                          <View style={s.ListRow} key={`product_Point_${i}_index`}>
                            <SvgIcon svgs={svgs} name={'black-mark'} width={12} height={12} />
                            <TextView text={point} type={'caps'} style={s.listText} />
                          </View>
                        );
                      })}
                      <View style={s.AmountView}>
                        <View style={s.amoutView}>
                          <TextView text={`₹${Number(product?.discount_price)}`} type={'body-two'} style={s.LAmount} />
                          <TextView
                            text={`₹${Number(product?.product_price)}`}
                            type={'caption-one'}
                            style={s.RAmount}
                          />
                        </View>
                        <View>
                          <TextView text={`Plus ₹${product?.delivery_charges} Delivery Charge`} style={s.deliveytext} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return null;
  }, [onPressProduct, products, selectedProduct?.product_id]);

  const helplineNumber = '+91 63 5656 3262';
  const onPressHelplineNumber = useCallback(() => {
    Linking.openURL(`tel:${helplineNumber.replaceAll(' ', '')}`);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={AppStyles.root}>
      <View style={s.rootScreen}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
          {PricingPlan}
          <View style={s.noteWrap}>
            <TextView text={'Note: '} type={'caps'} style={s.noteText} />
            <TextView
              text={'Material Kit Shipment Charges are Excluded for International Client.'}
              type={'caps'}
              style={s.notecaps}
            />
          </View>
          <View style={s.quotesWrap}>
            <ImageBackground source={require('../../assets/img/prizequotes.png')} resizeMode='cover'>
              <View style={s.textview}>
                <View style={s.firstTextRow}>
                  <TextView text={translate('purchase_tag_line_1')} type={'body-one'} style={s.qouteshead} />
                </View>
                <TextView text={translate('purchase_tag_line_2')} type={'body-one'} style={s.captionText} />
              </View>
            </ImageBackground>
          </View>
          {productList}
          <View style={s.helpRow}>
            <SvgIcon svgs={svgs} name={'help-icon'} width={20} height={18} style={s.smileicon} />
            <TextView text={'Helpline No.: '} type={'caps-one'} style={s.helptext} />
            <TouchableOpacity onPress={onPressHelplineNumber}>
              <TextView text={helplineNumber} type={'caps-one'} style={s.numtex} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={s.btnview}>
          <Button style={s.btnplan} onPress={onPressPay}>
            <TextView style={s.btntextmain} type={'body'} text={`Pay ${price}`} />
            <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PremiumPlanScreen;
