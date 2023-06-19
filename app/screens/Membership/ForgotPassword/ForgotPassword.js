import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import TextView from '../../../components/TextView';
import { colors, fontSizes, fontWeights } from '../../../styles';
import { borderWidth } from '../../../styles/dimensions';
import Typography from '../../../styles/Typography';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <>
      <TextView type={'title'} text={'Forgot Password'} style={styles.titel} />
    </>
  );
};
export default ForgotPasswordScreen;
const styles = StyleSheet.create({
  root: {
    padding: 0,
    backgroundColor: colors.white,
  },

  container: {
    alignItems: 'center',
  },

  height: {
    height: '100%',
  },

  logoImg: {
    width: 61,
    height: 64,
    marginBottom: 20,
  },

  titel: {
    color: colors.InputlabelColor,
    ...Typography.subTitle,
    fontWeight: '700',
    marginBottom: 40,
  },

  formText: {
    fontSize: fontSizes.bodyHead,
    color: colors.darkGrey,
    letterSpacing: 0.4,
    ...Platform.select({
      ios: {
        fontWeight: fontWeights.normal,
      },
    }),
  },

  content: {
    marginTop: 80,
    justifyContent: 'center',
  },

  accountCreate: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 30,
    ...Platform.select({
      ios: {
        marginBottom: 60,
      },
    }),
  },

  linkAccount: {
    ...Typography.bodyHead,
    lineHeight: 21,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.3,
  },

  haveDon: {
    color: colors.grey,
    ...Typography.bodyHead,
    lineHeight: 21,
  },

  btnprimary: {
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderWidth: borderWidth,
    borderColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    paddingVertical: 16,
  },

  buttonwrapper: {
    marginTop: 20,
  },
});
