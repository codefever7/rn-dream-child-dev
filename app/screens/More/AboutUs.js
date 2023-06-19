import { View, Platform, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import s from './styles';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import TextView from '@app/components/TextView';
import { useDispatch, useSelector } from 'react-redux';
import { getAppVersion, getSocialList } from '@app/services/userService';
import { getModel, getSystemVersion } from 'react-native-device-info';
import VersionNumber from 'react-native-version-number';
import Loading from '@app/components/Loading';
import { trackActivity } from '@app/services/analyticsService';
import SvgIcon from 'react-native-svg-icon';
import svgs from '../../assets/svg';

const AboutUsScreens = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { socialList, appDetail, loading } = userSelector;
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    const AppVersion = VersionNumber.appVersion;
    const payload = {
      DeviceModel: getModel(),
      DeviceVersion: getSystemVersion(),
      AppVersion,
      DeviceType: Platform.OS,
    };
    await dispatch(getAppVersion(payload));
    dispatch(getSocialList());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.More)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'About Us'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  return loading && !appDetail ? (
    <Loading />
  ) : (
    <View style={s.mainbg}>
      <ScrollView>
        {appDetail?.about_us?.concept_by && (
          <View style={s.aboutRow}>
            <View style={s.aboutbg}>
              <SvgIcon svgs={svgs} name={'sun-icon'} width={20} height={20} />
            </View>
            <View style={s.introView}>
              <TextView text={'Concept by'} type={'body-one'} style={s.graytext} />
              <TextView text={appDetail?.about_us?.concept_by} type={'body-head'} style={s.blackabout} />
            </View>
          </View>
        )}
        {appDetail?.about_us?.founders && (
          <View style={s.aboutRow}>
            <View style={s.aboutbg1}>
              <SvgIcon svgs={svgs} name={'contact-icon'} width={20} height={20} />
            </View>
            <View style={s.introView}>
              <TextView text={'Founders'} type={'body-one'} style={s.graytext} />
              {appDetail?.about_us?.founders?.map((item, index) => {
                return <TextView key={`index_${index}`} text={item?.name} type={'body-head'} style={s.blackabout} />;
              })}
            </View>
          </View>
        )}
        {appDetail?.about_us?.vision && (
          <View style={s.aboutRow}>
            <View style={s.aboutbg2}>
              <SvgIcon svgs={svgs} name={'eyemore-icon'} width={20} height={20} />
            </View>
            <View style={s.introView}>
              <TextView text={'Vision'} type={'body-one'} style={s.graytext} />
              <TextView text={appDetail?.about_us?.vision} type={'body-head'} style={s.blackabout} />
            </View>
          </View>
        )}
        {appDetail?.about_us?.mission && (
          <View style={s.lastrow}>
            <View style={s.aboutbg3}>
              <SvgIcon svgs={svgs} name={'targetmore-icon'} width={20} height={20} />
            </View>
            <View style={s.introView2}>
              <TextView text={'Mission'} type={'body-one'} style={s.graytext} />
              <TextView text={appDetail?.about_us?.mission} type={'body-head'} style={s.blackabout} />
            </View>
          </View>
        )}
        <View style={s.socialSection}>
          <TextView text={'Connect with us'} type={'head-line'} style={s.conectext} />
          <View style={s.socialview}>
            {socialList?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={s.circle}
                  key={`connect_${item?.social_id}_index_${index}`}
                  onPress={
                    item?.social_link
                      ? () => {
                          trackActivity('connect with us clicked', {
                            platfrom: item?.title,
                            place: 'About us',
                          });
                          Linking.openURL(item?.social_link);
                        }
                      : null
                  }>
                  <Image style={s.socialimg} source={{ uri: item?.social_icon_image }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={s.quotesview}>
          <Image style={s.imgswami} source={require('../../assets/img/pramukhswami.png')} resizeMode='contain' />
          <View style={s.bottomtext}>
            <TextView text={'“In the joy of others, lies our own...”'} type={'body-head'} style={s.quottext} />
            <TextView text={'- H.D.H. Pramukh Swami Maharaj'} type={'caps'} style={s.name} />
          </View>
        </View>
        <Image style={s.purimg} source={require('../../assets/img/purplebg.png')} />
      </ScrollView>
    </View>
  );
};

export default AboutUsScreens;
