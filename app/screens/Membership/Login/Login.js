import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import TextView from '../../../components/TextView';
import screens from '../../../constants/screens';
import { colors, fontSizes, fontWeights } from '../../../styles';
import { borderWidth } from '../../../styles/dimensions';
import Typography from '../../../styles/Typography';
import { ScrollView } from 'react-native-gesture-handler';
import AppStyles from '../../../styles/AppStyles';
import { isIOS } from '@app/constants/constant';

const LoginScreen = ({ navigation }) => {
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={isIOS && 'padding'}>
        <View style={[AppStyles.root, styles.root]}>
          <ScrollView style={styles.height} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <View style={styles.container}>
                <TextView type={'title'} text={'Log In'} style={styles.titel} />
              </View>
              <View style={styles.wrapper}></View>
              <TextView type={'title'} text={'Log In'} style={styles.titel} />
              <TouchableOpacity>
                <TextView
                  style={styles.subText}
                  text={'Forgot Password?'}
                  onPress={() => {
                    navigation.navigate(screens.ForgotPassword);
                  }}
                />
              </TouchableOpacity>
              <View style={styles.accountCreate}>
                <TextView text={'Don’t have an account? '} style={styles.haveDon} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screens.Signup);
                  }}>
                  <TextView text={'Create account'} style={styles.linkAccount} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default LoginScreen;
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

  wrapper: {
    marginBottom: 10,
  },

  subText: {
    color: colors.InputColor,
    marginLeft: 'auto',
    fontWeight: fontWeights.bold,
    lineHeight: 21,
    ...Typography.bodyHead,
    ...Platform.select({
      ios: {
        fontWeight: fontWeights.normal,
      },
    }),
  },
  buttonwrapper: {
    marginTop: 30,
  },
  inputlabel: {
    ...Platform.select({
      ios: {
        height: 42,
      },
    }),
  },
});
