import { View, Image, Platform, Linking } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import TextView from '@app/components/TextView';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaymentMaintenance = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
          <TextView text={'Under Maintenance'} numberOfLines={2} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const helplineNumber = '+91 63 5656 3262';
  const onPressHelplineNumber = useCallback(() => {
    Linking.openURL(
      'https://wa.me/916356563262?text=Hi%2C%20Dreamchild%20Team%2C%20I%20need%20your%20support%20for%20international%20payment.',
    );
  }, []);

  return (
    <View style={AppStyles.root}>
      <View style={s.EmptyWrap}>
        <Image style={s.EmptyImg} source={require('../../assets/img/undermaintence.png')} resizeMode='contain' />
        <View style={s.doneView}>
          <TextView text={'International Payment Getway Under Maintenance'} type={'body-two'} style={s.doneText} />
          <TextView text={'Please contact our executive for more details'} type={'body-one'} style={s.textcaption} />
          <TouchableOpacity style={s.help} onPress={onPressHelplineNumber}>
            <TextView text={helplineNumber} type={'caps-one'} style={s.numtex} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentMaintenance;
