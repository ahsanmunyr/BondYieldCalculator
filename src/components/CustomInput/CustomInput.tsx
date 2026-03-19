import React, {memo, useState} from 'react';
import {TextInput, TextInputProps, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomText from '../CustomText/CustomText';
import CustomView from '../CustomView/CustomView';
import styles from './CustomInput.style';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  prefix?: string;
}

const CustomInput = ({label, error, prefix, ...props}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {i18n} = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <CustomView style={styles.wrapper}>
      <CustomText style={styles.label}>{label}</CustomText>
      <CustomView
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}>
        {!!prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, isRTL && {textAlign: 'right'}]}
          placeholderTextColor="#4B5563"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </CustomView>
      {!!error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </CustomView>
  );
};

export default memo(CustomInput);
