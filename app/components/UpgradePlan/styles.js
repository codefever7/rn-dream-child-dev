import { StyleSheet } from 'react-native';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { colors, fontWeights } from '@app/styles';
import { scale, scaleVertical } from '@app/utils/scale';

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
    fontWeight: fontWeights.semiBold,
  },
  maincontain: {
    backgroundColor: colors.white,
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: doubleIndent - 2,
    paddingHorizontal: indent,
  },
  bggraphics: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: colors.bgpink,
    alignSelf: 'center',
  },
  imgscreen: {
    width: 180,
    height: 180,
  },
  activityCard: {
    width: '100%',
    marginTop: doubleIndent - 2,
  },
  card: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingRight: indent + halfindent,
    overflow: 'hidden',
  },
  secondimg: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
  },
  textview: {
    marginVertical: indent + halfindent - 4,
    marginLeft: indent + halfindent - 4,
    width: 180,
    textAlign: 'left',
  },
  blacktext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    textAlign: 'left',
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
    paddingHorizontal: indent * 2,
    paddingVertical: indent,
    backgroundColor: colors.white,
    // paddingBottom: halfindent + 2,
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
    // width: 138,
    height: 16,
  },
  primariright: {
    marginTop: 0,
  },
  btmview: {
    paddingBottom: lessIndent - 2,
  },
  discount: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: fontWeights.extraBold,
  },
  secondCard: {
    backgroundColor: colors.bgyellow,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: indent,
    position: 'relative',
    paddingLeft: indent,
  },
  secdimg: {
    width: 105,
    height: 105,
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
  listtext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginLeft: halfindent - 2,
    marginTop: 1,
  },
  userView: {
    marginTop: indent * 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -16,
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
    width: scale(52),
    height: scaleVertical(52),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkgreen,
  },
  secondbg: {
    width: scale(52),
    height: scaleVertical(52),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyblue,
  },
  thirdbg: {
    width: scale(52),
    height: scaleVertical(52),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.litered,
  },
  fourbg: {
    width: scale(52),
    height: scaleVertical(52),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkpurple,
  },
  fivebg: {
    width: scale(52),
    height: scaleVertical(52),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink,
  },
  sixbg: {
    width: scale(52),
    height: scaleVertical(52),
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
  },
  founderSection: {
    marginTop: 50,
  },
  imgview: {
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fondimg: {
    width: 118,
    height: 184,
  },
  reviewContain: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textcontain: {
    width: 242,
    paddingHorizontal: indent,
  },
  talktext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginTop: 10,
  },
  reviewSection: {
    marginTop: indent,
    height: 236,
  },
  allreview: {
    position: 'relative',
    height: '100%',
  },
  centerview: {
    width: '100%',
    maxWidth: 284,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 34,
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
  },
  country: {
    color: colors.dimGray,
  },
  btnview: {
    marginTop: indent + halfindent - 3,
    paddingHorizontal: indent - 1,
    marginBottom: indent + halfindent,
  },
  btntextmain: {
    color: colors.white,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent - 2,
  },
  btnplan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent,
    borderRadius: halfindent,
    backgroundColor: colors.primary,
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
    marginTop: indent,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  widthstyle: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '50%',
    minWidth: '50%',
    padding: 8,
    flex: 1,
  },
  conbg: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
    backgroundColor: colors.bgsky,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  conbgtwo: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: indent - 4,
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
  boxtext: {
    fontWeight: fontWeights.bold,
    color: colors.dimGray,
    marginTop: halfindent / 2,
  },
  imgfirstbox: {
    width: scale(52),
    height: scaleVertical(52),
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
  textmain: {
    marginTop: 50,
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
});
