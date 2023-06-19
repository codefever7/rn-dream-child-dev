import { CONTENT_TYPE, FILE_VIEW_TYPE, RESPONSE_STATUS } from '@app/constants/constant';
import screens from '@app/constants/screens';
import { isEmpty } from '@app/helpers/helpers';
import { trackActivity } from '@app/services/analyticsService';
import { trackLockedItemActivity } from '@app/services/planService';
import { colors } from '@app/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import Blink from '../Blink';
import Button from '../Button';
import HeaderButton from '../HeaderButton';
import TextView from '../TextView';
import s from './styles';

const FileView = ({
  item,
  onPressFile,
  onPressCheckDoneActivity,
  viewType = FILE_VIEW_TYPE.FILE_VIEW,
  plan,
  navigation,
}) => {
  const [isOpenLockModal, setIsOpenLockModal] = useState(false);

  const isDone = useMemo(() => {
    return Number(item?.is_activity_done) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.is_activity_done]);

  const isDemo = useMemo(() => {
    return Number(item?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.IsDemo]);

  const isMotion = useMemo(() => {
    return Number(item?.object_motion) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.object_motion]);

  const isNewFile = useMemo(() => {
    return Number(item?.is_new_object) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.is_new_object]);

  const isLock = useMemo(() => {
    return isDemo && Number(item?.is_lock) === Number(RESPONSE_STATUS.SUCCESS);
  }, [isDemo, item?.is_lock]);

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
    trackLockedItemActivity(activity_item, true);
    onOpenLockModal();
  }, [item?.object_name, onOpenLockModal, plan?.plan_name]);

  return (
    <>
      <Blink isMotion={isMotion}>
        {viewType === FILE_VIEW_TYPE.FILE_VIEW ? (
          <TouchableOpacity
            style={[s.cardview, { backgroundColor: isDone ? colors.bglitegray : item?.bg_color }]}
            onPress={() => {
              if (isLock) {
                onClickLockedItem();
              } else {
                onPressFile(item);
              }
            }}>
            <View style={s.cardList}>
              <Image style={s.imgview} resizeMode='cover' source={{ uri: item?.object_banner }} />
              <View style={s.textView}>
                <TextView text={item?.object_name} type={'body'} style={s.title} />
                {!isEmpty(item?.object_sub_title) && (
                  <TextView text={item?.object_sub_title} type={'caption'} style={s.lastcaption} />
                )}
                {Number(item?.content_type_id) === CONTENT_TYPE.VIDEO && !isEmpty(item?.content_details) && (
                  <View style={s.cardList}>
                    <SvgIcon svgs={svgs} name={'youtube-icon'} width={14} height={14} style={s.logo} />
                    <TextView text={item?.content_details} type={'caption'} style={s.time} />
                  </View>
                )}
              </View>
            </View>
            {isLock ? (
              <SvgIcon svgs={svgs} name={'lock-icon'} width={20} height={20} style={s.circlecheck} />
            ) : (
              Number(item?.is_activity) === Number(RESPONSE_STATUS.SUCCESS) && (
                <>
                  {isDone ? (
                    <SvgIcon svgs={svgs} name={'circule-fill'} width={20} height={20} style={s.circlecheck} />
                  ) : (
                    item?.isShowActivity &&
                    Number(item?.activity_change_type) === Number(RESPONSE_STATUS.SUCCESS) && (
                      <TouchableOpacity
                        style={s.circlecheck}
                        onPress={
                          onPressCheckDoneActivity
                            ? () => {
                                onPressCheckDoneActivity(item);
                              }
                            : null
                        }>
                        <SvgIcon svgs={svgs} name={'circule-blank'} width={20} height={20} />
                      </TouchableOpacity>
                    )
                  )}
                </>
              )
            )}
            {isNewFile && <SvgIcon svgs={svgs} name={'new-tag'} width={40} height={40} style={s.newtag} />}
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={s.spacelist}
              onPress={() => {
                if (isLock) {
                  onClickLockedItem();
                } else {
                  onPressFile(item);
                }
              }}>
              <View style={isDone ? s.selectcard : s.card}>
                {isLock ? (
                  <SvgIcon svgs={svgs} name={'lock-icon'} width={20} height={20} style={s.circlecheck} />
                ) : (
                  Number(item?.is_activity) === Number(RESPONSE_STATUS.SUCCESS) && (
                    <>
                      {isDone ? (
                        <SvgIcon svgs={svgs} name={'circule-fill'} width={20} height={20} style={s.circlecheck} />
                      ) : (
                        item?.isShowActivity &&
                        Number(item?.activity_change_type) === Number(RESPONSE_STATUS.SUCCESS) && (
                          <TouchableOpacity
                            style={s.circlecheck}
                            onPress={
                              onPressCheckDoneActivity
                                ? () => {
                                    onPressCheckDoneActivity(item);
                                  }
                                : null
                            }>
                            <SvgIcon svgs={svgs} name={'circule-blank'} width={20} height={20} />
                          </TouchableOpacity>
                        )
                      )}
                    </>
                  )
                )}
                {isDone ? (
                  <>
                    <View style={s.dailyfileimgview}>
                      <Image style={s.imgscreen} source={{ uri: item?.object_banner }} resizeMode='contain' />
                    </View>
                    <View style={s.textcenter}>
                      <TextView text={item?.object_name} type={'body'} style={s.selecttext} />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={s.imgviewtwo}>
                      <Image style={s.imgscreen} source={{ uri: item?.object_banner }} resizeMode='contain' />
                    </View>
                    <View style={s.textcenter}>
                      <TextView text={item?.object_name} type={'body'} style={s.imgtext} />
                    </View>
                  </>
                )}
                {isNewFile && <SvgIcon svgs={svgs} name={'new-tag'} width={40} height={40} style={s.newtag} />}
              </View>
            </TouchableOpacity>
          </>
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

export default FileView;
