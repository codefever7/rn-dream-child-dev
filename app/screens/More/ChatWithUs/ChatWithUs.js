import HeaderButton from '../../../components/HeaderButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import s from './styles';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFeedback, getUserFeedbackList } from '@app/services/userService';
import { isIOS, RESPONSE_STATUS } from '@app/constants/constant';
import Icon from '@app/components/Icon';
import { getUniqueId, isEmpty, toastNotification } from '@app/helpers/helpers';
import { updateUserFeedbackListItem } from '@app/actions/userActions';
import AppAvtar from '@app/components/Avtar/AppAvtar';
import moment from 'moment';
import Loading from '@app/components/Loading';
import { updateNotificationItem } from '@app/actions/notificationActions';
import { changeNotificationStatus } from '@app/services/notificationService';

const ChatWithUs = ({ route, navigation }) => {
  const { params } = route;
  const scrollViewRef = useRef();
  const userSelector = useSelector((state) => state.user);
  const { userFeedbackList, currentUser } = userSelector;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const notificationStatusChange = useCallback(
    async (notification) => {
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
    },
    [dispatch],
  );

  const loadData = useCallback(
    async (isrefreshing = false) => {
      try {
        if (isrefreshing) setIsRefreshing(true);
        setLoading(true);
        if (params?.message) {
          setMessage(params?.message);
        }
        if (
          params?.notification &&
          Number(params?.notification?.is_read_notification) === Number(RESPONSE_STATUS.FAIL)
        ) {
          notificationStatusChange(params?.notification);
        }
        const result = await dispatch(getUserFeedbackList());
        if (result) {
          setLoading(false);
          if (isrefreshing) setIsRefreshing(false);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, notificationStatusChange, params?.message, params?.notification],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => {
              navigation.goBack();
            }}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Chat with us'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'refresh-cw'}
            onPress={() => loadData()}
            color={colors.dimGray}
            style={s.refreshIcon}
            isFeather={true}
          />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [loadData, navigation]);

  const renderItem = useCallback(
    ({ item }) => {
      const isFrom = Number(item?.from_id) === Number(RESPONSE_STATUS.SUCCESS);
      return (
        <>
          {isFrom ? (
            <View style={s.leftWrap}>
              <View style={s.messageBox}>
                <AppAvtar Size={25} style={s.leftImg} TextType={'title'} />
                <View style={s.chatBox}>
                  <TextView text={item?.message} type={'caps-one'} style={s.messageText} />
                  <TextView text={item?.entry_date} type={'caps'} style={s.timeText} />
                </View>
              </View>
            </View>
          ) : (
            <>
              <View style={s.rightWrap}>
                <View style={s.messageBox}>
                  <View style={s.chatBoxRight}>
                    <TextView text={item?.message} type={'caps-one'} style={s.messageRightText} />
                    <TextView text={item?.entry_date} type={'caps'} style={s.timeTextRight} />
                  </View>
                  <AppAvtar
                    Imgsrc={currentUser?.User_Detail?.UserImage}
                    Name={`${currentUser?.User_Detail?.UserName} ${currentUser?.User_Detail?.UserLastName}`}
                    style={s.leftImg}
                    Size={25}
                    TextType={'title'}
                  />
                </View>
              </View>
            </>
          )}
        </>
      );
    },
    [currentUser?.User_Detail?.UserImage, currentUser?.User_Detail?.UserLastName, currentUser?.User_Detail?.UserName],
  );

  const onSend = useCallback(() => {
    if (isEmpty(message)) {
      toastNotification('Please type message to continue');
      return;
    }
    const item = {
      feedback_id: getUniqueId(),
      user_name: currentUser?.User_Detail?.UserName,
      from_id: '0',
      to_id: '1',
      message: message,
      is_read: '0',
      entry_date: moment().format('YYYY-MM-DD, h:mm A'),
      from_name: '',
    };
    dispatch(updateUserFeedbackListItem({ item }));
    setMessage('');
    let payload = { Message: message };
    dispatch(addUserFeedback(payload));
  }, [currentUser?.User_Detail?.UserName, dispatch, message]);

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={60}>
      <View style={s.mainbg}>
        <View style={s.mainroot}>
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
              keyExtractor={(item, index) => `feedback_id${item?.feedback_id}_index_${index}`}
              renderItem={renderItem}
              data={userFeedbackList?.FeedbackList || []}
            />
          )}
        </View>
        <View style={AppStyles.footerWrapper}>
          <View style={s.btmView}>
            {/* <View style={s.inputWrap}> */}
            {/* <Icon name='emoji-happy' isFeather={false} type='Entypo' size={24} color={colors.grey} style={s.btnicon} /> */}
            <TextInput
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
              multiline={true}
              style={s.inputstyle}
              placeholder='Message here...'
              placeholderTextColor={colors.blackHalfOpacity}
            />
            {/* <Icon name='paperclip' size={24} color={colors.grey} style={s.clipicon} /> */}
            {/* </View> */}
            <TouchableOpacity style={s.send} onPress={onSend}>
              <Icon
                name='send'
                isFeather={false}
                type='materialcommunity'
                size={20}
                color={colors.white}
                // style={s.btnicon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatWithUs;
