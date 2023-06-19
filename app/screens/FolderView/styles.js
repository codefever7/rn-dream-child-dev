import { isIOS } from '@app/constants/constant';
import { colors, fontWeights } from '@app/styles';
import { borderWidth, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scale, scaleVertical } from '@app/utils/scale';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: halfindent + 4,
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    width: 300,
    marginTop: isIOS ? 2 : 0,
    ...Platform.select({
      ios: {
        ...Typography.body,
      },
    }),
  },
  addIcon: {
    marginLeft: halfindent,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardview: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: lessIndent,
    paddingVertical: halfindent - 1,
    paddingLeft: halfindent + 1,
    marginVertical: halfindent,
  },
  smileicon: {
    marginRight: halfindent - 2,
  },
  imgview: {
    width: scale(96),
    height: scaleVertical(96),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indimg: {
    width: scale(68),
    height: scaleVertical(81),
  },
  imgview2: {
    width: scale(95),
    height: scaleVertical(65),
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
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
  thirdrow: {
    marginVertical: halfindent,
  },
  thirdcard: {
    backgroundColor: colors.bglightgreen,
    borderRadius: 12,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  secondcard: {
    backgroundColor: colors.bglightcream,
    borderRadius: 12,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  firstcard: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 12,
    justifyContent: 'center',
  },
  lastimg: {
    height: scaleVertical(96),
  },
  starttext: {
    textAlign: 'left',
    color: colors.black,
    fontWeight: fontWeights.semiBold,
    marginBottom: halfindent - 3,
  },
  plantext: {
    textAlign: 'left',
    color: colors.black,
    fontWeight: fontWeights.semiBold,
    ...Typography.body,
  },
  rowtext: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(175),
  },
  classplan: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: indent + 2,
  },
  lastcaption: {
    p: {
      margin: 0,
      textAlign: 'left',
      color: colors.dimGray,
      fontWeight: fontWeights.medium,
      ...Typography.caption,
    },
  },
  lasttext: {
    marginLeft: 'auto',
  },
  classview: {
    paddingVertical: scaleVertical(24),
    marginLeft: 'auto',
    width: scale(175),
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
    // elevation: 1,
  },
  spaceTop: {
    paddingBottom: lessIndent,
  },
  logo: {
    marginTop: 2,
  },
  pageslide: {
    marginTop: 'auto',
    paddingBottom: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  headText: {
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: halfindent - 3,
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
  rowlisttwo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: halfindent,
    marginTop: indent,
    paddingHorizontal: indent,
  },
  acsection: {
    marginTop: 50,
  },
  imgvideo: {
    width: scale(95),
    height: scaleVertical(65),
    borderRadius: 8,
  },
  btnhead: {
    paddingVertical: 5,
    paddingHorizontal: indent,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  btnheadtext: {
    ...Typography.capsOne,
    color: colors.white,
    fontWeight: fontWeights.semiBold,
  },
  headerIcons: {
    marginRight: lessIndent,
  },
  modal: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
  purchasecard: {
    paddingHorizontal: indent,
  },
});
