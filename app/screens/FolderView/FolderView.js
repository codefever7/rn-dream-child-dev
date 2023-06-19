import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, View, SafeAreaView, RefreshControl, FlatList } from 'react-native';
import s from './styles';
import TextView from '@app/components/TextView';
import HeaderButton from '@app/components/HeaderButton';
import AppStyles from '@app/styles/AppStyles';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestionActivityDoneReport, getFolderFileList } from '@app/services/planService';
import Loading from '@app/components/Loading';
import {
  FILE_VIEW_TYPE,
  PALN_TYPE,
  RESPONSE_STATUS,
  UPSELL_IDENTIFIER,
  USER_STATUS,
  USER_STATUS_TYPE,
} from '@app/constants/constant';
import Folder from '@app/components/FolderAndFileView/Folder';
import FileView from '@app/components/FolderAndFileView/File';
import { isEmpty, toastNotification } from '@app/helpers/helpers';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import Modal from 'react-native-modalbox';
import Infomation from '../MediaFiles/Infomation';
import { trackActivity } from '@app/services/analyticsService';
import PurchaseCards from '@app/components/PurchaseCards/PurchaseCards';

const FolderViewScreen = ({ route, navigation }) => {
  const { item: folderItem } = route.params;
  const planSelector = useSelector((state) => state.plan);
  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;
  const { loading } = planSelector;
  const [data, setData] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const isDemo = useMemo(() => {
    return Number(folderItem?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [folderItem?.IsDemo]);

  const isPaidPlan = useMemo(() => {
    const planItem = currentUser?.User_Plan_Master?.find((x) => x?.plan_id === folderItem?.PlanId);
    return planItem ? true : false;
  }, [currentUser?.User_Plan_Master, folderItem?.PlanId]);

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

  const folderFileData = useMemo(() => {
    let newData = [];
    let fixedActivities;
    if (!isEmpty(data?.FolderFileList)) {
      newData = data?.FolderFileList;
      if (folderItem?.PlanWorkType === PALN_TYPE.DAILY) {
        newData = [];
        fixedActivities = [];
        data?.FolderFileList?.forEach((folderFile) => {
          if (Number(folderFile?.activity_change_type) === Number(RESPONSE_STATUS.SUCCESS)) {
            fixedActivities?.push(folderFile);
          } else {
            newData?.push(folderFile);
          }
        });
      }
    }
    return { data: newData, fixedActivities };
  }, [data?.FolderFileList, folderItem?.PlanWorkType]);

  const getHeaderDay = useMemo(() => {
    let header = null;
    if (folderItem?.ActivityDay) {
      if (folderItem?.PlanWorkType === PALN_TYPE.DAILY) {
        if (isShowDay) {
          header = (
            <View style={s.headerRow}>
              <TextView text={'Day'} type={'caption-two'} style={s.ltext} />
              <View style={s.dayview}>
                <TextView text={folderItem?.PastActivityDay} type={'caption-two'} style={s.daytext} />
              </View>
            </View>
          );
        } else {
          header = (
            <View style={s.headerIcons}>
              <View style={s.btnhead}>
                <TextView style={s.btnheadtext} text={USER_STATUS_TYPE[currentUser?.User_Detail?.UserStatus]} />
              </View>
            </View>
          );
        }
      } else if (folderItem?.PlanWorkType === PALN_TYPE.MONTHLY) {
        header = (
          <View style={s.headerRow}>
            <TextView text={`${folderItem?.ActivityDay} /`} type={'caption-two'} style={s.ltext} />
            <View style={s.dayview}>
              <TextView text={'90'} type={'caption-two'} style={s.daytext} />
            </View>
          </View>
        );
      } else if (folderItem?.PlanWorkType === PALN_TYPE.WEEKLY) {
        header = (
          <View style={s.headerRow}>
            <TextView text={'Class'} type={'caption-two'} style={s.ltext} />
            <View style={s.dayview}>
              <TextView text={folderItem?.CurrentWeek} type={'caption-two'} style={s.daytext} />
            </View>
          </View>
        );
      }
      if (isDemo) {
        header = (
          <View style={s.headerIcons}>
            <View style={s.btnhead}>
              <TextView style={s.btnheadtext} text={'Demo'} />
            </View>
          </View>
        );
      }
    }
    return header;
  }, [
    currentUser?.User_Detail?.UserStatus,
    folderItem?.ActivityDay,
    folderItem?.CurrentWeek,
    folderItem?.PastActivityDay,
    folderItem?.PlanWorkType,
    isDemo,
    isShowDay,
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
            onPress={() => navigation.goBack()}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={folderItem?.name} numberOfLines={2} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerRight: () => {
        return (
          <View style={s.headerRow}>
            {getHeaderDay}
            {!isEmpty(folderItem?.object_info) && (
              <HeaderButton
                type={1}
                iconName={'alert-circle'}
                color={colors.dimGray}
                style={s.addIcon}
                onPress={onOpenInfoModal}
                isFeather={Platform.OS === 'ios' ? false : true}
              />
            )}
          </View>
        );
      },
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [folderItem?.name, folderItem?.object_info, getHeaderDay, navigation, onOpenInfoModal]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const payload = {
        ...folderItem,
        UserStatus: currentUser?.User_Detail?.UserStatus,
      };
      const result = await dispatch(getFolderFileList(payload));
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
        setData(result);
      }
    },
    [currentUser?.User_Detail?.UserStatus, dispatch, folderItem],
  );

  useEffect(() => {
    let type = route.params?.plan?.plan_name;
    if (isDemo) {
      type = `demo ${route.params?.plan?.plan_name}`;
    }
    trackActivity('view: folder', { type: type, title: folderItem?.name });
    loadData();
  }, [folderItem?.name, isDemo, loadData, route.params?.plan?.plan_name]);

  const onPressFolder = useCallback(
    (folder_item) => {
      const payload = {
        ...folderItem,
        ...folder_item,
        name: folder_item?.object_name,
        FolderParentId: folder_item?.object_id,
        PlanTypeId: folder_item?.plan_type_id,
      };
      navigation.push(screens.FolderView, { item: payload, plan: route.params?.plan });
    },
    [folderItem, navigation, route.params?.plan],
  );

  const onPressFile = useCallback(
    (item) => {
      const payload = {
        ...item,
        ...route.params?.plan,
        PlanId: folderItem?.PlanId,
        ActivityDay: folderItem?.ActivityDay,
        PastActivityDay: folderItem?.PastActivityDay,
        user_daily_work_flow: folderItem?.user_daily_work_flow,
        plan_map_id: folderItem?.plan_map_id,
      };
      navigation.navigate(screens.MediaFile, {
        item: payload,
        onDoneActivity: () => {
          loadData();
        },
      });
    },
    [
      folderItem?.ActivityDay,
      folderItem?.PastActivityDay,
      folderItem?.PlanId,
      folderItem?.plan_map_id,
      folderItem?.user_daily_work_flow,
      loadData,
      navigation,
      route.params?.plan,
    ],
  );

  const onPressCheckDoneActivity = useCallback(
    async (item) => {
      const payload = {
        LanguageId: item?.language_id,
        FileId: item?.object_id,
        IsQuestionDone: 0,
        ProgressTypeId: item?.progress_type_id,
        ActivityPoints: item?.activity_points,
        IsActivityDone: item?.is_activity,
        PlanId: folderItem?.PlanId,
        ActivityDay: folderItem?.ActivityDay,
        user_daily_work_flow: folderItem?.user_daily_work_flow,
        plan_map_id: folderItem?.plan_map_id,
      };
      const result = await dispatch(addQuestionActivityDoneReport(payload));
      if (result) {
        trackActivity('activity marked as done', { title: item?.object_name });
        loadData();
        toastNotification('Activity submit successfully');
      }
    },
    [
      dispatch,
      folderItem?.ActivityDay,
      folderItem?.PlanId,
      folderItem?.plan_map_id,
      folderItem?.user_daily_work_flow,
      loadData,
    ],
  );

  const renderItem = useCallback(
    ({ item, viewType }) => {
      let fileItem = {
        ...item,
        IsDemo: folderItem?.IsDemo,
        isShowActivity:
          Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT) &&
          Number(folderItem?.ActivityDay) === Number(folderItem?.PastActivityDay),
      };
      const folderNewItem = {
        ...item,
        IsDemo: folderItem?.IsDemo,
      };
      return (
        <>
          {Number(item?.is_folder) === Number(RESPONSE_STATUS.SUCCESS) ? (
            <Folder
              navigation={navigation}
              item={folderNewItem}
              plan={route.params?.plan}
              onPressFolder={onPressFolder}
              viewType={
                viewType
                  ? viewType
                  : folderItem?.PlanWorkType === PALN_TYPE.DAILY
                  ? FILE_VIEW_TYPE.ACTIVITY_FILE_VIEW
                  : FILE_VIEW_TYPE.FILE_VIEW
              }
            />
          ) : item?.isActivityPurchaseCard ? (
            <View style={s.purchasecard}>
              <PurchaseCards
                cardType={UPSELL_IDENTIFIER.START_DEMO_DAILY}
                navigation={navigation}
                onStartDemo={loadData}
              />
            </View>
          ) : item?.isWorkshopPurchaseCard ? (
            <View style={s.purchasecard}>
              <PurchaseCards
                cardType={UPSELL_IDENTIFIER.START_DEMO_WORKSHOP}
                navigation={navigation}
                onStartDemo={loadData}
              />
            </View>
          ) : item?.isClassPurchaseCard ? (
            <View style={s.purchasecard}>
              <PurchaseCards
                cardType={UPSELL_IDENTIFIER.START_DEMO_CLASS}
                navigation={navigation}
                onStartDemo={loadData}
              />
            </View>
          ) : (
            <FileView
              navigation={navigation}
              item={fileItem}
              plan={route.params?.plan}
              onPressFile={onPressFile}
              onPressCheckDoneActivity={onPressCheckDoneActivity}
              viewType={
                viewType
                  ? viewType
                  : folderItem?.PlanWorkType === PALN_TYPE.DAILY
                  ? FILE_VIEW_TYPE.ACTIVITY_FILE_VIEW
                  : FILE_VIEW_TYPE.FILE_VIEW
              }
            />
          )}
        </>
      );
    },
    [
      currentUser?.User_Detail?.UserStatus,
      folderItem?.ActivityDay,
      folderItem?.IsDemo,
      folderItem?.PastActivityDay,
      folderItem?.PlanWorkType,
      loadData,
      navigation,
      onPressCheckDoneActivity,
      onPressFile,
      onPressFolder,
      route.params?.plan,
    ],
  );

  const onCloseInfoModal = useCallback(() => {
    setIsInfoModalVisible(false);
  }, []);

  const onOpenInfoModal = useCallback(() => {
    setIsInfoModalVisible(true);
  }, []);

  return loading && !data ? (
    <Loading />
  ) : (
    <SafeAreaView style={AppStyles.root}>
      <View style={s.rootScreen}>
        <FlatList
          contentContainerStyle={[(!data?.FolderFileList || data?.FolderFileList?.length === 0) && { flex: 1 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
          keyExtractor={(item, index) => `folder${item?.object_id}_index_${index}`}
          renderItem={renderItem}
          data={folderFileData?.data}
          numColumns={folderItem?.PlanWorkType === PALN_TYPE.DAILY ? 2 : 1}
          horizontal={false}
          ListHeaderComponent={
            folderItem?.PlanWorkType === PALN_TYPE.DAILY && (
              <View style={s.rowlisttwo}>
                <SvgIcon svgs={svgs} name={'smile-icon'} width={24} height={24} style={s.smileicon} />
                <TextView text={'Daily New Activities'} type={'body'} style={s.headerText} />
              </View>
            )
          }
          ListFooterComponent={
            !isEmpty(folderFileData?.fixedActivities) ? (
              <View style={{ ...s.acsection, marginTop: isEmpty(folderFileData?.data) ? 0 : 50 }}>
                <View style={s.rowlisttwo}>
                  <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
                  <TextView text={'Fixed Activities'} type={'body'} style={s.headerText} />
                </View>
                {folderFileData?.fixedActivities?.map((activity, index) => {
                  return (
                    <View key={`activity_${index}`}>
                      {renderItem({ item: activity, viewType: FILE_VIEW_TYPE.FILE_VIEW })}
                    </View>
                  );
                })}
              </View>
            ) : null
          }
        />
      </View>
      <Modal
        style={s.modal}
        isOpen={isInfoModalVisible}
        entry={'bottom'}
        position={'bottom'}
        coverScreen={true}
        backdrop={true}
        swipeToClose={true}
        backdropOpacity={0.7}
        backdropColor={colors.darkColor}
        backButtonClose={true}
        onClosed={onCloseInfoModal}>
        <Infomation onCloseModal={onCloseInfoModal} data={folderItem} />
      </Modal>
    </SafeAreaView>
  );
};

export default FolderViewScreen;
