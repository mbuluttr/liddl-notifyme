import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './src/contexts/ThemeContext';
import AppStackNavigator from './src/routers/AppStackNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
