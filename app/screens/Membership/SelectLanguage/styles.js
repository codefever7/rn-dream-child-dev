import { colors, fontWeights } from '@app/styles';
import { borderWidth, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  addIcon: {
    marginHorizontal: halfindent,
  },
  mainscreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.white,
  },
  headtext: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginBottom: indent * 3 + 2,
  },
  ltext: {
    color: colors.white,
    fontWeight: fontWeights.medium,
  },
  focusview: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: indent - 1,
  },
  unfocusview: {
    width: 140,
    height: 140,
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: indent - 1,
  },
  selectview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rtext: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  selectmodal: {
    width: 335,
    height: 226,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  topview: {
    paddingHorizontal: indent,
    paddingTop: indent + halfindent,
  },
  titletext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    marginBottom: lessIndent,
  },
  captiontext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginBottom: lessIndent,
  },
  btmview: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: lessIndent,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  notext: {
    fontWeight: fontWeights.bold,
    color: colors.white,
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
