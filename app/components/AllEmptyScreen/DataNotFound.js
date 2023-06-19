import { View, Image } from 'react-native';
import React from 'react';
import AppStyles from '@app/styles/AppStyles';
import TextView from '../TextView';
import s from './styles';

const DataNotFound = () => {
  return (
    <View style={AppStyles.root}>
      <View style={s.EmptyWrap}>
        <Image style={s.EmptyImg} source={require('../../assets/img/empty.png')} resizeMode='contain' />
        <View style={s.doneView}>
          <TextView text={'Data Not Found'} type={'body-two'} style={s.doneText} />
        </View>
      </View>
    </View>
  );
};

export default DataNotFound;
