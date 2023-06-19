jest.mock('react-native', () => ({
  NativeModules: {
    RNSmartlookModule: {
      setupAndStartRecording: jest.fn(),
    },
  },
  Platform: {
    OS: 'android',
  },
}));

import { appInit } from '@app/helpers/appInitHelpers';

it('should app init', () => {
  expect(() => {
    appInit();
  }).not.toThrow();
});
