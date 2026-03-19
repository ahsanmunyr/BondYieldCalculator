import React, { memo, useState } from 'react';
import { TextInput, TextInputProps, Text, View } from 'react-native';
import styles from './CustomInput.style';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  prefix?: string;
}

const CustomInput = ({ label, error, prefix, ...props }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}>
        {!!prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor="#4B5563"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default memo(CustomInput);
