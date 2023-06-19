import { StyleSheet } from 'react-native';
import { colors, fontWeights } from '../../styles';
import { WIN_HEIGHT, WIN_WIDTH } from '../../constants/constant';
import { doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { scale, scaleVertical } from '@app/utils/scale';

export default StyleSheet.create({
  rootUpdate: {
    flex: 1,
  },
  imageWrap: {
    aspectRatio: 2 / 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellowOrangeColor,
  },
  textWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  defaultbuttonText: {
    color: colors.dimGray,
  },
  titleText: {
    fontWeight: fontWeights.extraBold,
    color: colors.darkColor,
    textAlign: 'center',
  },
  bottomButtonWrapper: {
    overflow: 'hidden',
  },
  paraText: {
    textAlign: 'center',
    maxWidth: 250,
    lineHeight: 22,
    color: colors.darkColor,
  },
  captionView: {
    marginTop: lessIndent,
  },
  updateIcon: {
    width: WIN_WIDTH,
  },
  mainView: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    position: 'relative',
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  logoImg: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT - WIN_WIDTH,
    resizeMode: 'contain',
  },
  logoview: {
    alignSelf: 'center',
    marginTop: indent + lessIndent,
    marginBottom: indent,
  },
  logodream: {
    width: scale(120),
    height: scaleVertical(120),
    resizeMode: 'contain',
  },
  weltext: {
    textAlign: 'center',
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  textview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: indent + indent,
  },
  madeind: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: indent,
  },
  subtext: {
    fontWeight: fontWeights.medium,
    color: colors.black,
  },
  subnum: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginHorizontal: halfindent,
  },
  indicon: {
    marginRight: halfindent,
  },
  btnview: {
    paddingHorizontal: indent,
    marginTop: 'auto',
    paddingBottom: indent,
  },
  btntext: {
    color: colors.white,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent,
    fontFamily: 'Roboto-Regular',
  },
  welview: {
    marginTop: doubleIndent,
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
  purimg: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  welblack: {
    color: colors.black,
    textAlign: 'center',
  },
  welname: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    textAlign: 'center',
  },
  listtext: {
    alignSelf: 'center',
    marginTop: doubleIndent * 2,
  },
  skipbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent - 1,
  },
});
