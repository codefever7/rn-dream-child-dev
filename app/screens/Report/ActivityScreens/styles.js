import { colors, fontWeights } from '@app/styles';
import { borderWidth, halfindent, indent, lessIndent } from '@app/styles/dimensions';
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
  ltext: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent - 1,
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
  bgview: {
    backgroundColor: colors.white,
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: indent,
    paddingVertical: indent,
  },
  rowlist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smileicon: {
    marginRight: halfindent - 2,
  },
  cardlist: {
    marginTop: lessIndent - 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  intelllist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
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
  imgview: {
    backgroundColor: colors.bgsky,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  imgviewone: {
    backgroundColor: colors.bgsky,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgviewtwo: {
    backgroundColor: colors.bglightpurple,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgviewthree: {
    backgroundColor: colors.bglightgreen,
    borderRadius: 6,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgviewfour: {
    backgroundColor: colors.bglightcream,
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
  imgscreen: {
    width: scale(152),
    height: scaleVertical(95),
  },
  textcenter: {
    alignItems: 'center',
    marginTop: lessIndent - 1,
    marginBottom: halfindent - 3,
  },
  spacelist: {
    width: '100%',
    maxWidth: '50%',
    minWidth: '50%',
    flex: 1,
    padding: halfindent,
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
  acsection: {
    marginTop: 50,
  },
  selectcardview: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: lessIndent,
    paddingVertical: halfindent - 2,
    paddingLeft: halfindent,
    marginBottom: indent,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.bglitegray,
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
  rowlisttwo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: indent,
  },
  imgvideo: {
    width: scale(95),
    height: scaleVertical(65),
    borderRadius: 8,
  },
  textView: {
    marginLeft: lessIndent - 1,
    width: scale(204),
  },
  title: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginBottom: halfindent - 3,
  },
  time: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  ytbicon: {
    marginRight: 5,
  },
  lockicon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
