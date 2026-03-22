import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '@constants/colors';
import {BorderRadius, FontSize, Spacing} from '@constants/spacing';

interface Style {
  wrapper: ViewStyle;
  label: TextStyle;
  container: ViewStyle;
  option: ViewStyle;
  optionActive: ViewStyle;
  optionText: TextStyle;
  optionTextActive: TextStyle;
}

export default StyleSheet.create<Style>({
  wrapper: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: 4,
    height: 52,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.sm,
  },
  optionActive: {
    backgroundColor: Colors.accent,
  },
  optionText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  optionTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
});
