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
  const {t, i18n} = useTranslation();
  const isRTL = i18n.language === 'ar';
  const rtlText = isRTL ? {textAlign: 'right' as const} : {};
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
      <CustomText style={[styles.sectionTitle, rtlText]}>{t('results.title')}</CustomText>

      <CustomView style={styles.grid}>
        <CustomView style={styles.card}>
          <CustomText style={[styles.cardLabel, rtlText]}>{t('results.currentYield')}</CustomText>
          <CustomText style={[styles.cardValue, rtlText]}>{formatPercent(currentYield)}</CustomText>
          <CustomText style={[styles.cardSubValue, rtlText]}>{t('results.currentYieldSub')}</CustomText>
        </CustomView>

        <CustomView style={[styles.card, styles.highlightCard]}>
          <CustomText style={[styles.cardLabel, rtlText]}>{t('results.ytm')}</CustomText>
          <CustomText style={[styles.cardValue, {color: Colors.accentLight}, rtlText]}>
            {formatPercent(ytm)}
          </CustomText>
          <CustomText style={[styles.cardSubValue, rtlText]}>{t('results.ytmSub')}</CustomText>
        </CustomView>

        <CustomView style={styles.card}>
          <CustomText style={[styles.cardLabel, rtlText]}>{t('results.totalInterest')}</CustomText>
          <CustomText style={[styles.cardValue, rtlText]}>{formatCurrency(totalInterestEarned)}</CustomText>
          <CustomText style={[styles.cardSubValue, rtlText]}>{t('results.totalInterestSub')}</CustomText>
        </CustomView>

        <CustomView style={styles.card}>
          <CustomText style={[styles.cardLabel, rtlText]}>{t('results.priceStatus')}</CustomText>
          <CustomView style={[styles.badgeRow, isRTL && {flexDirection: 'row-reverse'}]}>
            <CustomView style={[statusConfig.badgeStyle, isRTL && {alignSelf: 'flex-end'}]}>
              <CustomText style={[styles.badgeText, {color: statusConfig.color}]}>
                {statusConfig.icon} {statusConfig.label}
              </CustomText>
            </CustomView>
          </CustomView>
          <CustomText style={[styles.cardSubValue, rtlText]}>{statusConfig.description}</CustomText>
          {priceStatus !== 'par' && (
            <CustomText style={[styles.cardSubValue, {color: statusConfig.color}, rtlText]}>
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
