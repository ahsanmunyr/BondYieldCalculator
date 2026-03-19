import React, {memo} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styles from './CustomButton.style';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
}

const CustomButton = ({title, disabled, ...props}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.buttonDisabled]}
      disabled={disabled}
      {...props}>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(CustomButton);
