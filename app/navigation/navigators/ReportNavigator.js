import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator } from '@react-navigation/stack';
import ReportScreen from '@app/screens/Report/Report';

const Stack = createStackNavigator();

const ReportNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={screens.ReportRoot}>
      <Stack.Screen name={screens.Report} component={ReportScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default ReportNavigator;
