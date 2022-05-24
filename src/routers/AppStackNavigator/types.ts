import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Todos: undefined;
};

export type TodosScreenProps = NativeStackScreenProps<AppStackParamList, 'Todos'>;
