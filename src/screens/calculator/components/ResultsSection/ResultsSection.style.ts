import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../../../constants/colors';
import {BorderRadius, FontSize, Spacing} from '../../../../constants/spacing';

interface Style {
  container: ViewStyle;
  sectionTitle: TextStyle;
  grid: ViewStyle;
  card: ViewStyle;
  highlightCard: ViewStyle;
  cardLabel: TextStyle;
  cardValue: TextStyle;
  cardSubValue: TextStyle;
  badgeRow: ViewStyle;
  premiumBadge: ViewStyle;
  discountBadge: ViewStyle;
  parBadge: ViewStyle;
  badgeText: TextStyle;
}

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.lg,
    gap: Spacing.xs,
    minWidth: '47%',
    flex: 1,
  },
  highlightCard: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentDim,
  },
  cardLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: FontSize.xxl,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  cardSubValue: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  premiumBadge: {
    backgroundColor: Colors.dangerBg,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  discountBadge: {
    backgroundColor: Colors.successBg,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  parBadge: {
    backgroundColor: Colors.warningBg,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
