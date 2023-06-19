import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { scale, scaleVertical } from '@app/utils/scale';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    marginLeft: halfindent,
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  maincontain: {
    backgroundColor: colors.white,
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
  ltext: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent - 1,
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: indent,
    paddingVertical: indent,
  },
  calnderday: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bgview: {
    backgroundColor: colors.bggray,
    width: scale(40),
    height: scaleVertical(40),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerview: {
    alignItems: 'center',
  },
  numtext: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
  },
  dayname: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginTop: halfindent / 2,
    textTransform: 'uppercase',
  },
  bgviewactive: {
    width: scale(40),
    height: scaleVertical(64),
    backgroundColor: colors.yellow,
    borderRadius: 75,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  activeday: {
    width: scale(30),
    height: scaleVertical(30),
    backgroundColor: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activedayname: {
    fontWeight: fontWeights.medium,
    color: colors.white,
    marginTop: halfindent + 1,
  },
  dailycard: {
    backgroundColor: colors.bgyellow,
    marginTop: indent,
    borderRadius: 12,
  },
  rowlist: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: indent + halfindent,
  },
  imgscreen: {
    width: scale(105),
    height: scaleVertical(105),
  },
  textlist: {
    width: scale(150),
    marginLeft: 5,
  },
  captext: {
    color: colors.dimGray,
  },
  iconview: {
    width: 36,
    height: 36,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: 'auto',
  },
  activitysec: {
    marginTop: scaleVertical(doubleIndent + halfindent),
  },
  smileicon: {
    marginRight: halfindent - 2,
  },
  cardlist: {
    marginTop: indent,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  spacelist: {
    width: '100%',
    maxWidth: '50%',
    minWidth: '50%',
    flex: 1,
    padding: halfindent,
  },
  card: {
    backgroundColor: colors.bgsky,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 12,
  },
  cardtwo: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 12,
  },
  cardthree: {
    backgroundColor: colors.bglightgreen,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 12,
  },
  cardfour: {
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 12,
  },
  yogimg: {
    width: scale(85),
    height: scaleVertical(119),
  },
  iqimg: {
    width: scale(69),
    height: scaleVertical(90),
    marginTop: indent + halfindent - 4,
    marginBottom: halfindent,
  },
  eqimg: {
    width: scale(90),
    height: scaleVertical(90),
    marginTop: indent + halfindent - 4,
    marginBottom: halfindent,
  },
  sqimg: {
    width: scale(72),
    height: scaleVertical(90),
    marginTop: indent + halfindent - 4,
    marginBottom: halfindent,
  },
  cardtext: {
    fontWeight: fontWeights.bold,
    color: colors.dimGray,
    marginTop: halfindent - 2,
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
  imgview: {
    width: scale(96),
    height: scaleVertical(65),
    borderRadius: 8,
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
  ytbicon: {
    marginTop: 2,
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
});
