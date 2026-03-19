import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BondCalculatorScreen from './src/screens/calculator/BondCalculatorScreen';

function App() {
  return (
    <SafeAreaProvider>
      <BondCalculatorScreen />
    </SafeAreaProvider>
  );
}

export default App;
