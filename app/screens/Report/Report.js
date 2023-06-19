import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import s from './styles';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import AppStyles from '@app/styles/AppStyles';
import TextView from '@app/components/TextView';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityReport } from '@app/services/planService';
import { REPORT_DURATION_TYPE, RESPONSE_STATUS } from '@app/constants/constant';
import { isEmpty } from '@app/helpers/helpers';
import Loading from '@app/components/Loading';
import { colors } from '@app/styles';
import { trackActivity } from '@app/services/analyticsService';

const ReportScreen = ({ navigation }) => {
  const [durationType, setDurationType] = useState(REPORT_DURATION_TYPE.TODAY);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userSelector = useSelector((state) => state.user);
  const planSelector = useSelector((state) => state.plan);
  const { activityReportData, loading } = planSelector;
  const { currentUser } = userSelector;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headernotiRow}>
          <TextView text={'4Q Report'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const planItem = useMemo(() => {
    const plan_item = currentUser?.User_Plan_Master?.find(
      (x) => x?.plan_work_type === 'Daily' && Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS),
    );
    return plan_item;
  }, [currentUser?.User_Plan_Master]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const payload = {
        LanguageId: currentUser?.User_Detail?.LanguageId,
        DurationType: durationType,
        PlanId: planItem?.plan_id,
        plan_map_id: planItem?.plan_map_id,
        user_daily_work_flow: currentUser?.User_Detail?.user_daily_work_flow,
      };
      await dispatch(getActivityReport(payload));
      if (isrefreshing) setIsRefreshing(false);
    },
    [
      currentUser?.User_Detail?.LanguageId,
      currentUser?.User_Detail?.user_daily_work_flow,
      dispatch,
      durationType,
      planItem?.plan_id,
      planItem?.plan_map_id,
    ],
  );

  useEffect(() => {
    trackActivity('view: report');
    loadData();
  }, [loadData]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      loadData();
    });
    return () => {
      if (focusListener) focusListener();
    };
  }, [loadData, navigation]);

  const reportData = useMemo(() => {
    let labels = [];
    let categories = [];
    let data = [];
    let totalScore = 0;
    if (!isEmpty(activityReportData?.ActivityReport)) {
      labels = activityReportData?.ActivityReport?.map((item) => `${Number(item?.average)}%`);
      categories = activityReportData?.ActivityReport?.map((item) => item?.progress_type_title);
      data = activityReportData?.ActivityReport?.map((item) => {
        totalScore = Number(totalScore) + Number(item?.achieve_total_activity_points);
        return { x: item?.progress_type_title, y: Number(item?.average) };
      });
    }
    return { labels, categories, data, totalScore };
  }, [activityReportData?.ActivityReport]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[AppStyles.root, AppStyles.rootListWithoutPadding]}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}>
        <View style={s.maincontain}>
          <View style={s.paddingView}>
            <View style={s.btnRow}>
              <TouchableOpacity
                style={durationType === REPORT_DURATION_TYPE.YEAR ? s.activeTab : s.inactiveTab}
                onPress={() => {
                  setDurationType(REPORT_DURATION_TYPE.YEAR);
                }}>
                <TextView
                  text={'All'}
                  type={'caption'}
                  style={durationType === REPORT_DURATION_TYPE.YEAR ? s.actiText : s.inacText}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDurationType(REPORT_DURATION_TYPE.TODAY);
                }}
                style={durationType === REPORT_DURATION_TYPE.TODAY ? s.activeTab : s.inactiveTab}>
                <TextView
                  text={'Daily'}
                  type={'caption'}
                  style={durationType === REPORT_DURATION_TYPE.TODAY ? s.actiText : s.inacText}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDurationType(REPORT_DURATION_TYPE.WEEK);
                }}
                style={durationType === REPORT_DURATION_TYPE.WEEK ? s.activeTab : s.inactiveTab}>
                <TextView
                  text={'Weekly'}
                  type={'caption'}
                  style={durationType === REPORT_DURATION_TYPE.WEEK ? s.actiText : s.inacText}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDurationType(REPORT_DURATION_TYPE.MONTH);
                }}
                style={durationType === REPORT_DURATION_TYPE.MONTH ? s.activeTab : s.inactiveTab}>
                <TextView
                  text={'Monthly'}
                  style={durationType === REPORT_DURATION_TYPE.MONTH ? s.actiText : s.inacText}
                />
              </TouchableOpacity>
            </View>
            <View style={s.chartMain}>
              <View style={s.chartHead}>
                <View style={s.leftTab}>
                  <TextView text={`Your Score ${reportData?.totalScore}`} type={'body'} style={s.textHead} />
                </View>
              </View>
              <VictoryChart
                animate={{
                  onLoad: { duration: 500 },
                  duration: 1000,
                  easing: 'quadInOut',
                }}
                theme={VictoryTheme.grayscale}
                domainPadding={50}>
                <VictoryAxis />
                <VictoryAxis dependentAxis domain={[0, 80]} />
                <VictoryBar
                  cornerRadius={10}
                  style={{
                    data: {
                      fill: ({ datum }) =>
                        datum.x === 'PQ'
                          ? colors.babyBlue
                          : datum.x === 'IQ'
                          ? colors.darkpurple
                          : datum.x === 'EQ'
                          ? colors.darkgreen
                          : colors.lowyellow,
                    },
                  }}
                  barRatio={0.8}
                  labels={reportData?.labels}
                  categories={{
                    x: reportData?.categories,
                  }}
                  data={reportData?.data}
                />
              </VictoryChart>
            </View>
          </View>
        </View>
        <View style={s.paddingView}>
          <View style={s.cardlist}>
            {!isEmpty(activityReportData?.ActivityReport) &&
              activityReportData?.ActivityReport?.map((item, index) => {
                return (
                  <View style={s.spacelist} key={`4Q_Report_${item?.progress_type_id}_index_${index}`}>
                    <View style={{ ...s.cardItem, backgroundColor: item?.bg_color }}>
                      <Image style={s.yogimg} source={{ uri: item?.image }} resizeMode='contain' />
                      <View style={s.textTitle}>
                        <TextView
                          text={`${item?.progress_type_full_title} (${item?.progress_type_title})`}
                          type={'caps'}
                          style={s.cardtext}
                        />
                        {durationType == REPORT_DURATION_TYPE.YEAR || durationType == REPORT_DURATION_TYPE.MONTH ? (
                          <TextView
                            text={`${item?.achieve_total_activity_points}/${item?.total_activity_points}`}
                            type={'body'}
                            style={s.cardcaption}
                          />
                        ) : (
                          <TextView
                            text={`${item?.achieve_total_activity_points}/${item?.total_activity_points}`}
                            type={'body-two'}
                            style={s.cardcaption}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default ReportScreen;
