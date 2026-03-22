import React, {memo} from 'react';
import {View, ViewProps} from 'react-native';

const CustomView = ({style, ...props}: ViewProps) => {
  return <View style={style} {...props} />;
};

export default memo(CustomView);
