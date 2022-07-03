import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    height: 100,
    paddingHorizontal: 24,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  themesContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  clearButton: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 6,
  },
  clearButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
