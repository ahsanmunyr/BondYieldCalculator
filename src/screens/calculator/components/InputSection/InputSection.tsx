import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomText from '../../../../components/CustomText/CustomText';
import CustomView from '../../../../components/CustomView/CustomView';
import FrequencySelector from '../../../../components/FrequencySelector/FrequencySelector';
import {BondInputs, CouponFrequency} from '../../../../types/bond.types';
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
  const {t} = useTranslation();

  return (
    <CustomView style={styles.container}>
      <CustomView style={styles.card}>
        <CustomText style={styles.cardTitle}>{t('input.bondDetails')}</CustomText>

        <CustomView style={styles.fieldRow}>
          <CustomView style={styles.fieldFlex}>
            <CustomInput
              label={t('input.faceValue')}
              prefix="$"
              placeholder={t('input.faceValuePlaceholder')}
              keyboardType="numeric"
              value={inputs.faceValue}
              onChangeText={v => onInputChange('faceValue', v)}
              error={errors.faceValue}
              returnKeyType="next"
            />
          </CustomView>
          <CustomView style={styles.fieldFlex}>
            <CustomInput
              label={t('input.marketPrice')}
              prefix="$"
              placeholder={t('input.marketPricePlaceholder')}
              keyboardType="numeric"
              value={inputs.marketPrice}
              onChangeText={v => onInputChange('marketPrice', v)}
              error={errors.marketPrice}
              returnKeyType="next"
            />
          </CustomView>
        </CustomView>

        <CustomView style={styles.fieldRow}>
          <CustomView style={styles.fieldFlex}>
            <CustomInput
              label={t('input.couponRate')}
              prefix="%"
              placeholder={t('input.couponRatePlaceholder')}
              keyboardType="numeric"
              value={inputs.couponRate}
              onChangeText={v => onInputChange('couponRate', v)}
              error={errors.couponRate}
              returnKeyType="next"
            />
          </CustomView>
          <CustomView style={styles.fieldFlex}>
            <CustomInput
              label={t('input.yearsToMaturity')}
              placeholder={t('input.yearsToMaturityPlaceholder')}
              keyboardType="numeric"
              value={inputs.yearsToMaturity}
              onChangeText={v => onInputChange('yearsToMaturity', v)}
              error={errors.yearsToMaturity}
              returnKeyType="done"
            />
          </CustomView>
        </CustomView>

        <FrequencySelector
          value={inputs.couponFrequency}
          onChange={v => onInputChange('couponFrequency', v as CouponFrequency)}
        />
      </CustomView>

      {isCalculated ? (
        <CustomView style={styles.fieldRow}>
          <CustomView style={styles.fieldFlex}>
            <CustomButton title={t('button.recalculate')} onPress={onCalculate} />
          </CustomView>
          <CustomView style={styles.fieldFlex}>
            <CustomButton title={t('button.reset')} onPress={onReset} />
          </CustomView>
        </CustomView>
      ) : (
        <CustomButton title={t('button.calculate')} onPress={onCalculate} />
      )}
    </CustomView>
  );
};

export default memo(InputSection);
