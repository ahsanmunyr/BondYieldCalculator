import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { FontSize, Spacing } from '../../constants/spacing';

interface Style {
  safeArea: ViewStyle;
  keyboardAvoid: ViewStyle;
  scrollContent: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  divider: ViewStyle;
}

export default StyleSheet.create<Style>({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.xxl,
  },
  header: {
    gap: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSize.xxxl,
    color: Colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
  },
});
