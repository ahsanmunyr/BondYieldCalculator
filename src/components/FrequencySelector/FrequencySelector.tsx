import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CouponFrequency } from '../../types/bond.types';
import CustomText from '../CustomText/CustomText';
import styles from './FrequencySelector.style';

interface FrequencySelectorProps {
  value: CouponFrequency;
  onChange: (value: CouponFrequency) => void;
}

const OPTIONS: { label: string; value: CouponFrequency }[] = [
  { label: 'Annual', value: 'annual' },
  { label: 'Semi-Annual', value: 'semi-annual' },
];

const FrequencySelector = ({ value, onChange }: FrequencySelectorProps) => {
  return (
    <View style={styles.wrapper}>
      <CustomText style={styles.label}>Coupon Frequency</CustomText>
      <View style={styles.container}>
        {OPTIONS.map(option => {
          const isActive = option.value === value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => onChange(option.value)}
              activeOpacity={0.8}>
              <CustomText style={[styles.optionText, isActive && styles.optionTextActive]}>
                {option.label}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(FrequencySelector);
