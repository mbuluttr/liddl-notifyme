import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  backIcon: {
    marginRight: 10,
    height: 50,
    width: 35,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  notificationsButton: {
    marginRight: 10,
    height: 50,
    width: 35,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  settingsButton: {
    height: 50,
    width: 35,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
