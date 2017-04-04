import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  clearDateRow: {
    flex: 1,
    padding: 10
  },
  clearDateText: {
    color: 'red'
  },
  container: {
    flex: 1,
  },
  datePicker: {
    height: 0
  },
  editTaskContainer: {
    flex: 1,
    paddingTop: 64,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5
  }
})

export default styles;
