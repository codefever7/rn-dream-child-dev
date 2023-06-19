import React, { useCallback, useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../assets/svg';
import { colors } from '../styles';
import TextView from '../components/TextView';
import Button from '../components/Button';
import Icon from '../components/Icon';
import screens from '../constants/screens';
import s from './styles';
import { WIN_WIDTH } from '@app/constants/constant';
import AppStyles from '@app/styles/AppStyles';
import { scaleVertical } from '@app/utils/scale';
import { setupToken } from '@app/utils/authTokenHelpers';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { trackActivity } from '@app/services/analyticsService';

const WelcomeScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;

  const onPressGetStarted = useCallback(async () => {
    const token = await setupToken();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: token ? screens.NavigationRoot : screens.AddNumber,
          },
        ],
      }),
    );
  }, [navigation]);

  useEffect(() => {
    trackActivity('view: welcome');
  }, []);

  return (
    <View style={s.mainView}>
      <StatusBar backgroundColor={colors.transparent} barStyle={'dark-content'} translucent={true} />
      <View style={s.contentWrapper}>
        <View style={s.womanWrapper}>
          <Image style={s.gfxWoman} source={require('../assets/img/gfx-woman.png')} />
          <SvgIcon svgs={svgs} name='women-linear-gradient' width={WIN_WIDTH} height={WIN_WIDTH + 46} />
        </View>

        <View style={s.contentBlock}>
          <View style={s.brandWithTagline}>
            <View style={s.welcomeContent}>
              <TextView style={s.welblack} type={'head-line'} text='Welcome' />
              {currentUser?.User_Detail && (
                <TextView
                  style={s.welname}
                  type={'sub-title'}
                  text={`${currentUser?.User_Detail?.UserName} ${
                    currentUser?.User_Detail?.UserLastName ? currentUser?.User_Detail?.UserLastName : ''
                  }`}
                />
              )}
            </View>
            <View style={s.quotesBlock}>
              <SvgIcon
                svgs={svgs}
                name={Number(currentUser?.User_Detail?.LanguageId) === 2 ? 'wel-hindi-text' : 'wel-text'}
                width={WIN_WIDTH / 2}
                height={scaleVertical(78)}
              />
            </View>
          </View>

          <View style={s.buttonWrap}>
            <Button
              style={AppStyles.buttonWithIcon}
              onPress={() => {
                onPressGetStarted();
              }}>
              <TextView style={AppStyles.btnText} type={'body'} text='Start' />
              <Icon name='chevron-right' size={24} color={colors.white} />
            </Button>
          </View>
        </View>
      </View>
      <Image style={s.purpleBg} source={require('../assets/img/purplebg.png')} />
    </View>
  );
};
export default WelcomeScreen;
