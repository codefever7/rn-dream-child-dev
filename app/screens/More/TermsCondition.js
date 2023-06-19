import { View, Platform, ScrollView, useWindowDimensions, ImageBackground, Image } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fromBase64 } from '@app/helpers/helpers';
import RenderHTML from 'react-native-render-html';
import VersionNumber from 'react-native-version-number';
import { getModel, getSystemVersion } from 'react-native-device-info';
import { getAppVersion } from '@app/services/userService';
import Loading from '@app/components/Loading';

const TermsConditionScreens = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { appDetail, loading } = userSelector;
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const terms_condition = useMemo(() => {
    if (!appDetail) return;
    const privacyPolicy = fromBase64(appDetail?.AppDetail?.terms_condition);
    return privacyPolicy;
  }, [appDetail]);

  const loadData = useCallback(async () => {
    const AppVersion = VersionNumber.appVersion;
    const payload = {
      DeviceModel: getModel(),
      DeviceVersion: getSystemVersion(),
      AppVersion,
      DeviceType: Platform.OS,
    };
    await dispatch(getAppVersion(payload));
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
            onPress={() => {
              navigation.goBack();
            }}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Terms & Condition'} type={'body-two'} style={s.headerText} />
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.mainroot}>
          <View style={s.founderSection}>
            <View style={s.imgview2}>
              <ImageBackground source={require('../../assets/img/policybg.png')} resizeMode='contain' style={s.fondimg}>
                <View style={s.rowlist}>
                  <Image source={require('../../assets/img/termconditon.png')} resizeMode='contain' style={s.termimg} />
                  <View style={s.textcontain}>
                    <TextView text={'Terms & Conditions'} type={'body-head'} style={s.blacktext} />
                    <TextView
                      text={
                        'Please read our terms & condition carefully before using our app, website, all services & all products.'
                      }
                      type={'caps-one'}
                      style={s.talktext}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={s.textlist}>
            <RenderHTML contentWidth={width} source={{ html: terms_condition }} tagsStyles={s.tagsStyles} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditionScreens;
