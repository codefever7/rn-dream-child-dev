import { View, Image, Platform, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import s from './styles';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';

const AnnoncementsScreens = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.Notification)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Annoncements'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerIcons}>
          <SvgIcon svgs={svgs} name={'share-icon'} width={28} height={28} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);
  return (
    <ScrollView>
      <View style={s.root}>
        <View style={s.maincontain}>
          <View style={s.notiimg}>
            <TextView text={'Viverra risus mauris congue sollicitudin'} type={'body'} style={s.notitext} />
            <View style={s.videoimg}></View>
            <TextView
              text={
                'Nisi, dignissim elit amet metus, aliquam aenean cursus ut at. Risus vulputate at ipsum rhoncus duis nisl. Proin phasellus sed pharetra pellentesque tempor, velit.'
              }
              type={'caption'}
              style={s.imgcaps}
            />
          </View>
          <View style={s.notiimg}>
            <TextView text={'New Class is Updated in Class Section'} type={'body'} style={s.notitext} />
            <View style={s.videoimg}>
              <Image style={s.videoimg} source={require('../../assets/img/videocreation.png')} />
              <View style={s.playbtnbg}>
                <SvgIcon svgs={svgs} name={'play-icon'} width={14} height={18} />
              </View>
            </View>
            <TextView text={'🙏 Namaste Dream Mothers !'} type={'caption'} style={s.imgcaps} />
            <TextView
              text={
                'Nisi, dignissim elit amet metus, aliquam aenean cursus ut at. Risus vulputate at ipsum rhoncus duis nisl. Proin phasellus sed pharetra pellentesque tempor, velit.'
              }
              type={'caption'}
              style={s.imgcaps}
            />
          </View>
          <View style={s.notiimg}>
            <TextView
              text={'Aenean ac nisl nunc nisl nunc sagittis consequat nunc.'}
              type={'body'}
              style={s.onlytext}
            />
            <TextView
              text={
                'Nisi, dignissim elit amet metus, aliquam aenean cursus ut at. Risus vulputate at ipsum rhoncus duis nisl. Proin phasellus sed pharetra pellentesque tempor, velit.'
              }
              type={'caption'}
              style={s.imgcaps}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnnoncementsScreens;
