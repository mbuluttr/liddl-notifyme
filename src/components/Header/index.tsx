import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from './styles';

const Header = () => {
  const { theme, themeColor } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: themeColor.background }]}>
      <StatusBar
        barStyle={theme === 'dark' || theme === 'gold' ? 'light-content' : 'dark-content'}
        backgroundColor={themeColor.background}
      />
      <Text style={[styles.title, { color: themeColor.title }]}>notify.me</Text>
    </View>
  );
};

export default Header;
