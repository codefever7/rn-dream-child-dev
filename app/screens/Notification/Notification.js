import Loading from '@app/components/Loading';
import { NOTIFICATION_TYPE, RESPONSE_STATUS } from '@app/constants/constant';
import screens from '@app/constants/screens';
import { displayNotificationRelativeDate, isEmpty } from '@app/helpers/helpers';
import { trackActivity } from '@app/services/analyticsService';
import { getNotificationList } from '@app/services/notificationService';
import AppStyles from '@app/styles/AppStyles';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, FlatList, RefreshControl, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextView from '../../components/TextView';
import s from './styles';

const NotificationScreen = ({ navigation }) => {
  const notificationSelector = useSelector((state) => state.notification);
  const { notifications, loading } = notificationSelector;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headernotiRow}>
          <TextView text={'Notification'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const result = await dispatch(getNotificationList());
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    trackActivity('view: notifications');
    loadData();
  }, [loadData]);

  const onPressNotification = useCallback(
    async (item) => {
      if (Number(item?.notification_type_id) === NOTIFICATION_TYPE.LINK) {
        Linking.openURL(item?.notification_content);
      } else if (item?.redirect_screen_id === '6') {
        navigation.navigate(screens.ChatWithUs, { notification: item });
      } else {
        navigation.navigate(screens.NotificationDetail, { notification: item });
      }
    },
    [navigation],
  );

  const renderNotification = useCallback(
    ({ item }) => {
      let image = require('../../assets/img/dremlogo.png');
      if (
        Number(item?.notification_type_id) === Number(NOTIFICATION_TYPE.IMAGE) &&
        !isEmpty(item?.notification_content)
      ) {
        image = { uri: item?.notification_content };
      }
      const date = displayNotificationRelativeDate(item?.entry_date);
      return (
        <>
          <TouchableOpacity
            style={Number(item?.is_read_notification) === Number(RESPONSE_STATUS.FAIL) ? s.unreadcardView : s.cardview}
            onPress={() => {
              onPressNotification(item);
            }}>
            <View style={s.cardList}>
              <Image style={s.imgview} source={image} />
              <View style={s.textView}>
                <TextView numberOfLines={1} text={item?.notication_title} type={'body'} style={s.title} />
                <View style={s.cardList}>
                  <TextView numberOfLines={2} text={item?.notification_description} type={'caption'} style={s.time} />
                </View>
              </View>
              <View style={s.timeView}>
                <TextView text={date} style={s.timeText} />
              </View>
            </View>
          </TouchableOpacity>
        </>
      );
    },
    [onPressNotification],
  );

  return loading && isEmpty(notifications) ? (
    <Loading />
  ) : (
    <SafeAreaView style={s.root}>
      <View style={s.maincontain}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
          keyExtractor={(item, index) => `folder${item?.user_notification_id}_index_${index}`}
          renderItem={renderNotification}
          data={notifications?.NotificationList}
          ListEmptyComponent={
            <View>
              <TextView text={'Notification Data not Found'} type={'body-head'} style={s.headText} />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};
export default NotificationScreen;
