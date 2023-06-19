import { Platform, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import s from './styles';
import TextView from '@app/components/TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import screens from '@app/constants/screens';
import AppStyles from '@app/styles/AppStyles';
import Button from '@app/components/Button';
import ConfirmationModal from '@app/components/ConfirmationModal';
import { changeAddress, getAddressList } from '@app/services/orderService';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@app/components/Loading';
import { getFormattedAddress, isEmpty } from '@app/helpers/helpers';
import { setAddressItem } from '@app/actions/orderActions';
import Icon from '@app/components/Icon';
import { trackActivity } from '@app/services/analyticsService';

const SelectAddressScreen = ({ route, navigation }) => {
  const { params } = route;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectAddress, setSelectAddress] = useState();

  const orderSelector = useSelector((state) => state.order);
  const { addresses, loading } = orderSelector;

  const dispatch = useDispatch();
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
          <TextView text={'Select Address'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const onPressAddEditAddress = useCallback(
    (isUpdate = false) => {
      navigation.navigate(screens.AddAddress, {
        isUpdate: isUpdate,
        onSave: () => {
          reLoadRequiredData();
        },
      });
    },
    [navigation, reLoadRequiredData],
  );

  const loadData = useCallback(
    async (isrefreshing = false) => {
      if (isrefreshing) setIsRefreshing(true);
      const payload = {
        PageNo: 1,
      };
      const result = await dispatch(getAddressList(payload));
      if (result) {
        if (isrefreshing) setIsRefreshing(false);
        const selected_address = result?.find((x) => x.address_id === x?.selected);
        if (selected_address) {
          setSelectAddress(selected_address);
        }
      } else {
        onPressAddEditAddress();
      }
    },
    [dispatch, onPressAddEditAddress],
  );

  useEffect(() => {
    trackActivity('upgrade: view select address');
    loadData();
  }, [loadData]);

  const reLoadRequiredData = useCallback(() => {
    const { onChangeAddress } = params;
    loadData();
    if (onChangeAddress) onChangeAddress();
  }, [loadData, params]);

  // const onOpenModal = useCallback(() => {
  //   setIsOpenModal(true);
  // }, []);

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const onPressSelectAddress = useCallback((item) => {
    setSelectAddress(item);
  }, []);

  const onPressChangeAddress = useCallback(async () => {
    const payload = {
      AddressId: selectAddress?.address_id,
    };
    const result = await dispatch(changeAddress(payload));
    if (result) {
      reLoadRequiredData();
      navigation.goBack();
    }
  }, [dispatch, navigation, reLoadRequiredData, selectAddress?.address_id]);

  const onPressEdit = useCallback(
    (item) => {
      const payload = {
        ...item,
        BillingName: item?.billing_name,
        BillingAddress: item?.billing_address,
        BillingPincode: item?.billing_pincode,
        BillingMobileNo: item?.billing_mobile_no,
        BillingCountryId: item?.billing_country_id,
        BillingStateId: item?.billing_state_id,
        BillingCityVillage: item?.billing_city_village,
        BillingArea: item?.billing_area,
        BillingHouse: item?.billing_house,
      };
      dispatch(setAddressItem(payload));
      onPressAddEditAddress(true);
    },
    [dispatch, onPressAddEditAddress],
  );

  const renderItem = useCallback(
    ({ item }) => {
      const address = getFormattedAddress(item);
      return (
        <View style={s.boxview}>
          <View style={s.rowlist}>
            <TextView text={`Deliver to ${item?.billing_name}`} type={'body-head'} style={s.addHeadText} />
            {item?.address_id === selectAddress?.address_id ? (
              <SvgIcon svgs={svgs} name={'check-right'} width={18} height={18} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onPressSelectAddress(item);
                }}>
                <SvgIcon svgs={svgs} name={'uncheck-right'} width={18} height={18} />
              </TouchableOpacity>
            )}
          </View>
          <View style={s.spaceTop}>
            <TextView text={address} type={'caption'} style={s.capsText} />
          </View>
          <View style={s.phoneViewTwo}>
            <TextView text={'Phone Number'} type={'caps-one'} style={s.phoneNum} />
            <TextView
              text={`+${item?.billing_country_phone_code} ${item?.billing_mobile_no}`}
              type={'caps-one'}
              style={s.phoneTextTwo}
            />
          </View>
          <View style={s.phoneViewTwo}>
            <TouchableOpacity
              onPress={() => {
                onPressEdit(item);
              }}>
              <TextView text={'Edit'} type={'button-text'} style={s.EditText} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onOpenModal}>
              <TextView text={'Remove'} type={'button-text'} style={s.RemoveText} />
            </TouchableOpacity> */}
          </View>
        </View>
      );
    },
    [onPressEdit, onPressSelectAddress, selectAddress?.address_id],
  );

  return loading && isEmpty(addresses) ? (
    <Loading />
  ) : (
    <>
      <View style={s.mainbg}>
        <View style={s.mainroot}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
            keyExtractor={(item, index) => `{token_${item?.address_id}_index_${index}}`}
            renderItem={renderItem}
            data={addresses}
            ListEmptyComponent={<TextView text={'No list found!'} type='body' style={s.emptyText} />}
            ListHeaderComponent={
              <TouchableOpacity
                style={s.firstView}
                onPress={() => {
                  onPressAddEditAddress(false);
                }}>
                <TextView text={'+ Add Address'} type={'caption'} style={s.AddAddressText} />
              </TouchableOpacity>
            }
          />
        </View>
        <View style={AppStyles.footerWrapper}>
          <Button style={s.btn} onPress={onPressChangeAddress} isLoading={loading}>
            <TextView text={'Save Address'} style={s.btntext} type={'body-head'} />
            <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
          </Button>
        </View>
      </View>
      <ConfirmationModal
        isOpen={isOpenModal}
        onClosed={onCloseModal}
        headerTitle={'Remove'}
        successText={'Confirm'}
        cancelText={'Cancel'}
        onPressCancel={onCloseModal}>
        <TextView text={'Are you sure want to Delete this Address?'} type={'body-head'} style={s.newcaptiontext} />
      </ConfirmationModal>
    </>
  );
};

export default SelectAddressScreen;
