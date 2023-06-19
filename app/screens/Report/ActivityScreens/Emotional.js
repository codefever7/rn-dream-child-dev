import { View, Image, Platform, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import AppStyles from '@app/styles/AppStyles';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import s from './styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';

const EmotionalScreen = ({ navigation }) => {
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
          <TextView text={'Emotional (EQ)'} type={'body-two'} style={s.headerText} />
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
              <View style={s.imgviewfive}>
                <Image style={s.imgscreen} source={require('../../../assets/img/savad.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'ગભૅ સંવાદ'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewtwo}>
                <Image style={s.imgscreen} source={require('../../../assets/img/prayer.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'સદ્ગુણ વાર્તા​'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewone}>
                <Image style={s.imgscreen} source={require('../../../assets/img/songs.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'ગીત​-સંગીત​'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewfour}>
                <Image style={s.imgscreen} source={require('../../../assets/img/withchild.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'મનન વીડિયો & પ્રશ્નોતરી'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
          <View style={s.spacelist}>
            <View style={s.card}>
              <View style={s.imgviewthree}>
                <Image style={s.imgscreen} source={require('../../../assets/img/babyboy.png')} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={'લાગણી વીડિયો​'} type={'body'} style={s.imgtext} />
              </View>
            </View>
          </View>
        </View>
        <View style={s.acsection}>
          <View style={s.rowlisttwo}>
            <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
            <TextView text={'Fixed Activities'} type={'body'} style={s.headerText} />
          </View>
          <View style={s.cardview}>
            <View style={s.cardList}>
              <Image style={s.imgvideo} resizeMode='contain' source={require('../../../assets/img/moms.png')} />
              <View style={s.textView}>
                <TextView numberOfLines={1} text={'હાલરડું'} type={'body'} style={s.title} />
                <View style={s.cardList}>
                  <SvgIcon svgs={svgs} name={'youtube-icon'} width={14} height={14} style={s.ytbicon} />
                  <TextView numberOfLines={1} text={'20 Minutes'} type={'caption'} style={s.time} />
                </View>
              </View>
            </View>
          </View>
          <View style={s.cardview}>
            <View style={s.cardList}>
              <Image style={s.imgvideo} resizeMode='contain' source={require('../../../assets/img/moms.png')} />
              <View style={s.textView}>
                <TextView numberOfLines={1} text={'વિઝ્યુલાઈઝેશન અને ઓટો સજેશન'} type={'body'} style={s.title} />
                <View style={s.cardList}>
                  <SvgIcon svgs={svgs} name={'youtube-icon'} width={14} height={14} style={s.ytbicon} />
                  <TextView numberOfLines={1} text={'20 Minutes'} type={'caption'} style={s.time} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmotionalScreen;
