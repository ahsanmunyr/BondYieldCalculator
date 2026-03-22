import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';

const CustomText = ({ style, children, ...props }: TextProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language.startsWith('ar');

  return (
    <Text
      style={isRTL ? [{ textAlign: 'right', writingDirection: 'rtl' }, style] : style}
      {...props}>
      {children}
    </Text>
  );
};

export default memo(CustomText);
