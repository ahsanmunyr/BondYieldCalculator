import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CashFlowRow} from '../../../../types/bond.types';
import {formatCurrency} from '../../../../utils/bondCalculations';
import CustomText from '../../../../components/CustomText/CustomText';
import CustomView from '../../../../components/CustomView/CustomView';
import styles, {COL_WIDTHS} from './CashFlowTable.style';

interface CashFlowTableProps {
  data: CashFlowRow[];
}

const TableHeader = memo(() => {
  const {t} = useTranslation();
  return (
    <CustomView style={styles.headerRow}>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.period}]}>
        {t('cashFlow.period')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.date}]}>
        {t('cashFlow.date')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.coupon}]}>
        {t('cashFlow.payment')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.cumulative}]}>
        {t('cashFlow.cumulative')}
      </CustomText>
      <CustomText style={[styles.headerCell, {width: COL_WIDTHS.principal}]}>
        {t('cashFlow.principal')}
      </CustomText>
    </CustomView>
  );
});

interface TableRowProps {
  row: CashFlowRow;
  isAlt: boolean;
  isLast: boolean;
}

const TableRow = memo(({row, isAlt, isLast}: TableRowProps) => (
  <CustomView
    style={[
      styles.row,
      isAlt && styles.rowAlt,
      isLast && styles.maturityRow,
      !isLast && isLast && styles.rowLast,
    ]}>
    <CustomText style={[styles.periodCell, {width: COL_WIDTHS.period}]}>
      {row.period}
    </CustomText>
    <CustomText style={[styles.cell, {width: COL_WIDTHS.date}]}>
      {row.paymentDate}
    </CustomText>
    <CustomText
      style={[styles.cell, {width: COL_WIDTHS.coupon}, isLast && styles.cellHighlight]}>
      {formatCurrency(row.couponPayment)}
    </CustomText>
    <CustomText style={[styles.cell, {width: COL_WIDTHS.cumulative}]}>
      {formatCurrency(row.cumulativeInterest)}
    </CustomText>
    <CustomText style={[styles.cell, {width: COL_WIDTHS.principal}]}>
      {formatCurrency(row.remainingPrincipal)}
    </CustomText>
  </CustomView>
));

const CashFlowTable = ({data}: CashFlowTableProps) => {
  const {t} = useTranslation();
  return (
    <CustomView style={styles.container}>
      <CustomText style={styles.sectionTitle}>{t('cashFlow.title')}</CustomText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CustomView style={styles.tableWrapper}>
          <TableHeader />
          {data.map((row, index) => (
            <TableRow
              key={row.period}
              row={row}
              isAlt={index % 2 !== 0}
              isLast={index === data.length - 1}
            />
          ))}
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default memo(CashFlowTable);
