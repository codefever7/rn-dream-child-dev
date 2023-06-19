import { View, Platform, SafeAreaView, ScrollView, Image, TouchableOpacity, RefreshControl, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkClassData, trackLockedItemActivity } from '@app/services/planService';
import Loading from '@app/components/Loading';
import { RESPONSE_STATUS } from '@app/constants/constant';
import Folder from '@app/components/FolderAndFileView/Folder';
import FileView from '@app/components/FolderAndFileView/File';
import { isEmpty } from '@app/helpers/helpers';
import s from './styles';
import WorkShopPurchaseScreen from './WorkShopPurchase';
import Button from '@app/components/Button';
import Modal from 'react-native-modalbox';
import Icon from '@app/components/Icon';
import { trackActivity } from '@app/services/analyticsService';

const WorkshopScreen = ({ route, navigation }) => {
  const { item, plan } = route.params;
  const [workShopData, setWorkShopData] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenLockModal, setIsOpenLockModal] = useState(false);
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;
  const dispatch = useDispatch();

  const planItem = useMemo(() => {
    const data = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.PlanId);
    return data;
  }, [currentUser?.User_Plan_Master, item?.PlanId]);

  const isDemo = useMemo(() => {
    return Number(planItem?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [planItem?.IsDemo]);

  const isPaidPlan = useMemo(() => {
    const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.PlanId);
    return planItem ? true : false;
  }, [currentUser?.User_Plan_Master, item?.PlanId]);

  const onOpenLockModal = useCallback(() => {
    setIsOpenLockModal(true);
  }, []);

  const onCloseLockModal = useCallback(() => {
    setIsOpenLockModal(false);
  }, []);

  const onPressItem = useCallback(
    (planTypeItem) => {
      let payload = {
        ...item,
        ...planTypeItem,
        name: planTypeItem?.object_name,
        PlanTypeId: planTypeItem?.plan_type_id,
        ActivityDay: planItem?.current_day,
        PlanWorkType: plan?.plan_work_type,
        FolderParentId: planTypeItem?.object_id,
        IsDemo: planItem?.IsDemo,
      };
      navigation.push(screens.FolderView, { item: payload, plan });
    },
    [item, navigation, plan, planItem?.IsDemo, planItem?.current_day],
  );

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={navigation.goBack}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={item?.name} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [item?.name, navigation]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      try {
        if (
          (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.SUCCESS) && isPaidPlan) ||
          isDemo
        ) {
          setLoading(true);
          if (isrefreshing) setIsRefreshing(true);
          const payload = {
            PlanId: item?.PlanId,
            ActivityDay: planItem?.current_day,
            LanguageId: item?.LanguageId,
            IsDemo: planItem?.IsDemo,
          };
          await Promise.all([dispatch(getWorkClassData(payload))])
            .then((res) => {
              if (res && res[0]) {
                if (isrefreshing) setIsRefreshing(false);
                setWorkShopData(res[0]);
                setLoading(false);
              }
            })
            .catch((error) => {
              setLoading(false);
              console.log('error', error);
            });
        }
      } catch (e) {
        console.log('e', e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [
      currentUser?.User_Detail?.is_paid_user,
      dispatch,
      isDemo,
      isPaidPlan,
      item?.LanguageId,
      item?.PlanId,
      planItem?.IsDemo,
      planItem?.current_day,
    ],
  );

  useEffect(() => {
    let activity = 'view: workshop';
    if (isDemo) {
      activity = 'view: demo workshop';
    }
    trackActivity(activity);
    loadData();
  }, [isDemo, loadData]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerIcons}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.Dashboard)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={item?.name} type={'body-two'} style={s.headtext} />
        </View>
      ),
      headerRight: () => {
        return (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.SUCCESS) && isPaidPlan) ||
          isDemo
          ? (!isEmpty(workShopData?.WorkClassData) || isDemo) && (
              <View style={s.headerIcons}>
                {isDemo ? (
                  <View style={s.btnhead}>
                    <TextView style={s.btnheadtext} text={'Demo'} type={'body-two'} />
                  </View>
                ) : (
                  <>
                    <TextView text={`${planItem?.current_day} /`} type={'caption-two'} style={s.ltext} />
                    <View style={s.dayview}>
                      <TextView text={'90'} type={'caption-two'} style={s.daytext} />
                    </View>
                  </>
                )}
              </View>
            )
          : null;
      },
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [
    currentUser?.User_Detail?.is_paid_user,
    isDemo,
    isPaidPlan,
    item?.name,
    navigation,
    planItem?.current_day,
    workShopData?.WorkClassData,
  ]);

  const onPressFolder = useCallback(
    (folderItem) => {
      const payload = {
        ...item,
        ...folderItem,
        name: folderItem?.object_name,
        FolderParentId: folderItem?.object_id,
        PlanTypeId: folderItem?.plan_type_id,
        IsDemo: planItem?.IsDemo,
      };
      navigation.push(screens.FolderView, { item: payload, plan });
    },
    [item, navigation, plan, planItem?.IsDemo],
  );

  const onPressFile = useCallback(
    (item) => {
      const newItem = {
        ...item,
        ...plan,
      };
      navigation.navigate(screens.MediaFile, { item: newItem });
    },
    [navigation, plan],
  );

  const isShowPurchaseScreen = useMemo(() => {
    let isShow = false;
    if (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.FAIL) || !isPaidPlan) {
      isShow = true;
    }
    if (isDemo) {
      isShow = false;
    }
    return isShow;
  }, [currentUser?.User_Detail?.is_paid_user, isDemo, isPaidPlan]);

  const isLockItem = useCallback(
    (planItem) => {
      return isDemo && Number(planItem?.is_lock) === Number(RESPONSE_STATUS.SUCCESS);
    },
    [isDemo],
  );

  const onPressUpgrade = useCallback(() => {
    onCloseLockModal();
    trackActivity('upgrade: upgrade plan clicked', { type: plan?.plan_name });
    navigation.navigate(screens.PremiumPlan, { plan });
  }, [navigation, onCloseLockModal, plan]);

  const extraContent = useMemo(() => {
    let data = workShopData?.ExtraContent;
    if (workShopData?.ExtraContent) {
      const newItem = { ...plan, isUpgrade: true };
      if (isDemo && workShopData?.ExtraContent?.length > 3) {
        data?.splice(4, 0, newItem);
      }
    }
    return data;
  }, [isDemo, plan, workShopData?.ExtraContent]);

  const RenderUpgradeCard = useCallback(() => {
    return (
      <View style={s.freeCardWrap}>
        <View style={s.freeRow}>
          <Image source={require('../../../assets/img/ninemonth.png')} style={s.fullWork} />
          <View style={s.textFreeWrap}>
            <TextView text={'Get full Workshop Now!!'} type={'body'} style={s.freeTextHead} />
            <TextView
              text={'૨૦+ કલાકના વર્કશોપ વીડિયો સાથે એક્ટીવીટી મટીરિયલ કીટ પણ મેળવો.'}
              type={'caps'}
              style={s.daycaps}
            />
            <Button style={s.startNow} onPress={onPressUpgrade}>
              <TextView text={'Upgrade Now'} type={'caps'} style={s.startBtn} />
              <Icon name={'chevron-right'} size={12} color={colors.white} style={s.iconRight} />
            </Button>
          </View>
        </View>
      </View>
    );
  }, [onPressUpgrade]);

  const onClickLockedItem = useCallback(
    (workshop_item) => {
      const activity_item = {
        type: plan?.plan_name,
        title: workshop_item?.object_name,
      };
      trackLockedItemActivity(activity_item);
      onOpenLockModal();
    },
    [onOpenLockModal, plan?.plan_name],
  );

  return isShowPurchaseScreen ? (
    <WorkShopPurchaseScreen plan={plan} navigation={navigation} />
  ) : loading && isEmpty(workShopData) ? (
    <Loading />
  ) : (
    <>
      <SafeAreaView style={AppStyles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
          <View style={s.maincontain}>
            <View style={s.root}>
              <View style={s.list}>
                {!isEmpty(workShopData?.WorkClassData) && (
                  <>
                    <View style={s.flexlist}>
                      <View style={s.rowlist}>
                        <SvgIcon svgs={svgs} name={'smile-icon'} width={21} height={21} style={s.smileicon} />
                        <TextView text={'Vedic & Scientific Workshop'} type={'body-head'} style={s.headtext} />
                      </View>
                    </View>
                    <View style={s.boxview}>
                      {workShopData?.WorkClassData?.map((plan, index) => {
                        const isLock = isLockItem(plan);
                        return index === 0 || index === 1 ? (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                if (isLock) {
                                  onClickLockedItem(plan);
                                } else {
                                  onPressItem(plan);
                                }
                              }}
                              style={s.widthstyle}
                              key={`Workshop_planType_${plan?.plan_type_id}_index_${index}`}>
                              <View
                                style={[
                                  s.conbg,
                                  plan?.bg_color?.toLowerCase() === colors.white.toLowerCase() ||
                                  plan?.bg_color?.toLowerCase() === colors.whiteColor.toLowerCase()
                                    ? s.whitedatacard
                                    : null,
                                  { backgroundColor: plan?.bg_color },
                                ]}>
                                <Image
                                  style={s.imgfirstbox}
                                  source={{ uri: plan?.object_banner }}
                                  resizeMode='contain'
                                />
                                <TextView text={plan?.object_name} type={'caption-two'} style={s.boxtext} />
                                {isLock && (
                                  <SvgIcon svgs={svgs} name={'lock-icon'} width={18} height={18} style={s.lock} />
                                )}
                              </View>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                if (isLock) {
                                  onClickLockedItem(plan);
                                } else {
                                  onPressItem(plan);
                                }
                              }}
                              style={s.threebox}
                              key={`Workshop_planType_${plan?.plan_type_id}_index_${index}`}>
                              <View
                                style={[
                                  s.bgbox4,
                                  plan?.bg_color?.toLowerCase() === colors.white.toLowerCase() ||
                                  plan?.bg_color?.toLowerCase() === colors.whiteColor.toLowerCase()
                                    ? s.whitedatacard
                                    : null,
                                  { backgroundColor: plan?.bg_color },
                                ]}>
                                <Image
                                  style={s.imgsecondbox}
                                  source={{ uri: plan?.object_banner }}
                                  resizeMode='contain'
                                />
                                <TextView text={plan?.object_name} type={'caption-two'} style={s.boxtext} />
                                {isLock && (
                                  <SvgIcon svgs={svgs} name={'lock-icon'} width={18} height={18} style={s.lock} />
                                )}
                              </View>
                            </TouchableOpacity>
                          </>
                        );
                      })}
                    </View>
                    {isDemo ? (
                      <View style={s.demo}>
                        <TextView
                          text={`Free trial will be expired in ${planItem?.remaining_day_demo} days`}
                          type={'body-head'}
                          style={s.demoText}
                        />
                      </View>
                    ) : (
                      <View style={s.textIntro}>
                        <Text style={s.textmain}>
                          <Text style={s.labelText}>ખાસ નોંધ : </Text>
                          <Text style={s.capsText}>
                            ઉપર દર્શાવેલા ૮ વર્કશોપના વીડિયો સેશન ૯૦ દિવસમાં જોઈ લેવા. ૯૦ દિવસ પછી તે Hide થઈ જશે. કારણ
                            કે જેટલાં વહેલાં વીડિયો સેશન જોઈને આપ તેને ફોલો કરવાનું શરૂ કરશો, તેટલું ઉત્તમ પરિણામ મળશે.
                          </Text>
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>

              {/* <View style={s.boxviewtwo}>
              <View style={s.threebox}>
                <View style={s.bgbox}>
                  <Image
                    style={s.imgsecondbox}
                    source={require('../../../assets/img/spums.png')}
                    resizeMode='contain'
                  />
                  <TextView text={'Infertility'} type={'caption-two'} style={s.boxtext} />
                  <SvgIcon svgs={svgs} name={'premium-icon'} width={18} height={18} style={s.taj} />
                </View>
              </View>
              <View style={s.threebox}>
                <View style={s.bgbox2}>
                  <Image
                    style={s.imgsecondbox}
                    source={require('../../../assets/img/cinema.png')}
                    resizeMode='contain'
                  />
                  <TextView text={'Dream Movie'} type={'caption-two'} style={s.boxtext} />
                  <SvgIcon svgs={svgs} name={'premium-icon'} width={18} height={18} style={s.taj} />
                </View>
              </View>
              <View style={s.threebox}>
                <View style={s.bgbox3}>
                  <Image
                    style={s.imgsecondbox}
                    source={require('../../../assets/img/watch.png')}
                    resizeMode='contain'
                  />
                  <TextView text={'Dream Routine'} type={'caption-two'} style={s.boxtext} />
                  <SvgIcon svgs={svgs} name={'premium-icon'} width={18} height={18} style={s.taj} />
                </View>
              </View>
              <View style={s.threebox}>
                <View style={s.bgbox4}>
                  <Image
                    style={s.imgsecondbox}
                    source={require('../../../assets/img/dietschedule.png')}
                    resizeMode='contain'
                  />
                  <TextView text={'Dream Diet'} type={'caption-two'} style={s.boxtext} />
                  <SvgIcon svgs={svgs} name={'premium-icon'} width={18} height={18} style={s.taj} />
                </View>
              </View>
              <View style={s.threebox}>
                <View style={s.bgbox5}>
                  <Image
                    style={s.imgsecondbox}
                    source={require('../../../assets/img/happy.png')}
                    resizeMode='contain'
                  />
                  <TextView text={'Dream Life'} type={'caption-two'} style={s.boxtext} />
                  <SvgIcon svgs={svgs} name={'premium-icon'} width={18} height={18} style={s.taj} />
                </View>
              </View>
              <View style={s.threebox}>
                <View style={s.bgbox6}>
                  <Image
                    style={s.imgsecondbox}
                    source={require('../../../assets/img/Ayurveda.png')}
                    resizeMode='contain'
                  />
                  <TextView text={'Ayurveda	'} type={'caption-two'} style={s.boxtext} />
                  <SvgIcon svgs={svgs} name={'premium-icon'} width={18} height={18} style={s.taj} />
                </View>
              </View>
            </View> */}
              {extraContent && extraContent?.length > 0 && (
                <>
                  {!isEmpty(workShopData?.WorkClassData) && (
                    <View style={s.textmain2}>
                      <View style={s.rowlist}>
                        <SvgIcon svgs={svgs} name={'contain-icon'} width={21} height={21} style={s.smileicon} />
                        <TextView text={'Extra Content'} type={'body-head'} style={s.headtext} />
                      </View>
                    </View>
                  )}
                  {extraContent?.map((item, index) => {
                    const newItem = {
                      ...item,
                      IsDemo: planItem?.IsDemo,
                    };
                    return (
                      <View style={s.folderList} key={`Extra_Content_${item?.object_id}_index_${index}`}>
                        {Number(item?.is_folder) === Number(RESPONSE_STATUS.SUCCESS) ? (
                          <Folder item={newItem} onPressFolder={onPressFolder} plan={plan} navigation={navigation} />
                        ) : item?.isUpgrade ? (
                          <View style={s.purchasecard}>
                            <RenderUpgradeCard item={item} />
                          </View>
                        ) : (
                          <FileView item={newItem} onPressFile={onPressFile} plan={plan} navigation={navigation} />
                        )}
                      </View>
                    );
                  })}
                  {/* <View style={s.listspace}>
                  <View style={s.bagview}>
                    <Image style={s.bagimg} source={require('../../../assets/img/bag.png')} resizeMode='contain' />
                    <View style={s.textcon}>
                      <TextView text={'Material Kit Explanation'} type={'body-head'} style={s.kittext} />
                      <TextView
                        text={'Posuere condimentum dignissim morbi vulputate.'}
                        type={'caps-one'}
                        style={s.lastcaption}
                      />
                    </View>
                    <TouchableOpacity style={s.iconview2}>
                      <Icon name='chevron-right' size={18} color={colors.dimGray} style={s.btnicon} />
                    </TouchableOpacity>
                  </View>
                </View> */}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
            <Image source={require('../../../assets/img/lock.png')} style={s.modalImg} />
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

export default WorkshopScreen;
