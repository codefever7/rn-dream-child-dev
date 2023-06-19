import { updateNotificationItem } from '@app/actions/notificationActions';
import HeaderButton from '@app/components/HeaderButton';
import Loading from '@app/components/Loading';
import { NOTIFICATION_TYPE, RESPONSE_STATUS } from '@app/constants/constant';
import { fromBase64 } from '@app/helpers/helpers';
import { changeNotificationStatus } from '@app/services/notificationService';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, ScrollView, Platform, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modalbox';
import RenderHTML from 'react-native-render-html';
import { useDispatch } from 'react-redux';
import TextView from '../../components/TextView';
import { setIsNotification } from '../LoadingScreen';
import s from './styles';

const NotificationDetailScreen = ({ route, navigation }) => {
  const [isShowImage, setIsShowImage] = useState(false);

  const { notification } = route.params;
  const { width } = useWindowDimensions();
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
          <View style={s.headernotiRow}>
            <TextView text={notification?.notication_title} numberOfLines={2} type={'body-two'} style={s.headerText} />
          </View>
        </View>
      ),

      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [notification?.notication_title, navigation]);

  const images = useMemo(() => {
    return [
      {
        url: notification?.notification_content,
      },
    ];
  }, [notification?.notification_content]);

  const loadData = useCallback(async () => {
    setIsNotification(false);
    if (Number(notification?.is_read_notification) !== Number(RESPONSE_STATUS.SUCCESS)) {
      const payload = {
        UserNotificationId: notification?.user_notification_id,
        NotificationId: notification?.notification_id,
      };
      const result = await dispatch(changeNotificationStatus(payload));
      if (result) {
        dispatch(
          updateNotificationItem({
            id: notification?.user_notification_id,
            propsName: 'is_read_notification',
            value: '1',
          }),
        );
      }
    }
  }, [dispatch, notification]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadingComponent = useCallback(() => {
    return (
      <View>
        <Loading />
      </View>
    );
  }, []);

  console.log('notification', notification);

  const notificationData = useMemo(() => {
    switch (Number(notification?.notification_type_id)) {
      case NOTIFICATION_TYPE.TEXT:
        return (
          <RenderHTML
            contentWidth={width}
            source={{ html: fromBase64(notification?.notification_content) }}
            tagsStyles={s.imgcaps}
          />
        );
      case NOTIFICATION_TYPE.IMAGE:
        return (
          <TouchableOpacity
            style={s.videoimg}
            onPress={() => {
              setIsShowImage(true);
            }}>
            <Image style={s.videoimg} source={{ uri: notification?.notification_content }} resizeMode='contain' />
          </TouchableOpacity>
        );
      default:
        break;
    }
  }, [notification?.notification_content, notification?.notification_type_id, width]);

  return (
    <>
      <SafeAreaView style={s.root}>
        <ScrollView>
          <View style={s.maincontain}>
            <TextView text={notification?.notification_description} type={'body'} style={s.onlytext} />
            <View style={s.notiimg}>{notificationData}</View>
            {/* <View style={s.notiimg}>
              <TextView text={'Viverra risus mauris congue sollicitudin'} type={'body'} style={s.notitext} />
              <View style={s.videoimg}></View>
              <TextView
                text={
                  'Nisi, dignissim elit amet metus, aliquam aenean cursus ut at. Risus vulputate at ipsum rhoncus duis nisl. Proin phasellus sed pharetra pellentesque tempor, velit.'
                }
                type={'caption'}
                style={s.imgcaps}
              />
            </View> */}
            {/* <View style={s.notiimg}>
              <TextView text={'New Class is Updated in Class Section'} type={'body'} style={s.notitext} />
              <View style={s.videoimg}>
                <Image style={s.videoimg} source={require('../../assets/img/videocreation.png')} />
                <View style={s.playbtnbg}>
                  <SvgIcon svgs={svgs} name={'play-icon'} width={14} height={18} />
                </View>
              </View>
              <TextView text={'🙏 Namaste Dream Mothers !'} type={'caption'} style={s.imgcaps} />
              <TextView
                text={
                  'Nisi, dignissim elit amet metus, aliquam aenean cursus ut at. Risus vulputate at ipsum rhoncus duis nisl. Proin phasellus sed pharetra pellentesque tempor, velit.'
                }
                type={'caption'}
                style={s.imgcaps}
              />
            </View> */}
          </View>
        </ScrollView>
        <Modal
          swipeToClose={true}
          position={'bottom'}
          style={s.unitmodal}
          isOpen={isShowImage}
          backdrop={true}
          backButtonClose={true}
          entry={'center'}
          onClosed={() => setIsShowImage(false)}>
          <ImageViewer
            imageUrls={images}
            saveToLocalByLongPress={false}
            loadingRender={loadingComponent}
            backgroundColor={colors.transparent}
            renderIndicator={() => {}}
          />
        </Modal>
      </SafeAreaView>
    </>
  );
};
export default NotificationDetailScreen;
