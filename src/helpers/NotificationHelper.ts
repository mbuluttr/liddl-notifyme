import notifee, {
  AuthorizationStatus,
  Notification,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { ParentTodoType } from '../screens/Todos/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationHelper {
  channelId: string = 'default';

  private createChannel = async () => {
    const channel = await AsyncStorage.getItem('@channel');
    this.channelId = channel || 'default';

    await notifee.createChannel({
      id: this.channelId,
      name: 'Notify me | Channel: ' + this.channelId,
      sound: this.channelId,
      lights: true,
      vibration: true,
    });
  };

  onCreateNormalNotification = async (todo: ParentTodoType) => {
    await this.createChannel();

    const notification: Notification = {
      id: todo._id,
      body: `Notification will show in ${todo.notification.hour} hour(s). Repeatedly: ${
        todo.notification.repeatedly ? 'ON' : 'OFF'
      }`,
      android: {
        channelId: this.channelId,
      },
    };

    await notifee.displayNotification(notification);
  };

  onCreateTriggerNotification = async (todo: ParentTodoType) => {
    await this.createChannel();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(Date.now() + todo.notification.hour * 3600 * 1000).getTime(),
      repeatFrequency: todo.notification.repeatedly ? RepeatFrequency.HOURLY : RepeatFrequency.NONE,
    };

    const notification: Notification = {
      id: todo._id,
      title: 'Notify me | Time to do it!',
      body: todo.text,
      android: {
        channelId: this.channelId,
      },
    };

    await notifee.createTriggerNotification(notification, trigger);
  };

  onCancelNotification = async (_id: string) => {
    const ids = await notifee.getTriggerNotificationIds();

    if (ids.includes(_id)) {
      console.log('Notification cancalled: ', _id);
      await notifee.cancelNotification(_id);
    }
  };

  requestUserPermission = async () => {
    const settings = await notifee.requestPermission({
      sound: true,
      announcement: true,
      criticalAlert: true,
    });

    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
    }
  };
}

export default new NotificationHelper();
