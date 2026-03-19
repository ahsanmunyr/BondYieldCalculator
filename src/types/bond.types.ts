export type CouponFrequency = 'annual' | 'semi-annual';

export interface BondInputs {
  faceValue: string;
  couponRate: string;
  marketPrice: string;
  yearsToMaturity: string;
  couponFrequency: CouponFrequency;
}

export interface BondResults {
  currentYield: number;
  ytm: number;
  totalInterestEarned: number;
  priceStatus: 'premium' | 'discount' | 'par';
  priceDifference: number;
}

export interface CashFlowRow {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondCalculationResult {
  results: BondResults;
  cashFlowSchedule: CashFlowRow[];
}
