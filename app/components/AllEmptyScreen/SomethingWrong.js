import { View, Image } from 'react-native';
import React from 'react';
import AppStyles from '@app/styles/AppStyles';
import TextView from '../TextView';
import s from './styles';

const SomethingWrong = () => {
  return (
    <View style={AppStyles.root}>
      <View style={s.EmptyWrap}>
        <Image style={s.EmptyImg} source={require('../../assets/img/wentwrong.png')} resizeMode='contain' />
        <View style={s.doneView}>
          <TextView text={'Something Went Wrong'} type={'body-two'} style={s.doneText} />
          <TextView
            text={'Pull down to refresh app or please check your internet connection.'}
            type={'body-one'}
            style={s.textcaption}
          />
        </View>
      </View>
    </View>
  );
};

export default SomethingWrong;
