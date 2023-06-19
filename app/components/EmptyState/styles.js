import { colors, fontWeights } from '@app/styles';
import { doubleIndent, lessIndent } from '@app/styles/dimensions';
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
});
