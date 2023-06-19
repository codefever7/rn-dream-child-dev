import { WIN_WIDTH } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardview: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: lessIndent,
    padding: halfindent,
    marginVertical: halfindent,
    marginHorizontal: indent,
  },
  imgview: {
    width: 95,
    height: 65,
    borderRadius: 8,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    flexGrow: 1,
    paddingLeft: lessIndent - 1,
    width: 200,
  },
  title: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginBottom: 5,
    width: 230,
  },
  time: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginLeft: 5,
  },
  logo: {
    marginTop: 2,
  },
  thirdrow: {
    marginVertical: halfindent,
    marginHorizontal: indent,
  },
  thirdcard: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: halfindent,
  },
  rowtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastimg: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 24,
    height: 38,
  },
  starttext: {
    textAlign: 'left',
    color: colors.black,
    fontWeight: fontWeights.semiBold,
    marginBottom: halfindent - 3,
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastcaption: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    width: 230,
  },
  lasttext: {
    paddingLeft: lessIndent - 1,
    marginRight: 'auto',
    width: 200,
  },
  iconview: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 25,
  },
  whiteicon: {
    borderWidth: 1.5,
    borderColor: colors.loadingBorder,
  },
  btnicon: {
    marginTop: 1,
  },
  circlecheck: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    width: 24,
    height: 24,
  },
  lock: {
    position: 'absolute',
    right: 12,
    top: 4,
    zIndex: 1,
    width: 24,
    height: 24,
  },
  cardlist: {
    marginTop: lessIndent - 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  spacelist: {
    width: WIN_WIDTH / 2,
    padding: halfindent,
    paddingHorizontal: indent,
  },
  folderspacelist: {
    maxWidth: '50%',
    minWidth: '50%',
    flex: 1,
    padding: halfindent,
    paddingHorizontal: indent,
  },
  selectcard: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 12,
    backgroundColor: colors.bglitegray,
    padding: halfindent - 1,
    opacity: 0.7,
  },
  card: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: halfindent - 1,
  },
  foldercard: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
    padding: halfindent,
  },
  dailyfileimgview: {
    backgroundColor: colors.white,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgscreen: {
    width: 152,
    height: 95,
  },
  textcenter: {
    alignItems: 'center',
    marginTop: lessIndent - 1,
    marginBottom: halfindent - 3,
  },
  righticon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  selecttext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
    opacity: 0.5,
  },
  imgtext: {
    fontWeight: fontWeights.medium,
    color: colors.dimGray,
  },
  imgviewtwo: {
    backgroundColor: colors.white,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgviewfive: {
    backgroundColor: colors.bgyellow,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  selectcardview: {
    // borderWidth: borderWidth,
    // borderColor: colors.borderColor,
    borderRadius: lessIndent,
    // paddingVertical: halfindent - 2,
    paddingLeft: halfindent,
    marginBottom: indent,
    position: 'relative',
    // overflow: 'hidden',
    backgroundColor: colors.bglitegray,
  },
  whitecard: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: halfindent,
    borderWidth: 1.5,
    borderColor: colors.loadingBorder,
    backgroundColor: colors.white,
  },
  newtag: {
    position: 'absolute',
    zIndex: 1,
    width: 24,
    height: 24,
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
});
