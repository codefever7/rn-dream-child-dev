import { isIOS } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scale, scaleVertical } from '@app/utils/scale';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainbg: {
    backgroundColor: colors.white,
    flex: 1,
  },
  mainroot: {
    flex: 1,
    paddingHorizontal: indent,
    paddingVertical: indent + halfindent,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  boxview: {
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    padding: indent,
    marginBottom: indent,
  },
  rowlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
  },
  headText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    marginBottom: halfindent - 3,
  },
  addHeadText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  capsText: {
    color: colors.dimGray,
  },
  discountText: {
    color: colors.bgred,
  },
  leftTextView: {
    flex: 0.8,
  },
  btnChangeText: {
    ...Typography.caption,
  },
  btnChange: {
    paddingVertical: halfindent,
    paddingHorizontal: lessIndent - 1,
    borderRadius: 5,
  },
  phoneView: {
    marginTop: halfindent + 2,
  },
  phoneViewTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: halfindent + 2,
  },
  phoneNum: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  phoneText: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  phoneTextTwo: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    paddingLeft: halfindent + 2,
  },
  EditText: {
    color: colors.grey,
    textTransform: 'uppercase',
    ...Typography.caption,
  },
  RemoveText: {
    marginLeft: halfindent + 2,
    textTransform: 'uppercase',
    color: colors.remove,
    ...Typography.caption,
  },
  spaceTop: {
    marginTop: halfindent - 3,
    width: 200,
  },
  prize: {
    color: colors.dimGray,
    fontWeight: fontWeights.extraBold,
    fontFamily: 'Roboto',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: doubleIndent - 2,
  },
  capshead: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  leftcaps: {
    marginRight: doubleIndent - 2,
  },
  successtext: {
    backgroundColor: colors.bggreen,
    paddingVertical: halfindent / 2,
    paddingHorizontal: halfindent,
    borderRadius: 50,
    color: colors.white,
  },
  tagtext: {
    color: colors.grey,
    fontWeight: fontWeights.semiBold,
  },
  dateicon: {
    marginRight: halfindent,
  },
  imgview: {
    width: 130,
    height: 130,
    backgroundColor: colors.bgpink,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: indent + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ordercode: {
    marginLeft: lessIndent,
    color: colors.dimGray,
    fontWeight: fontWeights.extraBold,
  },
  orderView: {
    borderTopWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
    paddingVertical: lessIndent,
  },
  orderView1: {
    borderTopWidth: borderWidth,
    borderColor: colors.borderColor,
    paddingVertical: lessIndent,
    marginTop: indent,
  },
  titledate: {
    color: colors.black,
    textAlign: 'center',
  },
  detaildate: {
    textAlign: 'center',
    color: colors.dimGray,
    fontWeight: fontWeights.extraBold,
  },
  orderrow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lview: {
    flex: 0.5,
    borderRightWidth: borderWidth,
    borderColor: colors.borderColor,
  },
  rowview: { flexDirection: 'row', alignItems: 'center', flex: 1, borderRightWidth: 0 },
  rview: {
    flex: 0.5,
  },
  borderDetail: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    marginTop: 24,
    borderRadius: 6,
  },
  borderDetail1: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    marginTop: 50,
    borderRadius: 6,
    paddingBottom: lessIndent,
  },
  borderDetailwo: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    marginTop: indent + halfindent - 3,
    borderRadius: 6,
  },
  bgprimary: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: lessIndent,
  },
  invoice: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: lessIndent,
    marginTop: indent + halfindent,
  },
  titleText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: fontWeights.semiBold,
  },
  namex: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
    marginLeft: lessIndent,
  },
  listrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: indent,
    paddingTop: lessIndent,
  },
  secondlist: {
    paddingHorizontal: indent,
    paddingVertical: lessIndent,
  },
  summarylist: {
    paddingHorizontal: indent,
    paddingTop: lessIndent,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: lessIndent,
  },
  btmview: {
    borderTopWidth: borderWidth,
    borderColor: colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: indent,
  },
  iconlist: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  shipprimary: {
    color: colors.primary,
    marginTop: halfindent,
  },
  shipsecond: {
    color: colors.grey,
    marginTop: halfindent,
  },
  statusrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  borderView: {
    position: 'absolute',
    left: '12%',
    right: '12%',
    top: 10,
    width: '100%',
  },
  borderDash: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
  },
  borderDashtwo: {
    borderTopWidth: 1,
    width: '80%',
    borderStyle: 'dashed',
    borderColor: colors.borderColor,
  },
  firstView: {
    marginBottom: lessIndent,
  },
  AddAddressText: {
    color: colors.primary,
    fontWeight: fontWeights.extraBold,
    textAlign: 'right',
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
  btnicon: {
    marginTop: 1,
  },
  newcaptiontext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    marginBottom: lessIndent,
  },
  updateroot: {
    paddingHorizontal: indent,
    paddingTop: indent + halfindent,
    flex: 1,
  },
  inputprofile: {
    marginBottom: lessIndent,
  },
  inputstyle: {
    backgroundColor: colors.white,
    ...Typography.bodyHead,
    height: scaleVertical(40),
  },
  multilineinputstyle: {
    backgroundColor: colors.white,
    ...Typography.bodyHead,
  },
  pickerstyle: {
    borderWidth: 1.2,
    borderColor: colors.borderColor,
    borderRadius: 6,
  },
  inputCoupon: {
    borderWidth: 1.5,
    borderRadius: 6,
    borderColor: colors.borderColor,
    position: 'relative',
    paddingLeft: indent * 3 - 4,
    paddingRight: 70,
    color: colors.dimGray,
    paddingVertical: isIOS ? indent : 11,
  },
  couponIcon: {
    position: 'absolute',
    top: indent,
    left: indent,
  },
  IosBtn: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        top: 7,
        right: 10,
        width: 57,
      },
      android: {
        position: 'absolute',
        top: -2,
        paddingHorizontal: lessIndent,
        right: -6,
        paddingVertical: halfindent,
      },
    }),
  },
  btnInput: {
    backgroundColor: colors.yellow,
    borderRadius: 5,
    paddingVertical: halfindent - 2,
    ...Platform.select({
      android: {
        paddingHorizontal: lessIndent,
        paddingVertical: halfindent,
      },
    }),
  },
  applytext: {
    ...Typography.caption,
  },
  yearWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCourse: {
    flex: 0.4,
  },
  rightAmount: {
    flex: 0.5,
  },
  amountCourse: {
    fontWeight: fontWeights.semiBold,
    textAlign: 'right',
  },
  productList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productHead: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  addProducts: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginRight: halfindent - 4,
  },
  tagstyles: {
    p: { margin: 0 },
    ul: { margin: 0 },
  },
  priceview: {
    alignItems: 'center',
    paddingVertical: indent - 5,
    borderRadius: halfindent,
    borderColor: colors.borderColor,
    borderWidth: 1,
    backgroundColor: colors.white,
    width: scale(80),
    marginTop: halfindent,
  },
  addressbtn: {
    borderRadius: 8,
  },
  textBtn: {
    fontFamily: 'Roboto',
  },
  //plan card
  boxWrap: {
    borderWidth: 1,
    marginTop: indent,
    borderRadius: 12,
  },
  planHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bglightpurple,
    paddingHorizontal: indent,
    paddingVertical: halfindent,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  PlanName: {
    ...Typography.bodyOne,
    textTransform: 'uppercase',
    fontWeight: fontWeights.extraBold,
    color: colors.primary,
  },
  containWrap: {
    padding: indent,
  },
  firstContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: colors.grey,
    textDecorationLine: 'line-through',
    fontWeight: fontWeights.medium,
  },
  prizeAmount: {
    fontWeight: fontWeights.extraBold,
    color: colors.black,
  },
  tax: {
    color: colors.dimGray,
    fontSize: 9,
    lineHeight: 11,
    textTransform: 'uppercase',
  },
  bookBoxWrap: {
    borderWidth: 1,
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
  orderImage: {
    width: 60,
    height: 78,
  },
});
