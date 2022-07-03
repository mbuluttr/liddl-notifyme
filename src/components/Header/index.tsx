import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../../routers/AppStackNavigator/types';

interface HeaderProps {
  title: string;
  canGoBack: boolean;
}

const Header = ({ title, canGoBack }: HeaderProps) => {
  const { theme, themeColor } = useTheme();
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={[styles.container, { backgroundColor: themeColor.background }]}>
      <StatusBar
        barStyle={theme === 'dark' || theme === 'gold' ? 'light-content' : 'dark-content'}
        backgroundColor={themeColor.background}
      />
      <View style={styles.titleContainer}>
        {canGoBack && (
          <TouchableOpacity style={styles.backIcon} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color={themeColor.button} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: themeColor.title }]}>{title}</Text>
      </View>

      {!canGoBack && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Settings')}
          hitSlop={{ top: 25, right: 25, left: 25, bottom: 25 }}
        >
          <Ionicons name="settings-outline" size={28} color={themeColor.button} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
