import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '@app/screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.DashboardRoot}>
      <Stack.Screen name={screens.Dashboard} component={DashboardScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
