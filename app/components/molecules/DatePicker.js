import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Typography from '@app/styles/Typography';
import { colors } from '@app/styles';
import Icon from '../../components/Icon';
import moment from 'moment';
import { borderWidth, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import TextView from '../TextView';
import { isIOS, IS_IPHONE_X } from '@app/constants/constant';

const DatePicker = ({
  labelText,
  iconName = 'calendar',
  value = new Date(),
  mode = 'date',
  is24Hour = false,
  display = isIOS ? 'spinner' : 'calendar',
  placeholder,
  isShowIcon = true,
  onChange,
  disabled = false,
}) => {
  const [isShow, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const onChangeDate = useCallback(
    (event, date) => {
      setShow(false);
      if (onChange) onChange(date);
    },
    [setShow, onChange],
  );

  const onChangeiosDateDate = (event, date) => {
    if (onChange) setTempDate(date);
  };

  return (
    <>
      <View>
        {labelText && <TextView numberOfLines={1} type={'form-label'} text={labelText} style={styles.DateTitle} />}
        {isShow && Platform.OS === 'android' && (
          <DateTimePicker value={value} mode={mode} is24Hour={is24Hour} display={display} onChange={onChangeDate} />
        )}
        <TouchableOpacity
          onPress={
            !disabled
              ? () => {
                  setShow(true);
                }
              : null
          }
          activeOpacity={1}>
          <View style={[styles.inputAndIcon, isShowIcon && styles.isShowBorder]}>
            <TextView
              style={styles.dateText}
              type={'body'}
              text={
                placeholder
                  ? placeholder
                  : mode === 'time'
                  ? moment(value).utcOffset('+05:30').format('hh:mm a')
                  : moment(value).format('D/M/YYYY')
              }
            />
            {isShowIcon && (
              <Icon name={iconName} size={20} style={styles.iconPosition} color={colors.grey} isFeather={false} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'ios' && (
        <Modal
          backdrop={true}
          backdropColor={'rgba(0, 0, 0, 0.6)'}
          //   easing={Easing.ease}
          animationDuration={400}
          backButtonClose={true}
          swipeArea={1}
          position={'bottom'}
          coverScreen={true}
          animationType='fade'
          style={styles.modalDate}
          isOpen={isShow}
          onClosed={() => {
            setShow(false);
          }}>
          <View style={styles.dateWrapper}>
            <View style={styles.actionButton}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setShow(false);
                }}>
                <TextView style={styles.text} text={'Cancel'} type={'body'} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  onChangeDate('', tempDate);
                }}>
                <TextView style={styles.text} text={'Select'} type={'body'} />
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode={mode}
              is24Hour={is24Hour}
              display={display}
              onChange={onChangeiosDateDate}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  isShowBorder: {
    borderColor: colors.borderColor,
    borderWidth: 1.5,
  },
  inputAndIcon: {
    ...Typography.bodyHead,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: IS_IPHONE_X ? lessIndent + 2 : lessIndent - 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    position: 'relative',
  },
  DateTitle: {
    position: 'absolute',
    top: -halfindent,
    left: 7,
    backgroundColor: colors.white,
    zIndex: 2,
    marginHorizontal: 5,
    color: colors.dimGray,
    ...Typography.caption,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: indent,
    paddingVertical: indent,
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.borderColor,
  },
  text: {
    color: colors.primary,
  },
  modalDate: {
    height: null,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dateWrapper: {
    paddingBottom: indent,
  },
  dateText: {
    color: colors.black,
  },
});

export default DatePicker;
