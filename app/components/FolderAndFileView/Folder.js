import { FILE_VIEW_TYPE, RESPONSE_STATUS } from '@app/constants/constant';
import screens from '@app/constants/screens';
import { isEmpty } from '@app/helpers/helpers';
import { trackActivity } from '@app/services/analyticsService';
import { trackLockedItemActivity } from '@app/services/planService';
import { colors } from '@app/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, ImageBackground, Platform, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import SvgIcon from 'react-native-svg-icon';
import svgs from '../../assets/svg';
import Blink from '../Blink';
import Button from '../Button';
import HeaderButton from '../HeaderButton';
import Icon from '../Icon';
import TextView from '../TextView';
import s from './styles';

const Folder = ({ item, onPressFolder, viewType = FILE_VIEW_TYPE.FILE_VIEW, plan, navigation }) => {
  const [isOpenLockModal, setIsOpenLockModal] = useState(false);

  const isDemo = useMemo(() => {
    return Number(item?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.IsDemo]);

  const isLock = useMemo(() => {
    return isDemo && Number(item?.is_lock) === Number(RESPONSE_STATUS.SUCCESS);
  }, [isDemo, item?.is_lock]);

  const isMotion = useMemo(() => {
    return Number(item?.object_motion) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.object_motion]);

  const isNewFile = useMemo(() => {
    return Number(item?.is_new_object) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.is_new_object]);

  const onOpenLockModal = useCallback(() => {
    setIsOpenLockModal(true);
  }, []);

  const onCloseLockModal = useCallback(() => {
    setIsOpenLockModal(false);
  }, []);

  const onPressUpgrade = useCallback(() => {
    onCloseLockModal();
    trackActivity('upgrade: upgrade plan clicked', { type: plan?.plan_name });
    navigation.navigate(screens.PremiumPlan, { plan });
  }, [navigation, onCloseLockModal, plan]);

  const onClickLockedItem = useCallback(() => {
    const activity_item = {
      type: plan?.plan_name,
      title: item?.object_name,
    };
    trackLockedItemActivity(activity_item);
    onOpenLockModal();
  }, [item?.object_name, onOpenLockModal, plan?.plan_name]);

  return (
    <>
      <Blink isMotion={isMotion}>
        {viewType === FILE_VIEW_TYPE.FILE_VIEW ? (
          <TouchableOpacity
            style={s.thirdrow}
            onPress={() => {
              if (isLock) {
                onClickLockedItem();
              } else {
                onPressFolder(item);
              }
            }}>
            <View
              style={[
                item?.bg_color?.toLowerCase() === colors.white.toLowerCase() ||
                item?.bg_color?.toLowerCase() === colors.whiteColor.toLowerCase()
                  ? s.whitecard
                  : s.thirdcard,
                { backgroundColor: item?.bg_color },
              ]}>
              <View style={s.rowview}>
                <Image style={s.imgview} resizeMode='contain' source={{ uri: item?.object_banner }} />
                <View style={s.lasttext}>
                  <View style={s.rowtext}>
                    <TextView text={item?.object_name} type={'body'} style={s.starttext} />
                  </View>
                  {!isEmpty(item?.object_sub_title) && (
                    <TextView text={item?.object_sub_title} type={'caption'} style={s.lastcaption} />
                  )}
                </View>
                <View
                  style={[
                    s.iconview,
                    item?.bg_color?.toLowerCase() === colors.white.toLowerCase() ||
                    item?.bg_color?.toLowerCase() === colors.whiteColor.toLowerCase()
                      ? s.whiteicon
                      : null,
                  ]}>
                  <Icon name='chevron-right' size={18} color={colors.dimGray} style={s.btnicon} />
                </View>
              </View>
              {isLock && <SvgIcon svgs={svgs} name={'lock-icon'} width={20} height={20} style={s.lock} />}
              <ImageBackground
                source={require('../../assets/img/treeright.png')}
                resizeMode='contain'
                style={s.lastimg}></ImageBackground>
            </View>
            {isNewFile && <SvgIcon svgs={svgs} name={'new-tag'} width={40} height={40} style={s.newtag} />}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={s.folderspacelist}
            onPress={() => {
              if (isLock) {
                onClickLockedItem();
              } else {
                onPressFolder(item);
              }
            }}>
            <View style={[s.foldercard, { backgroundColor: colors.item?.bg_color }]}>
              <View style={s.imgviewfive}>
                <Image style={s.imgscreen} source={{ uri: item?.object_banner }} resizeMode='cover' />
              </View>
              <View style={s.textcenter}>
                <TextView text={item?.object_name} type={'body'} style={s.imgtext} />
              </View>
              {isLock && <SvgIcon svgs={svgs} name={'lock-icon'} width={20} height={20} style={s.lock} />}
              {isNewFile && <SvgIcon svgs={svgs} name={'new-tag'} width={40} height={40} style={s.newtag} />}
            </View>
          </TouchableOpacity>
        )}
      </Blink>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.ModalPopup}
        isOpen={isOpenLockModal}
        onClosed={onCloseLockModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={'rgba(0, 0, 0, 0.3)'}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}>
        <View style={s.modalWrap}>
          <HeaderButton
            type={1}
            iconName={'x'}
            onPress={onCloseLockModal}
            color={colors.dimGray}
            style={s.coloseIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <View>
            <Image source={require('../../assets/img/lock.png')} style={s.modalImg} />
          </View>
          <View style={s.modalNewCaps}>
            <TextView text={'Unlock Your plan'} type={'body'} style={s.modalHead} />
            <TextView text={`This content is available for premium user only.`} type={'caption'} style={s.capsModal} />
          </View>
          <View style={s.modalBtn}>
            <Button ButtonText={'Upgrade Plan'} style={s.btnModal} onPress={onPressUpgrade} />
          </View>
        </View>
      </Modal>
    </>
  );
};
export default Folder;
