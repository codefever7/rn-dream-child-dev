import { Image, View } from 'react-native';
import React from 'react';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import TextView from '../TextView';

const EmptyState = () => {
  return (
    <View style={AppStyles.root}>
      <View style={s.EmptyWrap}>
        <Image style={s.EmptyImg} source={require('../../assets/img/empty.png')} resizeMode='contain' />
        <View style={s.doneView}>
          <TextView text={'Data Not Found'} type={'body-two'} style={s.doneText} />
          <TextView
            text={'Eleifend porta tristique faucibus nunc sed sagittis fermentum.'}
            type={'body-one'}
            style={s.textcaption}
          />
        </View>
      </View>
    </View>
  );
};

export default EmptyState;
