import { BackHandler } from 'react-native';
import { useFocusEffect, useCallback } from '@app/helpers/mockHelpers';

const useBackEffect = (effect, dependencies) => {
  const onFocus = useCallback(
    () => {
      BackHandler.addEventListener('hardwareBackPress', effect);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', effect);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  );

  useFocusEffect(onFocus);
};

export default useBackEffect;
