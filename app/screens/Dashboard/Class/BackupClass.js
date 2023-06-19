import { View, SafeAreaView, Platform, FlatList, RefreshControl, TouchableOpacity, Linking, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import s from './styles';
import TextView from '@app/components/TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import { backupClassRequest, getBackupClass } from '@app/services/planService';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@app/components/Loading';
import { BACKUP_CLASS_COLOR, BACKUP_CLASS_STATUS } from '@app/constants/constant';
import ConfirmationModal from '@app/components/ConfirmationModal';

const BackupClassScreens = ({ route, navigation }) => {
  const { payload } = route.params;
  const planSelector = useSelector((state) => state.plan);
  const { backupClass, loading } = planSelector;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState();

  const dispatch = useDispatch();
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
          <TextView text={'Backup Class'} type={'body-two'} style={s.headtext} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const result = await dispatch(getBackupClass(payload));
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
      }
    },
    [dispatch, payload],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onOpenAlertModal = useCallback(() => {
    setIsOpenAlertModal(true);
  }, []);

  const onCloseAlertModal = useCallback(() => {
    setIsOpenAlertModal(false);
  }, []);

  const onPressBackupFolder = useCallback(
    (item) => {
      if (Number(item?.bk_status) === BACKUP_CLASS_STATUS.ACTIVE) {
        const newItem = {
          PlanId: payload?.PlanId,
          LanguageId: payload?.LanguageId,
          ActivityDay: item?.ActivityDay,
          name: 'Backup Class',
          expire_in: item?.expire_in,
        };
        navigation.push(screens.Class, { item: newItem, is_from_backup_class: true });
      } else {
        setSelectedClass(item);
        onOpenAlertModal();
      }
    },
    [navigation, onOpenAlertModal, payload?.LanguageId, payload?.PlanId],
  );

  const onPressConfirm = useCallback(async () => {
    if (Number(selectedClass?.bk_status) === BACKUP_CLASS_STATUS.OPENABLE) {
      const newPayload = {
        ...payload,
        CurrentActivityWeek: selectedClass?.ActivityDay,
      };
      const result = await dispatch(backupClassRequest(newPayload));
      if (result) {
        loadData();
        onCloseAlertModal();
      }
    } else {
      onCloseAlertModal();
    }
  }, [dispatch, loadData, onCloseAlertModal, payload, selectedClass]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const isSeen = Number(item?.bk_status) === BACKUP_CLASS_STATUS.SEEN;
      const newitem = {
        ...item,
        ActivityDay: item?.activity_day,
      };
      return (
        <>
          <TouchableOpacity
            style={isSeen ? s.selectBackup : s.backupCard}
            onPress={() => {
              onPressBackupFolder(newitem);
            }}>
            <View style={s.headerRow}>
              <View style={s.bgnumview}>
                <TextView text={index + 1} type={'body-head'} style={isSeen ? s.numgraytext : s.numtext} />
              </View>
              <View style={s.twoWay}>
                <TextView text={item?.object_name} type={'body'} style={s.lastcaption2} />
                {isSeen || Number(item?.bk_status) === BACKUP_CLASS_STATUS.BACKUP_SEEN ? (
                  <View style={{ ...s.classStatusView, backgroundColor: BACKUP_CLASS_COLOR[item?.bk_status] }}>
                    <TextView text={'Seen'} type={'caps-one'} style={s.seengray} />
                  </View>
                ) : Number(item?.bk_status) === BACKUP_CLASS_STATUS.ACTIVE ? (
                  <View style={{ ...s.classStatusView, backgroundColor: BACKUP_CLASS_COLOR[item?.bk_status] }}>
                    <TextView text={'Open'} type={'caps-one'} style={s.OpenText} />
                  </View>
                ) : (
                  <View style={{ ...s.classStatusView, backgroundColor: BACKUP_CLASS_COLOR[item?.bk_status] }}>
                    <TextView text={'Unseen'} type={'caps-one'} style={s.UnseenText} />
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </>
      );
    },
    [onPressBackupFolder],
  );

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={s.maincontain}>
      <View style={s.root}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
          keyExtractor={(item, index) => `folder${item?.object_id}_index_${index}`}
          renderItem={renderItem}
          data={backupClass}
          ListHeaderComponent={
            <>
              <View style={s.weeklycontain}>
                <SvgIcon svgs={svgs} name={'contain-icon'} width={24} height={24} style={s.smileicon} />
                <TextView text={'Previous Class'} type={'body-head'} style={s.headerText} />
              </View>
            </>
          }
          ListFooterComponent={
            <>
              <View style={s.knowCard}>
                <TextView text={'Attention!'} type={'body-head'} style={s.didknow} />
                <TextView
                  text={`જો આપે ક્લાસ લેટ જોઈન કર્યા છે, તો આપને આગળના તમામ ક્લાસનો બેક-અપ મળશે. આપને જે ક્લાસ જોવાના બાકી છે, તે Unseen Lable સાથે બતાવેલા છે. તેના પર ક્લિક કરશો, પછી તે ક્લાસ ૭ દિવસ સુધી જ એક્ટીવ રહેશે. જે-જે ક્લાસ જોવાના બાકી હોય, તે આપની અનુકૂળતા મુજબ એક્ટીવેટ કરીને જોઈ લેવા.`}
                  type={'caption-two'}
                  style={s.didcaption}
                />
                <View style={s.lasttextView}>
                  <Text style={s.lastText}>જો કોઈ અડચણ જણાય, તો </Text>
                  <Text style={s.numberText}>+916356563262 </Text>
                  <Text style={s.lastText}>પર સંપર્ક કરશો.</Text>
                </View>
              </View>
            </>
          }
        />
      </View>
      <ConfirmationModal
        isOpen={isOpenAlertModal}
        onClosed={onCloseAlertModal}
        headerTitle={'Are you sure?'}
        successText={Number(selectedClass?.bk_status) === BACKUP_CLASS_STATUS.OPENABLE ? 'Confirm' : 'Ok'}
        cancelText={'Cancel'}
        onPressCancel={onCloseAlertModal}
        onPressConfirm={onPressConfirm}>
        <TextView
          text={
            Number(selectedClass?.bk_status) === BACKUP_CLASS_STATUS.OPENABLE
              ? `This class will be activated once only for 7 days from today. Are you sure to activate it?`
              : `This class was meant to be watched when you got it for a week. Sorry this class will not be available again`
          }
          type={'body-head'}
          style={s.newcaptiontext}
        />
        <TextView
          text={
            Number(selectedClass?.bk_status) === BACKUP_CLASS_STATUS.OPENABLE
              ? `આ ક્લાસ આજથી ૭ દિવસ સુધી જ ચાલુ રહેશે. ફરી એક્ટીવેટ થશે નહીં. માટે સાવચેતીપૂર્વક પસંદગી કરશો.`
              : `આ વર્ગ આપને એક અઠવાડિય માટે મળ્યો ત્યારે જ જોવાનો હતો. માફ કરશો ફરીથી આ વર્ગ જોઈ શકાશે નહીં.`
          }
          type={'body-head'}
          style={s.newcaptiontext}
        />
        {Number(selectedClass?.bk_status) === BACKUP_CLASS_STATUS.SEEN && (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:63565 63262');
            }}>
            <TextView text={'63565 63262'} type={'body-head'} style={s.linetext} />
          </TouchableOpacity>
        )}
      </ConfirmationModal>
    </SafeAreaView>
  );
};

export default BackupClassScreens;
