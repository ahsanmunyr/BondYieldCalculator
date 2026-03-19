import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { useTranslation } from 'react-i18next';

const CustomView = ({ style, ...props }: ViewProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <View
      style={isRTL ? [{ direction: 'rtl' }, style] : style}
      {...props}
    />
  );
};

export default memo(CustomView);
