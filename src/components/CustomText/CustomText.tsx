import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';

const CustomText = ({ style, children, ...props }: TextProps) => {
  return (
    <Text style={style} {...props}>
      {children}
    </Text>
  );
};

export default memo(CustomText);
