import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import Todos from '../../screens/Todos';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Todos" component={Todos} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
