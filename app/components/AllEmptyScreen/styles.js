import { colors, fontWeights } from '@app/styles';
import { doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  doneView: {
    marginTop: doubleIndent,
    paddingHorizontal: doubleIndent,
  },
  doneText: {
    color: colors.darkColor,
    fontWeight: fontWeights.extraBold,
    textAlign: 'center',
    marginBottom: lessIndent,
  },
  textcaption: {
    color: colors.dimGray,
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent - 5,
    borderRadius: halfindent,
    backgroundColor: colors.primary,
  },
  btnicon: {
    marginTop: 1,
  },
  btntext: {
    color: colors.white,
    fontWeight: fontWeights.semiBold,
    marginRight: halfindent,
    fontFamily: 'Roboto-Regular',
  },
  btnview: {
    paddingHorizontal: halfindent,
    marginTop: 'auto',
    paddingBottom: indent,
  },
});
