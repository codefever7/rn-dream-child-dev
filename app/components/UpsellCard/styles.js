import { colors, fontWeights } from '@app/styles';
import { doubleIndent, halfindent, indent } from '@app/styles/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalWrap: {
    padding: indent,
  },
  coloseIcon: {
    alignSelf: 'flex-end',
  },
  modalImg: {
    width: 260,
    height: 160,
    alignSelf: 'center',
  },
  modalNewCaps: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: doubleIndent - 2,
    marginBottom: halfindent,
  },
  modalHead: {
    textAlign: 'center',
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  capsModal: {
    textAlign: 'center',
    lineHeight: 23,
  },
  modalBtn: {
    marginTop: doubleIndent,
  },
  btnModal: {
    borderRadius: 8,
  },
  rowList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCaps: {
    marginLeft: halfindent + 2,
  },
  righticon: {
    marginTop: 1,
  },
});
