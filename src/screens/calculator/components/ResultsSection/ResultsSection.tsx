import React, { memo } from 'react';
import { View } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { BondResults } from '../../../../types/bond.types';
import { formatCurrency, formatPercent } from '../../../../utils/bondCalculations';
import CustomText from '../../../../components/CustomText/CustomText';
import styles from './ResultsSection.style';

interface ResultsSectionProps {
  results: BondResults;
}

const PRICE_STATUS_CONFIG = {
  premium: {
    label: 'PREMIUM',
    badgeStyle: styles.premiumBadge,
    color: Colors.danger,
    icon: '▲',
    description: 'Bond priced above face value',
  },
  discount: {
    label: 'DISCOUNT',
    badgeStyle: styles.discountBadge,
    color: Colors.success,
    icon: '▼',
    description: 'Bond priced below face value',
  },
  par: {
    label: 'AT PAR',
    badgeStyle: styles.parBadge,
    color: Colors.warning,
    icon: '●',
    description: 'Bond priced at face value',
  },
};

const ResultsSection = ({ results }: ResultsSectionProps) => {
  const { currentYield, ytm, totalInterestEarned, priceStatus, priceDifference } = results;
  const statusConfig = PRICE_STATUS_CONFIG[priceStatus];

  return (
    <View style={styles.container}>
      <CustomText style={styles.sectionTitle}>Results</CustomText>

      <View style={styles.grid}>
        <View style={styles.card}>
          <CustomText style={styles.cardLabel}>Current Yield</CustomText>
          <CustomText style={styles.cardValue}>{formatPercent(currentYield)}</CustomText>
          <CustomText style={styles.cardSubValue}>Annual income / price</CustomText>
        </View>

        <View style={[styles.card, styles.highlightCard]}>
          <CustomText style={styles.cardLabel}>Yield to Maturity</CustomText>
          <CustomText style={[styles.cardValue, { color: Colors.accentLight }]}>
            {formatPercent(ytm)}
          </CustomText>
          <CustomText style={styles.cardSubValue}>Total annualized return</CustomText>
        </View>

        <View style={styles.card}>
          <CustomText style={styles.cardLabel}>Total Interest Earned</CustomText>
          <CustomText style={styles.cardValue}>{formatCurrency(totalInterestEarned)}</CustomText>
          <CustomText style={styles.cardSubValue}>Sum of all coupon payments</CustomText>
        </View>

        <View style={styles.card}>
          <CustomText style={styles.cardLabel}>Price Status</CustomText>
          <View style={styles.badgeRow}>
            <View style={statusConfig.badgeStyle}>
              <CustomText style={[styles.badgeText, { color: statusConfig.color }]}>
                {statusConfig.icon} {statusConfig.label}
              </CustomText>
            </View>
          </View>
          <CustomText style={styles.cardSubValue}>{statusConfig.description}</CustomText>
          {priceStatus !== 'par' && (
            <CustomText style={[styles.cardSubValue, { color: statusConfig.color }]}>
              {formatCurrency(priceDifference)} {priceStatus === 'premium' ? 'above' : 'below'} par
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(ResultsSection);
