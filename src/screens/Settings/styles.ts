import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  changeContainer: {
    height: 112,
    paddingHorizontal: 24,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themesContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeOuter: {
    height: 30,
    width: 30,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeInner: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
});
