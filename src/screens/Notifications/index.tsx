import { Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useTheme } from '../../contexts/ThemeContext';

const Notifications = () => {
  const { themeColor } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Header title={'notifications'} canGoBack={true} />
      <Text>Notifications</Text>
    </SafeAreaView>
  );
};

export default Notifications;
