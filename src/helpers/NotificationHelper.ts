import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { ParentTodoType } from '../screens/Todos/types';
import { v4 as uuidv4 } from 'uuid';

class NotificationHelper {
  async requestUserPermission() {
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
  }

  private async createChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'default',
      importance: AndroidImportance.DEFAULT,
      visibility: AndroidVisibility.PRIVATE,
      vibration: true,
      sound: 'default',
    });
  }

  onCreateNormalNotification = async (todo: ParentTodoType) => {
    this.createChannel();

    const notification = {
      id: uuidv4(),
      body: `Notification will show in ${todo.notification.hour} hour(s). Repeatedly: ${
        todo.notification.repeatedly ? 'ON' : 'OFF'
      }`,
      android: {
        channelId: 'default',
        sound: 'default',
      },
      ios: {
        sound: 'default',
      },
    };

    await notifee.displayNotification(notification);
  };

  async onCreateTriggerNotification(todo: ParentTodoType) {
    await this.createChannel();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(Date.now() + todo.notification.hour * 3600 * 1000).getTime(),
      repeatFrequency: todo.notification.repeatedly ? RepeatFrequency.HOURLY : RepeatFrequency.NONE,
    };

    const notification = {
      id: todo._id,
      title: 'Notify me | Time to do it!',
      body: todo.text,
      android: {
        channelId: 'default',
        sound: 'default',
      },
      ios: {
        sound: 'default',
      },
    };

    await notifee.createTriggerNotification(notification, trigger);
  }
}

export default new NotificationHelper();
