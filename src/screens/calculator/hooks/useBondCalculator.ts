import {useCallback, useState} from 'react';
import {BondCalculationResult, BondInputs} from '@types/bond.types';
import {calculateBond} from '@utils/bondCalculations';
import {UseBondCalculatorReturnType} from './types';

const INITIAL_INPUTS: BondInputs = {
  faceValue: '',
  couponRate: '',
  marketPrice: '',
  yearsToMaturity: '',
  couponFrequency: 'semi-annual',
};

function validateInputs(inputs: BondInputs): Partial<Record<keyof BondInputs, string>> {
  const errors: Partial<Record<keyof BondInputs, string>> = {};

  const faceValue = parseFloat(inputs.faceValue);
  const couponRate = parseFloat(inputs.couponRate);
  const marketPrice = parseFloat(inputs.marketPrice);
  const yearsToMaturity = parseFloat(inputs.yearsToMaturity);

  if (!inputs.faceValue || isNaN(faceValue) || faceValue <= 0) {
    errors.faceValue = 'error.faceValue';
  }
  if (!inputs.couponRate || isNaN(couponRate) || couponRate < 0 || couponRate > 100) {
    errors.couponRate = 'error.couponRate';
  }
  if (!inputs.marketPrice || isNaN(marketPrice) || marketPrice <= 0) {
    errors.marketPrice = 'error.marketPrice';
  }
  if (
    !inputs.yearsToMaturity ||
    isNaN(yearsToMaturity) ||
    yearsToMaturity <= 0 ||
    !Number.isInteger(yearsToMaturity)
  ) {
    errors.yearsToMaturity = 'error.yearsToMaturity';
  }

  return errors;
}

export const useBondCalculator = (): UseBondCalculatorReturnType => {
  const [inputs, setInputs] = useState<BondInputs>(INITIAL_INPUTS);
  const [result, setResult] = useState<BondCalculationResult | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof BondInputs, string>>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = useCallback((field: keyof BondInputs, value: string) => {
    setInputs(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: undefined}));
  }, []);

  const handleCalculate = useCallback(() => {
    const validationErrors = validateInputs(inputs);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const calculation = calculateBond(
      parseFloat(inputs.faceValue),
      parseFloat(inputs.couponRate),
      parseFloat(inputs.marketPrice),
      parseFloat(inputs.yearsToMaturity),
      inputs.couponFrequency,
    );

    setResult(calculation);
    setIsCalculated(true);
    setErrors({});
  }, [inputs]);

  const handleReset = useCallback(() => {
    setInputs(INITIAL_INPUTS);
    setResult(null);
    setErrors({});
    setIsCalculated(false);
  }, []);

  return {
    inputs,
    result,
    errors,
    isCalculated,
    handleInputChange,
    handleCalculate,
    handleReset,
  };
};
