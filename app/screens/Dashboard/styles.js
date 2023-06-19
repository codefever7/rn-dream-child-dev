import { WIN_HEIGHT, WIN_WIDTH } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scale, scaleVertical } from '@app/utils/scale';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: indent,
  },
  logo: {
    marginLeft: indent,
  },
  addIcon: {
    marginRight: indent,
    width: 28,
    height: 28,
  },
  headtext: {
    marginLeft: halfindent,
  },
  rootscreen: {
    paddingHorizontal: indent,
    paddingVertical: indent,
    flex: 1,
    backgroundColor: colors.white,
  },
  firstcard: {
    backgroundColor: colors.bgpink,
    borderRadius: 12,
    overflow: 'hidden',
  },
  welcomecard: {
    backgroundColor: colors.bgpink,
    overflow: 'hidden',
    height: WIN_HEIGHT / 4,
    borderRadius: 12,
  },
  secondcard: {
    backgroundColor: colors.bgpink,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: indent + 5,
  },
  babyview: {
    paddingVertical: indent - 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: colors.borderPrimary,
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
  },
  bordervertical: {
    height: '100%',
    width: borderWidth,
    backgroundColor: colors.primary,
    opacity: 0.1,
    marginLeft: halfindent,
    marginRight: halfindent / 2,
  },
  dayview: {
    marginLeft: indent + 4,
  },
  daytext: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
  },
  relative: {},
  babycontainimg: {},
  babyimg: {
    width: 105,
    height: 105,
  },
  socialimg: {
    width: scale(20),
    height: scaleVertical(20),
  },
  daystime: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  bottomview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  babySize: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: indent,
    paddingLeft: halfindent,
    paddingBottom: lessIndent - 2,
    paddingRight: lessIndent - 1,
    borderRightWidth: 1,
    borderColor: colors.borderPrimary,
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
  },
  ideal: {
    flexDirection: 'row',
  },
  idealWrap: {
    paddingTop: indent,
    paddingLeft: lessIndent,
    paddingBottom: lessIndent,
    flex: 0.48,
  },
  weightview: {
    marginLeft: halfindent,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  bgfruiteView: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  peachimg: {
    width: 30,
    height: 30,
  },
  babytextwrap: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: indent,
  },
  babytext: {
    flexWrap: 'wrap',
    color: colors.dimGray,
  },
  idealtext: {
    fontWeight: fontWeights.semiBold,
    color: colors.dimGray,
  },
  approxWrap: {
    position: 'absolute',
    right: 8,
    bottom: 4,
  },
  approx: {
    fontSize: 8,
    lineHeight: 8,
    color: colors.dimGray,
  },
  firstviewone: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(halfindent - 2),
  },
  firstview: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: scale(halfindent),
  },
  bgimg: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  slider: {
    height: WIN_HEIGHT / 4,
    borderRadius: 12,
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  lastrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textview: {
    paddingLeft: indent,
    // marginVertical:0,
  },
  weltext: {
    fontWeight: fontWeights.medium,
    color: colors.black,
    marginBottom: halfindent,
  },
  lerniatext: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginBottom: lessIndent,
  },
  skilltext: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    width: 166,
    ...Typography.bodyOne,
  },
  secondrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    margin: -8,
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    maxWidth: '50%',
    minWidth: '50%',
    padding: 8,
    flex: 1,
    height: 190,
  },
  basiccard: {
    backgroundColor: colors.bgsky,
    borderRadius: 12,
    height: '100%',
    position: 'relative',
    // marginRight: indent,
  },
  secondimg: {
    width: 160,
    height: 160,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  basictext: {
    color: colors.primary,
    fontWeight: fontWeights.extraBold,
  },
  basiccaption: {
    color: colors.dimGray,
    width: scale(90),
    fontWeight: fontWeights.medium,
  },
  premiumIcon: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
  bgfree: {
    backgroundColor: colors.white,
    paddingVertical: halfindent / 2,
    paddingHorizontal: lessIndent - 1,
    borderRadius: 12,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  freetext: {
    fontWeight: fontWeights.bold,
    color: colors.dimGray,
  },
  secondtext: {
    paddingLeft: indent - 2,
    paddingTop: lessIndent - 6,
  },
  activitycard: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    height: '100%',
    position: 'relative',
  },
  workshopcard: {
    backgroundColor: colors.bglightgreen,
    borderRadius: 12,
    height: '100%',
    position: 'relative',
  },
  classcard: {
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    height: '100%',
    position: 'relative',
  },
  thirdrow: {
    marginTop: indent + halfindent,
    // width: '100%',
  },
  shareimg: {
    width: '100%',
    height: 111,
  },
  thirdcard: {
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mobilecard: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  shartext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  mobilecaption: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    width: 200,
  },
  starttext: {
    color: colors.black,
    fontWeight: fontWeights.semiBold,
  },
  lastcaption: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginTop: 2,
  },
  lastimg: {
    height: scaleVertical(95),
    justifyContent: 'center',
  },
  withbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingRight: indent,
  },
  lasttext: {
    flexDirection: 'column',
    width: scale(175),
  },
  sharetextview: {
    paddingLeft: indent,
  },
  iconview: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: halfindent / 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  socialSection: {
    marginTop: doubleIndent + halfindent,
  },
  conectext: {
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    textAlign: 'center',
  },
  socialview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -indent,
    marginTop: indent,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.secondaryborder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: indent,
  },
  unactiveDot: {
    borderWidth: 1,
    backgroundColor: colors.transparent,
    borderColor: colors.grey,
  },
  activDot: {},
  tagsStyles: {
    p: {
      color: colors.dimGray,
      width: scale(90),
      fontWeight: fontWeights.medium,
      ...Typography.caption,
      margin: 0,
    },
  },
  newcaptiontext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
  },
  freeCardWrap: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    paddingRight: lessIndent,
    overflow: 'hidden',
    marginTop: indent + halfindent,
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
  tag: {
    position: 'absolute',
    width: 75,
    height: 26,
    bottom: 0,
    right: 0,
  },
  startBtn: {
    color: colors.white,
    fontWeight: fontWeights.extraBold,
  },
  iconRight: {
    marginTop: 2,
    marginLeft: 4,
  },
  freeImg: {
    width: 85,
    height: 120,
  },
  freeTag: {
    width: 28,
    height: 28,
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  freeTextHead: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  freeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFreeWrap: {
    paddingLeft: halfindent,
    flexWrap: 'wrap',
  },
  daycaps: {
    color: colors.dimGray,
  },
  //Modal
  ModalPopup: {
    width: WIN_WIDTH - indent * 3,
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  modalWrap: {
    padding: indent,
  },
  coloseIcon: {
    position: 'absolute',
    left: '90.5%',
    bottom: '100%',
  },
  modalImg: {
    width: 213,
    height: 124,
    alignSelf: 'center',
  },
  modalNewCaps: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: doubleIndent - 2,
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
  sliderDayModal: {
    backgroundColor: colors.white,
  },
  swiperApp: {
    backgroundColor: colors.white,
    flex: 1,
    overflow: 'hidden',
  },
  ModalSwipe: {
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 4,
    height: 480,
  },
  modalSwipImg: {
    width: 300,
    height: 480,
  },
  dayText: {
    textAlign: 'center',
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginTop: doubleIndent,
  },
  swipcaption: {
    color: colors.dimGray,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: halfindent + 2,
  },
});
