import { Alert, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../constants/colors';
import { ThemeTypes } from '../../contexts/ThemeContext/types';
import StorageHelper from '../../helpers/StorageHelper';
import NotificationHelper from '../../helpers/NotificationHelper';

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

  const onClearAllNotifications = async () => {
    const storagedTodos = await StorageHelper.getStoragedData('@todos');
    if (storagedTodos) {
      const todos = storagedTodos.map((todo) => {
        if (todo.notification.isEnabled) {
          todo.notification.isEnabled = false;
          todo.notification.repeatedly = false;
          todo.notification.hour = 1;
          return todo;
        }
        return todo;
      });
      await StorageHelper.setStoragedData('@todos', todos);
    }
    await NotificationHelper.calcelAllNotifications();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Header title={'settings'} canGoBack={true} />
      <View style={[styles.sectionContainer, { backgroundColor: themeColor.subStepSection }]}>
        <Text style={[styles.sectionTitle, { color: themeColor.title }]}>Theme</Text>
        <View style={styles.themesContainer}>{themes.map((theme) => renderThemeCircle(theme))}</View>
      </View>
      <View style={[styles.sectionContainer, { backgroundColor: themeColor.subStepSection }]}>
        <Text style={[styles.sectionTitle, { color: themeColor.title }]}>Notifications</Text>
        <TouchableOpacity
          style={[styles.clearButton, { borderWidth: 1, borderColor: themeColor.button }]}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert('Warning', 'Are you sure you want to clear all notifications?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear All', onPress: () => onClearAllNotifications() },
            ])
          }
        >
          <Text style={[styles.clearButtonText, { color: themeColor.text }]}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
