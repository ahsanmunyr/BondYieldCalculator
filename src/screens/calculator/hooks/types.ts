import { BondCalculationResult, BondInputs } from '@types/bond.types';

export interface UseBondCalculatorReturnType {
  inputs: BondInputs;
  result: BondCalculationResult | null;
  errors: Partial<Record<keyof BondInputs, string>>;
  isCalculated: boolean;
  handleInputChange: (field: keyof BondInputs, value: string) => void;
  handleCalculate: () => void;
  handleReset: () => void;
}
