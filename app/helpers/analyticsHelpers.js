import { APP_ENV } from './../constants/environmentConstants';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

class AnalyticsHelpers {
  useNativeConfiguration = () => {};

  reset = async () => {};

  identify = async (phone, traits = {}) => {
    console.log('identify', phone, traits);
  };

  getAnonymousId = async () => {};

  track = async (event, properties = {}) => {
    const newProperties = this.getCommonProperties(properties);
    console.log('track', event, newProperties);
  };

  userCompletedAction = (event, properties = {}) => {
    const newProperties = this.getCommonProperties(properties);
    console.log('userCompletedAction', event, newProperties);
  };

  getCommonProperties = (properties) => {
    return {
      platform: Platform.OS,
      environment: APP_ENV,
      appVersion: DeviceInfo.getVersion(),
      buildVersion: DeviceInfo.getBuildNumber(),
      deviceId: DeviceInfo.getDeviceId(),
      ...properties,
    };
  };
}

export default new AnalyticsHelpers();
