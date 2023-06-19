import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '@app/screens/Notification/Notification';

const Stack = createStackNavigator();

const NotificationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.NotificationRoot}>
      <Stack.Screen name={screens.Notification} component={NotificationScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default NotificationNavigator;
