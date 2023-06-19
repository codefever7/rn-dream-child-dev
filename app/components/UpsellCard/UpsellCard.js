import { RESPONSE_STATUS, UPSELL_IDENTIFIER } from '@app/constants/constant';
import React, { useCallback, useMemo } from 'react';
import { Image, Linking, Platform, View } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { useSelector } from 'react-redux';
import Button from '../Button';
import TextView from '../TextView';
import s from './styles';
import svgs from '../../assets/svg';
import HeaderButton from '../HeaderButton';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import { trackActivity } from '@app/services/analyticsService';

const UpsellCard = ({ type, onClose, onStartDemo, navigation, plan }) => {
  const userSelector = useSelector((state) => state.user);
  const { upsellCard } = userSelector;

  const card = useMemo(() => {
    const item = upsellCard?.CardList?.find((x) => x?.upsell_identifier === type);
    return item;
  }, [type, upsellCard]);

  const upsell_sub_title = useMemo(() => {
    const isPoint =
      type === UPSELL_IDENTIFIER.START_DEMO_DAILY ||
      type === UPSELL_IDENTIFIER.START_DEMO_WORKSHOP ||
      type === UPSELL_IDENTIFIER.START_DEMO_CLASS;

    return card?.upsell_sub_title?.map((item, index) => {
      return isPoint ? (
        <View style={s.rowList}>
          <SvgIcon svgs={svgs} name={'right-icon'} width={20} height={20} style={s.righticon} />
          <TextView text={item} type={'caption'} style={s.checkCaps} />
        </View>
      ) : (
        <TextView key={`Index_${index}`} text={item} type={'caption'} style={s.capsModal} />
      );
    });
  }, [card?.upsell_sub_title, type]);

  const onPressAction = useCallback(() => {
    if (Number(card?.upsell_is_link) === Number(RESPONSE_STATUS.SUCCESS)) {
      Linking.openURL(card?.upsell_link);
    } else if (
      card?.upsell_identifier === UPSELL_IDENTIFIER.START_DEMO_DAILY ||
      card?.upsell_identifier === UPSELL_IDENTIFIER.START_DEMO_WORKSHOP ||
      card?.upsell_identifier === UPSELL_IDENTIFIER.START_DEMO_CLASS
    ) {
      onStartDemo();
      onClose();
    } else if (
      card?.upsell_identifier === UPSELL_IDENTIFIER.TRIAL_EXPIRE ||
      card?.upsell_identifier === UPSELL_IDENTIFIER.SPECIAL_OFFER
    ) {
      trackActivity('upgrade: upgrade plan clicked', { type: plan?.plan_name });
      onClose();
      navigation.navigate(screens.PremiumPlan, { plan });
    }
  }, [card?.upsell_identifier, card?.upsell_is_link, card?.upsell_link, navigation, onClose, onStartDemo, plan]);

  const button = useMemo(() => {
    let ButtonText = 'Upgrade Plan';
    if (Number(card?.upsell_is_link) === Number(RESPONSE_STATUS.SUCCESS)) {
      ButtonText = 'Click Now';
    } else if (card?.upsell_action === 'start_demo') {
      ButtonText = 'Start Now';
    } else if (card?.upsell_action === 'chat_now') {
      ButtonText = 'Chat Now';
    }
    return (
      <View style={s.modalBtn}>
        <Button ButtonText={ButtonText} style={s.btnModal} onPress={onPressAction} />
      </View>
    );
  }, [card?.upsell_action, card?.upsell_is_link, onPressAction]);

  return (
    <View style={s.modalWrap}>
      <HeaderButton
        style={s.coloseIcon}
        type={1}
        iconName={'x'}
        onPress={onClose}
        color={colors.dimGray}
        isFeather={Platform.OS === 'ios' ? false : true}
      />
      <View>
        <Image source={{ uri: card?.upsell_image }} style={s.modalImg} resizeMode='cover' />
      </View>
      <View style={s.modalNewCaps}>
        <TextView text={card?.upsell_title} type={'body'} style={s.modalHead} />
      </View>
      {upsell_sub_title}
      {button}
    </View>
  );
};

export default UpsellCard;
