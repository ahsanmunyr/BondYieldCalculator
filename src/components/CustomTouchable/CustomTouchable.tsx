import React, {memo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

const CustomTouchable = ({...props}: TouchableOpacityProps) => {
  return <TouchableOpacity {...props} />;
};

export default memo(CustomTouchable);
