import { View, Platform, ScrollView, Image, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import s from './styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@app/components/Loading';
import { getWorkClassData } from '@app/services/planService';
import { RESPONSE_STATUS } from '@app/constants/constant';
import Folder from '@app/components/FolderAndFileView/Folder';
import FileView from '@app/components/FolderAndFileView/File';
import { isEmpty } from '@app/helpers/helpers';
import { doubleIndent, indent } from '@app/styles/dimensions';
import Icon from '@app/components/Icon';
import ClassPurchaseScreen from './ClassPurchase';
import Button from '@app/components/Button';
import { trackActivity } from '@app/services/analyticsService';

const ClassScreen = ({ route, navigation }) => {
  const { item, plan, is_from_backup_class } = route.params;
  const [classData, setClassData] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;
  const dispatch = useDispatch();

  const isPaidPlan = useMemo(() => {
    const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.PlanId);
    return planItem ? true : false;
  }, [currentUser?.User_Plan_Master, item?.PlanId]);

  const planItem = useMemo(() => {
    const plan_item = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.PlanId);
    return plan_item;
  }, [currentUser?.User_Plan_Master, item?.PlanId]);

  const isDemo = useMemo(() => {
    return Number(planItem?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [planItem?.IsDemo]);

  const onPressPlanType = useCallback(
    (planTypeItem) => {
      let payload = {
        ...item,
        ...planTypeItem,
        name: planTypeItem?.object_name,
        PlanTypeId: planTypeItem?.plan_type_id,
        ActivityDay: item?.ActivityDay,
        PlanWorkType: plan?.plan_work_type,
        CurrentWeek: item?.ActivityDay,
        FolderParentId: planTypeItem?.object_id,
        IsDemo: planItem?.IsDemo,
      };
      navigation.push(screens.FolderView, { item: payload, plan });
    },
    [item, navigation, plan, planItem?.IsDemo],
  );

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
          <TextView text={item?.name} type={'body-two'} style={s.headtext} />
        </View>
      ),
      headerRight: () => {
        return (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.SUCCESS) &&
          isPaidPlan &&
          !is_from_backup_class) ||
          isDemo ? (
          <View style={s.headerIcons}>
            {isDemo ? (
              <View style={s.btnhead}>
                <TextView style={s.btnheadtext} text={'Demo'} type={'body-two'} />
              </View>
            ) : (
              <>
                <TextView text={'Class'} type={'caption-two'} style={s.ltext} />
                <View style={s.dayview}>
                  <TextView text={item?.ActivityDay} type={'caption-two'} style={s.daytext} />
                </View>
              </>
            )}
          </View>
        ) : null;
      },
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [
    currentUser?.User_Detail?.is_paid_user,
    isDemo,
    isPaidPlan,
    is_from_backup_class,
    item?.ActivityDay,
    item?.name,
    navigation,
  ]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      try {
        if (
          (Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.SUCCESS) && isPaidPlan) ||
          isDemo
        ) {
          setLoading(true);
          item.IsBackup = is_from_backup_class ? 1 : 0;
          item.IsDemo = planItem?.IsDemo;
          if (isrefreshing) setIsRefreshing(true);
          await Promise.all([dispatch(getWorkClassData(item))])
            .then((res) => {
              if (res && res[0]) {
                if (isrefreshing) setIsRefreshing(false);
                setClassData(res[0]);
                setLoading(false);
              }
            })
            .catch((e) => {
              setLoading(false);
              console.log('e', e);
            });
        }
      } catch (e) {
        setLoading(false);
        console.log('e', e);
      } finally {
        setLoading(false);
      }
    },
    [
      currentUser?.User_Detail?.is_paid_user,
      dispatch,
      isDemo,
      isPaidPlan,
      is_from_backup_class,
      item,
      planItem?.IsDemo,
    ],
  );

  useEffect(() => {
    let activity = 'view: classes';
    if (isDemo) {
      activity = 'view: demo classes';
    }
    trackActivity(activity);
    loadData();
  }, [isDemo, loadData]);

  const onPressFolder = useCallback(
    (folderItem) => {
      const payload = {
        ...item,
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

  const currentWeekClass = useMemo(() => {
    let currentClass = {};
    let data = [];
    if (classData?.WorkClassData && classData?.WorkClassData?.length > 0) {
      currentClass = classData?.WorkClassData[0];
      data = classData?.WorkClassData?.slice(1, classData?.WorkClassData?.length);
    }
    return { data, currentClass };
  }, [classData?.WorkClassData]);

  const onPressBackupClass = useCallback(() => {
    const payload = {
      ...item,
      CurrentActivityWeek: item?.ActivityDay,
      plan_map_id: planItem?.plan_map_id,
    };
    navigation.navigate(screens.BackupClass, { payload });
  }, [item, navigation, planItem?.plan_map_id]);

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

  const extraContent = useMemo(() => {
    let data = classData?.ExtraContent;
    if (classData?.ExtraContent) {
      const newItem = { ...plan, isUpgrade: true };
      if (isDemo && classData?.ExtraContent?.length > 3) {
        data?.splice(3, 0, newItem);
      }
    }
    return data;
  }, [isDemo, plan, classData?.ExtraContent]);

  const onPressUpgrade = useCallback(
    (plan) => {
      trackActivity('upgrade: upgrade plan clicked', { type: plan?.plan_name });
      navigation.navigate(screens.PremiumPlan, { plan });
    },
    [navigation],
  );

  const RenderUpgradeCard = useCallback(
    ({ item }) => {
      return (
        <View style={s.freeCardWrap}>
          <View style={s.freeRow}>
            <Image source={require('../../../assets/img/ninemonth.png')} style={s.freeImg} />
            <View style={s.textFreeWrap}>
              <TextView text={'Get 36 Weekly Classes Access!!'} type={'body'} style={s.freeTextHead} />
              <TextView text={'બુદ્ધિશાળી માતાઓ આ પ્લાન પસંદ કરે છે!!'} type={'caps'} style={s.daycaps} />
              <Button
                style={s.startNow}
                onPress={() => {
                  onPressUpgrade(item);
                }}>
                <TextView text={'Upgrade Now'} type={'caps'} style={s.startBtn} />
                <Icon name={'chevron-right'} size={12} color={colors.white} style={s.iconRight} />
              </Button>
            </View>
          </View>
        </View>
      );
    },
    [onPressUpgrade],
  );

  return isShowPurchaseScreen ? (
    <ClassPurchaseScreen plan={plan} navigation={navigation} />
  ) : loading && isEmpty(classData) ? (
    <Loading />
  ) : (
    <SafeAreaView style={s.maincontain}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
        <View style={s.maincontain}>
          <View style={{ ...s.root, paddingBottom: isEmpty(currentWeekClass?.currentClass) ? 0 : doubleIndent - 2 }}>
            <View style={s.list}>
              <View style={s.rowlist}>
                {!is_from_backup_class && (
                  <>
                    <SvgIcon svgs={svgs} name={'smile-icon'} width={24} height={24} style={s.smileicon} />
                    <TextView text={'Current Week Class'} type={'body-head'} style={s.headerText} />
                  </>
                )}
              </View>
              {!isEmpty(currentWeekClass?.currentClass) && (
                <TouchableOpacity
                  style={[
                    s.democard,
                    currentWeekClass?.currentClass?.bg_color?.toLowerCase() === colors.white.toLowerCase() ||
                    currentWeekClass?.currentClass?.bg_color?.toLowerCase() === colors.whiteColor.toLowerCase()
                      ? s.whitedatacard
                      : null,
                    { backgroundColor: currentWeekClass?.currentClass?.bg_color },
                  ]}
                  onPress={() => {
                    onPressPlanType(currentWeekClass?.currentClass);
                  }}>
                  <View style={s.imgCard}>
                    <Image
                      style={s.bagimg}
                      source={{ uri: currentWeekClass?.currentClass?.object_banner }}
                      resizeMode='contain'
                    />
                    <View style={s.textcon}>
                      <TextView
                        text={currentWeekClass?.currentClass?.object_name}
                        type={'body-two'}
                        style={s.kittext}
                      />
                    </View>
                  </View>
                  <View style={s.seccard}>
                    <TextView text={'Expire in'} type={'caps-one'} style={s.expiretext} />
                    <View style={s.bgwhite}>
                      <TextView
                        text={isDemo ? planItem?.remaining_day_demo : item?.expire_in}
                        type={'body'}
                        style={s.coutryname}
                      />
                    </View>
                    <TextView text={'Days'} type={'caps-one'} style={s.expday} />
                  </View>
                </TouchableOpacity>
              )}
              <View style={{ ...s.boxview, marginTop: isEmpty(currentWeekClass?.currentClass) ? 0 : indent }}>
                {currentWeekClass?.data?.map((plan, index) => {
                  const isLock = isLockItem(plan);
                  return (
                    <TouchableOpacity
                      style={s.widthstyle}
                      key={`Class_planType_${plan?.plan_type_id}_index_${index}`}
                      onPress={
                        !isLock
                          ? () => {
                              onPressPlanType(plan);
                            }
                          : null
                      }>
                      <View
                        style={[
                          s.conbg,
                          plan?.bg_color?.toLowerCase() === colors.white.toLowerCase() ||
                          plan?.bg_color?.toLowerCase() === colors.whiteColor.toLowerCase()
                            ? s.whitedatacard
                            : null,
                          { backgroundColor: plan?.bg_color },
                        ]}>
                        <Image style={s.imgfirstbox} source={{ uri: plan?.object_banner }} resizeMode='contain' />
                        <TextView text={plan?.object_name} type={'caption-two'} style={s.boxtext} />
                        {isLock && <SvgIcon svgs={svgs} name={'lock-icon'} width={18} height={18} style={s.taj} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {isDemo && (
                <View style={s.demo}>
                  <TextView
                    text={`Free trial will be expired in ${planItem?.remaining_day_demo} days`}
                    type={'body-head'}
                    style={s.demoText}
                  />
                </View>
              )}
            </View>
            {!is_from_backup_class && extraContent && extraContent?.length > 0 && (
              <>
                <View style={s.row_list}>
                  <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
                  <TextView text={'Extra Content'} type={'body-head'} style={s.headerText} />
                </View>

                {extraContent?.map((item, index) => {
                  const newItem = {
                    ...item,
                    IsDemo: planItem?.IsDemo,
                  };
                  return (
                    <View key={`Extra_Content_${item?.object_id}_index_${index}`}>
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

                {!is_from_backup_class &&
                  Number(classData?.BackupEnable) === Number(RESPONSE_STATUS.SUCCESS) &&
                  !isDemo && (
                    <TouchableOpacity style={s.listspace} onPress={onPressBackupClass}>
                      <View style={s.bagview}>
                        <Image
                          style={s.bagimg}
                          source={require('../../../assets/img/backupclass.png')}
                          resizeMode='contain'
                        />
                        <View style={s.textcon2}>
                          <TextView text={'Backup Class'} type={'body-head'} style={s.kittext2} />
                          <TextView
                            text={'જો આપને આગળના ક્લાસ જોવાના બાકી છે, તો અહીં ક્લિક કરો.'}
                            type={'caps-one'}
                            style={s.lastcaption2}
                          />
                        </View>
                        <View style={s.iconview2}>
                          <Icon name='chevron-right' size={18} color={colors.dimGray} style={s.btnicon} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClassScreen;
