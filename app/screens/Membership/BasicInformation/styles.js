import { IS_IPHONE_X } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scaleVertical } from '@app/utils/scale';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    marginHorizontal: halfindent,
  },
  screenhead: {
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontWeight: fontWeights.extraBold,
  },
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  mainroot: {
    backgroundColor: colors.white,
    paddingHorizontal: indent,
    paddingVertical: halfindent,
    flex: 1,
  },
  inputview: {
    marginVertical: halfindent - 4,
  },
  labelinput: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
  },
  inputstyle: {
    backgroundColor: colors.white,
    height: IS_IPHONE_X ? scaleVertical(40) : scaleVertical(50),
    ...Typography.body,
  },
  selectGroup: {
    marginTop: halfindent - 2,
  },
  extraMargin: {
    marginVertical: 3,
  },
  pickerstyle: {
    borderWidth: 1.2,
    borderColor: colors.borderColor,
    borderRadius: 6,
    marginVertical: halfindent - 4,
  },
  statusview: {
    flexDirection: 'row',
    marginTop: halfindent,
    marginBottom: indent,
  },
  notfocus: {
    borderWidth: 2,
    borderColor: colors.borderColor,
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: indent,
    marginRight: indent,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  focusstatus: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: indent,
    marginRight: indent,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  statustext: {
    fontWeight: fontWeights.medium,
    color: colors.lightGrey,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: halfindent,
  },
  dateview: {
    flex: 1,
  },
  ortext: {
    color: colors.grey,
    fontWeight: fontWeights.semiBold,
  },
  dividerview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: halfindent,
    marginBottom: lessIndent,
  },
  leftDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: colors.divider,
    marginRight: lessIndent,
  },
  rightDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: lessIndent,
  },
  lmptext: {
    color: colors.dimGray,
    marginTop: halfindent,
    lineHeight: 18,
  },
  checkview: {
    flexDirection: 'row',
    marginBottom: indent,
  },
  checkbox: {
    marginTop: 2,
  },
  textview: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 10,
  },
  agreetext: {
    color: colors.dimGray,
    display: 'flex',
  },
  termtext: {
    color: colors.dimGray,
    textDecorationLine: 'underline',
    marginHorizontal: 2,
  },
  btntext: {
    color: colors.white,
    fontWeight: fontWeights.extraBold,
    marginRight: halfindent - 2,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent - 1,
    borderRadius: halfindent,
    backgroundColor: colors.primary,
  },
  btnicon: {
    marginTop: 1,
  },
  inputprofile: {
    marginBottom: lessIndent,
  },
});
