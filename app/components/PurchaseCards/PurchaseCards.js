import { PLAN, UPSELL_IDENTIFIER } from '@app/constants/constant';
import screens from '@app/constants/screens';
import { translate } from '@app/helpers/appInitHelpers';
import { startTrial } from '@app/services/orderService';
import { colors } from '@app/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import Icon from '../Icon';
import TextView from '../TextView';
import UpsellCard from '../UpsellCard/UpsellCard';
import s from './styles';

const PurchaseCards = ({ cardType, navigation, onStartDemo }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const dispatch = useDispatch();

  const onOpenModal = useCallback((type) => {
    setModalType(type);
    setIsOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setModalType();
    setIsOpenModal(false);
  }, []);

  const onPressStartDemo = useCallback(async () => {
    try {
      let planName;
      let screen;
      if (modalType === UPSELL_IDENTIFIER.START_DEMO_DAILY) {
        planName = PLAN.SILVER;
        screen = screens.DailyActivity;
      } else if (modalType === UPSELL_IDENTIFIER.START_DEMO_WORKSHOP) {
        planName = PLAN.GOLD;
        screen = screens.WorkShop;
      } else if (modalType === UPSELL_IDENTIFIER.START_DEMO_CLASS) {
        planName = PLAN.PLATINUM;
        screen = screens.Class;
      }
      const result = await dispatch(startTrial(planName));
      if (result) {
        if (onStartDemo) {
          onStartDemo();
        }
        navigation.navigate(screen, result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, modalType, navigation, onStartDemo]);

  const renderPurchaseCard = useMemo(() => {
    let render;
    if (cardType === UPSELL_IDENTIFIER.START_DEMO_DAILY) {
      render = (
        <View style={s.freeCardWrap}>
          <View style={s.freeRow}>
            <Image source={require('../../assets/img/freeImg.png')} style={s.freeImg} />
            <View style={s.textFreeWrap}>
              <TextView text={'FREE Trial'} type={'body'} style={s.freeText} />
              <TextView text={'Get 7 Days FREE Daily Activities '} type={'body'} style={s.freeTextHead} />
              <TextView text={translate('activity_demo')} type={'caps'} style={s.daycaps} />
              <Button
                style={s.startNow}
                onPress={() => {
                  onOpenModal(UPSELL_IDENTIFIER.START_DEMO_DAILY);
                }}>
                <TextView text={'Start Now'} type={'caps'} style={s.startBtn} />
                <Icon name={'chevron-right'} size={12} color={colors.white} style={s.iconRight} />
              </Button>
            </View>
          </View>
          <Image source={require('../../assets/img/lastfreetag.png')} style={s.tag} />
        </View>
      );
    } else if (cardType === UPSELL_IDENTIFIER.START_DEMO_WORKSHOP) {
      render = (
        <View style={s.freeCardWrapdemo}>
          <View style={s.freeRow}>
            <Image source={require('../../assets/img/mobiletocuh.png')} resizeMode={'contain'} style={s.freelecImg} />
            <View style={s.textFreeWrap}>
              <TextView text={'Workshop Free Trial'} type={'body'} style={s.freeText} />
              <TextView text={'Get 1 lecture FREE (60 min.)'} type={'body'} style={s.freeTextHead} />
              <TextView text={'એક્ટીવીટી શરૂઆત છે, વર્કશોપ ઊંડાણ છે!!'} type={'caps'} style={s.daycaps} />
              <Button
                style={s.startNow}
                onPress={() => {
                  onOpenModal(UPSELL_IDENTIFIER.START_DEMO_WORKSHOP);
                }}>
                <TextView text={'Start Now'} type={'caps'} style={s.startBtn} />
                <Icon name={'chevron-right'} size={12} color={colors.white} style={s.iconRight} />
              </Button>
            </View>
          </View>
          <Image source={require('../../assets/img/lastfreetag.png')} style={s.tag} />
        </View>
      );
    } else if (cardType === UPSELL_IDENTIFIER.START_DEMO_CLASS) {
      render = (
        <View style={s.freeCardWrapdemo}>
          <View style={s.freeRow}>
            <Image source={require('../../assets/img/booksclas.png')} style={s.fullWork} />
            <View style={s.textFreeWrap}>
              <TextView text={'Class Free Trial'} type={'body'} style={s.freeText} />
              <TextView text={'Get 1 Class absolute FREE!!'} type={'body'} style={s.freeTextHead} />
              <TextView text={'દરેક વર્ગ આપનું જીવન બદલી શકે છે!!'} type={'caps'} style={s.daycaps} />
              <Button
                style={s.startNow}
                onPress={() => {
                  onOpenModal(UPSELL_IDENTIFIER.START_DEMO_CLASS);
                }}>
                <TextView text={'Start Now'} type={'caps'} style={s.startBtn} />
                <Icon name={'chevron-right'} size={12} color={colors.white} style={s.iconRight} />
              </Button>
            </View>
          </View>
          <Image source={require('../../assets/img/lastfreetag.png')} style={s.tag} />
        </View>
      );
    }
    return render;
  }, [cardType, onOpenModal]);

  return (
    <>
      {renderPurchaseCard}
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
        backdropOpacity={1}
        swipeArea={1}>
        <UpsellCard type={modalType} navigation={navigation} onClose={onCloseModal} onStartDemo={onPressStartDemo} />
      </Modal>
    </>
  );
};

export default PurchaseCards;
