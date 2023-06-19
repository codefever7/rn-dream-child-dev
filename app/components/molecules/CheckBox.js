import React from 'react';
import ReactCheckbox from 'react-native-check-box';
// import { ViewPropTypes } from 'react-native';
import svgs from '../../assets/svg';
// import T from 'prop-types';
import { colors } from '@app/styles';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';

const CheckBox = ({ onClick, isChecked, leftView, leftText, style, rightText, ...props }) => {
  return (
    <ReactCheckbox
      onClick={onClick}
      isChecked={isChecked}
      leftTextView={leftView ? leftView : undefined}
      leftText={leftText}
      rightText={rightText}
      style={style}
      checkedImage={<SvgIcon svgs={svgs} name={'checkbox-active-circle'} fill={colors.theme} width={20} height={20} />}
      unCheckedImage={<SvgIcon svgs={svgs} name={'checkbox-circle'} fill={colors.darkGrey} width={20} height={20} />}
      {...props}
    />
  );
};

// CheckBox.propTypes = {
//   onClick: T.func.isRequired,
//   isChecked: T.bool.isRequired,
//   leftView: T.element,
//   leftText: T.string,
//   style: ViewPropTypes.style,
//   rightText: T.string,
// };
export default CheckBox;
