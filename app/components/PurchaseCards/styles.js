import { WIN_WIDTH } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  freeCardWrap: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    paddingRight: lessIndent,
    overflow: 'hidden',
    marginTop: halfindent - 2,
    marginBottom: halfindent - 2,
  },
  startNow: {
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: halfindent - 2,
    marginTop: halfindent,
  },
  freeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeImg: {
    width: 85,
    height: 120,
  },
  textFreeWrap: {
    paddingLeft: halfindent,
    flexWrap: 'wrap',
  },
  freeTextHead: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  freeText: {
    color: colors.black,
    fontWeight: fontWeights.bold,
  },
  daycaps: {
    color: colors.dimGray,
  },
  startBtn: {
    color: colors.white,
    fontWeight: fontWeights.extraBold,
  },
  iconRight: {
    marginTop: 2,
    marginLeft: 4,
  },
  tag: {
    position: 'absolute',
    width: 75,
    height: 26,
    bottom: 0,
    right: 0,
  },
  purchasecard: {
    paddingHorizontal: indent,
  },
  ModalPopup: {
    width: WIN_WIDTH - indent * 3,
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  freeCardWrapdemo: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    paddingRight: lessIndent,
    overflow: 'hidden',
    marginTop: indent,
    marginBottom: halfindent - 2,
    paddingLeft: 10,
    paddingTop: 6,
  },
  freelecImg: {
    width: 92,
    height: 120,
    marginBottom: -5,
  },
  fullWork: {
    width: 100,
    height: 120,
  },
});
