import React from 'react';
import * as Animatable from 'react-native-animatable';

const Blink = ({ children, style, isMotion = false }) => {
  return isMotion ? (
    <Animatable.View animation='pulse' easing='ease-out' iterationCount='infinite' style={{ ...style }}>
      {children}
    </Animatable.View>
  ) : (
    children
  );
};

export default Blink;
