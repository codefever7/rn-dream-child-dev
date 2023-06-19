import { BackHandler } from 'react-native';
import useBackEffect from '@app/hooks/useBackEffect';
import * as mockHelpers from '@app/helpers/mockHelpers';

mockHelpers.useFocusEffect = jest.fn();
mockHelpers.useCallback = jest.fn();
BackHandler.addEventListener = jest.fn();
BackHandler.removeEventListener = jest.fn();

const effect = jest.fn();
const dependencies = [];

it('should subscribe', () => {
  useBackEffect(effect, dependencies);
  mockHelpers.useCallback.mock.calls[0][0]();
  expect(BackHandler.addEventListener).toHaveBeenCalled();
});

it('should unsubscribe', () => {
  useBackEffect(effect, dependencies);
  const unsubscribe = mockHelpers.useCallback.mock.calls[0][0]();
  unsubscribe();
  expect(BackHandler.removeEventListener).toHaveBeenCalled();
});
