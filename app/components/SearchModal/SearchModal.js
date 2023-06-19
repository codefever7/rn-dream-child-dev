import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity, Platform, FlatList, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modalbox';
import s from './Styles';
import { colors } from '../../styles';
import CheckBox from '../molecules/CheckBox';
import TextView from '../TextView';
import { isEmpty } from '@app/helpers/helpers';
import Touchable from '../molecules/Touchable';
import { TextInput } from 'react-native-paper';
import Icon from '../Icon';
import { isIOS } from '@app/constants/constant';

const SearchModal = ({
  options,
  itemLabelField,
  onValueChange,
  selectedValue,
  placeholder,
  itemValueField,
  style,
  isDisabled = false,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isOpenSearchModal, setSearchModal] = useState(false);

  const openModal = useCallback(() => {
    setSearchModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setSearchModal(false);
    setSearchText('');
  }, []);

  const value = useMemo(() => {
    const selected = options?.find((x) => x[itemValueField] === selectedValue);
    return selected;
  }, [itemValueField, options, selectedValue]);

  const list = useMemo(() => {
    let result = options;
    if (!isEmpty(searchText)) {
      const search_text = searchText?.trim().toLowerCase();
      result = options?.filter(
        (x) => x[itemLabelField] && x[itemLabelField]?.trim().toLowerCase().includes(search_text),
      );
    }
    return result;
  }, [itemLabelField, options, searchText]);

  return (
    <>
      <TouchableOpacity onPress={openModal} disabled={isDisabled} style={[s.inputWrapper, style]}>
        <TextView text={!isEmpty(value) ? value[itemLabelField] : placeholder} type={'form-label'} />
        <View style={s.SelectButton}>
          <Icon
            name={'chevron-down'}
            color={colors.grey}
            width={Platform.OS == 'ios' ? 22 : 18}
            height={Platform.OS == 'ios' ? 22 : 18}
          />
        </View>
      </TouchableOpacity>
      <Modal
        swipeToClose={true}
        position={'bottom'}
        style={s.unitmodal}
        isOpen={isOpenSearchModal}
        backdrop={true}
        disabled={true}
        backButtonClose={true}
        coverScreen={true}
        onClosed={closeModal}>
        <KeyboardAvoidingView style={s.keybordWrapper} behavior={isIOS && 'padding'}>
          <View style={s.inputprofile}>
            <TextInput
              dense={true}
              theme={{ roundness: 6 }}
              style={s.inputstyle}
              mode='outlined'
              label='Search'
              placeholder='Search'
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
            />
          </View>
          <FlatList
            data={list || []}
            isSeparator={true}
            isBottomMargin={false}
            keyboardShouldPersistTaps='handled'
            renderItem={({ item }) => {
              return (
                <Touchable
                  onPress={() => {
                    onValueChange(item[itemValueField]);
                    closeModal();
                  }}>
                  <View style={s.dropDownItem}>
                    <CheckBox
                      onClick={() => {
                        console.log('isChecked');
                      }}
                      style={s.checkbox}
                      isChecked={item[itemValueField] === selectedValue}
                      disabled={true}
                      checkBoxColor={colors.primary}
                    />
                    <TextView text={item[itemLabelField]} />
                  </View>
                </Touchable>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default SearchModal;
