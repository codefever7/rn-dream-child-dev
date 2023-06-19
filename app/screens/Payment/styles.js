import { colors, fontWeights } from '@app/styles';
import { doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scaleVertical } from '@app/utils/scale';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    marginVertical: indent,
    color: colors.black,
    ...Typography.bodyOne,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  iconDone: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  iconsvg: {
    marginBottom: doubleIndent + lessIndent,
  },
  doneView: {
    paddingHorizontal: doubleIndent,
  },
  doneText: {
    color: colors.darkColor,
    fontWeight: fontWeights.extraBold,
    textAlign: 'center',
    marginBottom: lessIndent,
  },
  capsDone: {
    color: colors.gray,
    marginTop: halfindent + 2,
  },
  textcaption: {
    color: colors.dimGray,
    textAlign: 'center',
  },
  addIcon: {
    marginLeft: halfindent,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: indent,
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
  btmview: {
    paddingBottom: lessIndent - 2,
  },
  discount: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: fontWeights.extraBold,
  },
  boxWrap: {
    borderWidth: 2,
    marginTop: indent,
    borderRadius: 12,
    overflow: 'hidden',
  },
  planHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: indent,
    paddingVertical: halfindent,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  planHeadTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bglightgreen,
    paddingHorizontal: indent,
    paddingVertical: halfindent,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  planHeadThird: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bglightcream,
    paddingHorizontal: indent,
    paddingVertical: halfindent,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  firstContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  PlanName: {
    ...Typography.bodyOne,
    textTransform: 'uppercase',
    fontWeight: fontWeights.extraBold,
  },
  containWrap: {
    padding: indent,
  },
  palnActivitiy: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  ListWrap: {
    marginTop: 2,
  },
  ListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: halfindent,
  },
  listText: {
    marginLeft: 5,
    color: colors.dimGray,
  },
  prizeList: {
    alignItems: 'flex-end',
  },
  discountPrize: {
    textDecorationLine: 'line-through',
    fontWeight: fontWeights.normal,
    fontSize: 15,
    lineHeight: 19,
  },
  discountPrizeCurrency: {
    fontSize: 10,
    fontWeight: fontWeights.normal,
    paddingRight: 4,
    lineHeight: 14,
  },
  prizeAmount: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
  },
  prizeCurrency: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    paddingRight: 3,
  },
  tax: {
    color: colors.dimGray,
    fontSize: 9,
    lineHeight: 11,
    textTransform: 'uppercase',
  },
  lernWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: indent - 1,
  },
  btnWrap: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: lessIndent,
    position: 'relative',
    zIndex: 1,
  },
  btnicon: {
    marginTop: 1,
  },
  learnText: {
    fontWeight: fontWeights.medium,
  },
  TimeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: indent + 4,
    flexWrap: 'wrap',
  },
  noteText: {
    fontWeight: fontWeights.extraBold,
    color: colors.dimGray,
  },
  notecaps: {
    fontWeight: fontWeights.extraBold,
    color: colors.red,
  },
  quotesWrap: {
    backgroundColor: colors.bglightcream,
    marginBottom: indent,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lastimg: {
    height: scaleVertical(95),
    justifyContent: 'center',
  },
  textview: {
    width: 208,
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: indent + 3,
    marginBottom: 10,
  },
  firstTextRow: {
    borderBottomWidth: 1,
    paddingBottom: halfindent / 2,
    borderColor: colors.boderopacity,
  },
  qouteshead: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
  },
  captionText: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginTop: 11,
  },
  rowlisttwo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: indent,
  },
  bookBoxWrap: {
    borderWidth: 2,
    borderColor: colors.borderColor,
    marginTop: indent,
    borderRadius: 12,
    marginBottom: halfindent / 2,
  },
  BookHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.litebggrey,
    paddingHorizontal: indent,
    paddingVertical: halfindent,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  BookText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    textTransform: 'uppercase',
  },
  containBookWrap: {
    padding: lessIndent,
  },
  rowBook: {
    flexDirection: 'row',
  },
  bookView: {
    backgroundColor: colors.bglowgrey,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.borderColor,
  },
  bookImg: {
    width: 80,
    height: 108,
  },
  rightBook: {
    paddingLeft: lessIndent,
  },
  AmountView: {
    marginTop: indent - 1,
  },
  amoutView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LAmount: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  RAmount: {
    fontWeight: fontWeights.medium,
    marginLeft: halfindent - 2,
    textDecorationLine: 'line-through',
    fontFamily: 'Roboto',
  },
  deliveytext: {
    fontSize: 9,
    color: colors.dimGray,
  },
  btnview: {
    marginTop: indent + halfindent - 3,
    marginBottom: indent,
  },
  btnplan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  btntextmain: {
    color: colors.white,
    fontWeight: fontWeights.extraBold,
    marginRight: halfindent - 2,
  },
  rowOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: halfindent,
  },
  leftHead: {
    color: colors.dimGray,
  },
  rightHead: {
    color: colors.dimGray,
    marginLeft: halfindent / 2,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent,
    borderRadius: halfindent,
    backgroundColor: colors.primary,
  },
  btntext: {
    color: colors.white,
    fontWeight: fontWeights.extraBold,
    marginRight: halfindent - 2,
  },
  failText: {
    textAlign: 'center',
    color: colors.dimGray,
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: doubleIndent,
  },
  helptext: {
    color: colors.dimGray,
    fontWeight: fontWeights.extraBold,
    marginLeft: halfindent,
  },
  numtex: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  EmptyWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmptyImg: {
    width: 160,
    height: 160,
  },
  help: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: lessIndent - 5,
  },
  knowCard: {
    backgroundColor: colors.bgnotice,
    paddingVertical: indent,
    paddingHorizontal: indent + halfindent - 2,
    borderRadius: 10,
    marginVertical: 40,
  },
  didknow: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    textAlign: 'center',
  },
  didcaption: {
    color: colors.dimGray,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: halfindent + 2,
  },
});
