import { IS_IPHONE_X } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { scale, scaleVertical } from '@app/utils/scale';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: indent,
  },
  logo: {
    marginLeft: scale(indent),
  },
  addIcon: {
    marginRight: scale(indent),
    width: scale(28),
    height: scaleVertical(28),
  },
  backicon: {
    marginLeft: halfindent,
  },
  headtext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    marginLeft: halfindent,
  },
  rootscreen: {
    paddingHorizontal: indent,
    paddingVertical: indent + halfindent,
    flex: 1,
    backgroundColor: colors.white,
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  imgBg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: colors.bgpink,
    alignSelf: 'center',
  },
  imgscreen: {
    width: 150,
    height: 150,
  },
  textview: {
    textAlign: 'center',
    marginTop: indent + halfindent,
    marginBottom: indent + halfindent,
  },
  titleScreen: {
    textAlign: 'center',
    fontWeight: fontWeights.extraBold,
    color: colors.primary,
  },
  captiontext: {
    textAlign: 'center',
    fontWeight: fontWeights.medi,
    color: colors.dimGray,
    marginTop: scaleVertical(halfindent - 2),
  },

  lmptext: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginTop: scaleVertical(halfindent),
  },
  ortext: {
    color: colors.grey,
    fontWeight: fontWeights.semiBold,
  },
  dividerview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: lessIndent + 4,
  },
  leftDivider: {
    width: '44%',
    height: 1,
    backgroundColor: colors.divider,
    marginRight: lessIndent,
  },
  rightDivider: {
    width: '44%',
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: lessIndent,
  },
  inputview: {
    marginVertical: halfindent - 4,
  },
  buttonWrap: {
    backgroundColor: colors.white,
    paddingHorizontal: indent,
    paddingTop: indent,
    paddingBottom: IS_IPHONE_X ? doubleIndent : indent,
  },
  btntext: {
    color: colors.white,
    fontWeight: fontWeights.semiBold,
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
  selectmodal: {
    width: 335,
    height: scaleVertical(226),
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
  newcaptiontext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
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
    flex: 1,
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
