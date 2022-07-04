import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './src/contexts/ThemeContext';
import AppStackNavigator from './src/routers/AppStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationHelper from './src/helpers/NotificationHelper';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    const getUserPermission = async () => {
      await NotificationHelper.requestUserPermission();
    };

    getUserPermission();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
