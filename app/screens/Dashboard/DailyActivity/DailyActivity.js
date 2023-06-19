import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Platform,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import TextView from '../../../components/TextView';
import svgs from '../../../assets/svg';
import HeaderButton from '@app/components/HeaderButton';
import AppStyles from '@app/styles/AppStyles';
import { getPlanTypeList } from '@app/services/planService';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@app/components/Loading';
import { RESPONSE_STATUS, USER_STATUS, USER_STATUS_TYPE } from '@app/constants/constant';
import Folder from '@app/components/FolderAndFileView/Folder';
import FileView from '@app/components/FolderAndFileView/File';
import moment from 'moment';
import { isEmpty } from '@app/helpers/helpers';
import { translate } from '@app/helpers/appInitHelpers';
import Icon from '@app/components/Icon';
import DailyActivityPurchaseScreen from './DailyActivityPurchase';
import s from './styles';
import Button from '@app/components/Button';
import RenderHTML from 'react-native-render-html';
import { trackActivity } from '@app/services/analyticsService';

const DailyActivityScreen = ({ route, navigation }) => {
  const { item, plan } = route.params;
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;
  const [planType, setPlanType] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(currentUser?.Current_Day);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const planItem = useMemo(() => {
    const plan_item = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.PlanId);
    return plan_item;
  }, [currentUser?.User_Plan_Master, item?.PlanId]);

  const onPressPlanType = useCallback(
    (planTypeItem) => {
      let payload = {
        ...item,
        ...planTypeItem,
        name: planTypeItem?.plan_type_name,
        PlanTypeId: planTypeItem?.plan_type_id,
        PlanWorkType: plan?.plan_work_type,
        ActivityDay: currentUser?.Current_Day,
        PastActivityDay: selectedDay,
        user_daily_work_flow: currentUser?.User_Detail?.user_daily_work_flow,
        plan_map_id: planItem?.plan_map_id,
        IsDemo: planItem?.IsDemo,
      };
      navigation.push(screens.FolderView, { item: payload, plan });
    },
    [
      currentUser?.Current_Day,
      currentUser?.User_Detail?.user_daily_work_flow,
      item,
      navigation,
      plan,
      planItem?.IsDemo,
      planItem?.plan_map_id,
      selectedDay,
    ],
  );

  const isPaidPlan = useMemo(() => {
    const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === item?.PlanId);
    return planItem ? true : false;
  }, [currentUser?.User_Plan_Master, item?.PlanId]);

  const isDemo = useMemo(() => {
    return Number(planItem?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [planItem?.IsDemo]);

  const isShowDay = useMemo(() => {
    return (
      Number(currentUser?.User_Detail?.is_paid_user) === Number(RESPONSE_STATUS.SUCCESS) &&
      isPaidPlan &&
      Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT) &&
      (Number(currentUser?.User_Detail?.user_daily_work_flow) === Number(RESPONSE_STATUS.SUCCESS) ||
        currentUser?.User_Detail?.LMPDate !== '0000-00-00' ||
        currentUser?.User_Detail?.EDDDate !== '0000-00-00')
    );
  }, [
    currentUser?.User_Detail?.EDDDate,
    currentUser?.User_Detail?.LMPDate,
    currentUser?.User_Detail?.UserStatus,
    currentUser?.User_Detail?.is_paid_user,
    currentUser?.User_Detail?.user_daily_work_flow,
    isPaidPlan,
  ]);

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
      headerRight: () => {
        return isShowDay ? (
          <View style={s.headerRow}>
            <TextView text={'Day'} type={'caption-two'} style={s.ltext} />
            <View style={s.dayview}>
              <TextView text={selectedDay} type={'caption-two'} style={s.daytext} />
            </View>
          </View>
        ) : (
          <View style={s.headerIcons}>
            <View style={s.btnhead}>
              <TextView
                style={s.btnheadtext}
                type={'body-two'}
                text={isDemo ? 'Demo' : USER_STATUS_TYPE[currentUser?.User_Detail?.UserStatus]}
              />
            </View>
          </View>
        );
      },
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [currentUser?.User_Detail?.UserStatus, isDemo, isPaidPlan, isShowDay, item?.name, navigation, selectedDay]);

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
            UserStatus: currentUser?.User_Detail?.UserStatus,
            LanguageId: currentUser?.User_Detail?.LanguageId,
            IsDemo: planItem?.IsDemo,
          };
          await Promise.all([dispatch(getPlanTypeList(payload))])
            .then((res) => {
              if (res && res[0]) {
                if (isrefreshing) setIsRefreshing(false);
                setPlanType(res[0]);
                setLoading(false);
              }
            })
            .catch((error) => {
              setLoading(false);
              console.log('error', error);
            });
        }
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    },
    [
      currentUser?.User_Detail?.LanguageId,
      currentUser?.User_Detail?.UserStatus,
      currentUser?.User_Detail?.is_paid_user,
      dispatch,
      isDemo,
      isPaidPlan,
      item?.PlanId,
      planItem?.IsDemo,
    ],
  );

  useEffect(() => {
    let activity = 'view: 4qd';
    if (isDemo) {
      activity = 'view: demo 4qd';
    }
    loadData();
    trackActivity(activity);
  }, [isDemo, loadData]);

  const planList = useMemo(() => {
    const data = planType?.PlanTypeList?.filter((x) => x?.folder_file_type_name === 'Activity');
    return data;
  }, [planType?.PlanTypeList]);

  const planFolderList = useMemo(() => {
    const data = planType?.PlanTypeList?.filter((x) => x?.folder_file_type_name === 'Activity + Folder-File');
    return data;
  }, [planType?.PlanTypeList]);

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

  const days = useMemo(() => {
    const dayCount = 7;
    const totalDays = [];
    const today = new Date();
    if (isDemo) {
      const DemoPreviosDay = Number(planItem?.current_day);
      const DemoRemainingDay = Number(planItem?.remaining_day_demo);
      for (let i = 1; i <= DemoPreviosDay; i++) {
        const item = {};
        if (i === Number(planItem?.current_day)) {
          item.ActivityDay = currentUser?.Current_Day;
          item.DayInString = moment(today).format('ddd');
        } else {
          item.ActivityDay = Number(currentUser?.Current_Day) - (DemoPreviosDay - i);
          item.DayInString = moment(today).subtract(i, 'days').format('ddd');
        }
        if (i <= 7) {
          totalDays.push(item);
        }
      }
      if (DemoRemainingDay >= 1 && DemoPreviosDay < 7) {
        for (let i = 1; i <= DemoRemainingDay; i++) {
          const item = {
            ActivityDay: Number(currentUser?.Current_Day) + i,
            DayInString: moment(today).add(i, 'days').format('ddd'),
            disable: true,
          };
          totalDays.push(item);
        }
      }
    } else {
      for (let i = 0; i < dayCount; i++) {
        const item = {
          ActivityDay: currentUser?.Current_Day - i,
          DayInString: moment(today).subtract(i, 'days').format('ddd'),
        };
        totalDays.unshift(item);
      }
    }
    return totalDays;
  }, [currentUser?.Current_Day, isDemo, planItem?.current_day, planItem?.remaining_day_demo]);

  const onPressDay = useCallback((day) => {
    setSelectedDay(day?.ActivityDay);
  }, []);

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

  const extraContent = useMemo(() => {
    let data = planType?.ExtraContent;
    if (planType?.ExtraContent) {
      const newItem = { ...plan, isUpgrade: true };
      if (isDemo && planType?.ExtraContent?.length > 3) {
        data?.splice(4, 0, newItem);
      }
    }
    return data;
  }, [isDemo, plan, planType?.ExtraContent]);

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
              <TextView text={'Get Daily Activities for 9 Month!!'} type={'body'} style={s.freeTextHead} />
              <TextView text={translate('upgrade_activity_demo')} type={'caps'} style={s.daycaps} />
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

  const isShowActivityDay = useMemo(() => {
    return (
      (Number(currentUser?.User_Detail?.user_daily_work_flow) === Number(RESPONSE_STATUS.SUCCESS) &&
        Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT)) ||
      (Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT) &&
        (currentUser?.User_Detail?.LMPDate !== '0000-00-00' || currentUser?.User_Detail?.EDDDate !== '0000-00-00')) ||
      isDemo
    );
  }, [
    currentUser?.User_Detail?.EDDDate,
    currentUser?.User_Detail?.LMPDate,
    currentUser?.User_Detail?.UserStatus,
    currentUser?.User_Detail?.user_daily_work_flow,
    isDemo,
  ]);

  return isShowPurchaseScreen ? (
    <DailyActivityPurchaseScreen plan={plan} navigation={navigation} />
  ) : loading && isEmpty(planType) ? (
    <Loading />
  ) : (
    <SafeAreaView style={AppStyles.root}>
      <View style={s.rootScreen}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
          <View style={s.list}>
            {isShowActivityDay ? (
              <View style={s.calnderday}>
                {days?.map((day, index) => {
                  return (
                    <TouchableOpacity
                      key={`day_${index}`}
                      onPress={
                        !day?.disable
                          ? () => {
                              onPressDay(day);
                            }
                          : null
                      }>
                      {Number(day?.ActivityDay) === Number(selectedDay) ? (
                        <View style={s.centerCardview}>
                          <View style={s.bgviewactive}>
                            <View style={s.activeday}>
                              <TextView text={day?.ActivityDay} type={'body-one'} style={s.numtext} />
                            </View>
                            <TextView text={day?.DayInString} type={'caps'} style={s.activedayname} />
                          </View>
                        </View>
                      ) : (
                        <View style={s.centerCardview}>
                          <View style={s.bgview}>
                            <TextView text={day?.ActivityDay} type={'body-one'} style={s.numtext} />
                          </View>
                          <TextView text={day?.DayInString} type={'caps'} style={s.dayname} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
            {planFolderList?.map((folder, index) => {
              const payload = {
                ...item,
                ...folder,
                PlanTypeId: folder?.plan_type_id,
                name: folder?.plan_type_name,
                IsDemo: planItem?.IsDemo,
              };
              return (
                <TouchableOpacity
                  style={s.dailycard}
                  key={`plan_folder_${folder?.plan_type_id}_index_${index}`}
                  onPress={() => {
                    navigation.push(screens.FolderView, { item: payload, plan });
                  }}>
                  <View style={s.rowlistItem}>
                    <Image style={s.imgScreen} source={{ uri: folder?.plan_type_icon }} resizeMode='cover' />
                    <View style={s.textlist}>
                      <TextView text={folder?.plan_type_name} type={'body-head'} style={s.headerText} />
                      <TextView text={folder?.plan_type_description} type={'caps'} style={s.captext} />
                    </View>
                    <View style={s.icon_view}>
                      <Icon name='chevron-right' size={18} color={colors.dimGray} style={s.btnicon} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            {!isEmpty(currentUser?.Dialy_Motivation) && (
              <View style={s.quotesWrap}>
                <SvgIcon svgs={svgs} name={'card-topright'} width={48} height={37} style={s.cardtopright} />
                <SvgIcon svgs={svgs} name={'card-bottomleft'} width={58} height={35} style={s.cardbottomleft} />
                <Image source={require('../../../assets/img/quotesimg.png')} style={s.quoteImg} />
                <View style={s.textBox}>
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: currentUser?.Dialy_Motivation }}
                    tagsStyles={s.tagsStyles}
                  />
                </View>
              </View>
            )}
            {isDemo && (
              <View style={s.demo}>
                <TextView
                  text={`Free trial will be expired in ${planItem?.remaining_day_demo} days`}
                  type={'body-head'}
                  style={s.demoText}
                />
              </View>
            )}
            <View style={s.activitysec}>
              <View style={s.rowlistItem}>
                <SvgIcon svgs={svgs} name={'smile-icon'} width={24} height={24} style={s.smileicon} />
                <TextView text={'Daily Activities'} type={'body-head'} style={s.headerText} />
              </View>
              <View style={s.cardlist}>
                {planList?.map((item, index) => {
                  return (
                    <View style={s.spacelist} key={`planType_${item?.plan_type_id}_index_${index}`}>
                      <TouchableOpacity
                        style={{ ...s.cardItem, backgroundColor: item?.bg_color }}
                        onPress={() => {
                          onPressPlanType(item);
                        }}>
                        <Image style={s.yogimg} source={{ uri: item?.plan_type_icon }} resizeMode='contain' />
                        <TextView text={item?.plan_type_name} type={'body-head'} style={s.cardtext} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* [daily-activity] husband harmony section */}
          {/* <View style={s.quotes}>
            <View style={s.husbandquotesWrap}>
              <SvgIcon svgs={svgs} name={'card-topright'} width={48} height={37} style={s.cardtopright} />
              <SvgIcon svgs={svgs} name={'card-bottomleft'} width={58} height={35} style={s.cardbottomleft} />
              <Image source={require('../../../assets/img/husbandactivity.png')} style={s.quoteImg} />
              <View style={s.textBox}>
                <TextView text={'Husband Harmony Activity'} type={'body-head'} style={s.cardheading} />
                <TextView text={'જેને બાળક જન્મી ગયો હોય તેવા કપલની મુલાકાત'} type={'capsOne'} style={s.textcontent} />
              </View>
            </View>
          </View> */}

          {extraContent && extraContent?.length > 0 && (
            <View style={s.pdgBottm}>
              <View style={s.textmain}>
                <View style={s.rowlist}>
                  <SvgIcon svgs={svgs} name={'contain-icon'} width={21} height={21} style={s.smileicon} />
                  <TextView text={'Extra Content'} type={'body-head'} style={s.headtext} />
                </View>
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
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default DailyActivityScreen;
