import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Linking,
  Share,
  RefreshControl,
  Platform,
} from 'react-native';
import AppStyles from '@app/styles/AppStyles';
import Modal from 'react-native-modalbox';
import RenderHtml from 'react-native-render-html';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import TextView from '@app/components/TextView';
import s from './styles';
import Icon from '@app/components/Icon';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import AppAvtar from '@app/components/Avtar/AppAvtar';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@app/components/Loading';
import { getSocialList, getUserProfileDetail } from '@app/services/userService';
import { getPlanList } from '@app/services/planService';
import Swiper from 'react-native-swiper';
import {
  DEMO_PLAN_STATUS,
  PLAN,
  RESPONSE_STATUS,
  SLIDER_TYPE,
  UPSELL_IDENTIFIER,
  USER_STATUS,
} from '@app/constants/constant';
import { fromBase64, isEmpty, toastNotification } from '@app/helpers/helpers';
import Touchable from '@app/components/molecules/Touchable';
import ConfirmationModal from '@app/components/ConfirmationModal';
import { translate } from '@app/helpers/appInitHelpers';
import Button from '@app/components/Button';
import { startTrial } from '@app/services/orderService';
import asyncStorageHelpers from '@app/helpers/asyncStorageHelpers';
import HeaderButton from '@app/components/HeaderButton';
import { trackActivity } from '@app/services/analyticsService';
import UpsellCard from '@app/components/UpsellCard/UpsellCard';

const DashboardScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const planSelector = useSelector((state) => state.plan);
  const { currentUser, socialList, popupList, upsellCard } = userSelector;
  const { plan } = planSelector;
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isOpenSpecialModal, setIsOpenSpecialModal] = useState(false);
  const [isOpenDayModal, setIsOpenDayModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cardType, setCardType] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerRight: () => (
        <Touchable
          style={s.headerIcons}
          onPress={() => {
            navigation.navigate(screens.MoreRoot);
          }}>
          <AppAvtar Imgsrc={currentUser?.User_Detail?.UserImage} Name={currentUser?.User_Detail?.UserName} Size={28} />
        </Touchable>
      ),
      headerLeft: () => (
        <View style={s.headerIcons}>
          <SvgIcon svgs={svgs} name={'logo-icon'} width={32} height={32} style={s.logo} />
          <SvgIcon svgs={svgs} name={'dreamchild-name'} width={104} height={15} style={s.headtext} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [currentUser?.User_Detail?.UserImage, currentUser?.User_Detail?.UserName, navigation]);

  const trackDashboardActivity = useCallback((name, params) => {
    trackActivity(name, params);
  }, []);

  const onOpenSpecialModal = useCallback(() => {
    setIsOpenSpecialModal(true);
  }, []);

  const onCloseSpecialModal = useCallback(() => {
    setIsOpenSpecialModal(false);
  }, []);

  const isSpecialOffer = useMemo(() => {
    const isSpecialOffer = upsellCard?.CardList?.find((x) => x.upsell_identifier === UPSELL_IDENTIFIER.SPECIAL_OFFER);
    return isSpecialOffer;
  }, [upsellCard?.CardList]);

  const onOpenDayModal = useCallback(() => {
    setIsOpenDayModal(true);
  }, []);

  const onOpenUpcellCardModal = useCallback(
    (type) => {
      setCardType(type);
      onOpenSpecialModal();
    },
    [onOpenSpecialModal],
  );

  const onCloseDayModal = useCallback(() => {
    setIsOpenDayModal(false);
    if (isSpecialOffer) {
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          onOpenUpcellCardModal(UPSELL_IDENTIFIER.SPECIAL_OFFER);
        }, 500);
      } else {
        onOpenUpcellCardModal(UPSELL_IDENTIFIER.SPECIAL_OFFER);
      }
    }
  }, [isSpecialOffer, onOpenUpcellCardModal]);

  const openPopupBanner = useCallback(async () => {
    const isAppOpenFirstTimeToday = await asyncStorageHelpers.getIsAppOpenFirstTimeToday();
    if (isAppOpenFirstTimeToday) {
      if (!isEmpty(popupList?.PopupList)) {
        onOpenDayModal();
      } else {
        if (isSpecialOffer) {
          onOpenUpcellCardModal(UPSELL_IDENTIFIER.SPECIAL_OFFER);
        }
      }
      await asyncStorageHelpers.setIsAppOpenFirstTimeToday();
    }
  }, [isSpecialOffer, onOpenDayModal, onOpenUpcellCardModal, popupList?.PopupList]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (!isrefreshing) {
        openPopupBanner();
      }
      setLoading(true);
      if (isrefreshing) setIsRefreshing(true);
      const list = [dispatch(getUserProfileDetail())];
      list.push(dispatch(getPlanList()));
      list.push(dispatch(getSocialList()));
      let resultCount = 0;
      Promise.all(list)
        .then((res) => {
          res?.forEach((item) => {
            if (item) {
              resultCount = resultCount + 1;
            }
          });
          if (resultCount === res?.length) {
            setLoading(false);
            if (isrefreshing) setIsRefreshing(false);
          }
        })
        .catch((e) => {
          console.log('e', e);
          setLoading(false);
        });
    },
    [dispatch, openPopupBanner],
  );

  useEffect(() => {
    trackDashboardActivity('view: dashbaord');
    loadData();
  }, [loadData, trackDashboardActivity]);

  const onOpenAlertModal = useCallback(() => {
    setIsOpenAlertModal(true);
  }, []);

  const onCloseAlertModal = useCallback(() => {
    setIsOpenAlertModal(false);
  }, []);

  const onPressPlan = useCallback(
    (item) => {
      const payload = {
        PlanId: item?.plan_id,
        LanguageId: currentUser?.User_Detail?.LanguageId,
        name: item?.plan_name,
      };
      const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.plan_id);
      if (Number(item?.is_paid_plan) === Number(RESPONSE_STATUS.FAIL)) {
        trackDashboardActivity('view: basic section');
        navigation.navigate(screens.FolderView, { item: payload, plan: item });
      } else if (Number(item?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && item?.plan_work_type === 'Daily')
        navigation.navigate(screens.DailyActivity, { item: payload, plan: item });
      else if (item?.plan_work_type === 'Monthly') navigation.navigate(screens.WorkShop, { item: payload, plan: item });
      else if (item?.plan_work_type === 'Weekly') {
        const Condition =
          (Number(currentUser?.User_Detail?.user_daily_work_flow) === Number(RESPONSE_STATUS.SUCCESS) &&
            Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT)) ||
          (Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT) &&
            (currentUser?.User_Detail?.LMPDate !== '0000-00-00' || currentUser?.User_Detail?.EDDDate !== '0000-00-00'));
        if (!planItem || Number(planItem?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS) || Condition) {
          payload.ActivityDay = currentUser?.Current_Week;
          payload.expire_in = planItem?.current_day;
          navigation.navigate(screens.Class, { item: payload, plan: item });
        } else {
          onOpenAlertModal();
        }
      }
    },
    [
      currentUser?.Current_Week,
      currentUser?.User_Detail?.EDDDate,
      currentUser?.User_Detail?.LMPDate,
      currentUser?.User_Detail?.LanguageId,
      currentUser?.User_Detail?.UserStatus,
      currentUser?.User_Detail?.user_daily_work_flow,
      currentUser?.User_Plan_Master,
      navigation,
      onOpenAlertModal,
      trackDashboardActivity,
    ],
  );

  const onShare = async () => {
    try {
      const message = `Welcome to India's Most Trusted Online Garbhsanskar Community!!

      Dream Child Garbhsanskar App is the World's First Mobile App that provides daily activity-based online Garbhsanskar Guidance to attain a Divine and Dynamic Child. Pregnant Lady can Enjoy Daily 25+ Activities, Vedic &Scientific Workshops and Unique Weekly Classes for 9 Months.
      
      Loved by 1,25,000+ Mothers From 33+ Countries !!!
      
      Download Dreamchild GarbhSanskar App:
      (Basic Version is 100% FREE)
      Android: https://bit.ly/dreamchildapp
      iOS: https://bit.ly/dreamchildapp_ios
      
      Youtube (100+ FREE Video) : https://bit.ly/2yCNeTg
      Helpline : https://wa.me/916356563262
      
      www.dreamchild.in`;
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        trackDashboardActivity('app shared');
        if (result.activityType) {
          toastNotification('Share');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismiss');
      }
    } catch (error) {
      toastNotification(error.message);
    }
  };

  const onPressConfirm = useCallback(() => {
    onCloseAlertModal();
    navigation.navigate(screens.StartPregnancy);
  }, [navigation, onCloseAlertModal]);

  const onPressStartDemo = useCallback(async () => {
    const result = await dispatch(startTrial(PLAN.SILVER));
    navigation.navigate(screens.DailyActivity, result);
  }, [dispatch, navigation]);

  const isDemoExist = useMemo(() => {
    let demo = false;
    currentUser?.User_Plan_Master?.map((item) => {
      if (Number(item?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS)) {
        demo = true;
      }
    });
    return demo;
  }, [currentUser?.User_Plan_Master]);

  const isPaidActivityPlan = useMemo(() => {
    const planItem = currentUser?.User_Plan_Master?.find(
      (x) => Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && x?.plan_work_type === 'Daily',
    );
    return planItem ? true : false;
  }, [currentUser?.User_Plan_Master]);

  const isActivityDemoExpire = useMemo(() => {
    const planItem = plan?.PlanList?.find(
      (x) => Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && x?.plan_work_type === 'Daily',
    );
    const item = currentUser?.plan_demo_master?.find((x) => x?.plan_id === planItem?.plan_id);
    return {
      activityPlanItem: planItem,
      isExpire: Number(item?.user_plan_status_demo) === DEMO_PLAN_STATUS.EXPIRE,
      isActive: Number(item?.user_plan_status_demo) === DEMO_PLAN_STATUS.ACTIVE,
      isDemoAvailable: Number(item?.user_plan_status_demo) === DEMO_PLAN_STATUS.DEFAULT,
    };
  }, [currentUser?.plan_demo_master, plan?.PlanList]);

  const demoCard = useMemo(() => {
    if (!isPaidActivityPlan && !isActivityDemoExpire?.isActive) {
      const title = isActivityDemoExpire?.isExpire ? 'Your Trial Expired!!' : 'Get 7 Days FREE Daily Activities';
      const subTitle = isActivityDemoExpire?.isExpire ? 'activity_demo_expire' : 'activity_demo';
      const buttonText = isActivityDemoExpire?.isExpire ? 'Upgrade Plan' : 'Start Now';
      return (
        <View style={s.freeCardWrap}>
          <View style={s.freeRow}>
            <Image source={require('../../assets/img/freeImg.png')} style={s.freeImg} />
            <View style={s.textFreeWrap}>
              <TextView text={title} type={'body'} style={s.freeTextHead} />
              <TextView text={translate(subTitle)} type={'caps'} style={s.daycaps} />
              <Button
                style={s.startNow}
                onPress={() => {
                  if (isActivityDemoExpire?.isExpire) {
                    trackDashboardActivity('upgrade: upgrade plan clicked', {
                      type: isActivityDemoExpire.activityPlanItem?.plan_name,
                    });
                    navigation.navigate(screens.PremiumPlan, { plan: isActivityDemoExpire.activityPlanItem });
                  } else {
                    onOpenUpcellCardModal(UPSELL_IDENTIFIER.START_DEMO_DAILY);
                  }
                }}>
                <TextView text={buttonText} type={'caps'} style={s.startBtn} />
                <Icon name={'chevron-right'} size={12} color={colors.white} style={s.iconRight} />
              </Button>
            </View>
          </View>
          {!isActivityDemoExpire?.isExpire && (
            <Image source={require('../../assets/img/lastfreetag.png')} style={s.tag} />
          )}
        </View>
      );
    }
    return null;
  }, [
    isActivityDemoExpire.activityPlanItem,
    isActivityDemoExpire?.isActive,
    isActivityDemoExpire?.isExpire,
    isPaidActivityPlan,
    navigation,
    onOpenUpcellCardModal,
    trackDashboardActivity,
  ]);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={s.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
        <View style={s.rootscreen}>
          {plan && !isEmpty(plan?.SliderList) && (
            <View style={s.secondcard}>
              <Swiper
                style={s.slider}
                showsButtons={false}
                autoplay={true}
                activeDotColor={colors.white}
                dotStyle={s.unactiveDot}
                activeDotStyle={s.activDot}
                autoplayTimeout={5}>
                {plan?.SliderList?.map((item, index) => {
                  return (
                    <Touchable
                      key={`slider_${item?.slider_id}_index_${index}`}
                      onPress={
                        Number(item?.slider_content_type) === SLIDER_TYPE.LINK
                          ? () => {
                              trackDashboardActivity('dashboard: slider clicked', { title: item?.slider_title });
                              Linking.openURL(item?.slider_content);
                            }
                          : null
                      }>
                      <ImageBackground source={{ uri: item?.slider_image }} resizeMode='cover' style={s.bgimg}>
                        <View style={s.textview}></View>
                      </ImageBackground>
                    </Touchable>
                  );
                })}
              </Swiper>
            </View>
          )}
          {(currentUser?.User_Detail?.LMPDate !== '0000-00-00' || currentUser?.User_Detail?.EDDDate !== '0000-00-00') &&
          Number(currentUser?.User_Detail?.user_daily_work_flow) === Number(RESPONSE_STATUS.FAIL) ? (
            <View style={s.firstcard}>
              <View style={s.relative}>
                <View style={s.babyview}>
                  <Image style={s.babyimg} source={require('../../assets/img/baby.png')} resizeMode='contain' />
                  <View style={s.dayview}>
                    <TextView text={'Your Baby’s Age'} type={'body-head'} style={s.daystime} />
                    <TextView
                      text={`${currentUser?.User_Day_Dashboard?.weeks} Weeks, ${currentUser?.User_Day_Dashboard?.days} Days`}
                      type={'head-line'}
                      style={s.daytext}
                    />
                  </View>
                </View>
                <View style={s.border}></View>
                <View style={s.bottomview}>
                  <View style={s.babySize}>
                    <View style={s.bgfruiteView}>
                      <Image style={s.peachimg} source={{ uri: currentUser?.Image }} resizeMode='contain' />
                    </View>
                    <View style={s.babytextwrap}>
                      <TextView text={`${currentUser?.Text}`} type={'caption-two'} style={s.babytext} />
                    </View>
                  </View>
                  <View style={s.idealWrap}>
                    <View style={s.ideal}>
                      <SvgIcon svgs={svgs} name={'weight-icon'} width={16} height={16} />
                      <View style={s.weightview}>
                        <TextView text={`Weight: ${currentUser?.Weight}`} type={'caps-one'} style={s.idealtext} />
                      </View>
                    </View>
                    <View style={s.ideal}>
                      <SvgIcon svgs={svgs} name={'height-icon'} width={16} height={16} />
                      <View style={s.weightview}>
                        <TextView text={`Height: ${currentUser?.Height}`} type={'caps-one'} style={s.idealtext} />
                      </View>
                    </View>
                    <View style={s.approxWrap}>
                      <TextView text={'(Approx.)'} style={s.approx} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={s.welcomecard}>
              <ImageBackground source={require('../../assets/img/lernia.png')} resizeMode='cover' style={s.bgimg}>
                <View style={s.textview}>
                  <TextView text={'Welcome'} type={'caps-one'} style={s.weltext} />
                  <TextView
                    text={`${currentUser?.User_Detail?.UserName} ${
                      currentUser?.User_Detail?.UserLastName ? currentUser?.User_Detail?.UserLastName : ''
                    }`}
                    type={'body-head'}
                    style={s.lerniatext}
                  />
                  <TextView text={translate('welcome_message_text')} style={s.skilltext} />
                </View>
              </ImageBackground>
            </View>
          )}
          <View style={s.secondrow}>
            {plan?.PlanList?.map((item, index) => {
              const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.plan_id);
              return (
                <TouchableOpacity
                  style={s.card}
                  key={`plan_${item?.plan_id}_index_${index}`}
                  onPress={() => {
                    onPressPlan(item);
                  }}>
                  <View style={{ ...s.basiccard, backgroundColor: item?.bg_color }}>
                    <ImageBackground
                      source={{
                        uri: item?.plan_icon,
                      }}
                      resizeMode='contain'
                      style={s.secondimg}></ImageBackground>
                    <View style={s.secondtext}>
                      <TextView text={item?.plan_name} type={'body'} style={s.basictext} />
                      <RenderHtml
                        contentWidth={width}
                        source={{ html: fromBase64(item?.plan_description) }}
                        tagsStyles={s.tagsStyles}
                      />
                    </View>
                    {item?.is_paid_plan === RESPONSE_STATUS.SUCCESS ? (
                      Number(planItem?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS) ? (
                        <Image source={require('../../assets/img/Tag.png')} style={s.freeTag} />
                      ) : (
                        <SvgIcon
                          svgs={svgs}
                          name={planItem ? 'premium-icon' : 'lock-premium-icon'}
                          width={20}
                          height={20}
                          style={s.premiumIcon}
                        />
                      )
                    ) : (
                      <View style={s.bgfree}>
                        <TextView text={'FREE'} type={'caps'} style={s.freetext} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {demoCard}
          {isDemoExist ||
          (Number(currentUser?.User_Detail?.user_daily_work_flow) === Number(RESPONSE_STATUS.SUCCESS) &&
            Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT)) ||
          currentUser?.User_Detail?.LMPDate !== '0000-00-00' ||
          currentUser?.User_Detail?.EDDDate !== '0000-00-00' ? null : (
            <Touchable style={s.thirdrow} onPress={() => navigation.navigate(screens.StartPregnancy)}>
              <View style={s.thirdcard}>
                <ImageBackground
                  source={require('../../assets/img/startpregnancy.png')}
                  resizeMode='cover'
                  style={s.lastimg}>
                  <View style={s.withbtn}>
                    <View style={s.lasttext}>
                      <TextView text={'Is your Pregnancy Confirmed?'} type={'caption-two'} style={s.starttext} />
                      <TextView text={translate('is_pregnancy_confirmed_text')} type={'caps'} style={s.lastcaption} />
                    </View>
                    <TouchableOpacity style={s.iconview} onPress={() => navigation.navigate(screens.StartPregnancy)}>
                      <Icon name='chevron-right' size={18} color={colors.dimGray} style={s.btnicon} />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </Touchable>
          )}

          <TouchableOpacity style={s.thirdrow} onPress={onShare}>
            {/* <View style={s.mobilecard}>
              <ImageBackground source={require('../../assets/img/iphonebg.png')} resizeMode='cover' style={s.lastimg}>
                <View style={s.sharetextview}>
                  <TextView text={'Share Our App'} type={'body'} style={s.shartext} />
                  <TextView text={'આપના મિત્રોને આ એપ અચૂક શેર કરો.'} type={'caption'} style={s.mobilecaption} />
                </View>
              </ImageBackground>
            </View> */}
            <Image
              source={
                currentUser?.User_Detail?.LanguageId === '2'
                  ? require('../../assets/img/shareimg_hi.png')
                  : require('../../assets/img/shareimg.png')
              }
              resizeMode='contain'
              style={s.shareimg}
            />
          </TouchableOpacity>

          <View style={s.socialSection}>
            <TextView text={'Connect with us'} type={'head-line'} style={s.conectext} />
            <View style={s.socialview}>
              {socialList?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={s.circle}
                    key={`social_${item?.social_id}_index_${index}`}
                    onPress={
                      item?.social_link
                        ? () => {
                            trackDashboardActivity('connect with us clicked', {
                              platfrom: item?.title,
                              place: 'Dashboard',
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
        </View>
      </ScrollView>
      <ConfirmationModal
        isOpen={isOpenAlertModal}
        onClosed={onCloseAlertModal}
        headerTitle={'Classes'}
        successText={'Ok'}
        cancelText={'Cancel'}
        onPressCancel={onCloseAlertModal}
        onPressConfirm={onPressConfirm}>
        <TextView text={'You need to add your LMP Date first.'} type={'body-head'} style={s.newcaptiontext} />
        <TextView text={translate('need_lmp_date_message')} type={'body-head'} style={s.newcaptiontext} />
      </ConfirmationModal>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.ModalPopup}
        isOpen={isOpenSpecialModal}
        onClosed={onCloseSpecialModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={'rgba(0, 0, 0, 0.3)'}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}>
        <UpsellCard
          type={cardType}
          navigation={navigation}
          onClose={onCloseSpecialModal}
          onStartDemo={onPressStartDemo}
        />
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.ModalSwipe}
        isOpen={isOpenDayModal}
        onClosed={onCloseDayModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={'rgba(0, 0, 0, 1)'}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}>
        <HeaderButton
          type={1}
          iconName={'x'}
          onPress={onCloseDayModal}
          color={colors.white}
          style={s.coloseIcon}
          isFeather={true}
        />
        <View style={s.swiperApp}>
          <Swiper
            style={s.sliderDayModal}
            showsButtons={false}
            loop={true}
            autoplay={true}
            activeDotColor={colors.black}
            dotStyle={s.unactiveDot}
            activeDotStyle={s.activDot}
            autoplayTimeout={5}>
            {popupList?.PopupList?.map((item, index) => {
              return (
                <View key={`popup_${item?.popup_id}_index_${index}`}>
                  <Image source={{ uri: item?.popup_image }} style={s.modalSwipImg} resizeMode='contain' />
                </View>
              );
            })}
          </Swiper>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DashboardScreen;
