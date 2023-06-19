import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator, { navigationRef } from '@app/navigation/navigators/AppNavigator';
import { StatusBar, LogBox } from 'react-native';
import { appInit } from '@app/helpers/appInitHelpers';
import { store } from '@app/helpers/storeHelpers';
import Offline from '@app/components/Offline/Offline';
import { colors } from '@app/styles';
import Loading from '@app/components/Loading';
import { setupToken } from '@app/utils/authTokenHelpers';
import NotificationSubscriber from '@app/components/NotificationSubscriber/NotificationSubscriber';
import { isIOS } from '@app/constants/constant';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Orientation.lockToPortrait();
    async function init() {
      try {
        const token = await setupToken();
        if (token) {
          await store.dispatch(appInit());
        }
      } catch (e) {
        console.log('ERROR', e);
      } finally {
        setLoading(false);
      }
    }
    init();
    LogBox.ignoreAllLogs();
  }, []);

  if (loading) return <Loading />;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
          <StatusBar barStyle={isIOS ? 'dark-content' : 'light-content'} backgroundColor={colors.primary} />
          <Offline />
          <NotificationSubscriber />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
