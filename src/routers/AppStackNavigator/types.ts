import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Todos: undefined;
  Settings: undefined;
};

export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParamList>;
