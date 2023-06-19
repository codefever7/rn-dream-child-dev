import { GCM_SENDER_ID, isIOS, RESPONSE_STATUS } from '@app/constants/constant';
import screens from '@app/constants/screens';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import { isEmpty } from '@app/helpers/helpers';
import { navigationRef } from '@app/navigation/navigators/AppNavigator';
import { setIsNotification } from '@app/screens/LoadingScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { firebase } from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationSubscriber = () => {
  const onRegister = useCallback(async () => {
    const appMessaging = firebase.messaging();
    const token = await appMessaging.getToken();
    await asyncStorageHelpers.setFCMToken(token);
  }, []);

  const onNotification = useCallback((notification) => {
    if (notification?.userInteraction) {
      setIsNotification(true);
      const { data } = notification?.data;
      const notificationData = JSON.parse(data);
      if (
        Number(notificationData?.isExternal) === Number(RESPONSE_STATUS.SUCCESS) &&
        !isEmpty(notificationData?.externalLink)
      ) {
        Linking.openURL(notificationData?.externalLink);
      } else {
        let screen = screens.NotificationDetail;
        let params = { notification: notificationData };
        if (notificationData?.redirect_screen_id === '6') {
          screen = screens.ChatWithUs;
        }
        setTimeout(() => {
          navigationRef?.current?.reset({
            index: 0,
            routes: [
              {
                name: screens.NavigationRoot,
              },
              {
                name: screen,
                params,
              },
            ],
          });
        }, 1050);
      }
    } else {
      PushNotification.localNotification(notification);
    }

    isIOS ? notification.finish(PushNotificationIOS.FetchResult.NoData) : null;
  }, []);

  const configurePushNotification = useCallback(() => {
    PushNotification.configure({
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: onRegister,

      // (required) Called when a remote or local notification is opened or received
      // onNotification: this.onNotification,
      onNotification: onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: GCM_SENDER_ID, //mismo que el de IONIC

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
    PushNotification.requestPermissions(GCM_SENDER_ID);
  }, [onNotification, onRegister]);

  useEffect(() => {
    configurePushNotification();
  }, [configurePushNotification]);
  return null;
};

export default NotificationSubscriber;
