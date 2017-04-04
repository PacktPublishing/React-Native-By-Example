import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  rowText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left'
  },
  dueDateText: {
    flex: 1,
    fontSize: 12,
    color: 'red',
    textAlign: 'right',
    paddingTop: 10
  }
});

export default styles;
