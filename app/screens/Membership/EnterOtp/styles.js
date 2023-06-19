import { colors, fontWeights } from '@app/styles';
import { doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: indent,
    backgroundColor: colors.white,
    flex: 1,
  },
  addIcon: {
    marginHorizontal: halfindent,
  },
  contentBlock: {
    alignItems: 'center',
    paddingVertical: doubleIndent,
    paddingHorizontal: doubleIndent * 2,
  },
  headText: {
    fontFamily: 'Roboto-Bold',
    fontWeight: fontWeights.extraBold,
    color: colors.black,
    marginBottom: indent,
    textAlign: 'center',
  },
  summary: {
    color: colors.dimGray,
    textAlign: 'center',
  },
  codeFieldRoot: {
    paddingHorizontal: lessIndent,
  },
  cellBox: {
    borderRadius: 45 / 2,
    overflow: 'hidden',
    marginHorizontal: 1,
  },
  cell: {
    width: 45,
    height: 45,
    fontSize: 24,
    lineHeight: 42,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.inputborderColor,
    borderRadius: 45 / 2,
    textAlign: 'center',
    shadowColor: colors.black,
  },
  focusCell: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.white,
  },

  timeview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: indent + 5,
    alignSelf: 'center',
  },
  timeviewtwo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: halfindent + 2,
    alignSelf: 'center',
  },
  timetext: {
    color: colors.grey,
    marginLeft: 3,
  },
  bottomview: {
    marginTop: 40,
  },
  bottomcap: {
    textAlign: 'center',
    color: colors.dimGray,
    marginBottom: halfindent + 2,
  },
  btntext: {
    textAlign: 'center',
    color: colors.primary,
    fontFamily: 'Roboto-Medium',
  },
  retext: {
    textAlign: 'center',
    color: colors.grey,
    fontWeight: fontWeights.extraBold,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
