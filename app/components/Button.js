import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { colors, fontSizes, fontWeights } from '../styles';
import TextView from './TextView';
import SpinnerButton from './Spinner/SpinnerButton';

const Button = ({
  onPress,
  ButtonText = '',
  children,
  style,
  animationStyle,
  isLoading = false,
  spinnerDotSize = 8,
  spinnerType = 'DotIndicator',
  disabled = false,
  textStyle,
  ...props
}) => {
  if (Platform.OS === 'android') {
    if (isLoading === true) {
      return (
        <SpinnerButton
          animationStyle={animationStyle}
          buttonStyle={[s.fullWidthButton, style]}
          size={spinnerDotSize}
          disabled={disabled}
          isLoading={isLoading}
          onPress={onPress}
          spinnerType={spinnerType}
          indicatorCount={10}
          {...props}>
          <TextView
            type={'button-text'}
            text={ButtonText}
            style={[s.buttonTextView, textStyle, disabled && s.disabledTextStyle]}
          />
        </SpinnerButton>
      );
    } else {
      return (
        <TouchableNativeFeedback onPress={onPress} disabled={disabled} {...props}>
          {!ButtonText ? (
            <View style={[disabled && s.disabledStyle, style]}>{children}</View>
          ) : (
            <View style={[disabled && s.disabledStyle, s.fullWidthButton, style]}>
              <TextView type={'button-text'} text={ButtonText} style={[s.buttonTextView, textStyle]} />
            </View>
          )}
        </TouchableNativeFeedback>
      );
    }
  } else {
    if (isLoading === true) {
      return (
        <SpinnerButton
          animationStyle={animationStyle}
          buttonStyle={[s.fullWidthButton, style, disabled && [s.disabledStyle]]}
          size={spinnerDotSize}
          disabled={disabled}
          isLoading={isLoading}
          onPress={onPress}
          spinnerType={spinnerType}
          indicatorCount={10}
          {...props}>
          <TextView
            type={'button-text'}
            text={ButtonText}
            style={[s.buttonTextView, textStyle, disabled && s.disabledTextStyle]}
          />
        </SpinnerButton>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={disabled && s.disabledStyle} {...props}>
          {!ButtonText ? (
            <View style={style}>{children}</View>
          ) : (
            <View style={[s.fullWidthButtonIOS, style]}>
              <TextView
                type={'button-text'}
                text={ButtonText}
                style={[s.buttonTextView, textStyle, disabled && s.disabledTextStyle]}
              />
            </View>
          )}
        </TouchableOpacity>
      );
    }
  }
};

const s = StyleSheet.create({
  fullWidthButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    // elevation: 2,
    // borderRadius: 2,
  },

  fullWidthButtonIOS: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 11,
    // borderBottomColor: colors.borderColor,
    // borderBottomWidth: borderWidth,
    // borderTopColor: colors.borderColor,
    // borderTopWidth: borderWidth,
  },
  buttonTextView: {
    fontSize: fontSizes.body,
    lineHeight: 26,
    letterSpacing: 0.5,
    color: colors.textWhite,
    fontWeight: fontWeights.bold,
  },
  disabledStyle: {
    backgroundColor: colors.primary,
    opacity: 0.4,
    borderRadius: 8,
  },
  disabledTextStyle: {
    color: colors.disabledTextColor,
  },
});
export default Button;
