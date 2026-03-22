import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '@constants/colors';
import {BorderRadius, FontSize} from '@constants/spacing';

interface Style {
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  label: TextStyle;
  labelDisabled: TextStyle;
}

export default StyleSheet.create<Style>({
  button: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: FontSize.md,
    color: Colors.white,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelDisabled: {
    color: Colors.textMuted,
  },
});
