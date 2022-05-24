import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './src/contexts/ThemeContext';
import AppStackNavigator from './src/routers/AppStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
