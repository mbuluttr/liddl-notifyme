import { Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { themeColor } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Header title={'settings'} />
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export default Settings;
