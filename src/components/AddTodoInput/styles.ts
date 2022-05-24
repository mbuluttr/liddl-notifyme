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
  textInput: {
    flex: 1,
    height: 56,
    marginLeft: 12,
    fontSize: 16,
  },
  addSubStepButton: {
    marginLeft: 12,
    width: 24,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
