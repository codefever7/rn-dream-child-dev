import { View, Image, Platform, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import Icon from '@app/components/Icon';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';

const DemoScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.Report)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'4Q Daily Activity'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerRow}>
          <TextView text={'Day'} type={'caption-two'} style={s.ltext} />
          <View style={s.dayview}>
            <TextView text={'05'} type={'caption-two'} style={s.daytext} />
          </View>
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={s.maincontain}> */}
        <View style={s.root}>
          <View style={s.calnderday}>
            <View style={s.centerview}>
              <View style={s.bgview}>
                <TextView text={'1'} type={'body-one'} style={s.numtext} />
              </View>
              <TextView text={'MON'} type={'caps'} style={s.dayname} />
            </View>
            <View style={s.centerview}>
              <View style={s.bgview}>
                <TextView text={'2'} type={'body-one'} style={s.numtext} />
              </View>
              <TextView text={'Tue'} type={'caps'} style={s.dayname} />
            </View>
            <View style={s.centerview}>
              <View style={s.bgview}>
                <TextView text={'3'} type={'body-one'} style={s.numtext} />
              </View>
              <TextView text={'Wed'} type={'caps'} style={s.dayname} />
            </View>
            <View style={s.centerview}>
              <View style={s.bgview}>
                <TextView text={'4'} type={'body-one'} style={s.numtext} />
              </View>
              <TextView text={'Thu'} type={'caps'} style={s.dayname} />
            </View>
            <View style={s.centerview}>
              <View style={s.bgviewactive}>
                <View style={s.activeday}>
                  <TextView text={'5'} type={'body-one'} style={s.numtext} />
                </View>
                <TextView text={'Fri'} type={'caps'} style={s.activedayname} />
              </View>
            </View>
            <View style={s.centerview}>
              <View style={s.bgview}>
                <TextView text={'6'} type={'body-one'} style={s.numtext} />
              </View>
              <TextView text={'Sat'} type={'caps'} style={s.dayname} />
            </View>
            <View style={s.centerview}>
              <View style={s.bgview}>
                <TextView text={'7'} type={'body-one'} style={s.numtext} />
              </View>
              <TextView text={'Sun'} type={'caps'} style={s.dayname} />
            </View>
          </View>
          <View style={s.dailycard}>
            <View style={s.rowlist}>
              <Image style={s.imgscreen} source={require('../../../assets/img/motivation.png')} resizeMode='cover' />
              <View style={s.textlist}>
                <TextView text={'Daily Motivation'} type={'body-head'} style={s.headerText} />
                <TextView text={'Posuere condimentum dignissim morbi vulputate.'} type={'caps'} style={s.captext} />
              </View>
              <TouchableOpacity style={s.iconview} onPress={() => navigation.navigate(screens.StartPregnancy)}>
                <Icon name='chevron-right' size={18} color={colors.dimGray} style={s.btnicon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={s.activitysec}>
            <View style={s.rowlist}>
              <SvgIcon svgs={svgs} name={'smile-icon'} width={24} height={24} style={s.smileicon} />
              <TextView text={'Daily Activities'} type={'body-head'} style={s.headerText} />
            </View>
            <View style={s.cardlist}>
              <View style={s.spacelist}>
                <TouchableOpacity style={s.card} onPress={() => navigation.navigate(screens.Physical)}>
                  <Image style={s.yogimg} source={require('../../../assets/img/pq.png')} resizeMode='contain' />
                  <TextView text={'Physical (PQ)'} type={'body-head'} style={s.cardtext} />
                </TouchableOpacity>
              </View>
              <View style={s.spacelist}>
                <TouchableOpacity style={s.cardtwo} onPress={() => navigation.navigate(screens.Intellectual)}>
                  <Image style={s.iqimg} source={require('../../../assets/img/iq.png')} resizeMode='contain' />
                  <TextView text={'Intellectual (IQ)'} type={'body-head'} style={s.cardtext} />
                </TouchableOpacity>
              </View>
              <View style={s.spacelist}>
                <TouchableOpacity style={s.cardthree} onPress={() => navigation.navigate(screens.Emotional)}>
                  <Image style={s.eqimg} source={require('../../../assets/img/eq.png')} resizeMode='contain' />
                  <TextView text={'Emotional (EQ)'} type={'body-head'} style={s.cardtext} />
                </TouchableOpacity>
              </View>
              <View style={s.spacelist}>
                <TouchableOpacity style={s.cardfour} onPress={() => navigation.navigate(screens.Spiritual)}>
                  <Image style={s.sqimg} source={require('../../../assets/img/sq.png')} resizeMode='contain' />
                  <TextView text={'Spiritual (SQ)'} type={'body-head'} style={s.cardtext} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={s.activitysec}>
            <View style={s.rowlist}>
              <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
              <TextView text={'Extra Content'} type={'body-head'} style={s.headerText} />
            </View>
            <View style={s.listspace}>
              <View style={s.cardview}>
                <View style={s.cardList}>
                  <Image style={s.imgview} resizeMode='contain' source={require('../../../assets/img/moms.png')} />
                  <View style={s.textView}>
                    <TextView numberOfLines={1} text={'ગભૅ સંસ્કાર સેમિનાર : ભાગ​-૧'} type={'body'} style={s.title} />
                    <View style={s.cardList}>
                      <SvgIcon svgs={svgs} name={'youtube-icon'} width={14} height={14} style={s.ytbicon} />
                      <TextView text={'2 Hour'} type={'caps'} style={s.time} />
                    </View>
                  </View>
                </View>
                <SvgIcon svgs={svgs} name={'lock-icon'} width={14} height={14} style={s.lockicon} />
              </View>
              <View style={s.cardview}>
                <View style={s.cardList}>
                  <Image style={s.imgview} resizeMode='contain' source={require('../../../assets/img/moms.png')} />
                  <View style={s.textView}>
                    <TextView numberOfLines={1} text={'ગભૅ સંસ્કાર સેમિનાર : ભાગ​-૨'} type={'body'} style={s.title} />
                    <View style={s.cardList}>
                      <SvgIcon svgs={svgs} name={'youtube-icon'} width={14} height={14} style={s.ytbicon} />
                      <TextView text={'2 Hour'} type={'caps'} style={s.time} />
                    </View>
                  </View>
                </View>
                <SvgIcon svgs={svgs} name={'lock-icon'} width={14} height={14} style={s.lockicon} />
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DemoScreen;
