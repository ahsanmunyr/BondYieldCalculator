import React, { memo } from 'react';
import { ScrollView, View } from 'react-native';
import { CashFlowRow } from '../../../../types/bond.types';
import { formatCurrency } from '../../../../utils/bondCalculations';
import CustomText from '../../../../components/CustomText/CustomText';
import styles, { COL_WIDTHS } from './CashFlowTable.style';

interface CashFlowTableProps {
  data: CashFlowRow[];
}

const TableHeader = memo(() => (
  <View style={styles.headerRow}>
    <CustomText style={[styles.headerCell, { width: COL_WIDTHS.period }]}>#</CustomText>
    <CustomText style={[styles.headerCell, { width: COL_WIDTHS.date }]}>Date</CustomText>
    <CustomText style={[styles.headerCell, { width: COL_WIDTHS.coupon }]}>Payment</CustomText>
    <CustomText style={[styles.headerCell, { width: COL_WIDTHS.cumulative }]}>Cumulative</CustomText>
    <CustomText style={[styles.headerCell, { width: COL_WIDTHS.principal }]}>Principal</CustomText>
  </View>
));

interface TableRowProps {
  row: CashFlowRow;
  isAlt: boolean;
  isLast: boolean;
}

const TableRow = memo(({ row, isAlt, isLast }: TableRowProps) => (
  <View
    style={[
      styles.row,
      isAlt && styles.rowAlt,
      isLast && styles.maturityRow,
      !isLast && isLast && styles.rowLast,
    ]}>
    <CustomText style={[styles.periodCell, { width: COL_WIDTHS.period }]}>{row.period}</CustomText>
    <CustomText style={[styles.cell, { width: COL_WIDTHS.date }]}>{row.paymentDate}</CustomText>
    <CustomText style={[styles.cell, { width: COL_WIDTHS.coupon }, isLast && styles.cellHighlight]}>
      {formatCurrency(row.couponPayment)}
    </CustomText>
    <CustomText style={[styles.cell, { width: COL_WIDTHS.cumulative }]}>
      {formatCurrency(row.cumulativeInterest)}
    </CustomText>
    <CustomText style={[styles.cell, { width: COL_WIDTHS.principal }]}>
      {formatCurrency(row.remainingPrincipal)}
    </CustomText>
  </View>
));

const CashFlowTable = ({ data }: CashFlowTableProps) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.sectionTitle}>Cash Flow Schedule</CustomText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableWrapper}>
          <TableHeader />
          {data.map((row, index) => (
            <TableRow
              key={row.period}
              row={row}
              isAlt={index % 2 !== 0}
              isLast={index === data.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(CashFlowTable);
