import { View, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-native-modalbox';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import TextView from '@app/components/TextView';
import s from './styles';
import svgs from '../../../assets/svg';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import AppStyles from '@app/styles/AppStyles';
import { translate } from '@app/helpers/appInitHelpers';
import HeaderButton from '@app/components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { startTrial } from '@app/services/orderService';
import { DEMO_PLAN_STATUS, PLAN, UPSELL_IDENTIFIER } from '@app/constants/constant';
import UpsellCard from '@app/components/UpsellCard/UpsellCard';
import { trackActivity } from '@app/services/analyticsService';
import PurchaseCards from '@app/components/PurchaseCards/PurchaseCards';

const DailyActivityPurchaseScreen = ({ route, plan: plan_item, navigation }) => {
  const plan = plan_item || route?.params?.plan;

  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState();

  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.goBack()}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Daily Activities'} type={'body-two'} style={s.headtext} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const isDemoExpire = useMemo(() => {
    const item = currentUser?.plan_demo_master?.find((x) => x?.plan_id === plan?.plan_id);
    return Number(item?.user_plan_status_demo) === DEMO_PLAN_STATUS.EXPIRE;
  }, [currentUser?.plan_demo_master, plan?.plan_id]);

  const loadData = useCallback(() => {
    if (isDemoExpire) {
      onOpenModal();
      setModalType(UPSELL_IDENTIFIER.TRIAL_EXPIRE);
    }
  }, [isDemoExpire, onOpenModal]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onPressUpgrade = useCallback(() => {
    trackActivity('upgrade: upgrade plan clicked', { type: plan?.plan_name });
    navigation.navigate(screens.PremiumPlan, { plan });
  }, [navigation, plan]);

  const onPressStartDemo = useCallback(async () => {
    try {
      setLoading(true);
      const result = await dispatch(startTrial(PLAN.SILVER));
      if (result) {
        navigation.navigate({ name: screens.NavigationRoot });
        navigation.push(screens.DailyActivity, result);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation]);

  const onStartDemo = useCallback(() => {
    onOpenModal();
    setModalType(UPSELL_IDENTIFIER.START_DEMO_DAILY);
  }, [onOpenModal]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.maincontain}>
          <View style={s.root}>
            <View style={s.bggraphics}>
              <Image style={s.imgscreen} source={require('../../../assets/img/mombaby.png')} resizeMode='contain' />
            </View>
            <View style={s.activityCard}>
              <View style={s.card}>
                <ImageBackground
                  source={require('../../../assets/img/activity.png')}
                  resizeMode='cover'
                  style={s.secondimg}></ImageBackground>
                <View style={s.textview}>
                  <TextView text={'Daily 25+ Activities'} type={'body-head'} style={s.blacktext} />
                  <TextView text={'Duration: 9 Month'} type={'caps-one'} style={s.duration} />
                  <TextView text={translate('daily_activity_screen_message')} type={'caps-one'} style={s.duratintext} />
                </View>
              </View>
            </View>
            {!isDemoExpire && <PurchaseCards cardType={UPSELL_IDENTIFIER.START_DEMO_DAILY} navigation={navigation} />}
            <TextView text={translate('daily_activity_screen_subject_1')} type={'caption'} style={s.headTitle} />
            <View style={s.checkview}>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_1')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_2')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_3')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_4')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_5')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_6')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_7')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_8')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_9')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_10')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_11')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_12')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_13')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_14')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={translate('daily_activity_screen_subject_line_15')}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
            </View>
            <TextView text={translate('daily_activity_screen_subject_2')} type={'caption'} style={s.headTitle} />
            <View style={s.founderSection}>
              <View style={s.imgview}>
                <ImageBackground
                  source={require('../../../assets/img/founder.png')}
                  resizeMode='cover'
                  style={s.fondimg}>
                  <View style={s.textcontain}>
                    <TextView text={'Jitendra Timbadiya'} type={'body-two'} style={s.blacktext} />
                    <TextView text={'(Garbhsanskar & Parenting Expert)'} type={'caps'} style={s.duratintext} />
                    <TextView
                      text={translate('daily_activity_screen_parenting_expert_desc')}
                      type={'caps'}
                      style={s.talktext}
                    />
                    <TextView text={'Happy New India Mission !'} type={'caps'} style={s.capsind} />
                  </View>
                </ImageBackground>
              </View>
            </View>
            <View style={s.rowlist}>
              <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
              <TextView text={'Fact & Figure'} type={'body-head'} style={s.headerText} />
            </View>
            <View style={s.userView}>
              <View style={s.users}>
                <View style={s.FactView}>
                  <View>
                    <SvgIcon svgs={svgs} name={'android-icon'} width={30} height={30} />
                  </View>
                  <View style={s.factText}>
                    <TextView text={'1,25,000+'} type={'caption-two'} style={s.factTop} />
                    <TextView text={'App Users'} type={'caps'} style={s.captionfact} />
                  </View>
                </View>
              </View>
              <View style={s.users}>
                <View style={s.FactView}>
                  <View>
                    <SvgIcon svgs={svgs} name={'research-icon'} width={30} height={30} />
                  </View>
                  <View style={s.factText}>
                    <TextView text={'14+'} type={'caption-two'} style={s.factTop} />
                    <TextView text={'Years of Research'} type={'caps'} style={s.captionfact} />
                  </View>
                </View>
              </View>
              <View style={s.users}>
                <View style={s.FactView}>
                  <View>
                    <SvgIcon svgs={svgs} name={'mentor-icon'} width={30} height={30} />
                  </View>
                  <View style={s.factText}>
                    <TextView text={'12000+'} type={'caption-two'} style={s.factTop} />
                    <TextView text={'Hours Effort'} type={'caps'} style={s.captionfact} />
                  </View>
                </View>
              </View>
              <View style={s.users}>
                <View style={s.FactView}>
                  <View>
                    <SvgIcon svgs={svgs} name={'activities-icon'} width={30} height={30} />
                  </View>
                  <View style={s.factText}>
                    <TextView text={'4200+'} type={'caption-two'} style={s.factTop} />
                    <TextView text={'Activities'} type={'caps'} style={s.captionfact} />
                  </View>
                </View>
              </View>
              <View style={s.users}>
                <View style={s.FactView}>
                  <View>
                    <SvgIcon svgs={svgs} name={'ytbs-icon'} width={30} height={30} />
                  </View>
                  <View style={s.factText}>
                    <TextView text={'1600+'} type={'caption-two'} style={s.factTop} />
                    <TextView text={'Audios & Videos'} type={'caps'} style={s.captionfact} />
                  </View>
                </View>
              </View>
              <View style={s.users}>
                <View style={s.FactView}>
                  <View>
                    <SvgIcon svgs={svgs} name={'book-icon'} width={30} height={30} />
                  </View>
                  <View style={s.factText}>
                    <TextView text={'8000+'} type={'caption-two'} style={s.factTop} />
                    <TextView text={'Content Pages'} type={'caps'} style={s.captionfact} />
                  </View>
                </View>
              </View>
            </View>
            <View style={s.rowlisttwo}>
              <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
              <TextView text={'Course Developed by'} type={'body-head'} style={s.headerText} />
            </View>
            <View style={s.userView}>
              <View style={s.userstwo}>
                <View style={s.firstbg}>
                  <SvgIcon svgs={svgs} name={'health-care'} width={30} height={30} />
                </View>
                <TextView text={'Different Faculty Doctors'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.userstwo}>
                <View style={s.secondbg}>
                  <SvgIcon svgs={svgs} name={'herbal-medicine'} width={30} height={30} />
                </View>
                <TextView text={'Ayurveda Experts'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.userstwo}>
                <View style={s.thirdbg}>
                  <SvgIcon svgs={svgs} name={'yoga-icon'} width={30} height={30} />
                </View>
                <TextView text={'Yoga & Chakra Trainers'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.userstwo}>
                <View style={s.fourbg}>
                  <SvgIcon svgs={svgs} name={'motivation-icon'} width={30} height={30} />
                </View>
                <TextView text={'Motivational Speakers'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.userstwo}>
                <View style={s.fivebg}>
                  <SvgIcon svgs={svgs} name={'baby-icon'} width={30} height={30} />
                </View>
                <TextView text={'Child Psychologists'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.userstwo}>
                <View style={s.sixbg}>
                  <SvgIcon svgs={svgs} name={'book2-icon'} width={30} height={30} />
                </View>
                <TextView text={'Spiritual Coaches'} type={'caps-one'} style={s.captionicon} />
              </View>
            </View>
          </View>
          <View style={s.reviewSection}>
            <View style={s.allreview}>
              <View style={s.centerview}>
                <SvgIcon svgs={svgs} name={'quote-icon'} width={32} height={28} />

                <TextView
                  text={translate('daily_activity_screen_quote_text')}
                  type={'caption-two'}
                  style={s.reviewtext}
                />
                <View style={s.clientView}>
                  <TextView
                    text={translate('daily_activity_screen_quote_person_name')}
                    type={'body-head'}
                    style={s.clientname}
                  />
                  <TextView
                    text={translate('daily_activity_screen_quote_location')}
                    type={'caps-one'}
                    style={s.coutryname}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[AppStyles.footerWrapper, s.footerBox]}>
        <View style={!isDemoExpire && s.footBtnRow}>
          {!isDemoExpire && (
            <Button style={s.btnDemo} onPress={onStartDemo} disabled={loading}>
              <TextView style={s.btntextmain} type={'body'} text={`Start Demo`} />
              <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
            </Button>
          )}
          <Button style={[s.btnplan, { flex: isDemoExpire ? 0 : 0.5 }]} onPress={onPressUpgrade} disabled={loading}>
            <TextView style={s.btntextmain} type={'body'} text={`Upgrade Plan`} />
            <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
          </Button>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.ModalPopup}
        isOpen={isOpenModal}
        onClosed={onCloseModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={'rgba(0, 0, 0, 0.3)'}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}>
        <UpsellCard
          type={modalType}
          navigation={navigation}
          onClose={onCloseModal}
          onStartDemo={onPressStartDemo}
          plan={plan}
        />
      </Modal>
    </>
  );
};

export default DailyActivityPurchaseScreen;
