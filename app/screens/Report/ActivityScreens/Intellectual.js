import { View, ScrollView, Image, Platform } from 'react-native';
import React, { useEffect } from 'react';
import s from './styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';

const IntellectualScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.Demo)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Intellectual (IQ)'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerRow}>
          <TextView text={'Day'} type={'caption-two'} style={s.ltext} />
          <View style={s.dayview}>
            <TextView text={'11'} type={'caption-two'} style={s.daytext} />
          </View>
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);
  return (
    <ScrollView style={s.bgview} showsVerticalScrollIndicator={false}>
      <View style={s.root}>
        <View style={s.intelllist}>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewone}>
                <Image style={s.imgscreen} source={require('../../../assets/img/mombook.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'બૌદ્ધિક વાર્તા'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewtwo}>
                <Image style={s.imgscreen} source={require('../../../assets/img/puzzle.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'કોયડા-ગમ્મત​'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewthree}>
                <Image style={s.imgscreen} source={require('../../../assets/img/books.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'જનરલ નોલેજ વીડિયો'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewfour}>
                <Image style={s.imgscreen} source={require('../../../assets/img/eyeactivity.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'ઈન્દ્રિય એકિટવિટી'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewfive}>
                <Image style={s.imgscreen} source={require('../../../assets/img/alone.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'સુવિચાર મંથન​'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewfive}>
                <Image style={s.imgscreen} source={require('../../../assets/img/swami.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'અઠવાડિક મુખપાઠ'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IntellectualScreen;
