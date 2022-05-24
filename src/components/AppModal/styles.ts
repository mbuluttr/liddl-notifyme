import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  childrenContainer: {
    maxHeight: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  line: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 55,
    height: 3,
    borderRadius: 3 / 2,
  },
});
