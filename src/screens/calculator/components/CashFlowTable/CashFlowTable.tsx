import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CashFlowRow} from '@types/bond.types';
import {formatCurrency} from '@utils/bondCalculations';
import CustomText from '@components/CustomText/CustomText';
import CustomView from '@components/CustomView/CustomView';
import styles, {COL_WIDTHS} from './CashFlowTable.style';

interface CashFlowTableProps {
  data: CashFlowRow[];
}

interface TableHeaderProps {
  isRTL: boolean;
}

const TableHeader = memo(({isRTL}: TableHeaderProps) => {
  const {t} = useTranslation();
  const rtlText = isRTL ? {textAlign: 'right' as const} : {};
  return (
    <CustomView style={[styles.headerRow, isRTL && {flexDirection: 'row-reverse'}]}>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.period}, rtlText]}>
        {t('cashFlow.period')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.date}, rtlText]}>
        {t('cashFlow.date')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.coupon}, rtlText]}>
        {t('cashFlow.payment')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.cumulative}, rtlText]}>
        {t('cashFlow.cumulative')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.principal}, rtlText]}>
        {t('cashFlow.principal')}
      </CustomText>
    </CustomView>
  );
});

interface TableRowProps {
  row: CashFlowRow;
  isAlt: boolean;
  isLast: boolean;
  isRTL: boolean;
}

const TableRow = memo(({row, isAlt, isLast, isRTL}: TableRowProps) => {
  const rtlText = isRTL ? {textAlign: 'right' as const} : {};
  return (
    <CustomView
      style={[
        styles.row,
        isAlt && styles.rowAlt,
        isLast && styles.maturityRow,
        !isLast && styles.rowLast,
        isRTL && {flexDirection: 'row-reverse'},
      ]}>
      <CustomText style={[styles.periodCell, {width: COL_WIDTHS.period}, rtlText]}>
        {row.period}
      </CustomText>
      <CustomText style={[styles.cell, {width: COL_WIDTHS.date}, rtlText]}>
        {row.paymentDate}
      </CustomText>
      <CustomText
        style={[styles.cell, {width: COL_WIDTHS.coupon}, isLast && styles.cellHighlight, rtlText]}>
        {formatCurrency(row.couponPayment)}
      </CustomText>
      <CustomText style={[styles.cell, {width: COL_WIDTHS.cumulative}, rtlText]}>
        {formatCurrency(row.cumulativeInterest)}
      </CustomText>
      <CustomText style={[styles.cell, {width: COL_WIDTHS.principal}, rtlText]}>
        {formatCurrency(row.remainingPrincipal)}
      </CustomText>
    </CustomView>
  );
});

const CashFlowTable = ({data}: CashFlowTableProps) => {
  const {t, i18n} = useTranslation();
  const isRTL = i18n.language.startsWith('ar');
  return (
    <CustomView style={styles.container}>
      <CustomText style={[styles.sectionTitle, isRTL && {textAlign: 'right'}]}>
        {t('cashFlow.title')}
      </CustomText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CustomView style={styles.tableWrapper}>
          <TableHeader isRTL={isRTL} />
          {data.map((row, index) => (
            <TableRow
              key={row.period}
              row={row}
              isAlt={index % 2 !== 0}
              isLast={index === data.length - 1}
              isRTL={isRTL}
            />
          ))}
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default memo(CashFlowTable);
