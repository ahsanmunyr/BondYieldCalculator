import {
  BondCalculationResult,
  BondResults,
  CashFlowRow,
  CouponFrequency,
} from '@types/bond.types';

const FREQUENCY_MAP: Record<CouponFrequency, number> = {
  annual: 1,
  'semi-annual': 2,
};

/**
 * Current Yield = Annual Coupon Payment / Market Price
 */
function calculateCurrentYield(
  faceValue: number,
  couponRate: number,
  marketPrice: number,
): number {
  const annualCoupon = faceValue * (couponRate / 100);
  return (annualCoupon / marketPrice) * 100;
}

/**
 * YTM via bisection method — solves for periodic rate r where:
 * marketPrice = Σ [coupon / (1+r)^t] + faceValue / (1+r)^n
 */
function calculateYTM(
  faceValue: number,
  marketPrice: number,
  couponRate: number,
  yearsToMaturity: number,
  frequency: number,
): number {
  const totalPeriods = yearsToMaturity * frequency;
  const periodicCoupon = (faceValue * (couponRate / 100)) / frequency;

  const bondPrice = (periodicRate: number): number => {
    let pv = 0;
    for (let t = 1; t <= totalPeriods; t++) {
      pv += periodicCoupon / Math.pow(1 + periodicRate, t);
    }
    pv += faceValue / Math.pow(1 + periodicRate, totalPeriods);
    return pv;
  };

  let low = 0.0001;
  let high = 0.99;

  for (let i = 0; i < 2000; i++) {
    const mid = (low + high) / 2;
    const priceMid = bondPrice(mid);

    if (Math.abs(priceMid - marketPrice) < 0.00001) {
      return mid * frequency * 100;
    }

    if (priceMid > marketPrice) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return ((low + high) / 2) * frequency * 100;
}

/**
 * Build cash flow table for each coupon period
 */
function buildCashFlowSchedule(
  faceValue: number,
  couponRate: number,
  yearsToMaturity: number,
  frequency: number,
): CashFlowRow[] {
  const periodicCoupon = (faceValue * (couponRate / 100)) / frequency;
  const totalPeriods = yearsToMaturity * frequency;
  const monthsPerPeriod = 12 / frequency;

  const startDate = new Date();
  const schedule: CashFlowRow[] = [];

  for (let t = 1; t <= totalPeriods; t++) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + t * monthsPerPeriod);

    const isMaturity = t === totalPeriods;

    schedule.push({
      period: t,
      paymentDate: paymentDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
        day: '2-digit',
      }),
      couponPayment: isMaturity ? periodicCoupon + faceValue : periodicCoupon,
      cumulativeInterest: periodicCoupon * t,
      remainingPrincipal: isMaturity ? 0 : faceValue,
    });
  }

  return schedule;
}

export function calculateBond(
  faceValue: number,
  couponRate: number,
  marketPrice: number,
  yearsToMaturity: number,
  couponFrequency: CouponFrequency,
): BondCalculationResult {
  const frequency = FREQUENCY_MAP[couponFrequency];
  const totalPeriods = yearsToMaturity * frequency;
  const periodicCoupon = (faceValue * (couponRate / 100)) / frequency;

  const currentYield = calculateCurrentYield(
    faceValue,
    couponRate,
    marketPrice,
  );
  const ytm = calculateYTM(
    faceValue,
    marketPrice,
    couponRate,
    yearsToMaturity,
    frequency,
  );
  const totalInterestEarned = periodicCoupon * totalPeriods;

  const priceDifference = marketPrice - faceValue;
  const priceStatus: BondResults['priceStatus'] =
    priceDifference > 0 ? 'premium' : priceDifference < 0 ? 'discount' : 'par';

  const cashFlowSchedule = buildCashFlowSchedule(
    faceValue,
    couponRate,
    yearsToMaturity,
    frequency,
  );

  return {
    results: {
      currentYield,
      ytm,
      totalInterestEarned,
      priceStatus,
      priceDifference: Math.abs(priceDifference),
    },
    cashFlowSchedule,
  };
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercent(value: number): string {
  return `${value.toFixed(4)}%`;
}
