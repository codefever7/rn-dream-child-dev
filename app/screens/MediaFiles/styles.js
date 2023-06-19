import { isIOS, WIN_HEIGHT, WIN_WIDTH } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scaleVertical } from '@app/utils/scale';
import { Dimensions, Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  addIcon: {
    marginHorizontal: halfindent,
  },
  fileHeaderIcon: {
    // paddingLeft: 5,
    marginRight: isIOS ? halfindent : 0,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headtext: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    width: 280,
    marginTop: isIOS ? 2 : 0,
    ...Platform.select({
      ios: {
        ...Typography.body,
      },
    }),
  },
  headtextWithIcon: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    marginTop: isIOS ? 2 : 0,
    ...Platform.select({
      ios: {
        ...Typography.body,
      },
    }),
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgview: {
    flex: 1,
    maxHeight: '40%',
    marginBottom: halfindent,
    position: 'relative',
    zIndex: 3,
  },
  textView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsStyles: {
    p: {
      color: colors.dimGray,
      fontWeight: fontWeights.medium,
      ...Typography.caption,
      margin: 0,
    },
  },
  videoimg: {
    width: '100%',
    height: 200,
  },
  playbtnbg: {
    borderWidth: 2,
    borderColor: colors.white,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.whitetransfernt,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btmview: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: indent,
  },
  rightimg: {
    width: 32,
    height: 32,
  },
  primaryimg: {
    width: 50,
    height: 50,
  },
  textview: {
    marginTop: halfindent,
  },
  congtext: {
    fontWeight: fontWeights.extraBold,
    color: colors.primary,
    textAlign: 'center',
  },
  captiontext: {
    fontWeight: fontWeights.medium,
    color: colors.primary,
    textAlign: 'center',
  },
  pageslide: {
    marginTop: 'auto',
    paddingBottom: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIN_WIDTH,
  },
  bgview: {
    backgroundColor: colors.dimGray,
    width: 24,
    height: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagenumb: {
    color: colors.white,
    fontWeight: fontWeights.semiBold,
  },
  midtext: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
    marginHorizontal: halfindent,
  },
  pdfview: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfimg: {
    width: '100%',
    height: 512,
  },
  videoTextTagsStyles: {
    p: {
      fontWeight: fontWeights.medium,
      margin: 0,
      paddingLeft: indent,
      paddingRight: indent,
      lineHeight: 24,
    },
  },
  imageTextTagsStyles: {
    p: {
      ...Typography.capsOne,
      margin: 0,
    },
  },
  modal: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
  keybordWrapper: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
  closeModal: {
    flex: 1,
  },
  modalBox: {
    justifyContent: 'flex-end',
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: lessIndent,
    borderTopRightRadius: lessIndent,
    maxHeight: WIN_HEIGHT - scaleVertical(85),
    padding: indent,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: indent,
  },
  modalTitle: {
    textAlign: 'center',
    color: colors.darkColor,
    fontFamily: 'Roboto-Bold',
    lineHeight: 24,
    width: '100%',
    marginTop: halfindent,
    fontWeight: fontWeights.extraBold,
  },
  closeIcon: {
    borderRadius: 12,
    backgroundColor: colors.borderColor,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  downloadIcon: {
    borderRadius: 50,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalBody: {
    paddingBottom: indent,
    backgroundColor: colors.white,
    paddingTop: indent + indent - 2,
    borderRadius: 12,
    marginBottom: indent,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  rectView: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    backgroundColor: colors.backgroundColor,
    opacity: 0.8,
    borderRadius: 25,
    marginBottom: scaleVertical(8),
  },
  tagStyles: {
    p: {
      color: colors.dimGray,
    },
  },
  // eslint-disable-next-line react-native/no-color-literals
  videoPlayerTopBar: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 0,
    height: 40,
    flex: 1,
    zIndex: 999,
    elevation: 999,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    opacity: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
  },
  boxWrapper: {
    paddingHorizontal: indent,
    paddingVertical: indent,
  },
  cardWraper: {
    marginBottom: indent + 4,
  },
  imageBox: {
    backgroundColor: colors.loadingBorder,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: '100%',
    height: 175,
  },
  mulitiImg: {
    width: '100%',
    height: 175,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textWrap: {
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
    padding: lessIndent - 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  imgCaps: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
});
