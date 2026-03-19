import React, { memo } from 'react';
import { View } from 'react-native';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomText from '../../../../components/CustomText/CustomText';
import FrequencySelector from '../../../../components/FrequencySelector/FrequencySelector';
import { BondInputs, CouponFrequency } from '../../../../types/bond.types';
import styles from './InputSection.style';

interface InputSectionProps {
  inputs: BondInputs;
  errors: Partial<Record<keyof BondInputs, string>>;
  isCalculated: boolean;
  onInputChange: (field: keyof BondInputs, value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const InputSection = ({
  inputs,
  errors,
  isCalculated,
  onInputChange,
  onCalculate,
  onReset,
}: InputSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <CustomText style={styles.cardTitle}>Bond Details</CustomText>

        <View style={styles.fieldRow}>
          <View style={styles.fieldFlex}>
            <CustomInput
              label="Face Value"
              prefix="$"
              placeholder="1000"
              keyboardType="numeric"
              value={inputs.faceValue}
              onChangeText={v => onInputChange('faceValue', v)}
              error={errors.faceValue}
              returnKeyType="next"
            />
          </View>
          <View style={styles.fieldFlex}>
            <CustomInput
              label="Market Price"
              prefix="$"
              placeholder="950"
              keyboardType="numeric"
              value={inputs.marketPrice}
              onChangeText={v => onInputChange('marketPrice', v)}
              error={errors.marketPrice}
              returnKeyType="next"
            />
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.fieldFlex}>
            <CustomInput
              label="Coupon Rate"
              prefix="%"
              placeholder="5.00"
              keyboardType="numeric"
              value={inputs.couponRate}
              onChangeText={v => onInputChange('couponRate', v)}
              error={errors.couponRate}
              returnKeyType="next"
            />
          </View>
          <View style={styles.fieldFlex}>
            <CustomInput
              label="Years to Maturity"
              placeholder="10"
              keyboardType="numeric"
              value={inputs.yearsToMaturity}
              onChangeText={v => onInputChange('yearsToMaturity', v)}
              error={errors.yearsToMaturity}
              returnKeyType="done"
            />
          </View>
        </View>

        <FrequencySelector
          value={inputs.couponFrequency}
          onChange={v => onInputChange('couponFrequency', v as CouponFrequency)}
        />
      </View>

      {isCalculated ? (
        <View style={styles.fieldRow}>
          <View style={styles.fieldFlex}>
            <CustomButton title="Recalculate" onPress={onCalculate} />
          </View>
          <View style={styles.fieldFlex}>
            <CustomButton title="Reset" onPress={onReset} />
          </View>
        </View>
      ) : (
        <CustomButton title="Calculate Yield" onPress={onCalculate} />
      )}
    </View>
  );
};

export default memo(InputSection);
