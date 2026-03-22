import React, {memo, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import CashFlowTable from '@screens/calculator/components/CashFlowTable/CashFlowTable';
import InputSection from '@screens/calculator/components/InputSection/InputSection';
import ResultsSection from '@screens/calculator/components/ResultsSection/ResultsSection';
import {useBondCalculator} from '@hooks/useBondCalculator';
import createStyles from './BondCalculatorScreen.style';
import CustomText from '@components/CustomText/CustomText';
import CustomTouchable from '@components/CustomTouchable/CustomTouchable';
import CustomView from '@components/CustomView/CustomView';

const BondCalculatorScreen = () => {
  const {t, i18n} = useTranslation();
  const {
    inputs,
    result,
    errors,
    isCalculated,
    handleInputChange,
    handleCalculate,
    handleReset,
  } = useBondCalculator();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };
  const styles = useMemo(() => createStyles(i18n), [i18n.language]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.safeArea.backgroundColor}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <CustomView style={styles.headerRow}>
            <CustomView style={styles.headerContent}>
              <CustomText style={styles.headerTitle}>
                {t('header.title')}
              </CustomText>
              <CustomText style={styles.headerSubtitle}>
                {t('header.subtitle')}
              </CustomText>
            </CustomView>
            <CustomTouchable
              style={styles.langButton}
              onPress={toggleLanguage}
              activeOpacity={0.8}>
              <CustomText style={styles.langButtonText}>
                {t('language.switchTo')}
              </CustomText>
            </CustomTouchable>
          </CustomView>

          <CustomView style={styles.divider} />

          <InputSection
            inputs={inputs}
            errors={errors}
            isCalculated={isCalculated}
            onInputChange={handleInputChange}
            onCalculate={handleCalculate}
            onReset={handleReset}
          />

          {isCalculated && result && (
            <>
              <CustomView style={styles.divider} />
              <ResultsSection results={result.results} />
              <CustomView style={styles.divider} />
              <CashFlowTable data={result.cashFlowSchedule} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(BondCalculatorScreen);
