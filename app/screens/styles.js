import { IS_IPHONE_X, WIN_WIDTH } from '@app/constants/constant';
import Typography from '@app/styles/Typography';
import { Platform, StyleSheet } from 'react-native';
import { colors, fontWeights } from '../styles';
import { doubleIndent, halfindent, indent } from '../styles/dimensions';
import { scale, scaleVertical } from '../utils/scale';

export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  womanWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  gfxWoman: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
    width: WIN_WIDTH,
    height: WIN_WIDTH + indent,
    borderWidth: 0,
  },
  contentBlock: {
    flex: 1,
  },
  brandWithTagline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  madeContent: {
    marginBottom: 'auto',
  },
  logoview: {
    alignSelf: 'center',
    marginBottom: indent,
  },
  logodream: {
    width: scale(100),
    height: scaleVertical(100),
    resizeMode: 'contain',
  },
  weltext: {
    textAlign: 'center',
    color: colors.dimGray,
    fontFamily: 'Roboto-Regular',
  },
  lovedByWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  madeind: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: indent,
  },
  subtext: {
    color: colors.black,
  },
  subnum: {
    fontFamily: 'Roboto-Bold',
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginHorizontal: 4,
  },
  indicon: {
    marginRight: halfindent,
  },
  purpleBg: {
    width: WIN_WIDTH,
    height: WIN_WIDTH * 1.58,
    resizeMode: 'cover',
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
    fontFamily: 'Roboto-Bold',
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    textAlign: 'center',
    marginTop: halfindent,
    ...Platform.select({
      ios: {
        ...Typography.headLine,
      },
    }),
  },
  welcomeContent: {
    paddingVertical: indent,
  },
  quotesBlock: {
    alignItems: 'center',
  },
  buttonWrap: {
    paddingHorizontal: indent,
    paddingTop: indent,
    paddingBottom: IS_IPHONE_X ? doubleIndent : indent,
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: halfindent,
    padding: indent,
  },
  btnText: {
    color: colors.white,
    marginRight: halfindent,
  },
});
