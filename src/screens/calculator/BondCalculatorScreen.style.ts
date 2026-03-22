import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '@constants/colors';
import {BorderRadius, FontSize, Spacing} from '@constants/spacing';

interface Style {
  safeArea: ViewStyle;
  keyboardAvoid: ViewStyle;
  scrollContent: ViewStyle;
  headerRow: ViewStyle;
  headerContent: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  langButton: ViewStyle;
  langButtonText: TextStyle;
  divider: ViewStyle;
}

export default (i18n: {language: string}) => {
  const isArabic = i18n.language.startsWith('ar');

  return StyleSheet.create<Style>({
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
    headerRow: {
      flexDirection: isArabic ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerContent: {
      gap: Spacing.xs,
      alignItems: isArabic ? 'flex-end' : 'flex-start',
    },
    headerTitle: {
      fontSize: FontSize.xxxl,
      color: Colors.textPrimary,
      fontWeight: '800',
      letterSpacing: -0.5,
      textAlign: isArabic ? 'right' : 'left',
    },
    headerSubtitle: {
      fontSize: FontSize.sm,
      color: Colors.textMuted,
      letterSpacing: 0.2,
      textAlign: isArabic ? 'right' : 'left',
    },
    langButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      backgroundColor: Colors.surface,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: Colors.surfaceBorder,
      marginLeft: isArabic ? 0 : Spacing.md,
      marginRight: isArabic ? Spacing.md : 0,
    },
    langButtonText: {
      fontSize: FontSize.sm,
      color: Colors.accent,
      fontWeight: '600',
      textAlign: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: Colors.surfaceBorder,
    },
  });
};
