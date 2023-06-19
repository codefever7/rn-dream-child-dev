import { View, Platform, Image } from 'react-native';
import React, { useEffect } from 'react';
import AppStyles from '@app/styles/AppStyles';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import s from './styles';

const PdfDetailsScreens = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerRight: () => (
        <View>
          <HeaderButton
            type={1}
            iconName={'alert-circle'}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
        </View>
      ),
      headerLeft: () => (
        <View style={s.headerIcons}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.Dashboard)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'ગભૅસંસ્કાર'} type={'body-two'} style={s.headtext} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);
  return (
    <View style={s.root}>
      <View style={s.pdfview}>
        <Image style={s.pdfimg} source={require('../../assets/img/pdf.png')} />
      </View>
      <View style={s.pageslide}>
        <View style={s.bgview}>
          <TextView text={'1'} type={'caption'} style={s.pagenumb} />
        </View>
        <TextView text={'Out of'} type={'caption'} style={s.midtext} />
        <View style={s.bgview}>
          <TextView text={'24'} type={'caption'} style={s.pagenumb} />
        </View>
      </View>
    </View>
  );
};

export default PdfDetailsScreens;
