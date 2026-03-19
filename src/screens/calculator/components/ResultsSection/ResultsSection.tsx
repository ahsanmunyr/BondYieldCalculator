import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../constants/colors';
import {BondResults} from '../../../../types/bond.types';
import {formatCurrency, formatPercent} from '../../../../utils/bondCalculations';
import CustomText from '../../../../components/CustomText/CustomText';
import CustomView from '../../../../components/CustomView/CustomView';
import styles from './ResultsSection.style';

interface ResultsSectionProps {
  results: BondResults;
}

const ResultsSection = ({results}: ResultsSectionProps) => {
  const {t} = useTranslation();
  const {currentYield, ytm, totalInterestEarned, priceStatus, priceDifference} = results;

  const PRICE_STATUS_CONFIG = {
    premium: {
      label: t('results.premium'),
      badgeStyle: styles.premiumBadge,
      color: Colors.danger,
      icon: '▲',
      description: t('results.premiumDesc'),
    },
    discount: {
      label: t('results.discount'),
      badgeStyle: styles.discountBadge,
      color: Colors.success,
      icon: '▼',
      description: t('results.discountDesc'),
    },
    par: {
      label: t('results.par'),
      badgeStyle: styles.parBadge,
      color: Colors.warning,
      icon: '●',
      description: t('results.parDesc'),
    },
  };

  const statusConfig = PRICE_STATUS_CONFIG[priceStatus];

  return (
    <CustomView style={styles.container}>
      <CustomText style={styles.sectionTitle}>{t('results.title')}</CustomText>

      <CustomView style={styles.grid}>
        <CustomView style={styles.card}>
          <CustomText style={styles.cardLabel}>{t('results.currentYield')}</CustomText>
          <CustomText style={styles.cardValue}>{formatPercent(currentYield)}</CustomText>
          <CustomText style={styles.cardSubValue}>{t('results.currentYieldSub')}</CustomText>
        </CustomView>

        <CustomView style={[styles.card, styles.highlightCard]}>
          <CustomText style={styles.cardLabel}>{t('results.ytm')}</CustomText>
          <CustomText style={[styles.cardValue, {color: Colors.accentLight}]}>
            {formatPercent(ytm)}
          </CustomText>
          <CustomText style={styles.cardSubValue}>{t('results.ytmSub')}</CustomText>
        </CustomView>

        <CustomView style={styles.card}>
          <CustomText style={styles.cardLabel}>{t('results.totalInterest')}</CustomText>
          <CustomText style={styles.cardValue}>{formatCurrency(totalInterestEarned)}</CustomText>
          <CustomText style={styles.cardSubValue}>{t('results.totalInterestSub')}</CustomText>
        </CustomView>

        <CustomView style={styles.card}>
          <CustomText style={styles.cardLabel}>{t('results.priceStatus')}</CustomText>
          <CustomView style={styles.badgeRow}>
            <CustomView style={statusConfig.badgeStyle}>
              <CustomText style={[styles.badgeText, {color: statusConfig.color}]}>
                {statusConfig.icon} {statusConfig.label}
              </CustomText>
            </CustomView>
          </CustomView>
          <CustomText style={styles.cardSubValue}>{statusConfig.description}</CustomText>
          {priceStatus !== 'par' && (
            <CustomText style={[styles.cardSubValue, {color: statusConfig.color}]}>
              {formatCurrency(priceDifference)}{' '}
              {priceStatus === 'premium' ? t('results.abovePar') : t('results.belowPar')}
            </CustomText>
          )}
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default memo(ResultsSection);
