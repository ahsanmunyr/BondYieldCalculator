import React, {memo, useState} from 'react';
import {TextInput, TextInputProps, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomText from '@components/CustomText/CustomText';
import CustomView from '@components/CustomView/CustomView';
import styles from './CustomInput.style';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  prefix?: string;
  allowDecimal?: boolean;
}

const CustomInput = ({label, error, prefix, allowDecimal = true, onChangeText, ...props}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {i18n} = useTranslation();
  const isRTL = i18n.language.startsWith('ar');

  const handleChangeText = (text: string) => {
    let filtered = text;
    if (allowDecimal) {
      // Allow digits and a single dot only
      filtered = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    } else {
      // Integers only — no dot allowed
      filtered = text.replace(/[^0-9]/g, '');
    }
    onChangeText?.(filtered);
  };

  return (
    <CustomView style={styles.wrapper}>
      <CustomText style={[styles.label, isRTL && {textAlign: 'right'}]}>{label}</CustomText>
      <CustomView
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}>
        {!isRTL && !!prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, isRTL && {textAlign: 'right'}]}
          placeholderTextColor="#4B5563"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeText}
          {...props}
        />
        {isRTL && !!prefix && <Text style={[styles.prefix, {marginEnd: 0, marginLeft: 4}]}>{prefix}</Text>}
      </CustomView>
      {!!error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </CustomView>
  );
};

export default memo(CustomInput);
