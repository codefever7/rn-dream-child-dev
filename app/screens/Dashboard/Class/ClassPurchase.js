import Button from '@app/components/Button';
import HeaderButton from '@app/components/HeaderButton';
import Icon from '@app/components/Icon';
import PurchaseCards from '@app/components/PurchaseCards/PurchaseCards';
import TextView from '@app/components/TextView';
import UpsellCard from '@app/components/UpsellCard/UpsellCard';
import { DEMO_PLAN_STATUS, PLAN, UPSELL_IDENTIFIER } from '@app/constants/constant';
import screens from '@app/constants/screens';
import { trackActivity } from '@app/services/analyticsService';
import { startTrial } from '@app/services/orderService';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Image, ImageBackground, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import svgs from '../../../assets/svg';
import s from './styles';

const ClassPurchaseScreen = ({ route, plan: plan_item, navigation }) => {
  const plan = plan_item || route?.params?.plan;
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState();

  const dispatch = useDispatch();

  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;

  // const isPaidPlan = useMemo(() => {
  //   const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === plan?.plan_id);
  //   return planItem ? true : false;
  // }, [currentUser?.User_Plan_Master, plan?.plan_id]);

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
          <TextView text={'Classes'} type={'body-two'} style={s.headtext} />
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
      const result = await dispatch(startTrial(PLAN.PLATINUM));
      if (result) {
        navigation.navigate(screens.Class, result);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation]);

  const onStartDemo = useCallback(() => {
    onOpenModal();
    setModalType(UPSELL_IDENTIFIER.START_DEMO_CLASS);
  }, [onOpenModal]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.maincontainpadding}>
          <View style={s.purchaseroot}>
            <View style={s.bggraphics}>
              <Image style={s.imgscreen} source={require('../../../assets/img/classdp.png')} resizeMode='contain' />
            </View>
            <View style={s.activityCard}>
              <View style={s.card}>
                <ImageBackground
                  source={require('../../../assets/img/activity.png')}
                  resizeMode='cover'
                  style={s.secondimg}></ImageBackground>
                <View style={s.textview}>
                  <TextView text={'Weekly Classes'} type={'body-head'} style={s.blacktext} />
                  <TextView text={'Duration: 36 Week'} type={'caps-one'} style={s.duration} />
                  <TextView
                    text={'(Class will be Start after Pregnency Concived)'}
                    type={'caps-one'}
                    style={s.classConvied}
                  />
                  <TextView
                    text={
                      'આ વિભાગમાં ‘સંપૂર્ણ માતૃત્વ’ માટેના  ગર્ભ સંસ્કાર, પેરેન્ટીંગ અને હેપ્પી લાઈફને સમાવતા ૩૬ અઠવાડિક વર્ગો આપવામાં આવે છે. (એક અઠવાડિયા સુધી એપમાં વર્ગ ગમે ત્યારે જોઈ શકાશે.)'
                    }
                    type={'caps-one'}
                    style={s.duratintext}
                  />
                </View>
              </View>
            </View>
            {!isDemoExpire && <PurchaseCards cardType={UPSELL_IDENTIFIER.START_DEMO_CLASS} navigation={navigation} />}
            <TextView text={'વર્ગના વિષયો :'} type={'caption'} style={s.headTitle} />
            <View style={s.checkview}>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'૧૬ સંસ્કાર'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'પ્રસૂતિની તૈયારી'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'પ્રસૂતિ બાદ સૌંદર્ય પ્રાપ્તિ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ત્રાટક અને ચક્ર ધ્યાન'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'સ્ટોરી ટેલીંગ અને સ્ટડી ટેકનિક્સ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ડ્રોઈંગ અને ભરતકામ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'રાગ અને તાલ પ્રેક્ટીસ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'બાળરસી અને સુવર્ણપ્રાશન'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ચાઈલ્ડ ફાયનાન્સ માર્ગદર્શન'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'સબ કોન્સિયસ માઈન્ડનું રિ-પ્રોગ્રામીંગ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'યોગનિદ્રા (ડીપ સ્લીપ) માર્ગદર્શન'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'લાગણીની કદર'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'સ્વાવલંબનને પ્રોત્સાહન'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ઉપદેશક નહીં, ઉદાહરણ બનો'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'સુખની સાચી વ્યાખ્યા'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'સરખામણી મુક્તિ, પરોપકાર'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'કર્મસિદ્ધાંત દ્વારા શાંતિ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'ક્રોધમુક્તિ અને પૂર્વ આઘાત નિવારણ'} type={'body-one'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
                <TextView text={'આત્મા-પરમાત્મા જ્ઞાન વગેરે.'} type={'body-one'} style={s.listtext} />
              </View>
            </View>
            <View style={s.headingText}>
              <TextView text={'Special Features'} type={'caption-one'} style={s.fetures} />
            </View>
            <View style={s.boxview}>
              <View style={s.widthstyle}>
                <View style={s.conbg}>
                  <Image style={s.imgfirstbox} source={require('../../../assets/img/music.png')} resizeMode='contain' />
                  <TextView text={'Every Week'} style={s.weeksday} />
                  <TextView text={'New Action Song'} type={'body-one'} style={s.demoboxtext} />
                </View>
              </View>
              <View style={s.widthstyle}>
                <View style={s.conbgtwo}>
                  <Image style={s.imgfirstbox} source={require('../../../assets/img/brain.png')} resizeMode='contain' />
                  <TextView text={'Every Week'} style={s.weeksday} />
                  <TextView text={'New Brain Activity '} type={'body-one'} style={s.demoboxtext} />
                </View>
              </View>
            </View>
            <View style={s.listspace}>
              <View style={s.counsellView}>
                <Image style={s.callgirls} source={require('../../../assets/img/callgirls.png')} resizeMode='contain' />
                <View style={s.textgirls}>
                  <TextView text={'Personal Counselling'} type={'body-head'} style={s.kittext2} />
                  <TextView
                    text={
                      'માતાની પ્રેગ્નનસી કોન્ફિડેન્ટ અને હેપ્પી બને તે માટે ગર્ભસંસ્કાર કોઉન્સેલર દ્વારા ૯ મહિના વ્યક્તિગત માર્ગદર્શન આપવામાં આવે છે.'
                    }
                    type={'caps-one'}
                    style={s.lastcaps}
                  />
                </View>
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
            <View style={s.founderSection}>
              <View style={s.imgview}>
                <ImageBackground
                  source={require('../../../assets/img/dhaval.png')}
                  resizeMode='cover'
                  style={s.fondimg}>
                  <View style={s.textcontain}>
                    <TextView text={'Dhaval Chheta'} type={'body-two'} style={s.blacktext} />
                    <TextView text={'( Co-Founder & CEO, Dream Child )'} type={'caps'} style={s.duratintext} />
                    <TextView
                      text={
                        '‘અમારો પ્રયત્ન છે કે દેશ-વિદેશમાં ઘરે બેઠા દરેક માતાઓને ગર્ભસંસ્કાર દ્વારા શ્રેષ્ઠ સંતાન પ્રાપ્ત થાય. ભારતનું આ વૈદિક અને વૈજ્ઞાનિક જ્ઞાન હવે આંગળીના ટેરવે આ એપ દ્વારા મળી શકશે.’ '
                      }
                      type={'caps'}
                      style={s.talktext}
                    />
                  </View>
                </ImageBackground>
              </View>
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
          </View>
          <View style={s.reviewSection}>
            <View style={s.allreview}>
              <View style={s.centerview}>
                <SvgIcon svgs={svgs} name={'quote-icon'} width={32} height={28} />

                <TextView
                  text={
                    '‘હું ગર્ભસંસ્કારના વર્ગો ONLINE ભરું છું, પરંતુ એવું લાગે કે વર્ગમાં જ બેઠી હોઉં. આ ૩૬ વર્ગો એ ફક્ત પ્રેગ્નન્સી જ નહીં, મારી આખી લાઈફ ચેન્જ કરી દીધી છે.’ '
                  }
                  type={'caption-two'}
                  style={s.reviewtext}
                />
                <View style={s.clientView}>
                  <TextView text={'પૂજા પટેલ'} type={'body-head'} style={s.clientname} />
                  <TextView text={'(લંડન, UK)'} type={'caps-one'} style={s.coutryname} />
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

export default ClassPurchaseScreen;
