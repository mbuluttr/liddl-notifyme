import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../constants/colors';
import { ThemeTypes } from '../../contexts/ThemeContext/types';

const Settings = () => {
  const { themeColor, changeTheme } = useTheme();
  const themes = ['light', 'dark', 'blue', 'green', 'gold'];

  const renderThemeCircle = (theme: string) => {
    return (
      <TouchableOpacity
        key={theme}
        style={[styles.themeOuter, { backgroundColor: colors[theme as ThemeTypes].button }]}
        onPress={() => changeTheme(theme as ThemeTypes)}
      >
        <View style={[styles.themeInner, { backgroundColor: colors[theme as ThemeTypes].background }]} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Header title={'settings'} canGoBack={true} />
      <View style={[styles.changeContainer, { backgroundColor: themeColor.subStepSection }]}>
        <Text style={[styles.changeText, { color: themeColor.title }]}>Theme</Text>
        <View style={styles.themesContainer}>{themes.map((theme) => renderThemeCircle(theme))}</View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
