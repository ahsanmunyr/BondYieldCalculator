import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../../../constants/colors';
import {BorderRadius, FontSize, Spacing} from '../../../../constants/spacing';

interface Style {
  container: ViewStyle;
  sectionTitle: TextStyle;
  tableWrapper: ViewStyle;
  headerRow: ViewStyle;
  headerCell: TextStyle;
  row: ViewStyle;
  rowAlt: ViewStyle;
  rowLast: ViewStyle;
  maturityRow: ViewStyle;
  cell: TextStyle;
  cellHighlight: TextStyle;
  periodCell: TextStyle;
}

export const COL_WIDTHS = {
  period: 50,
  date: 100,
  coupon: 110,
  cumulative: 110,
  principal: 100,
};

export default StyleSheet.create<Style>({
  container: {
    gap: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    color: Colors.accent,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tableWrapper: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: Colors.tableHeader,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tableBorder,
  },
  headerCell: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tableBorder,
    alignItems: 'center',
  },
  rowAlt: {
    backgroundColor: Colors.tableRowAlt,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  maturityRow: {
    backgroundColor: Colors.accentDim,
    borderBottomWidth: 0,
  },
  cell: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  cellHighlight: {
    color: Colors.accentLight,
    fontWeight: '600',
  },
  periodCell: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
