import { View, Platform, TouchableOpacity, Linking } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import VersionNumber from 'react-native-version-number';
import { getModel, getSystemVersion } from 'react-native-device-info';
import { getAppVersion } from '@app/services/userService';
import Loading from '@app/components/Loading';
import { trackActivity } from '@app/services/analyticsService';

const ContactUsScreens = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { appDetail, loading } = userSelector;
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
          <TextView text={'Contact Us'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const contactList = useMemo(() => {
    return (
      appDetail?.AppDetail?.contact_list &&
      appDetail?.AppDetail?.contact_list?.length > 0 &&
      appDetail?.AppDetail?.contact_list?.map((item, index) => {
        return (
          <View style={s.aboutRow} key={`contact_list_${item?.app_contact_id}_index_${index}`}>
            <View style={s.aboutbg3}>
              <SvgIcon svgs={svgs} name={'bigcall-icon'} width={20} height={20} />
            </View>
            <View style={s.introView}>
              <TextView text={item?.contact_title} type={'body-one'} style={s.graytext} />
              <TextView text={item?.contact_sub_title} type={'body-one'} style={s.graytext} />
              <TouchableOpacity
                onPress={() => {
                  trackActivity('more: contact us', { type: item?.contact_title, value: item?.contact_no });
                  Linking.openURL(`tel:${item?.contact_no}`);
                }}>
                <TextView text={item?.contact_no} type={'body-head'} style={s.linetext} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })
    );
  }, [appDetail?.AppDetail?.contact_list]);

  const webSiteList = useMemo(() => {
    return (
      appDetail?.AppDetail?.website_list &&
      appDetail?.AppDetail?.website_list?.length > 0 &&
      appDetail?.AppDetail?.website_list?.map((item, index) => {
        return (
          <View style={s.aboutRow} key={`website_list_${item?.app_website_id}_index_${index}`}>
            <View style={s.aboutbg2}>
              <SvgIcon svgs={svgs} name={'globe-icon'} width={20} height={20} />
            </View>
            <View style={s.introView}>
              <TextView text={`${item?.website_title}`} type={'body-one'} style={s.graytext} />
              <TouchableOpacity
                onPress={() => {
                  trackActivity('more: contact us', { type: item?.website_title, value: item?.website });
                  Linking.openURL(`${item?.website}`);
                }}>
                <TextView text={`${item?.website}`} type={'body-head'} style={s.linetext} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })
    );
  }, [appDetail?.AppDetail?.website_list]);

  const emailList = useMemo(() => {
    return (
      appDetail?.AppDetail?.email_list &&
      appDetail?.AppDetail?.email_list?.length > 0 &&
      appDetail?.AppDetail?.email_list?.map((item, index) => {
        return (
          <View style={s.aboutRow} key={`email_list_${item?.app_email_id}_index_${index}`}>
            <View style={s.aboutbg1}>
              <SvgIcon svgs={svgs} name={'mail-icon'} width={20} height={20} />
            </View>
            <View style={s.introView}>
              <TextView text={item?.email_title} type={'body-one'} style={s.graytext} />
              <TouchableOpacity
                onPress={() => {
                  trackActivity('more: contact us', { type: item?.email_title, value: item?.email_id });
                  Linking.openURL(`mailto:${item?.email_id}`);
                }}>
                <TextView text={`${item?.email_id}`} type={'body-head'} style={s.linetext} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })
    );
  }, [appDetail?.AppDetail?.email_list]);

  return loading && !appDetail ? (
    <Loading />
  ) : (
    <View style={s.mainbg}>
      {webSiteList}
      {emailList}
      {contactList}
    </View>
  );
};

export default ContactUsScreens;
