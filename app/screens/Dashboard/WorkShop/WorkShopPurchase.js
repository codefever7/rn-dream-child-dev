import { View, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppStyles from '@app/styles/AppStyles';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import TextView from '@app/components/TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import HeaderButton from '@app/components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { startTrial } from '@app/services/orderService';
import { DEMO_PLAN_STATUS, PLAN, UPSELL_IDENTIFIER } from '@app/constants/constant';
import s from './styles';
import Modal from 'react-native-modalbox';
import UpsellCard from '@app/components/UpsellCard/UpsellCard';
import { trackActivity } from '@app/services/analyticsService';
import PurchaseCards from '@app/components/PurchaseCards/PurchaseCards';

const WorkShopPurchaseScreen = ({ route, plan: plan_item, navigation }) => {
  const plan = plan_item || route?.params?.plan;
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const dispatch = useDispatch();

  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerIcons}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.goBack()}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Workshops'} type={'body-two'} style={s.headtext} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const isDemoExpire = useMemo(() => {
    const item = currentUser?.plan_demo_master?.find((x) => x?.plan_id === plan?.plan_id);
    return Number(item?.user_plan_status_demo) === DEMO_PLAN_STATUS.EXPIRE;
  }, [currentUser?.plan_demo_master, plan?.plan_id]);

  const onPressUpgrade = useCallback(() => {
    trackActivity('upgrade: upgrade plan clicked', { type: plan?.plan_name });
    navigation.navigate(screens.PremiumPlan, { plan });
  }, [navigation, plan]);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const loadData = useCallback(() => {
    if (isDemoExpire) {
      onOpenModal();
      setModalType(UPSELL_IDENTIFIER.TRIAL_EXPIRE);
    }
  }, [isDemoExpire, onOpenModal]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onPressStartDemo = useCallback(async () => {
    try {
      setLoading(true);
      const result = await dispatch(startTrial(PLAN.GOLD));
      if (result) {
        navigation.navigate(screens.WorkShop, result);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation]);

  const onStartDemo = useCallback(() => {
    onOpenModal();
    setModalType(UPSELL_IDENTIFIER.START_DEMO_WORKSHOP);
  }, [onOpenModal]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.maincontain}>
          <View style={s.purchaseroot}>
            <View style={s.bggraphics}>
              <Image style={s.imgscreen} source={require('../../../assets/img/lapiwoman.png')} resizeMode='contain' />
            </View>
            <View style={s.activityCard}>
              <View style={s.card}>
                <ImageBackground
                  source={require('../../../assets/img/activity.png')}
                  resizeMode='cover'
                  style={s.secondimg}></ImageBackground>
                <View style={s.textview}>
                  <TextView text={'Online Workshops'} type={'body-head'} style={s.blacktext} />
                  <TextView text={'Duration: 9 Month'} type={'caps-one'} style={s.duration} />
                  <TextView text={'(Main Workshops Duration: 3 Month)'} type={'caps-one'} style={s.classConvied} />
                  <TextView
                    text={
                      'ગર્ભસંસ્કારના વૈદિક અને વૈજ્ઞાનિક ઊંડાણની તમામ બાબતો અમારા ગર્ભસંસ્કારના અનુભવી એક્સપર્ટ્સ દ્વારા ૨૦+ કલાકના વીડિયો દ્વારા સમજાવવામાં આવેલ છે.'
                    }
                    type={'caps-one'}
                    style={s.duratintext}
                  />
                </View>
              </View>
            </View>
            {!isDemoExpire && (
              <PurchaseCards cardType={UPSELL_IDENTIFIER.START_DEMO_WORKSHOP} navigation={navigation} />
            )}
            <TextView text={'વર્કશોપના વિષયો :'} type={'caption'} style={s.headTitle} />
            <View style={s.checkview}>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ગર્ભાધાનની વૈદિક અને વૈજ્ઞાનિક પદ્ધતિ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ઇન્ફર્ટીલીટીના ઉપાયો'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ડ્રીમ ચાર્ટ બનાવવાની આદર્શ વિધિ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'વિઝ્યુલાઇઝેશન & ઓટો-સજેશન'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'માસનુમાસિક જાળવણી'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'૧૦ ઇન્દ્રિયો વિકાસ માર્ગદર્શન & ક્રિએટિવિટી'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'મ્યુઝિક થેરાપી અને પુસ્તક વાંચનની પદ્ધતિ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView
                  text={'સ્ટ્રેસ મેનેજમેંટ અને પોઝિટિવ થિંકિંગ - ખુશ રહો'}
                  type={'body-one'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'સગર્ભા આદર્શ દિનચર્યા અને પ્રકૃતિ સંપર્ક'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'પતિ-પત્ની, સાસુ-વહૂ સંબંધો'} type={'body-one'} style={s.listtext} />
              </View>
            </View>
            <View style={s.MaterialKitWrap}>
              <ImageBackground source={require('../../../assets/img/makit.png')}>
                <View style={s.headView}>
                  <TextView text={'Physical Material Kit'} type={'body'} style={s.headTextimg} />
                  <TextView text={'મટીરિયલ કીટ ઘરે આવશે. જેમાં મળશે :'} type={'caps-one'} style={s.capshead} />
                </View>
                <View style={s.listofKit}>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'ડ્રીમ ચાઈલ્ડ બેગ'} type={'caption'} style={s.listtext} />
                  </View>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'ગર્ભ સંસ્કાર પુસ્તક'} type={'caption'} style={s.listtext} />
                  </View>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'ડ્રીમ ચાઈલ્ડ ડાયરી'} type={'caption'} style={s.listtext} />
                  </View>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'વાર્તા અને પ્રેરક પુસ્તકો'} type={'caption'} style={s.listtext} />
                  </View>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'૧૧+ બ્રેઈન એક્ટીવીટી મટીરિયલ'} type={'caption'} style={s.listtext} />
                  </View>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'માળા અને જરૂરી સ્ટેશનરી'} type={'caption'} style={s.listtext} />
                  </View>
                  <View style={s.checklisttwo}>
                    <SvgIcon svgs={svgs} name={'matecheck-icon'} width={16} height={15} style={s.righticon} />
                    <TextView text={'રાગ & મંત્ર પેન ડ્રાઈવ : ૫૫૦+ ટ્રેક્સ'} type={'caption'} style={s.listtext} />
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={s.rowlist}>
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
            <View style={s.founderSection}>
              <View style={s.imgview}>
                <ImageBackground
                  source={require('../../../assets/img/suyogi.png')}
                  resizeMode='cover'
                  style={s.fondimg}>
                  <View style={s.textcontain}>
                    <TextView text={'Suyogi Timbadiya'} type={'body-two'} style={s.blacktext} />
                    <TextView text={'( Yoga & Diet Coach )'} type={'caps'} style={s.duratintext} />
                    <TextView
                      text={
                        '‘જો કોઈ માતા આ એપ મુજબ આહાર, વિહાર અને વિચાર ફોલો કરે છે, તો તે ધારે તેવા સંતાનને ચોક્કસ જન્મ આપી શકે છે. આ મારો ઘણી બઘી માતાઓ સાથે રહ્યા પછીનો ૧૦ વર્ષનો સ્વાનુભવ છે.’ '
                      }
                      type={'caps'}
                      style={s.talktext}
                    />
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
          <View style={s.reviewSection}>
            <View style={s.allreview}>
              <View style={s.centerview}>
                <SvgIcon svgs={svgs} name={'quote-icon'} width={32} height={28} />

                <TextView
                  text={
                    '‘ગર્ભાધાન માટેની ABCD થી માંડીને ગર્ભાવસ્થા સંબંધિત Ph.D. સુધીની તમામ બાબતો વર્કશોપમાંથી જ મળી જાય છે. પતિ-પત્ની વચ્ચે પણ અદ્‌ભુત એકતા બની જાય છે.’'
                  }
                  type={'caption-two'}
                  style={s.reviewtext}
                />
                <View style={s.clientView}>
                  <TextView text={'હિરલ કુંજડિયા'} type={'body-head'} style={s.clientname} />
                  <TextView text={'(સુરત)'} type={'caps-one'} style={s.coutryname} />
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

export default WorkShopPurchaseScreen;
