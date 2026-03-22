import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '@constants/colors';
import {BorderRadius, FontSize, Spacing} from '@constants/spacing';

interface Style {
  container: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  fieldRow: ViewStyle;
  fieldFlex: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    gap: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSize.sm,
    color: Colors.accent,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  fieldFlex: {
    flex: 1,
  },
});
