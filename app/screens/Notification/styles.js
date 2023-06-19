import { colors, fontWeights } from '@app/styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { scale, scaleVertical } from '@app/utils/scale';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  maincontain: {
    flex: 1,
    padding: indent,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headernotiRow: {
    paddingHorizontal: indent,
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
    width: 285,
  },
  addIcon: {
    marginLeft: halfindent,
  },
  headerIcons: {
    marginRight: halfindent,
  },
  cardview: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingVertical: halfindent - 2,
    paddingLeft: halfindent,
    marginBottom: indent,
    backgroundColor: colors.white,
  },
  unreadcardView: {
    borderRadius: 12,
    paddingVertical: halfindent - 2,
    paddingLeft: halfindent,
    marginBottom: indent,
    backgroundColor: colors.primarylite,
  },
  imgview: {
    width: 88,
    height: 66,
    borderRadius: 8,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    marginLeft: indent,
    width: 150,
  },
  title: {
    color: colors.dimGray,
    fontWeight: fontWeights.extraBold,
    marginBottom: 5,
  },
  time: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    width: 150,
  },
  notiimg: {
    marginTop: doubleIndent * 2,
    position: 'relative',
    alignItems: 'center',
  },
  onlytext: {
    color: colors.black,
    fontWeight: fontWeights.semiBold,
    textAlign: 'left',
  },
  videoimg: {
    width: '100%',
    height: scaleVertical(200),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playbtnbg: {
    borderWidth: 2,
    borderColor: colors.white,
    width: scale(60),
    height: scaleVertical(60),
    borderRadius: 50,
    backgroundColor: colors.whitetransfernt,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notitext: {
    color: colors.black,
    fontWeight: fontWeights.semiBold,
    marginBottom: indent,
    textAlign: 'center',
  },
  imgcaps: {
    p: { color: colors.dimGray, textAlign: 'center', marginTop: indent },
  },
  unread: {
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  headText: {
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: halfindent - 3,
  },
  timeView: {
    marginLeft: 'auto',
    paddingRight: lessIndent - 1,
  },
  timeText: {
    color: colors.dimGray,
  },
});
