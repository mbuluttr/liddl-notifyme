import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParentTodoType } from '../screens/Todos/types';

class StorageHelper {
  async getStoragedData(key: string): Promise<ParentTodoType[] | null> {
    const storagedData = await AsyncStorage.getItem(key);
    return storagedData ? JSON.parse(storagedData) : null;
  }

  async setStoragedData(key: string, data: ParentTodoType[]): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }
}

export default new StorageHelper();
