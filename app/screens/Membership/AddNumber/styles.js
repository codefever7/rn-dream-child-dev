import { colors, fontWeights } from '@app/styles';
import { doubleIndent, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: indent,
    backgroundColor: colors.white,
    flex: 1,
  },
  contentBlock: {
    alignItems: 'center',
    padding: doubleIndent,
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
  inputpasswordstyle: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: lessIndent - 2,
  },
  buttonWrap: {
    paddingVertical: indent,
  },
  addIcon: {
    marginHorizontal: halfindent,
  },
  btntext: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: 'Roboto-Medium',
  },
  passwordWrapper: {
    marginTop: lessIndent,
  },
  dividerview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: lessIndent + 4,
  },
  leftDivider: {
    width: '44%',
    height: 1,
    backgroundColor: colors.divider,
    marginRight: lessIndent,
  },
  rightDivider: {
    width: '44%',
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: lessIndent,
  },
  ortext: {
    color: colors.grey,
    fontWeight: fontWeights.semiBold,
  },
  btnWi: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: halfindent,
  },
  textBtn: {
    ...Typography.body,
    color: colors.primary,
    fontWeight: fontWeights.extraBold,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  countryBoxWrap: {
    backgroundColor: colors.loadingBorder,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputstyle: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    flexGrow: 1,
    paddingLeft: 10,
    fontSize: 15,
    ...Platform.select({
      ios: {
        paddingVertical: indent,
      },
    }),
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
});
