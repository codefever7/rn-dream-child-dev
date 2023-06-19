import React from 'react';
import screens from '../../constants/screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MoreScreen from '../../screens/More/More';
import { colors, fontSizes, fontWeights } from '../../styles';

const Stack = createStackNavigator();

const MoreNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.MoreRoot}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={screens.More}
        component={MoreScreen}
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.backgroundColor },
          headerTitleStyle: {
            color: colors.midBlack,
            fontSize: fontSizes.bodyTwo,
            fontWeight: fontWeights.bold,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
