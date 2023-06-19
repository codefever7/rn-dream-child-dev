import { View, Platform, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderList } from '@app/services/orderService';
import Loading from '@app/components/Loading';

const MyOrdersScreens = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const orderSelector = useSelector((state) => state.order);
  const { loading, orders } = orderSelector;

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
            onPress={() => navigation.navigate(screens.More)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'My Orders'} type={'body-two'} style={s.headerText} />
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
        PageNo: 1,
      };
      const result = await dispatch(getOrderList(payload));
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderOrderItem = useCallback(
    ({ item }) => {
      return (
        <>
          <TouchableOpacity
            style={s.boxview}
            onPress={() => {
              navigation.navigate(screens.OrderDetail, { OrderId: item?.order_id });
            }}>
            <View style={s.rowlist}>
              <View>
                <TextView text={item?.order_content} type={'body-head'} style={s.headText} />
              </View>
              <TextView text={`₹ ${item?.order_amount}`} type={'body'} style={s.prize} />
            </View>
            <View style={s.secondrow}>
              <View style={s.rowView}>
                <View style={s.leftcaps}>
                  <TextView text={'Order No'} type={'caps-one'} style={s.capshead} />
                  <TextView text={`#${item?.order_id}`} type={'caps-one'} style={s.capsText} />
                </View>
                <View>
                  <TextView text={'Date'} type={'caps-one'} style={s.capshead} />
                  <TextView text={item?.order_date} type={'caps-one'} style={s.capsText} />
                </View>
              </View>
              <TextView
                text={item?.order_status_name}
                type={'caps-one'}
                style={{ ...s.successtext, backgroundColor: item?.order_status_color }}
              />
            </View>
          </TouchableOpacity>
        </>
      );
    },
    [navigation],
  );

  return loading && !orders ? (
    <Loading />
  ) : (
    <View style={s.mainbg}>
      <View style={s.mainroot}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
          keyExtractor={(item, index) => `Order_Item_${item?.order_id}_index_${index}`}
          renderItem={renderOrderItem}
          data={orders?.OrderList}
          ListEmptyComponent={
            <View>
              <TextView text={'Order not Found'} type={'body-head'} style={s.headText} />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default MyOrdersScreens;
