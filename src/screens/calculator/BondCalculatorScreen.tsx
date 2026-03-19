import React, { memo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CashFlowTable from './components/CashFlowTable/CashFlowTable';
import InputSection from './components/InputSection/InputSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { useBondCalculator } from './hooks/useBondCalculator';
import styles from './BondCalculatorScreen.style';
import CustomText from '../../components/CustomText/CustomText';

const BondCalculatorScreen = () => {
  const {
    inputs,
    result,
    errors,
    isCalculated,
    handleInputChange,
    handleCalculate,
    handleReset,
  } = useBondCalculator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={styles.safeArea.backgroundColor} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <CustomText style={styles.headerTitle}>Bond Yield{'\n'}Calculator</CustomText>
            <CustomText style={styles.headerSubtitle}>
              Analyze bond performance and cash flow
            </CustomText>
          </View>

          <View style={styles.divider} />

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
              <View style={styles.divider} />
              <ResultsSection results={result.results} />
              <View style={styles.divider} />
              <CashFlowTable data={result.cashFlowSchedule} />
            </>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(BondCalculatorScreen);
