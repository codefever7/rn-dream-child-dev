import { Image, Platform, RefreshControl, ScrollView, Share, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import s from './styles';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '@app/services/orderService';
import Loading from '@app/components/Loading';
import { ORDER_STATUS, ORDER_TYPE } from '@app/constants/constant';
import { setOrderDetail } from '@app/actions/orderActions';
import { PERMISSIONS, request } from 'react-native-permissions';
import { downloadFile, isEmpty, toastNotification } from '@app/helpers/helpers';
import RNFetchBlob from 'react-native-blob-util';

const OrderDetailScreens = ({ route, navigation }) => {
  let completeCount = 0;
  const OrderId = route.params?.OrderId;
  const orderSelector = useSelector((state) => state.order);
  const { loading, orderDetail } = orderSelector;
  const [isRefreshing, setIsRefreshing] = useState(false);
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
            onPress={() => navigation.navigate(screens.MyOrders)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Order Detail'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const payload = {
        OrderId,
        IsOrderStatusChange: 0,
      };
      const result = await dispatch(getOrderDetail(payload));
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
      }
    },
    [OrderId, dispatch],
  );

  useEffect(() => {
    loadData();
    return () => {
      dispatch(setOrderDetail(null));
    };
  }, [dispatch, loadData]);

  const getDeliveryStatusIndex = useMemo(() => {
    const statusIndex = orderDetail?.DeliveryStatus?.findIndex(
      (x) => x?.order_delivery_status_id === orderDetail?.OrderDetail?.order_delivery_status_id,
    );
    return statusIndex;
  }, [orderDetail]);

  const isShowOrderStatus = useMemo(() => {
    return (
      (Number(orderDetail?.OrderDetail?.order_type) === ORDER_TYPE.PLAN_AND_PRODUCT ||
        Number(orderDetail?.OrderDetail?.order_type) === ORDER_TYPE.PRODUCT ||
        Number(orderDetail?.OrderDetail?.order_type) === ORDER_TYPE.PLAN_AND_KIT) &&
      Number(orderDetail?.OrderDetail?.order_status) === ORDER_STATUS.SUCCESS
    );
  }, [orderDetail?.OrderDetail?.order_status, orderDetail?.OrderDetail?.order_type]);

  const onPressDownloadInvoice = useCallback(() => {
    let url = orderDetail?.OrderDetail?.pdf_invoice;
    if (Platform.OS === 'android') {
      let permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      request(permission).then((result) => {
        if (result === 'granted') {
          downloadFile(url);
        }
      });
    } else {
      let base64Type, imagePath;
      const { config, fs } = RNFetchBlob;
      let filetype = orderDetail?.OrderDetail?.pdf_invoice?.substring(
        orderDetail?.OrderDetail?.pdf_invoice?.lastIndexOf('.') + 1,
      );
      base64Type = `application/${filetype}`;

      toastNotification('Please wait...', false);
      config({
        fileCache: true,
      })
        .fetch('GET', url)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then((base64Data) => {
          // here's base64 encoded image
          var imageUrl = 'data:' + base64Type + ';base64,' + base64Data;
          let shareImage = {
            url: imageUrl,
          };
          Share.open(shareImage)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log('err', err);
            });
          // remove the file from storage
          return fs.unlink(imagePath);
        });
    }
  }, [orderDetail?.OrderDetail?.pdf_invoice]);

  const isInvoiceNo = useMemo(() => {
    return orderDetail?.OrderDetail?.invoice_no === '' || Number(orderDetail?.OrderDetail?.invoice_no) === 0;
  }, [orderDetail?.OrderDetail?.invoice_no]);

  return loading && !orderDetail ? (
    <Loading />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={s.mainbg}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            loadData(true);
          }}
        />
      }>
      <View style={s.mainroot}>
        <View style={s.imgview}>
          <Image style={s.orderImage} source={require('../../../assets/img/order.png')} resizeMode='contain' />
        </View>
        <View style={s.rowlist}>
          <View style={s.rowView}>
            <TextView text={'Order No:'} type={'caption-two'} style={s.capsText} />
            <TextView text={`#${orderDetail?.OrderDetail?.order_id}`} type={'body-head'} style={s.ordercode} />
          </View>
          <TextView text={orderDetail?.OrderDetail?.order_date} type={'caption-two'} style={s.capsText} />
        </View>
        <View style={s.orderView1}>
          <View style={s.orderrow}>
            <View style={[s.lview, isInvoiceNo && s.rowview]}>
              <TextView
                text={'GST No:'}
                type={'caption-two'}
                style={[s.titledate, isInvoiceNo && { paddingRight: 10 }]}
              />
              <TextView text={`${orderDetail?.OrderDetail?.GST_NO}`} type={'body-head'} style={s.detaildate} />
            </View>
            {!isInvoiceNo && (
              <View style={s.rview}>
                <TextView text={'Invoice No:'} type={'caption-two'} style={s.titledate} />
                <TextView text={orderDetail?.OrderDetail?.invoice_no} type={'body-head'} style={s.detaildate} />
              </View>
            )}
          </View>
        </View>
        <View style={s.orderView}>
          <View style={s.orderrow}>
            <View style={s.lview}>
              <TextView text={'Order Date'} type={'caption-two'} style={s.titledate} />
              <TextView text={orderDetail?.OrderDetail?.order_date} type={'body-head'} style={s.detaildate} />
            </View>
            <View style={s.rview}>
              <TextView text={'Order Amount'} type={'caption-two'} style={s.titledate} />
              <TextView text={`₹ ${orderDetail?.OrderDetail?.order_amount}`} type={'body-head'} style={s.detaildate} />
            </View>
          </View>
        </View>
        <View style={s.borderDetail1}>
          <View style={s.bgprimary}>
            <TextView text={'Order Items'} type={'body-head'} style={s.titleText} />
          </View>
          {orderDetail?.OrderDetail?.order_product_list?.map((product, index) => {
            return (
              <View style={s.listrow} key={`product_${product?.order_content_id}_index_${index}`}>
                <View style={s.rowView}>
                  <TextView text={product?.product_title} type={'caption-two'} style={s.capsText} />
                  {/* <TextView text={'(X1)'} type={'body-head'} style={s.namex} /> */}
                </View>
                <TextView text={`₹ ${product?.final_total_price}`} style={s.prize} />
              </View>
            );
          })}
        </View>
        <View style={s.borderDetail}>
          <View style={s.bgprimary}>
            <TextView text={'Order Summary'} type={'body-head'} style={s.titleText} />
          </View>
          <View style={s.summarylist}>
            <View style={s.summaryRow}>
              <TextView text={'Sub Total'} type={'caption-two'} style={s.capsText} />
              <TextView text={`₹ ${orderDetail?.OrderDetail?.sub_total}`} type={'body-head'} style={s.capsText} />
            </View>
            <View style={s.summaryRow}>
              <TextView text={'Tax'} type={'caption-two'} style={s.capsText} />
              <TextView text={`₹ ${orderDetail?.OrderDetail?.service_tax}`} type={'body-head'} style={s.capsText} />
            </View>
            <View style={s.summaryRow}>
              <TextView text={'Delivery Charge'} type={'caption-two'} style={s.capsText} />
              <TextView text={`₹ ${orderDetail?.OrderDetail?.shipping_charge}`} type={'body-head'} style={s.capsText} />
            </View>
            <View style={s.summaryRow}>
              <TextView text={'Discount'} type={'caption-two'} style={s.capsText} />
              <TextView text={`₹ ${orderDetail?.OrderDetail?.discount_amount}`} type={'body-head'} style={s.capsText} />
            </View>
          </View>
          <View style={s.btmview}>
            <TextView text={'Total Amount'} type={'body-head'} style={s.prize} />
            <TextView text={`₹ ${orderDetail?.OrderDetail?.order_amount}`} type={'body-head'} style={s.prize} />
          </View>
        </View>
        {isShowOrderStatus && (
          <View style={s.borderDetailwo}>
            <View style={s.bgprimary}>
              <TextView text={'Order Status'} type={'body-head'} style={s.titleText} />
            </View>
            <View style={s.secondlist}>
              <View style={s.statusrow}>
                {orderDetail?.DeliveryStatus?.map((status, index) => {
                  if (getDeliveryStatusIndex > index && completeCount < 80) {
                    completeCount = completeCount + 20;
                  }
                  return (
                    <>
                      <View style={s.iconlist} key={`status_${status?.order_delivery_status_id}_index`}>
                        <SvgIcon
                          svgs={svgs}
                          name={getDeliveryStatusIndex < index ? 'secondchek-icon' : 'primarychek-icon'}
                          width={20}
                          height={20}
                        />
                        <TextView
                          text={status?.delivery_status_name}
                          type={'caps-one'}
                          style={getDeliveryStatusIndex < index ? s.shipsecond : s.shipprimary}
                        />
                      </View>
                      <View style={s.borderView}>
                        <View style={[s.borderDash, { width: `${completeCount}%` }]}></View>
                        <View style={s.borderDashtwo}></View>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
          </View>
        )}
        {!isEmpty(orderDetail?.OrderDetail?.pdf_invoice) && (
          <TouchableOpacity style={s.invoice} onPress={onPressDownloadInvoice}>
            <TextView text={'Download Invoice'} type={'body-head'} style={s.titleText} />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreens;
