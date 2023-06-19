import React, { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screens from '../constants/screens';
import { MoreNavigator, NotificationNavigator, ReportNavigator } from './navigators';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../assets/svg';
import DashboardNavigator from './navigators/DashboardNavigator';
import { colors, fontWeights } from '@app/styles';
import Typography from '@app/styles/Typography';
import { scale } from '@app/utils/scale';
import { useSelector } from 'react-redux';
import { IS_IPHONE_X, RESPONSE_STATUS, STATUS_BAR_HEIGHT, USER_STATUS } from '@app/constants/constant';
import AppStyles from '@app/styles/AppStyles';
import { lessIndent } from '@app/styles/dimensions';

const Tab = createBottomTabNavigator();

export default function NavigationTabs() {
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;

  const hasActivityPaidUser = useMemo(() => {
    const index = currentUser?.User_Plan_Master?.findIndex(
      (x) => x?.plan_work_type === 'Daily' && Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS),
    );
    return index !== -1;
  }, [currentUser?.User_Plan_Master]);

  return (
    <>
      <View style={AppStyles.root}>
        <Tab.Navigator
          initialRouteName={screens.NavigationRoot}
          shifting={false}
          keyboardHidesNavigationBar={Platform.OS !== 'ios'}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === screens.DashboardRoot) {
                iconName = focused ? 'active-dashboard' : 'inactive-dashboard';
              } else if (route.name === screens.ReportRoot) {
                iconName = focused ? 'active-report' : 'inactive-report';
              } else if (route.name === screens.NotificationRoot) {
                iconName = focused ? 'active-notification' : 'inactive-notification';
              } else if (route.name === screens.MoreRoot) {
                iconName = focused ? 'active-more' : 'inactive-more';
              }

              // You can return any component that you like here!
              return (
                <SvgIcon
                  svgs={svgs}
                  name={iconName}
                  width={24}
                  height={24}
                  style={{ marginTop: 11, marginBottom: 3 }}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: '#ffffff',
            inactiveTintColor: '#AC7EB6',
            labelStyle: {
              ...Typography.captionTwo,
              fontWeight: fontWeights.medium,
            },
            style: {
              backgroundColor: colors.primary,
              paddingBottom: 7,
              height: scale(55),
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            },
          }}>
          <Tab.Screen
            name={screens.DashboardRoot}
            component={DashboardNavigator}
            options={{
              tabBarLabel: 'Dashboard',
            }}
          />
          {hasActivityPaidUser && Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT) && (
            <Tab.Screen
              name={screens.ReportRoot}
              component={ReportNavigator}
              options={{
                tabBarLabel: 'Report',
              }}
            />
          )}
          <Tab.Screen
            name={screens.NotificationRoot}
            component={NotificationNavigator}
            options={{
              tabBarLabel: 'Notification',
            }}
          />
          <Tab.Screen
            name={screens.MoreRoot}
            component={MoreNavigator}
            options={{
              tabBarLabel: 'More',
            }}
          />
        </Tab.Navigator>
      </View>
      <View style={s.customizeSafeAreaView} />
    </>
  );
}

const s = StyleSheet.create({
  customizeSafeAreaView: {
    flex: 0,
    backgroundColor: colors.primary,
    paddingBottom: IS_IPHONE_X ? STATUS_BAR_HEIGHT - lessIndent : 0,
  },
});
