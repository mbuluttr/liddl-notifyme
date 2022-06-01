import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './src/contexts/ThemeContext';
import AppStackNavigator from './src/routers/AppStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationHelper from './src/helpers/NotificationHelper';
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log(
    `[onBackgroundEvent] notification id: ${notification?.id},  event type: ${EventType[type]}, press action: ${pressAction?.id}`,
  );
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction?.id === 'first_action_reply') {
    console.log('[onBackgroundEvent] ACTION_PRESS: first_action_reply');

    // Remove the notification
    if (notification?.id) {
      await notifee.cancelNotification(notification?.id);
    }
  }
});

const App = () => {
  useEffect(() => {
    notifee.getTriggerNotificationIds().then((ids) => console.log(ids));
    NotificationHelper.requestUserPermission();
  }, []);

  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      const pressActionLabel = pressAction ? `, press action: ${pressAction?.id}` : '';
      console.log(
        `[onForegroundEvent] notification id: ${notification?.id},  event type: ${EventType[type]}${pressActionLabel}`,
      );

      switch (type) {
        case EventType.DISMISSED:
          console.log('[onForegroundEvent] User dismissed notification', notification);
          break;
        case EventType.PRESS:
          console.log('[onForegroundEvent] User pressed notification', notification);
          break;
        case EventType.ACTION_PRESS:
          console.log('[onForegroundEvent] User pressed an action', notification, detail.pressAction);

          if (detail.pressAction?.id === 'first_action_reply') {
            // perform any server calls here and cancel notification
            if (notification?.id) {
              await notifee.cancelDisplayedNotification(notification.id);
            }
          }
          break;
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
