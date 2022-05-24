import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nonCompletedSquare: {
    height: 24,
    width: 24,
    borderRadius: 6,
  },
  completedSquare: {
    height: 24,
    width: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
  },
});
