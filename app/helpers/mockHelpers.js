import { useFocusEffect as useFocusEffectOrig, useIsFocused as useIsFocusedOrig } from '@react-navigation/native';
import { useHeaderHeight as useHeaderHeightOrig } from '@react-navigation/elements';
import {
  useCallback as useCallbackOrig,
  useEffect as useEffectOrig,
  useRef as useRefOrig,
  useState as useStateOrig,
} from 'react';
import { useSafeAreaInsets as useSafeAreaOrig } from 'react-native-safe-area-context';
import {
  useBackHandler as useBackHandlerOrig,
  useDimensions as useDimensionsOrig,
  useAppState as useAppStateOrig,
} from '@react-native-community/hooks';

export const useFocusEffect = (effect) => useFocusEffectOrig(effect);
export const useIsFocused = () => useIsFocusedOrig();
export const useHeaderHeight = () => useHeaderHeightOrig();
export const useCallback = (callback, dependencies) => useCallbackOrig(callback, dependencies);
export const useEffect = (effect, dependencies) => useEffectOrig(effect, dependencies);
export const useRef = (value) => useRefOrig(value);
export const useState = (value) => useStateOrig(value);
export const useSafeArea = () => useSafeAreaOrig();
export const useBackHandler = (handler) => useBackHandlerOrig(handler);
export const useDimensions = () => useDimensionsOrig();
export const useAppState = () => useAppStateOrig();
