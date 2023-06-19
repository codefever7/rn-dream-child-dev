import React, { useCallback, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import s from './styles';
import { TextInput } from 'react-native-paper';
import TextView from '@app/components/TextView';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import HeaderButton from '@app/components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryList, getStateList } from '@app/services/userService';
import { clearAddressItem, updateAddressItem } from '@app/actions/orderActions';
import { isAlphaNumeric, isEmpty, isNumber, isStirng, toastNotification } from '@app/helpers/helpers';
import { addAddress, updateAddress } from '@app/services/orderService';
import SearchModal from '@app/components/SearchModal/SearchModal';
import { trackActivity } from '@app/services/analyticsService';
import ScrollableAvoidKeyboard from '@app/components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';

const AddAddressScreen = ({ route, navigation }) => {
  const { isUpdate, onSave } = route.params;
  const orderSelector = useSelector((state) => state.order);
  const { address } = orderSelector;
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
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
          <TextView text={`${isUpdate ? 'Edit' : 'Add'} Address`} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [isUpdate, navigation]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      if (isUpdate) {
        let payload = {
          CountryId: address?.BillingCountryId,
        };
        const states = await dispatch(getStateList(payload));
        setStateList(states);
      }
      const countries = await dispatch(getCountryList());
      setCountryList(countries);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [address?.BillingCountryId, dispatch, isUpdate]);

  useEffect(() => {
    let message = `upgrade: view ${isUpdate ? 'edit' : 'add'} address`;
    trackActivity(message);
    loadData();
  }, [dispatch, isUpdate, loadData]);

  useEffect(() => {
    return () => {
      dispatch(clearAddressItem());
    };
  }, [dispatch]);

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateAddressItem({ propsName, value }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    async (country_id) => {
      if (!country_id) return;
      onChangeUserInfo('BillingCountryId', country_id);
      let payload = {
        CountryId: country_id,
      };
      const states = await dispatch(getStateList(payload));
      setStateList(states);
    },
    [dispatch, onChangeUserInfo],
  );

  const onSubmit = useCallback(async () => {
    let message;
    if (!address?.BillingName || address?.BillingName?.trim() === '') {
      message = 'Name is required';
    } else if (address?.BillingName && !isStirng(address?.BillingName)) {
      message = 'Please enter only english alphabet';
    } else if (isEmpty(address?.BillingMobileNo)) {
      message = 'Mobile Number is required';
    } else if (address?.BillingMobileNo && !isNumber(address?.BillingMobileNo)) {
      message = 'Please enter valid mobile number';
    } else if (!address?.BillingHouse || address?.BillingHouse?.trim() === '') {
      message = 'Flat, House No./ Apartment is required';
    } else if (address?.BillingHouse && !isAlphaNumeric(address?.BillingHouse)) {
      message = 'Please enter only english language content';
    } else if (!address?.BillingArea || address?.BillingArea?.trim() === '') {
      message = 'Area, Street is required';
    } else if (address?.BillingArea && !isAlphaNumeric(address?.BillingArea)) {
      message = 'Please enter only english language content';
    } else if (!address?.BillingAddress || address?.BillingAddress?.trim() === '') {
      message = 'Landmark is required';
    } else if (address?.BillingAddress && !isAlphaNumeric(address?.BillingAddress)) {
      message = 'Please enter only english language content';
    } else if (!address?.BillingCityVillage || address?.BillingCityVillage?.trim() === '') {
      message = 'City or Village is required';
    } else if (address?.BillingCityVillage && !isStirng(address?.BillingCityVillage)) {
      message = 'Please enter only english alphabet';
    } else if (!address?.BillingCountryId) {
      message = 'Country is required';
    } else if (!address?.BillingStateId) {
      message = 'State is required';
    } else if (isEmpty(address?.BillingPincode)) {
      message = 'Pincode is required';
    }
    if (message) {
      toastNotification(message);
      return;
    }
    const payload = {
      ...address,
      ShippingName: address?.BillingName,
      ShippingAddress: address?.BillingAddress,
      ShippingMobileNo: address?.BillingMobileNo,
      ShippingCountryId: address?.BillingCountryId,
      ShippingStateId: address?.BillingStateId,
      ShippingPincode: address?.BillingPincode,
      ShippingHouse: address?.BillingHouse,
      ShippingArea: address?.BillingArea,
      ShippingCityVIllage: address?.BillingCityVillage,
    };
    let result;
    if (isUpdate) {
      payload.AddressId = address?.address_id;
      result = await dispatch(updateAddress(payload));
    } else {
      result = await dispatch(addAddress(payload));
    }
    if (result) {
      if (onSave) onSave();
      navigation.goBack();
    }
  }, [address, dispatch, isUpdate, navigation, onSave]);

  return (
    <ScrollableAvoidKeyboard keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={s.mainbg}>
      <View style={s.updateroot}>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Name *'
            placeholder='Enter your name'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingName}
            onChangeText={(text) => {
              onChangeUserInfo('BillingName', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Mobile Number *'
            placeholder='Enter your mobile number'
            keyboardType='numeric'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingMobileNo}
            onChangeText={(text) => {
              onChangeUserInfo('BillingMobileNo', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Flat, House No./ Apartment *'
            placeholder='Enter your house no'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingHouse}
            onChangeText={(text) => {
              onChangeUserInfo('BillingHouse', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Area, Street *'
            placeholder='Enter your area, street'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingArea}
            onChangeText={(text) => {
              onChangeUserInfo('BillingArea', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Landmark *'
            placeholder='Landmark'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingAddress}
            onChangeText={(text) => {
              onChangeUserInfo('BillingAddress', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='City/Village *'
            placeholder='Enter your City/Village'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingCityVillage}
            onChangeText={(text) => {
              onChangeUserInfo('BillingCityVillage', text);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <SearchModal
            style={isUpdate ? [s.pickerstyle, { backgroundColor: colors.disabledBackground }] : s.pickerstyle}
            options={countryList || []}
            selectedValue={address?.BillingCountryId}
            placeholder={'Select Country *'}
            itemLabelField={'country_name'}
            itemValueField={'country_id'}
            isDisabled={isUpdate}
            onValueChange={onChangeCountry}
          />
        </View>
        <View style={s.inputprofile}>
          <SearchModal
            style={s.pickerstyle}
            options={stateList || []}
            selectedValue={address?.BillingStateId}
            placeholder={'Select State *'}
            itemLabelField={'state_name'}
            itemValueField={'state_id'}
            onValueChange={(state_id) => {
              if (state_id) onChangeUserInfo('BillingStateId', state_id);
            }}
          />
        </View>
        <View style={s.inputprofile}>
          <TextInput
            dense={true}
            theme={{ roundness: 6 }}
            style={s.inputstyle}
            mode='outlined'
            label='Pincode *'
            placeholder='Pincode'
            // keyboardType='numeric'
            selectionColor={colors.primary}
            outlineColor={colors.borderColor}
            activeOutlineColor={colors.primary}
            value={address?.BillingPincode}
            onChangeText={(text) => {
              onChangeUserInfo('BillingPincode', text);
            }}
          />
        </View>
      </View>
      <View style={AppStyles.footerWrapper}>
        <Button style={s.btn} onPress={onSubmit} isLoading={loading}>
          <TextView text={'Submit'} style={s.btntext} type={'body-head'} />
          <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
        </Button>
      </View>
    </ScrollableAvoidKeyboard>
  );
};

export default AddAddressScreen;
