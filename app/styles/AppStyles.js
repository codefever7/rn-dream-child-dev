import { StyleSheet, Platform } from 'react-native';
import colors from './colors';
import {
  indent,
  doubleIndent,
  // headerHeight,
  borderWidth,
  halfindent,
  borderRadius,
} from './dimensions';
import fontSizes from './fontSizes';
import Typography from './Typography';
import {
  WIN_HEIGHT,
  // WIN_WIDTH,
  isSmallDevice,
  STATUS_BAR_HEIGHT,
  IS_IPHONE_X,
} from '../constants/constant';
import fontWeights from './fontWeights';

const AppStyles = StyleSheet.create({
  blockStyle: {
    backgroundColor: colors.backgroundColor,
  },
  containerStyle: {
    paddingLeft: doubleIndent,
    paddingRight: doubleIndent,
  },
  formInputStyle: {
    color: colors.primaryText,
  },
  logoContainer: {
    marginHorizontal: halfindent,
  },
  iconStyle: {
    fontSize: 24,
    color: colors.secondaryText,
  },
  rootStyle: {
    flex: 1,
    backgroundColor: colors.statusbar,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withMarginBottom: {
    marginBottom: indent,
  },
  withMarginTop: {
    marginTop: indent,
  },
  withoutMargins: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    // marginLeft: 0,
  },
  withVerticalMargin: {
    marginTop: indent,
    marginBottom: indent,
  },
  withVerticalPadding: {
    paddingTop: indent,
    paddingBottom: indent,
  },

  CardContentPadding: {
    padding: 12,
  },

  marginTop: {
    marginTop: 15,
  },

  Container: {
    paddingHorizontal: 15,
    flex: 1,
  },

  //App Styles
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  rootListWithoutPadding: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },

  ListWithoutStyles: {
    backgroundColor: colors.transparent,
    paddingLeft: 0,
    borderTopWidth: 0,
  },

  InDevlopment: {
    display: __DEV__ ? undefined : 'none',
    position: undefined,
  },

  textAlignCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  errorMsg: {
    ...Typography.body,
    // marginVertical: halfindent,
    color: colors.error,
  },
  successMsg: {
    ...Typography.body,
    // marginVertical: halfindent,
    color: colors.success,
  },

  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: halfindent,
    padding: indent,
  },
  btnText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: fontWeights.medium,
    color: colors.white,
    marginRight: halfindent,
  },

  bgWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: WIN_HEIGHT,
    zIndex: 0,
  },

  bgCircleTop: {
    position: 'absolute',
    right: 0,
    top: -STATUS_BAR_HEIGHT,
    width: 154,
    height: 158,
    zIndex: 0,
  },

  bgCircleBottom: {
    position: 'absolute',
    left: 0,
    top: 'auto',
    marginTop: 'auto',
    marginBottom: 0,
    bottom: 0,
    width: 168,
    height: 276,
    zIndex: 0,
  },

  listSectionHeader: {
    paddingVertical: isSmallDevice ? halfindent : indent,
    marginLeft: indent + halfindent,
    backgroundColor: colors.white,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: borderWidth,
    borderStyle: 'solid',
  },

  listSectionHeaderText: {
    //paddingBottom: isSmallDevice ? 4 : halfindent,
    fontSize: fontSizes.bodyHead,
    lineHeight: 22,
    letterSpacing: 0.5,
    color: colors.lightGrey,
    backgroundColor: colors.transparent,
  },

  headerButtonText: {
    ...Platform.select({
      ios: {
        color: colors.primary,
        padding: 10,
      },
      android: {
        color: colors.white,
        padding: 6,
      },
    }),
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    color: colors.midBlack,
    fontSize: fontSizes.bodyTwo,
    fontWeight: fontWeights.semiBold,
  },
  footerWrapper: {
    backgroundColor: colors.white,
    shadowColor: colors.borderColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 24,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    paddingTop: indent,
    paddingBottom: IS_IPHONE_X ? indent * 2 : indent,
    paddingHorizontal: indent,
  },
});

export default AppStyles;
