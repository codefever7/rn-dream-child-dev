import { Platform, StyleSheet } from 'react-native';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { colors, fontWeights } from '@app/styles';
import { scale, scaleVertical } from '@app/utils/scale';
import { WIN_HEIGHT, WIN_WIDTH } from '@app/constants/constant';
import Typography from '@app/styles/Typography';

export default StyleSheet.create({
  addIcon: {
    marginHorizontal: halfindent,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headtext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  maincontain: {
    backgroundColor: colors.white,
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: indent,
  },
  purchaseroot: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: indent,
    paddingHorizontal: indent,
  },
  bggraphics: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: colors.bgpink,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 20,
  },
  imgscreen: {
    width: 180,
    height: 180,
  },
  activityCard: {
    width: '100%',
    marginTop: doubleIndent - 2,
    marginBottom: halfindent - 2,
  },
  card: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  secondimg: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textview: {
    marginVertical: indent + halfindent - 4,
    marginHorizontal: indent + halfindent - 4,
    textAlign: 'left',
  },
  blacktext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    textAlign: 'left',
  },
  classConvied: {
    color: colors.dimGray,
    marginBottom: halfindent,
  },
  headTitle: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    marginTop: indent + 4,
  },
  duration: {
    color: colors.dimGray,
    fontSize: 13,
    fontWeight: fontWeights.medium,
    marginVertical: halfindent,
  },
  duratintext: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  whitecard: {
    width: scale(130),
    height: scaleVertical(WIN_HEIGHT / 7.3),
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.bgcard,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  prizecard: {
    paddingTop: indent + halfindent - 4,
    paddingHorizontal: doubleIndent + halfindent - 1,
    backgroundColor: colors.white,
    paddingBottom: halfindent + 2,
  },
  mrp: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    textDecorationLine: 'line-through',
  },
  prize: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  gst: {
    textAlign: 'right',
    color: colors.primary,
  },
  fram: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  primariright: {
    marginTop: 1,
  },
  btmview: {
    paddingVertical: lessIndent - 2,
  },
  discount: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: fontWeights.bold,
  },
  secondCard: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: indent,
    position: 'relative',
    paddingLeft: 30,
  },
  secdimg: {
    width: scale(105),
    height: scaleVertical(105),
  },
  freetag: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -5,
    top: 5,
  },
  primarychek: {
    width: 20,
    height: 20,
  },
  sectext: {
    paddingVertical: indent,
    marginLeft: indent,
  },
  btn: {
    backgroundColor: colors.yellow,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 115,
    marginTop: halfindent,
  },
  btntext: {
    color: colors.white,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent - 3,
  },
  btnicon: {
    marginTop: 1,
  },
  checkview: {
    alignSelf: 'center',
    marginTop: halfindent,
    width: 321,
  },
  checklist: {
    flexDirection: 'row',
    marginTop: indent,
  },
  checklisttwo: {
    flexDirection: 'row',
    marginTop: halfindent - 3,
  },
  listtext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginLeft: halfindent - 2,
  },
  userView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: -8,
    marginTop: indent,
  },
  userstwo: {
    alignItems: 'center',
    width: '100%',
    maxWidth: '33.33%',
    paddingHorizontal: halfindent,
    marginBottom: indent,
  },
  users: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '33.33%',
    paddingHorizontal: 10,
    marginBottom: indent,
  },
  firstbg: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkgreen,
  },
  secondbg: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyblue,
  },
  thirdbg: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.litered,
  },
  fourbg: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkpurple,
  },
  fivebg: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink,
  },
  sixbg: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lowyellow,
  },
  userss: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '33.33%',
    paddingHorizontal: 10,
    marginBottom: indent,
    backgroundColor: colors.pelorous,
  },
  boldtext: {
    color: colors.dimGray,
    textAlign: 'center',
    fontWeight: fontWeights.extraBold,
    marginTop: halfindent + 2,
  },
  captionicon: {
    color: colors.dimGray,
    textAlign: 'center',
    marginTop: halfindent,
  },
  founderSection: {
    width: '100%',
    marginTop: 50,
    height: scaleVertical(168),
  },
  imgview: {
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    position: 'relative',
    height: '100%',
  },
  fondimg: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textcontain: {
    width: scale(192),
    marginVertical: scaleVertical(38),
    marginRight: halfindent,
    marginLeft: 'auto',
  },
  talktext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginTop: 10,
  },
  reviewSection: {
    marginTop: 20,
  },
  allreview: {
    position: 'relative',
  },
  centerview: {
    width: '100%',
    maxWidth: 284,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  reviewtext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginTop: halfindent,
    textAlign: 'center',
    lineHeight: 19,
  },
  clientname: {
    fontWeight: fontWeights.extraBold,
    color: colors.dimGray,
    marginTop: halfindent - 2,
    textAlign: 'center',
  },
  coutryname: {
    color: colors.dimGray,
    textAlign: 'center',
  },
  btnview: {
    marginTop: indent + halfindent - 3,
    paddingHorizontal: indent - 1,
    marginBottom: indent + halfindent,
  },
  btntextmain: {
    color: colors.white,
    fontWeight: fontWeights.extraBold,
    marginRight: halfindent - 2,
  },
  btnplan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent,
    borderRadius: halfindent,
    backgroundColor: colors.primary,
    marginRight: lessIndent,
    ...Platform.select({
      ios: {
        flexGrow: 1,
        paddingHorizontal: 28,
      },
    }),
  },
  rowlist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smileicon: {
    marginRight: halfindent - 2,
  },
  ltext: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent - 3,
  },
  dayview: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: halfindent,
  },
  folderList: {},
  daytext: {
    fontWeight: fontWeights.semiBold,
    color: colors.white,
  },
  flexlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxview: {
    marginTop: halfindent,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  widthstyle: {
    padding: 8,
    flexBasis: '50%',
  },
  conbg: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    borderRadius: 12,
    position: 'relative',
    paddingHorizontal: 4,
    width: '100%',
    flexGrow: 1,
  },
  conbgtwo: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    paddingHorizontal: 4,
    backgroundColor: colors.litecream,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  taj: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  lock: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
  boxtext: {
    fontWeight: fontWeights.extraBold,
    color: colors.dimGray,
    marginTop: halfindent / 2,
    textAlign: 'center',
  },
  imgfirstbox: {
    width: 96,
    height: 80,
  },
  boxviewtwo: {
    marginTop: indent,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  threebox: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '33.33%',
    minWidth: '33.33%',
    padding: 8,
    flex: 1,
  },
  bgbox: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  bgbox2: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bglightgreen,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  bgbox3: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  bgbox4: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bgsky,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  bgbox5: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bglitecream,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  bgbox6: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bglitepink,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  imgsecondbox: {
    width: scale(40),
    height: scaleVertical(40),
  },
  textIntro: {
    marginTop: indent * 2,
  },
  textmain: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    ...Typography.caption,
    color: colors.dimGray,
    lineHeight: 18,
  },
  labelText: {
    fontWeight: fontWeights.extraBold,
  },
  capsText: {
    fontWeight: fontWeights.medium,
  },
  introduction: {
    ...Typography.caption,
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    textAlign: 'center',
  },
  textmain2: {
    marginTop: indent + halfindent,
    marginBottom: halfindent,
    paddingHorizontal: indent,
  },
  extext: {
    textAlign: 'center',
    color: colors.dimGray,
  },
  thirdrow: {
    marginTop: indent,
  },
  firstcard: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lastimg: {
    height: scaleVertical(108),
  },
  leftimg: {
    width: scale(105),
    height: scaleVertical(108),
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: indent,
  },
  classview: {
    paddingVertical: scaleVertical(25),
    marginLeft: 'auto',
  },
  classplan: {
    width: scale(168),
  },

  starttext: {
    textAlign: 'left',
    color: colors.black,
    fontWeight: fontWeights.semiBold,
    marginBottom: halfindent - 3,
  },
  lastcaption: {
    textAlign: 'left',
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  iconview: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  iconview2: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  listspace: {
    marginTop: indent,
  },
  cardview: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: lessIndent,
    paddingVertical: halfindent - 2,
    paddingLeft: halfindent,
    marginBottom: indent,
    position: 'relative',
    overflow: 'hidden',
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgviewtwo: {
    width: scale(96),
    height: scaleVertical(65),
    borderRadius: 7,
  },
  textView: {
    marginLeft: indent,
    width: 217,
  },
  title: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginBottom: 5,
  },
  time: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginLeft: 5,
  },
  lockicon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  bagview: {
    backgroundColor: colors.bglightcream,
    paddingVertical: indent - 1,
    paddingLeft: indent,
    paddingRight: indent,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagimg: {
    width: scale(66),
    height: scaleVertical(70),
  },
  kittext: {
    color: colors.black,
    fontWeight: fontWeights.bold,
  },
  textcon: {
    width: scale(175),
    marginLeft: indent + 4,
  },
  whitedatacard: {
    borderWidth: 1.5,
    borderColor: colors.loadingBorder,
  },
  lastcaps: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginTop: 5,
    width: 200,
  },
  MaterialKitWrap: {
    backgroundColor: colors.bglightgreen,
    borderRadius: 12,
    marginTop: indent + 4,
    marginBottom: indent + 4,
  },
  headView: {
    paddingLeft: indent + 4,
    marginTop: indent + 4,
  },
  listofKit: {
    paddingLeft: indent + 4,
    marginTop: indent,
    marginBottom: indent + 4,
  },
  headTextimg: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
  },
  capshead: {
    fontWeight: fontWeights.semiBold,
    color: colors.dimGray,
  },
  righticon: {
    marginTop: 1,
  },
  clientView: {
    marginTop: indent,
  },
  btnhead: {
    paddingVertical: 4,
    paddingHorizontal: indent,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginRight: 5,
  },
  btnheadtext: {
    ...Typography.capsOne,
    color: colors.white,
    fontWeight: fontWeights.semiBold,
  },
  btnDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent,
    borderRadius: halfindent,
    backgroundColor: colors.yellow,
    flex: 0.5,
    marginRight: lessIndent,
    ...Platform.select({
      ios: {
        flexGrow: 1,
        paddingHorizontal: 28,
        flex: 0,
      },
    }),
  },
  list: {
    paddingHorizontal: indent,
  },
  //card
  freeCardWrap: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    paddingRight: lessIndent,
    overflow: 'hidden',
    marginTop: halfindent - 2,
    marginBottom: halfindent - 2,
    paddingLeft: 10,
    paddingTop: 10,
  },
  freeCardWrapdemo: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    paddingRight: lessIndent,
    overflow: 'hidden',
    marginTop: indent,
    marginBottom: halfindent - 2,
    paddingLeft: 10,
    paddingTop: 10,
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
  freelecImg: {
    width: 92,
    height: 120,
    marginBottom: -5,
  },
  textFreeWrap: {
    paddingLeft: halfindent,
    flexWrap: 'wrap',
  },
  freeTextHead: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  daycaps: {
    color: colors.dimGray,
    width: 200,
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
  fullWork: {
    width: 100,
    height: 120,
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
    alignSelf: 'flex-end',
  },
  modalImg: {
    width: 100,
    height: 100,
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
  demo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: colors.bglightcream,
    paddingVertical: 10,
    borderRadius: 8,
  },
  demoText: {
    color: colors.red,
    fontFamily: 'Roboto-Medium',
    fontWeight: fontWeights.extraBold,
  },
  purchasecard: {
    paddingHorizontal: indent,
  },
  footBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -lessIndent,
  },
  footerBox: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
