import AsyncStorage from '@react-native-community/async-storage';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';

it('should remove token', async () => {
  await asyncStorageHelpers.removeAuthToken();
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith('DCToken');
});

it('should set token', async () => {
  await asyncStorageHelpers.setAuthToken('token');
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('DCToken', 'token');
});

it('should get token', async () => {
  await asyncStorageHelpers.getAuthToken('token');
  expect(AsyncStorage.getItem).toHaveBeenCalledWith('DCToken');
});
