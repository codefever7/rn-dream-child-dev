import React, { useCallback } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, Linking, StatusBar } from 'react-native';
import TextView from '../../components/TextView';
import s from './style';
import { isIOS } from '../../constants/constant';
import { colors } from '@app/styles';
import Icon from '@app/components/Icon';
import Button from '@app/components/Button';

const NewUpdate = ({ route, navigation }) => {
  const { forceUpdate } = route.params;

  const onUpdateButton = useCallback(() => {
    let appLink = 'https://play.google.com/store/apps/details?id=com.weapplinse.dreamchild';
    if (isIOS) {
      appLink = 'https://apps.apple.com/in/app/dreamchild-garbh-sanskar/id1492221776';
    }
    Linking.openURL(appLink);
  }, []);

  const onSkip = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={s.rootUpdate}>
      <View style={s.mainView}>
        <StatusBar backgroundColor={colors.transparent} barStyle={'dark-content'} translucent={true} />
        <View style={s.contentWrapper}>
          <View>
            <Image style={s.logoImg} source={require('../../assets/img/appupdate.png')} />
          </View>

          <View style={s.listtext}>
            <TextView type={'sub-title'} text={'Time to Update'} style={s.titleText} />
            <View style={s.captionView}>
              <TextView type={'body-head'} text={'We added some new stuff and fix'} style={s.paraText} />
              <TextView type={'body-head'} text={'some bugs to make your experience'} style={s.paraText} />
              <TextView type={'body-head'} text={'smooth'} style={s.paraText} />
            </View>
          </View>
          <View style={s.btnview}>
            <Button style={s.btn} onPress={onUpdateButton}>
              <TextView style={s.btntext} type={'body'} text='Update Now' />
              <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
            </Button>
            {!forceUpdate ? (
              <TouchableOpacity style={s.skipbtn} onPress={onSkip} activeOpacity={0.8}>
                <TextView type={'body-head'} text={'Skip'} style={s.defaultbuttonText} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <Image style={s.purimg} source={require('../../assets/img/purplebg.png')} />
      </View>
    </SafeAreaView>
  );
};

export default NewUpdate;
