import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/spacing';

interface Style {
  wrapper: ViewStyle;
  label: TextStyle;
  inputContainer: ViewStyle;
  inputContainerFocused: ViewStyle;
  inputContainerError: ViewStyle;
  input: TextStyle;
  errorText: TextStyle;
  prefix: TextStyle;
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.lg,
    height: 52,
  },
  inputContainerFocused: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentDim,
  },
  inputContainerError: {
    borderColor: Colors.danger,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    padding: 0,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.danger,
    marginTop: 2,
  },
  prefix: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginRight: Spacing.xs,
  },
});
