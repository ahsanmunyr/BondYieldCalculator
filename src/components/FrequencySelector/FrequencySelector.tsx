import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CouponFrequency} from '../../types/bond.types';
import CustomText from '../CustomText/CustomText';
import CustomView from '../CustomView/CustomView';
import styles from './FrequencySelector.style';

interface FrequencySelectorProps {
  value: CouponFrequency;
  onChange: (value: CouponFrequency) => void;
}

const FrequencySelector = ({value, onChange}: FrequencySelectorProps) => {
  const {t} = useTranslation();

  const OPTIONS: {label: string; value: CouponFrequency}[] = [
    {label: t('frequency.annual'), value: 'annual'},
    {label: t('frequency.semiAnnual'), value: 'semi-annual'},
  ];

  return (
    <CustomView style={styles.wrapper}>
      <CustomText style={styles.label}>{t('frequency.label')}</CustomText>
      <CustomView style={styles.container}>
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
      </CustomView>
    </CustomView>
  );
};

export default memo(FrequencySelector);
