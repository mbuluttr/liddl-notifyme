import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingRight: 24,
    paddingLeft: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },

  circleOuter: {
    height: 24,
    width: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  stepCheck: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
  },
});
