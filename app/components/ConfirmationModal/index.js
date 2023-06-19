import React from 'react';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import TextView from '../TextView';
import { WIN_WIDTH } from '@app/constants/constant';

const ConfirmationModal = ({
  children,
  headerTitle,
  isOpenModal,
  onPressConfirm,
  onPressCancel,
  successText = 'Yes',
  cancelText = 'No',
  style,
  ...props
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      style={{ ...s.selectmodal, style }}
      isOpen={isOpenModal}
      backdrop={true}
      entry={'center'}
      animationDuration={200}
      backdropColor={'rgba(0, 0, 0, 0.3)'}
      coverScreen={true}
      backButtonClose={true}
      swipeArea={1}
      {...props}>
      <View style={s.selectmodal}>
        <View style={s.topview}>
          <TextView text={headerTitle} type={'body'} style={s.titletext} />
          {children}
        </View>
        <View style={s.btmview}>
          <TouchableOpacity
            style={s.leftbtn}
            onPress={
              onPressCancel
                ? () => {
                    onPressCancel();
                  }
                : null
            }>
            <TextView text={cancelText} type={'body'} style={s.notext} />
          </TouchableOpacity>
          <TouchableOpacity style={s.rightbtn} onPress={onPressConfirm ? () => onPressConfirm() : null}>
            <TextView text={successText} type={'body'} style={s.notext} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ConfirmationModal;

const s = StyleSheet.create({
  selectmodal: {
    width: WIN_WIDTH - indent * 3,
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  topview: {
    paddingHorizontal: indent,
    paddingTop: indent + halfindent,
    marginBottom: doubleIndent,
  },
  titletext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    marginBottom: lessIndent,
  },
  notext: {
    fontWeight: fontWeights.bold,
    color: colors.white,
  },
  btmview: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: lessIndent,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  leftbtn: {
    borderRightWidth: borderWidth,
    borderColor: colors.white,
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightbtn: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
