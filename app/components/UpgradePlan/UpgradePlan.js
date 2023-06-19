import { View, ScrollView, Image, ImageBackground } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import s from './styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { currencyWithDecimal } from '@app/helpers/helpers';
import { PALN_TYPE } from '@app/constants/constant';
import screens from '@app/constants/screens';
import AppStyles from '@app/styles/AppStyles';
const WorkShop = require('../../assets/img/lapiwoman.png');
const Daily = require('../../assets/img/mombaby.png');
const Class = require('../../assets/img/classdp.png');

const UpgradePlanScreen = ({ plan, navigation }) => {
  const duration = useMemo(() => {
    let time = '';
    if (plan?.plan_work_type === PALN_TYPE.DAILY) {
      time = `${plan?.time_limit} Days`;
    } else if (plan?.plan_work_type === PALN_TYPE.MONTHLY) time = `${plan?.time_limit} Month`;
    else if (plan?.plan_work_type === PALN_TYPE.WEEKLY) time = `${plan?.time_limit} week`;
    return time;
  }, [plan?.plan_work_type, plan?.time_limit]);

  const onPressUpgrade = useCallback(() => {
    navigation.navigate(screens.PremiumPlan, { plan });
  }, [navigation, plan]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.maincontain}>
          <View style={s.root}>
            <View style={s.bggraphics}>
              <Image
                style={s.imgscreen}
                source={
                  plan?.plan_work_type === PALN_TYPE.DAILY
                    ? Daily
                    : plan?.plan_work_type === PALN_TYPE.MONTHLY
                    ? WorkShop
                    : Class
                }
                resizeMode='cover'
              />
            </View>
            <View style={s.activityCard}>
              <View style={s.card}>
                <ImageBackground
                  source={require('../../assets/img/activity.png')}
                  resizeMode='cover'
                  style={s.secondimg}></ImageBackground>
                <View style={s.textview}>
                  <TextView text={plan?.plan_name} type={'body-head'} style={s.blacktext} />
                  <TextView text={`Duration: ${duration}`} type={'caps-one'} style={s.duration} />
                  <TextView
                    text={
                      'Be proactive and manage your special days well with the one-stop dreamchild app—your buddy in the journey of motherhood.'
                    }
                    type={'caps-one'}
                    style={s.duratintext}
                  />
                </View>
                <View style={s.whitecard}>
                  <View style={s.prizecard}>
                    <TextView
                      text={`${plan?.currency_symbol} ${currencyWithDecimal(plan?.old_price)}`}
                      type={'caps-one'}
                      style={s.mrp}
                    />
                    <TextView
                      text={`${plan?.currency_symbol} ${plan?.final_price}`}
                      type={'sub-title'}
                      style={s.prize}
                    />
                    <TextView text={'+ GST'} type={'caps'} style={s.gst} />
                  </View>
                  {/* <SvgIcon svgs={svgs} name={'fram-icon'} width={131} height={9} style={s.fram} /> */}
                  <ImageBackground source={require('../../assets/img/wave.png')} resizeMode='cover' style={s.fram} />
                  <View style={s.btmview}>
                    <TextView text={'20% SAVE'} type={'caps-one'} style={s.discount} />
                  </View>
                </View>
              </View>
            </View>
            <View style={s.secondCard}>
              <Image style={s.secdimg} source={require('../../assets/img/ladymobi.png')} resizeMode='cover' />
              <View style={s.sectext}>
                <TextView text={'1 Lecture Free'} type={'body-head'} style={s.blacktext} />
                <TextView text={'Posuere condimentum dignissim'} type={'caps-one'} style={s.duratintext} />
                <Button
                  style={s.btn}
                  // onPress={() => {
                  //   navigation.navigate(screens.AddNumber);
                  // }}
                >
                  <TextView style={s.btntext} type={'caps-one'} text='Watch Now' />
                  <Icon name='chevron-right' size={16} color={colors.white} style={s.btnicon} />
                </Button>
              </View>
            </View>
            <View style={s.checkview}>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.primariright} />
                <TextView text={'Get access to beneficial workshops'} type={'caption-two'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.primariright} />
                <TextView
                  text={'Get baby care lectures to ease your journey'}
                  type={'caption-two'}
                  style={s.listtext}
                />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.primariright} />
                <TextView text={'Monitor your reports thoroughly'} type={'caption-two'} style={s.listtext} />
              </View>
              <View style={s.checklist}>
                <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.primariright} />
                <TextView
                  text={'Excellent articles, videos and everything that you need at your particular time.'}
                  type={'caption-two'}
                  style={s.listtext}
                />
              </View>
            </View>
            <View style={s.userView}>
              <View style={s.users}>
                <View style={s.firstbg}>
                  <SvgIcon svgs={svgs} name={'android-icon'} width={30} height={30} />
                </View>
                <TextView text={'1Lac+'} type={'caption-two'} style={s.boldtext} />
                <TextView text={'App Users'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.users}>
                <View style={s.secondbg}>
                  <SvgIcon svgs={svgs} name={'research-icon'} width={30} height={30} />
                </View>
                <TextView text={'14+'} type={'caption-two'} style={s.boldtext} />
                <TextView text={'Years of Research'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.users}>
                <View style={s.thirdbg}>
                  <SvgIcon svgs={svgs} name={'mentor-icon'} width={30} height={30} />
                </View>
                <TextView text={'15+'} type={'caption-two'} style={s.boldtext} />
                <TextView text={'Hours Effort'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.users}>
                <View style={s.fourbg}>
                  <SvgIcon svgs={svgs} name={'activities-icon'} width={30} height={30} />
                </View>
                <TextView text={'4200+'} type={'caption-two'} style={s.boldtext} />
                <TextView text={'Activities'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.users}>
                <View style={s.fivebg}>
                  <SvgIcon svgs={svgs} name={'ytbs-icon'} width={30} height={30} />
                </View>
                <TextView text={'1600+'} type={'caption-two'} style={s.boldtext} />
                <TextView text={'Audios & Videos'} type={'caps-one'} style={s.captionicon} />
              </View>
              <View style={s.users}>
                <View style={s.sixbg}>
                  <SvgIcon svgs={svgs} name={'book-icon'} width={30} height={30} />
                </View>
                <TextView text={'500+'} type={'caption-two'} style={s.boldtext} />
                <TextView text={'Content Pages'} type={'caps-one'} style={s.captionicon} />
              </View>
            </View>
            <View style={s.founderSection}>
              <View style={s.imgview}>
                <Image source={require('../../assets/img/jitendra.png')} resizeMode='contain' style={s.fondimg} />
                <View style={s.textcontain}>
                  <TextView text={'Jitendra Timbadiya'} type={'body'} style={s.blacktext} />
                  <TextView text={'( Founder & Master Trainer )'} type={'caps-one'} style={s.duratintext} />
                  <TextView
                    text={
                      'My main thought behind the development of this application is to create bright future of india. Making Happy India & Healthy india by using this app.'
                    }
                    type={'caps-one'}
                    style={s.talktext}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={s.reviewSection}>
            <View style={s.allreview}>
              <ImageBackground
                source={require('../../assets/img/review.png')}
                resizeMode='contain'
                style={s.reviewContain}></ImageBackground>
              <View style={s.centerview}>
                <SvgIcon svgs={svgs} name={'quote-icon'} width={32} height={28} />

                <TextView
                  text={
                    'મારા પહેલા ત્રણ બાળકોને કોઈક ને કોઈક માનસિક ચેલેન્જ આવી છે. મારી ચોથી પ્રેગ્નન્સી દરમ્યાન હું એપમાં આપેલ રોજની નવી નવી એક્ટીવીટી, ૩૬ ગર્ભસંવાદ, યોગ, ગીતાસાર વગેરે નિષ્ઠાપૂર્વક કરતી હતી અને મારું ચોથું બાળક ખૂબ જ તંદુરસ્ત અને સ્વસ્થ આવ્યું છે.'
                  }
                  type={'body-head'}
                  style={s.reviewtext}
                />
                <TextView text={'રાજેશ્વરી કોટેચા'} type={'caption-two'} style={s.clientname} />
                <TextView text={'(લંડન)'} type={'caption'} style={s.country} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={AppStyles.footerWrapper}>
        <Button style={s.btnplan} onPress={onPressUpgrade}>
          <TextView style={s.btntextmain} type={'body'} text='Upgrade Plan' />
          <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
        </Button>
      </View>
    </>
  );
};

export default UpgradePlanScreen;
