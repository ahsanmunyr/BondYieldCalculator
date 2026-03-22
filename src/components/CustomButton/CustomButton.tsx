import React, {memo} from 'react';
import {TouchableOpacityProps} from 'react-native';
import CustomTouchable from '../CustomTouchable/CustomTouchable';
import CustomText from '../CustomText/CustomText';
import styles from './CustomButton.style';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
}

const CustomButton = ({title, disabled, ...props}: CustomButtonProps) => {
  return (
    <CustomTouchable
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.buttonDisabled]}
      disabled={disabled}
      {...props}>
      <CustomText style={[styles.label, disabled && styles.labelDisabled]}>{title}</CustomText>
    </CustomTouchable>
  );
};

export default memo(CustomButton);
